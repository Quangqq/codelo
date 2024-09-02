const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let jobs = [];

// API để thêm cron job mới
app.post('/api/cron', (req, res) => {
    const { jobName, jobSchedule, apiEndpoint, apiMethod, apiData } = req.body;

    try {
        const job = cron.schedule(jobSchedule, () => {
            console.log(`Executing Job: ${jobName}`);
            
            // Tạo request để gọi API
            const requestOptions = {
                method: apiMethod,
                headers: { 'Content-Type': 'application/json' },
            };

            if (apiMethod === 'POST' || apiMethod === 'PUT') {
                requestOptions.body = JSON.stringify(apiData);
            }

            fetch(apiEndpoint, requestOptions)
                .then(response => response.json())
                .then(data => console.log(`Job Result:`, data))
                .catch(error => console.error('Error executing job:', error));
        });

        jobs.push({ jobName, jobSchedule, apiEndpoint, job });
        res.status(201).json({ message: 'Cron job created successfully' });

    } catch (error) {
        console.error('Error creating cron job:', error);
        res.status(500).json({ message: 'Failed to create cron job' });
    }
});

// API để xem tất cả cron jobs
app.get('/api/cron', (req, res) => {
    const jobList = jobs.map(({ jobName, jobSchedule, apiEndpoint }) => ({
        jobName,
        jobSchedule,
        apiEndpoint
    }));
    res.json(jobList);
});

// API để xóa một cron job
app.delete('/api/cron/:jobName', (req, res) => {
    const { jobName } = req.params;

    const jobIndex = jobs.findIndex(job => job.jobName === jobName);

    if (jobIndex !== -1) {
        jobs[jobIndex].job.stop();
        jobs.splice(jobIndex, 1);
        res.json({ message: 'Cron job deleted successfully' });
    } else {
        res.status(404).json({ message: 'Cron job not found' });
    }
});

app.listen(port, () => {
    console.log(`Cron Job Manager API is running on http://localhost:${port}`);
});
