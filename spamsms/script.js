let queue = [];
let processing = false;

function addToQueue() {
    const phone = document.getElementById('phone').value;
    const times = document.getElementById('times').value;

    if (phone && times) {
        queue.push({ phone, times });
        updateStatusBar();
        if (!processing) {
            processQueue();
        }
    }
}

function processQueue() {
    if (queue.length === 0) {
        processing = false;
        return;
    }

    processing = true;
    const { phone, times } = queue.shift();

    const listItem = document.createElement('li');
    listItem.innerText = `Bắt Đầu ${phone} (${times} times)`;
    document.getElementById('status-list').appendChild(listItem);

    spamSmsAndCall(phone, times, listItem);
}

function spamSmsAndCall(phone, times, listItem) {
    const url = `https://api.nqtool.net/spamsms?phone=${phone}&amout=${times}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            listItem.innerText = `Thành Công ${phone}: ${data.message}`;
            processQueue();
        })
        .catch(error => {
            listItem.innerText = `Thất Bại Số ${phone}`;
            processQueue();
        });
}

function updateStatusBar() {
    const statusList = document.getElementById('status-list');
    statusList.innerHTML = ''; // Clear the list
    queue.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `Luồng: ${item.phone} (${item.times} times)`;
        statusList.appendChild(listItem);
    });
}
