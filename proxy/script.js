async function fetchProxies() {
    try {
        const response = await fetch('https://rootjazz.com/proxies/proxies.txt');
        const data = await response.text();
        const proxyArray = data.trim().split('\n');
        const tableBody = document.querySelector('#proxyTable tbody');

        proxyArray.forEach(proxy => {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.textContent = proxy;
            row.appendChild(cell);
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu proxy:', error);
    }
}

fetchProxies();
