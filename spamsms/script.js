document.getElementById('smsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const phone = document.getElementById('phone').value;
    const amout = document.getElementById('amout').value;

    const apiUrl = 'https://api.nqtool.net/spamsms/';
    const params = new URLSearchParams({ phone: phone, amout: amout });

    // Use Fetch API to send data to the API endpoint
    fetch(`${apiUrl}?${params}`)
        .then(response => {
            if (response.ok) {
                alert('Request successful!');
            } else {
                alert('Request failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
});
