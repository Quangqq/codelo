function sendSMS() {
    const phone = document.getElementById('phone').value;
    const amount = document.getElementById('amount').value;

    if (!phone || !amount) {
        alert('Vui lòng nhập số điện thoại và số lần');
        return;
    }

    const url = `https://apispam.quangapi.com/spamsms?phone=${phone}&amout=${amount}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerText = `Thành Công: ${data.success}`;
        })
        .catch(error => {
            document.getElementById('result').innerText = `Thất Bại: ${error}`;
        });
}
