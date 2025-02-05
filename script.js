// Funzione per gestire l'invio delle richieste
async function submitRequest() {
    const username = sessionStorage.getItem('username');
    const request = document.getElementById('request-text').value;
    const requestMessage = document.getElementById('request-message');

    if (username && request) {
        try {
            const response = await fetch('http://localhost:3000/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, request })
            });
            const message = await response.text();
            requestMessage.textContent = message;

            if (response.ok) {
                document.getElementById('request-text').value = '';
            }
        } catch (error) {
            requestMessage.textContent = 'Error during request submission. Please try again.';
        }
    } else {
        requestMessage.textContent = 'Please enter a request.';
    }
}
