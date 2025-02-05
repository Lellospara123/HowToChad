document.getElementById('request-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const requestText = document.getElementById('request-text').value;
    const username = sessionStorage.getItem('username');

    if (requestText && username) {
        saveRequestToFile(username, requestText);
    }
});

function saveRequestToFile(username, requestText) {
    const blob = new Blob([`${username}: ${requestText}`], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.download = `${username}-request.txt`;
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = '_blank';
    anchor.style.display = 'none'; // make it hidden
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    document.getElementById('response-message').textContent = 'Your request has been saved successfully!';
}
