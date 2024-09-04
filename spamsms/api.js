body {
    background: linear-gradient(to right, #00c6ff, #0072ff);
    font-family: 'Arial', sans-serif;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    background: rgba(0, 0, 0, 0.8);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 300px;
}

h2 {
    font-size: 24px;
    margin-bottom: 20px;
}

h2 span {
    font-weight: normal;
    font-size: 18px;
    display: block;
    color: #f0f0f0;
}

.input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.input-group input {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
}

#spamBtn {
    background: #ff4b2b;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s;
}

#spamBtn:hover {
    background: #ff416c;
}

#response {
    margin-top: 15px;
    font-size: 14px;
    color: #ffb6b6;
}

#status-bar {
    margin-top: 20px;
    text-align: left;
}

#status-bar h3 {
    font-size: 16px;
    margin-bottom: 10px;
}

#status-list {
    list-style: none;
    padding-left: 0;
}

#status-list li {
    background: rgba(255, 255, 255, 0.1);
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 3px;
    font-size: 13px;
}
