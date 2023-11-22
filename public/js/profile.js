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

const commentHandler = async (event) => {
    event.preventDefault();
    console.log(' New Comment');
    const comment_txt = document.querySelector('#commentBody').value.trim();
    const path = window.location.pathname;
    const blogId = path.split('/').pop();

    if (comment) {
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

};

document.addEventListener('DOMContentLoaded', (event) => {
    const publishBtn = document.querySelector('#publishBtn')
    publishBtn.addEventListener('click', newBlogHandler);

    document
        .querySelector('.blog-list')
        .addEventListener('click', delButtonHandler);

});


