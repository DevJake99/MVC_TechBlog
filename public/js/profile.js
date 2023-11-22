const newBlogHandler = async (event) => {
    event.preventDefault();
    console.log('create')
    const title = document.querySelector('#blogTitle').value.trim();
    const body = document.querySelector('#blog-body').value.trim();

    if (title && body) {
        const response = await fetch(`/api/blogs`, {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create blog post');
        }
    }
    console.log(title)
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete blog post');
        }
    }
};

/*function commentForm() {
    const commentBtn = document.querySelector('#commentBtn');
    commentBtn.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('.commentForm').removeAttribute('style');
        console.log(' New Comment');
    });


    // begin submission handling after submit button is clicked
    const submitBtn = document.querySelector('#commentSubmit')
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const commentHandler = async () => {
            // Store elements in variables once submit is clicked
            const comment_txt = document.querySelector('.commentTxt').value.trim();
            const path = window.location.pathname;
            const blogId = path.split('/').pop();


            // Check if text area has a comment
            if (comment_txt) {
                const response = await fetch(`/api/comments`, {
                    method: 'POST',
                    body: JSON.stringify({ comment_txt, blogId }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    document.location.reload();
                } else {
                    alert('Failed to comment on post');
                }
            }
        }

        commentHandler();
    })

}; */



document.addEventListener('DOMContentLoaded', (event) => {


    const publishBtn = document.querySelector('#publishBtn')
    publishBtn.addEventListener('click', newBlogHandler);

    document
        .querySelector('.blog-list')
        .addEventListener('click', delButtonHandler);


});

