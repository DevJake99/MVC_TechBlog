const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all blogs and JOIN with user  and comment data
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['body', 'comment_by', 'date_created'],
                },
            ],
        });

        console.log('blogData', blogData);

        // const comment_data = await Comment.findAll({})
        // Serialize data so the template can read it

        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        console.log('blogs', blogs);
        // Pass serialized data and session flag into template
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in,
            title: 'Tech-Blog - Home Page',

        });
        //console.log('blogs: ', blogs)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['body', 'comment_by', 'date_created', 'blog_id'],
                },
            ],
        });

        const blog = blogData.get({ plain: true });
        console.log('getBlog', blog)

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in,
            title: `${blog.title} - Tech Blog`,
            //comments: blog.comments.body
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });
        //console.log('/profile: ', user);


        res.render('profile', {
            ...user,
            logged_in: true,
            title: `${user.name}'s Profile`
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

router.get('/publish', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });
        //console.log(user);


        res.render('createPost', {
            ...user,
            logged_in: true,
            title: 'Publish - Tech Blog'
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
