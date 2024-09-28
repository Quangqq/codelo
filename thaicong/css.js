body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    color: #333;
}

header {
    background-color: #000;
    color: #fff;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
}

nav ul li {
    margin-left: 20px;
}

nav ul li a {
    color: #fff;
    text-decoration: none;
}

.hero {
    background-image: url('hero.jpg'); /* Thay đổi hình ảnh nền */
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
}

section {
    padding: 40px 20px;
}

.gallery {
    display: flex;
    gap: 10px;
}

.gallery img {
    width: 100%;
    height: auto;
    max-width: 300px;
}

footer {
    background-color: #000;
    color: #fff;
    text-align: center;
    padding: 20px;
}

.social-media a {
    margin: 0 10px;
    color: #fff;
}
