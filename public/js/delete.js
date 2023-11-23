
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
    document
        .querySelector('#deleteBtn')
        .addEventListener('click', delButtonHandler);
});