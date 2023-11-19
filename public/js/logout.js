
const logout = async (event) => {
    event.preventDefault();
    console.log('btn clicked');
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.addEventListener('DOMContentLoaded', (event) => {
    const logoutBtn = document.querySelector('#logoutBtn')
    logoutBtn.addEventListener('click', logout);


})
