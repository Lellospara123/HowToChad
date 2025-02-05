document.getElementById('request-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const requestText = document.getElementById('request-text').value;
    
    // Simulare l'invio della richiesta via email
    sendEmail(requestText);
});

function sendEmail(requestText) {
    // Simulare l'invio di un'email
    const email = 'lellospara123@example.com'; // Sostituisci con il tuo indirizzo email
    const subject = 'New Request';
    const body = encodeURIComponent(requestText);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    
    document.getElementById('response-message').textContent = 'Your request has been sent successfully!';
}
