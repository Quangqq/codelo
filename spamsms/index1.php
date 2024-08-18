<!DOCTYPE html>
<html lang="en">

<head>
     <script src= "https://unpkg.com/sweetalert/dist/sweetalert.min.js " ></script> 
 <script src="dist/sweetalert.min.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPAM SMS- vanphuc</title>
    <link rel="stylesheet" href="assets/css/main/app.css">
    <link rel="stylesheet" href="assets/css/pages/auth.css">
    <link rel="shortcut icon" href="assets/images/logo/favicon.svg" type="image/x-icon">
    <link rel="shortcut icon" href="assets/images/logo/favicon.png" type="image/png">
</head>

<body>
    <div id="auth">
        

<div class="row h-100">
    <div class="col-lg-5 col-12">
        <div id="auth-left">
            <div class="auth-logo">
                <a href="link"><img src="assets/images/logo/favicon.png"  alt="Logo"></a>
            </div>
            <h1 class="auth-title"> DỊCH VỤ SPAM </h1>
            <p class="auth-subtitle mb-5">Server 1  </p>
            <p  class="auth-subtitle mb-5">Giá key server 1: 15k vĩnh viễn
              
            <form action = "server1"  method="post">
                <div class="form-group position-relative has-icon-left mb-4">
                    <input  type="password" class="form-control form-control-xl"  name ="key" placeholder="Hãy Nhập Key">
                    <div class="form-control-icon">
                        <i class="bi bi-shield-lock"></i>
                    </div>
                </div>
                
             
                <div class="form-group position-relative has-icon-left mb-4">
                    <input type="text" class="form-control form-control-xl"      name="phone" placeholder ="Số Điện Thoại"
</div>
              <div class="form-control-icon">
                        <i class="bi bi-person"></i>
                    </div>
                  


                </div>
                <div class="form-check form-check-lg d-flex align-items-end">
                    <input class="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label text-gray-600" for="flexCheckDefault">
                        Điều Khoản Của Chúng Tôi 
                    </label>
                </div>
                <button
               
 class="btn btn-primary btn-block btn-lg shadow-lg mt-5" onclick="showMessage()">Bắt Đầu
  </button> 
            </form>
            <div class="text-center mt-5 text-lg fs-4">
                <p class="text-gray-600"><a href="/" class="font-bold"> 
                  
                      Server Free  </a></p>
                      <p class="text-gray-600"><a href="sv2" class="font-bold"> 
                      Server 2  </a></p>
                      
                <p><a class="font-bold" href="https://zalo.me/0342956482">ADMIN </a></p>
            </div>
        </div>
    </div>
    <div class="col-lg-7 d-none d-lg-block">
        <div id="auth-right"
           


        </div>
        
    </div>
</div>

    </div>
</body>
<script>
function showMessage(){
                Swal.fire(
  'Thông Báo ',
  'Spam Thành Công Đợi Chuyển Hướng',
  'success'
)
            }
</script>
</html>
