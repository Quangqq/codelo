document.getElementById('smsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const phone = document.getElementById('phone').value;
    const amout = document.getElementById('amout').value;

    const apiUrl = 'https://api.nqtool.net/spamsms/';
    const params = new URLSearchParams({ phone: phone, amout: amout });

    fetch(`${apiUrl}?${params}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('message');
        if (data.success) {  // Assuming the API returns { success: true } on success
            messageDiv.style.display = 'block';
            messageDiv.style.color = 'green';
            messageDiv.textContent = 'Thanh công';
        } else {
            messageDiv.style.display = 'block';
            messageDiv.style.color = 'red';
            messageDiv.textContent = 'Thành Công';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const messageDiv = document.getElementById('message');
        messageDiv.style.display = 'block';
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'Thành Công';
    });
});
