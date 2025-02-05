document.getElementById('request-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const requestText = document.getElementById('request-text').value;

    // Simulate saving the request to a file
    saveRequestToFile(requestText);
});

function saveRequestToFile(requestText) {
    const blob = new Blob([requestText], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.download = 'request.txt';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = '_blank';
    anchor.style.display = 'none'; // make it hidden
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    document.getElementById('response-message').textContent = 'Your request has been saved successfully!';
}
