function sendSMS() {
    const phone = document.getElementById('phone').value;
    const amount = document.getElementById('amount').value;

    if (!phone || !amount) {
        alert('Please enter both phone number and amount.');
        return;
    }

    const url = `https://apispam.quangapi.com/spamsms?phone=${phone}&amout=${amount}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerText = `Success: ${data.success}`;
        })
        .catch(error => {
            document.getElementById('result').innerText = `Error: ${error}`;
        });
}
