async function fetchProxies() {
    try {
        const response = await fetch('https://rootjazz.com/proxies/proxies.txt');
        const data = await response.text();
        const proxyArray = data.trim().split('\n');
        const tableBody = document.querySelector('#proxyTable tbody');
        
        // Xóa các hàng cũ trước khi chèn dữ liệu mới
        tableBody.innerHTML = '';

        proxyArray.forEach(proxy => {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.textContent = proxy;
            row.appendChild(cell);
            tableBody.appendChild(row);
        });

        // Cập nhật thời gian cập nhật
        const updateTime = new Date().toLocaleTimeString();
        document.getElementById('updateTime').textContent = `Cập nhật lúc ${updateTime}`;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu proxy:', error);
    }
}

// Lần đầu gọi fetchProxies để tải dữ liệu ngay khi trang được tải
fetchProxies();

// Cập nhật dữ liệu proxy mỗi 10 giây
setInterval(fetchProxies, 10000);
