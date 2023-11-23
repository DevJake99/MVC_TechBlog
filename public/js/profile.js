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





document.addEventListener('DOMContentLoaded', (event) => {


    const publishBtn = document.querySelector('#publishBtn')
    publishBtn.addEventListener('click', newBlogHandler);

    document
        .querySelector('#deleteBtn')
        .addEventListener('click', delButtonHandler);


});

