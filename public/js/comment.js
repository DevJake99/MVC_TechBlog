
function commentForm() {
    const commentBtn = document.querySelector('#commentBtn');
    commentBtn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('click')
        document.querySelector('.commentForm').removeAttribute('style');

    });


    // begin submission handling after submit button is clicked
    const submitBtn = document.querySelector('#commentSubmit')
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const commentHandler = async () => {
            // Store elements in variables once submit is clicked
            const body = document.querySelector('.commentTxt').value.trim();
            const path = window.location.pathname;
            const blog_id = path.split('/').pop();


            // Check if text area has a comment
            if (body) {
                const response = await fetch(`/api/comments`, {
                    method: 'POST',
                    body: JSON.stringify({ body, blog_id }),
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

};

document.addEventListener('DOMContentLoaded', (event) => {
    commentForm();

})