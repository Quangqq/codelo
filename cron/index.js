const axios = require('axios');
const { performance } = require('perf_hooks');

const telegramBotToken = '7343934780:AAFQw9Eskp3x1YR911iv8zmr5E6xIiiiDtc'; // Replace with your bot token
const telegramChatID = '-1002467025729'; // Replace with your chat ID

const messageQueue = []; // Queue to hold messages
let isSending = false; // Flag to prevent multiple send attempts
let retryAfter = 1000; // Initial retry delay in milliseconds
const maxRetryAfter = 3000; // Max wait time after hitting rate limit (30 seconds)
const messagesPerMinute = 30; // Limit to 30 messages per minute
const messageDelay = (60000 / messagesPerMinute); // Delay between messages

// Helper function to escape Markdown V2 special characters
function escapeMarkdownV2(text) {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1');
}

// Gửi tin nhắn đến Telegram bot
async function sendTelegramMessage(message) {
  try {
    const telegramURL = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const escapedMessage = escapeMarkdownV2(message); // Escape special characters

    const msgData = {
      chat_id: telegramChatID,
      text: escapedMessage,
      parse_mode: 'MarkdownV2', // Use Markdown V2 for formatting
    };

    // Gửi yêu cầu đến Telegram API
    const response = await axios.post(telegramURL, msgData); // Log message ID on success
  } catch (error) {
    if (error.response) {
      console.error(`Error sending Telegram message: ${error.response.status} - ${error.response.data.description}`);
      if (error.response.status === 429) {
        // Handle rate limiting
        console.error(`Rate limit exceeded. Backing off...`);
        retryAfter = Math.min(retryAfter * 2, maxRetryAfter); // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, retryAfter)); // Wait before retrying
        await sendTelegramMessage(message); // Retry sending the message
      }
    } else {
      console.error(`Error sending Telegram message: ${error.message}`);
    }
  }
}

// Hàm xử lý gửi tin nhắn theo hàng đợi
async function processMessageQueue() {
  if (isSending || messageQueue.length === 0) return; // Prevent multiple send attempts

  isSending = true;

  while (messageQueue.length > 0) {
    const message = messageQueue.shift(); // Get the next message
    await sendTelegramMessage(message);
    await new Promise(resolve => setTimeout(resolve, messageDelay)); // Wait between messages
  }

  isSending = false; // Reset the flag
}

// Thực hiện yêu cầu tới URL được chỉ định
async function fetchURL(item) {
  const url = item.url;
  const method = item.phuongthuc || 'GET'; // Default to GET if no method specified

  const start = performance.now(); // Record start time

  try {
    const response = method === 'GET' 
      ? await axios.get(url, { timeout: 5000 }) 
      : await axios.post(url, {}, { timeout: 5000 });

    const duration = (performance.now() - start) / 1000; // Calculate execution time

    const now = new Date();
    const dateString = now.toLocaleString(); // Format date

    const id = item.id; // Get the ID from the current item
    console.log(`url: ${url}, id: ${id}, status: ${response.status}, interval_seconds: ${item.interval_seconds}, timeout: ${item.time_out}`);

    // Handle different HTTP status codes
    let message;
    switch (response.status) {
      case 200:
        message = `ID: ${id} - Url: [${url}] - Status: ${response.status} - Time đã thực hiện: ${duration.toFixed(2)} giây - Timeout: ${item.time_out} - Ngày: ${dateString}`;
        break;
      case 404:
        message = `ID: ${id} - Url: [${url}] - Not Found (404) - Timeout: ${item.time_out} - Ngày: ${dateString}`;
        break;
      case 500:
        message = `ID: ${id} - Url: [${url}] - Server Error (500) - Timeout: ${item.time_out} - Ngày: ${dateString}`;
        break;
      case 522:
        message = `ID: ${id} - Url: [${url}] - Timed Out (522) - Timeout: ${item.time_out} - Ngày: ${dateString}`;
        break;
      default:
        message = `ID: ${id} - Url: [${url}] - Status: ${response.status} - Timeout: ${item.time_out} - Ngày: ${dateString}`;
        break;
    }

    messageQueue.push(message); // Add message to the queue
    processMessageQueue(); // Start processing the queue

  } catch (error) {
    console.error(`Error making request to ${url}: ${error.message}`);
    const now = new Date();
    const dateString = now.toLocaleString(); // Format date

    // Handle potential errors
    const message = `ID: ${id} - Url: [${url}] - Error: ${error.message} - Ngày: ${dateString}`;
    messageQueue.push(message); // Add error message to the queue
    processMessageQueue(); // Start processing the queue
  }
}

// Hàm lấy dữ liệu từ API
async function fetchData() {
  while (true) {
    try {
      const { data } = await axios.get('https://dichvuvn.shop/cron/chaycron.php?api=2');

      // Loop through each item in the data
      await Promise.all(data.map(async (item) => {
        const currentTime = Math.floor(Date.now() / 1000); // Get current time
        const sogiay = parseInt(item.interval_seconds, 10);
        const timeHis = parseFloat(item.time_out);

        // Check time condition
        if (currentTime - sogiay >= timeHis) {
          await fetchURL(item); // Process the URL
        }
      }));

      // Wait a short period before continuing the loop
      await new Promise(resolve => setTimeout(resolve, 100)); // 1 second wait before repeat

    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  }
}

// Start processing
fetchData();
