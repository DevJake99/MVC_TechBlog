const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    console.log(req.body)
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            comment_by: req.session.username,
            blog_id: blogId,
            body: comment_txt
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
    console.log('new comment req.session: ', req.session)
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
