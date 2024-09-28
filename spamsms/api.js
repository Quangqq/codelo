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
    const selectedApi = document.getElementById('apiSelect').value; // Get the selected API

    // Determine the API URL based on the selected option
    const apiUrl = spamApiUrls[selectedApi];

    // Call the chosen spam API endpoint
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseMessage').innerText = data.message || "Message sent successfully!";
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerText = "An error occurred. Please try again.";
    });
});
