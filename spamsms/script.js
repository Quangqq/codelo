document.getElementById('smsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const phone = document.getElementById('phone').value;
    const amout = document.getElementById('amout').value;

    const apiUrl = 'https://api.nqtool.net/spamsms/';
    const params = new URLSearchParams({ phone: phone, amout: amout });

    fetch(`${apiUrl}?${params}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
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
