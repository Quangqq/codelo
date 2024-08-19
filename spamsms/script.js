document.getElementById('smsForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    const phone = document.getElementById('phone').value;
    const amout = document.getElementById('amout').value;
    const messageDiv = document.getElementById('message');

    messageDiv.textContent = 'Sending SMS... Please wait.';
    messageDiv.className = '';

    function sendRequest(attempt) {
        fetch(`https://api.nqtool.net/spamsms/?phone=${phone}&amout=${amout}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    messageDiv.textContent = `Thành Công Vui Lòng Chờ ${attempt}s`;
                    messageDiv.className = 'success';

                    if (attempt < amout) {
                        setTimeout(() => sendRequest(attempt + 1), 10000); // 10-second delay for the next attempt
                    }
                } else {
                    messageDiv.textContent = `Thất Bại Vui Lòng Chờ ${attempt}s`;
                    messageDiv.className = 'error';
                    setTimeout(() => sendRequest(attempt), 10000); // Retry the same attempt after 10 seconds
                }
            })
            .catch(error => {
                messageDiv.textContent = `Thất Bại Vui Lòng Chờ ${attempt}s...`;
                messageDiv.className = 'error';
                console.error('Error:', error);
                setTimeout(() => sendRequest(attempt), 10000); // Retry the same attempt after 10 seconds
            });
    }

    sendRequest(1);
});
