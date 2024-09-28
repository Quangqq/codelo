// Define your spam API endpoints
const spamApiUrls = {
    spamSms1: 'https://your-api-url.com/api/spam-sms1', // First spam SMS endpoint
    spamSms2: 'https://your-api-url.com/api/spam-sms2', // Second spam SMS endpoint
    spamSms3: 'https://your-api-url.com/api/spam-sms3', // Third spam SMS endpoint
};

// Event listener for the form submission
document.getElementById('smsForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const phone = document.getElementById('phone').value;
    const amount = document.getElementById('amount').value || 100; // Get the amount or default to 100
    const selectedApi = document.getElementById('apiSelect').value; // Get the selected API

    // Determine the API URL based on the selected option
    const apiUrl = spamApiUrls[selectedApi];

    // Call the chosen spam API endpoint
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone, amount }) // Send the phone number and amount in the request body
    })
    .then(response => response.json())
    .then(data => {
        // Check if there is a success message from the API response
        const message = data.message || "Thành Công";
        document.getElementById('responseMessage').innerText = message;
        document.getElementById('responseMessage').style.color = 'green'; // Success color
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerText = "Lỗi Vui Lòng Dùng Lại Sau";
        document.getElementById('responseMessage').style.color = 'red'; // Error color
    });
});
