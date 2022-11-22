<?php
$batchcode=preg_replace("/\s/","",$_POST['txtcode']);
if($batchcode=="'" || $batchcode=="," || $batchcode=="union"){
	echo "<script>alert('Character illegal!');</script>";
}

if($_GET['add']==2 or !empty($_GET['code'])){
	if(!empty($_GET['code'])){
		$batchcode=$_GET['code'];
	}
	if(strpos($batchcode,"'")||!preg_match("/^\d{16}$/",$batchcode)){
		echo "<script>alert('Введіть 16 цифр без пробілів, який ви знайшли на упаковці вашої ChillBar.');</script>";
		?>
		<script type="text/javascript">window.location.href="verify-product.php";</script>
		<?php	
	}
	if(empty($batchcode)){
		echo "<script>alert('Введіть код!');</script>";
	}
	$con = mysqli_connect("localhost","u_chill","7tk6mX6g3uvh","chillbar");
	//Modify the configuration of your own server
	if (!$con)
	{
		die('Could not connect: ' . mysqli_error());
	}
	mysqli_query($con, "SET NAMES utf8");
	$proLogCode="";
	$autiColor="";
	$rowcount=0;
	$code=$batchcode;
	$result = mysqli_query($con, "SELECT proLogCode,autiColor,count(*) as rowcount FROM anticodetoboxcode where autiCode = '".$code."'");
	while($row = mysqli_fetch_array($result)){
		if($row['rowcount']>0){
			$proLogCode=$row['proLogCode'];
			$autiColor=$row['autiColor'];
			$rowcount=$row['rowcount'];
		}
	}
}
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="icon" href="https://chillbar.com.ua/favicon.ico">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#000000">
<meta name="description" content="Зручні одноразові pod системи">
<link rel="apple-touch-icon" href="https://chillbar.com.ua/logo192.png">
<link rel="manifest" href="https://chillbar.com.ua/manifest.json">
<title>Chill-Bar</title>
<link href="https://chillbar.com.ua/static/css/main.1dd84790.css" rel="stylesheet">
<script src="https://chillbar.com.ua/jquery-1.9.1.min.js"></script>
<style type="text/css">
a:link {
	color: #fff;
	text-decoration: none;
}
a:visited {
	text-decoration: none;
	color: #fff;
}
a:hover {
	color: #fff;
	text-decoration: none;
}
a:active {
	text-decoration: none;
}
a{
	color: #fff
}
#black{
	color: #000;
	
}
#black a{
	color: #000;
}
</style>
</head>

<body>
<div id="root">
	<div class="App">
		<div id="blured">
			<div class="Header forContainer">
				<div class="bg-layer"></div>
				<div class="container" id="cnt">
					<div class="openmenu">
						<div class="line"></div>
						<div class="line"></div>
						<div class="line"></div>
					</div>
					<svg width="373" height="50" id='logo' viewBox="0 0 373 50" class="logo" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_116_6)">
							<path d="M57.2604 1.40714H21.4039C21.4039 1.40714 0 4.2816 0 24.9528C0 45.6241 20.5729 49.4139 21.3919 49.4139H75.1194V1.40714H65.5446V41.2221H23.9572C23.9572 41.2221 9.34803 38.2332 9.34803 25.1194C9.34803 12.0057 21.3015 9.55881 22.9776 9.55881H57.1581L57.2604 1.40714Z" fill="#1D1D1B"></path>
							<path d="M82.7212 21.6689H110.348V1.41113H120.306V49.4159H110.557V28.6423H82.7212V21.6689Z" fill="#1D1D1B"></path>
							<path d="M140.461 1.41113H130.738V11.2369H140.461V1.41113Z" fill="#1D1D1B"></path>
							<path d="M140.461 15.3258H130.738V49.4139H140.461V15.3258Z" fill="#1D1D1B"></path>
							<path d="M160.749 1.41113H151.523V49.4159H160.749V1.41113Z" fill="#1D1D1B"></path>
							<path d="M181.613 1.41113H172.388V49.4159H181.613V1.41113Z" fill="#1D1D1B"></path>
							<path d="M245.241 48.8759L273.01 2.56936C273.01 2.56936 276.314 -3.21369 280.489 2.56936C284.664 8.35241 308.898 49.3958 308.898 49.3958H298.44L290.231 35.4912H269.499L273.168 28.5359H286.238L276.418 12.3891L254.611 49.3958H244.887L245.241 48.8759Z" fill="#1D1D1B"></path>
							<path d="M315.838 49.984V1.40714H352.919C352.919 1.40714 367.815 1.95513 367.815 19.1738C367.815 22.9756 368.295 31.6071 358.073 35.3647L372.102 49.3938H360.153L348.157 36.1335H330.306V29.2706H352.387C352.387 29.2706 359.832 27.6968 359.832 19.2039C359.866 18.0176 360.835 9.52468 351.618 9.52468H323.696V49.984H315.838Z" fill="#1D1D1B"></path>
							<path d="M235.672 24.3065C235.672 24.3065 242.308 22.5601 242.308 13.3325C242.308 13.3325 243.287 1.40912 227.841 1.40912H191.808V49.9839H227.875C227.875 49.9839 242.858 50.8692 242.858 35.3507C242.753 33.3594 243.603 27.5924 235.672 24.3065ZM228.678 41.2923H199.532V9.56079H226.129C226.129 9.56079 233.711 9.4544 233.711 15.9521C233.711 15.9521 234.232 21.6869 228.399 21.6869H205.923V28.5359H228.536C228.536 28.5359 234.929 29.1662 234.929 34.9291C234.935 35.0717 234.899 41.2923 228.678 41.2923Z" fill="#1D1D1B"></path>
						</g>
						<defs>
							<clipPath id="clip0_116_6">
								<rect width="372.102" height="50" fill="white"></rect>
							</clipPath>
						</defs>
					</svg>
					<ul class="menu">
						<li><a href="https://chillbar.com.ua/products">Товари</a></li>
						<li><a href="https://chillbar.com.ua/about">Про нас</a></li>
						<li><a href="https://chillbar.com.ua/contact">Контакти</a></li>
						<li><a href="https://chillbar.com.ua/verify-product.php">Перевірити ChillBar</a></li>
					</ul>
					<!-- <div class="cart-container" style>
						<span class="number" style="right: 5px;">0</span>
						<svg width="64" height="64" viewBox="0 0 64 64" class="cart" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clip-path="url(#clip0_122_788)"><path d="M18.6666 64C21.6121 64 23.9999 61.6122 23.9999 58.6666C23.9999 55.7211 21.6121 53.3333 18.6666 53.3333C15.7211 53.3333 13.3333 55.7211 13.3333 58.6666C13.3333 61.6122 15.7211 64 18.6666 64Z" fill="black"></path><path d="M45.3333 64C48.2789 64 50.6667 61.6122 50.6667 58.6666C50.6667 55.7211 48.2789 53.3333 45.3333 53.3333C42.3878 53.3333 40 55.7211 40 58.6666C40 61.6122 42.3878 64 45.3333 64Z" fill="black"></path><path class="plus" d="M61.3334 8H56.0001V2.66667C56.0001 1.95942 55.7191 1.28115 55.219 0.781049C54.7189 0.280952 54.0407 0 53.3334 0C52.6262 0 51.9479 0.280952 51.4478 0.781049C50.9477 1.28115 50.6667 1.95942 50.6667 2.66667V8H45.3334C44.6262 8 43.9479 8.28095 43.4478 8.78105C42.9477 9.28115 42.6667 9.95942 42.6667 10.6667C42.6667 11.3739 42.9477 12.0522 43.4478 12.5523C43.9479 13.0524 44.6262 13.3333 45.3334 13.3333H50.6667V18.6667C50.6667 19.3739 50.9477 20.0522 51.4478 20.5523C51.9479 21.0524 52.6262 21.3333 53.3334 21.3333C54.0407 21.3333 54.7189 21.0524 55.219 20.5523C55.7191 20.0522 56.0001 19.3739 56.0001 18.6667V13.3333H61.3334C62.0407 13.3333 62.7189 13.0524 63.219 12.5523C63.7191 12.0522 64.0001 11.3739 64.0001 10.6667C64.0001 9.95942 63.7191 9.28115 63.219 8.78105C62.7189 8.28095 62.0407 8 61.3334 8Z" fill="black"></path><path d="M58.056 25.936C57.7112 25.8715 57.357 25.876 57.014 25.9494C56.671 26.0228 56.346 26.1635 56.0577 26.3634C55.7695 26.5634 55.5238 26.8185 55.3349 27.1141C55.146 27.4097 55.0177 27.7398 54.9573 28.0853C54.6247 29.9311 53.6543 31.6013 52.2154 32.8043C50.7766 34.0072 48.9608 34.6664 47.0853 34.6667H14.448L11.9413 13.3333H34.6667C35.3739 13.3333 36.0522 13.0524 36.5523 12.5523C37.0524 12.0522 37.3333 11.3739 37.3333 10.6667C37.3333 9.95942 37.0524 9.28115 36.5523 8.78105C36.0522 8.28095 35.3739 8 34.6667 8H11.312L11.2 7.06133C10.9702 5.11626 10.0348 3.32308 8.57117 2.02161C7.10751 0.720145 5.21727 0.000834231 3.25867 0L2.66667 0C1.95942 0 1.28115 0.280952 0.781049 0.781049C0.280952 1.28115 0 1.95942 0 2.66667C0 3.37391 0.280952 4.05219 0.781049 4.55229C1.28115 5.05238 1.95942 5.33333 2.66667 5.33333H3.25867C3.91182 5.33342 4.54223 5.57322 5.03033 6.00724C5.51842 6.44127 5.83025 7.03933 5.90667 7.688L9.576 38.888C9.95694 42.1328 11.5159 45.1248 13.9571 47.296C16.3982 49.4673 19.5516 50.6667 22.8187 50.6667H50.6667C51.3739 50.6667 52.0522 50.3857 52.5523 49.8856C53.0524 49.3855 53.3333 48.7072 53.3333 48C53.3333 47.2928 53.0524 46.6145 52.5523 46.1144C52.0522 45.6143 51.3739 45.3333 50.6667 45.3333H22.8187C21.1641 45.3337 19.55 44.8209 18.199 43.8657C16.8479 42.9106 15.8262 41.56 15.2747 40H47.0853C50.2111 40.0003 53.2375 38.9024 55.6361 36.8982C58.0347 34.8939 59.6529 32.1107 60.208 29.0347C60.2703 28.6899 60.264 28.3362 60.1896 27.9939C60.1151 27.6515 59.9739 27.3272 59.7741 27.0394C59.5742 26.7516 59.3196 26.5061 59.0248 26.3167C58.73 26.1274 58.4008 25.998 58.056 25.936Z" fill="black"></path></g><defs><clipPath id="clip0_122_788"><rect width="64" height="64" fill="white"></rect></clipPath></defs></svg><svg width="41" height="41" class="cartG" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_146_56)"><path d="M11.9583 41C13.8453 41 15.375 39.4703 15.375 37.5833C15.375 35.6963 13.8453 34.1666 11.9583 34.1666C10.0713 34.1666 8.54163 35.6963 8.54163 37.5833C8.54163 39.4703 10.0713 41 11.9583 41Z" fill="url(#paint0_linear_146_56)"></path><path d="M29.0417 41C30.9286 41 32.4583 39.4703 32.4583 37.5833C32.4583 35.6963 30.9286 34.1666 29.0417 34.1666C27.1547 34.1666 25.625 35.6963 25.625 37.5833C25.625 39.4703 27.1547 41 29.0417 41Z" fill="url(#paint1_linear_146_56)"></path><path class="plus" d="M39.2917 5.125H35.875V1.70833C35.875 1.25525 35.6951 0.820734 35.3747 0.500359C35.0543 0.179985 34.6198 0 34.1667 0C33.7136 0 33.2791 0.179985 32.9587 0.500359C32.6384 0.820734 32.4584 1.25525 32.4584 1.70833V5.125H29.0417C28.5886 5.125 28.1541 5.30498 27.8337 5.62536C27.5134 5.94573 27.3334 6.38025 27.3334 6.83333C27.3334 7.28641 27.5134 7.72093 27.8337 8.04131C28.1541 8.36168 28.5886 8.54167 29.0417 8.54167H32.4584V11.9583C32.4584 12.4114 32.6384 12.8459 32.9587 13.1663C33.2791 13.4867 33.7136 13.6667 34.1667 13.6667C34.6198 13.6667 35.0543 13.4867 35.3747 13.1663C35.6951 12.8459 35.875 12.4114 35.875 11.9583V8.54167H39.2917C39.7448 8.54167 40.1793 8.36168 40.4997 8.04131C40.8201 7.72093 41 7.28641 41 6.83333C41 6.38025 40.8201 5.94573 40.4997 5.62536C40.1793 5.30498 39.7448 5.125 39.2917 5.125Z" fill="url(#paint2_linear_146_56)"></path><path d="M37.1921 16.6153C36.9712 16.5739 36.7444 16.5768 36.5246 16.6238C36.3049 16.6708 36.0966 16.761 35.912 16.8891C35.7273 17.0172 35.57 17.1806 35.4489 17.37C35.3279 17.5593 35.2457 17.7708 35.207 17.9922C34.994 19.1746 34.3723 20.2446 33.4505 21.0152C32.5287 21.7859 31.3655 22.2082 30.164 22.2083H9.25575L7.64992 8.54167H22.2083C22.6614 8.54167 23.0959 8.36168 23.4163 8.04131C23.7367 7.72093 23.9167 7.28641 23.9167 6.83333C23.9167 6.38026 23.7367 5.94573 23.4163 5.62536C23.0959 5.30499 22.6614 5.125 22.2083 5.125H7.24675L7.175 4.52367C7.02778 3.27761 6.42856 2.12885 5.4909 1.29509C4.55325 0.461343 3.34231 0.000534429 2.08758 0L1.70833 0C1.25526 0 0.820734 0.179985 0.500359 0.500359C0.179985 0.820734 0 1.25526 0 1.70833C0 2.16141 0.179985 2.59593 0.500359 2.91631C0.820734 3.23668 1.25526 3.41667 1.70833 3.41667H2.08758C2.50601 3.41672 2.90987 3.57034 3.22255 3.84839C3.53524 4.12644 3.735 4.50957 3.78396 4.92513L6.13463 24.9126C6.37866 26.9913 7.3774 28.908 8.94126 30.299C10.5051 31.69 12.5253 32.4584 14.6182 32.4583H32.4583C32.9114 32.4583 33.3459 32.2784 33.6663 31.958C33.9867 31.6376 34.1667 31.2031 34.1667 30.75C34.1667 30.2969 33.9867 29.8624 33.6663 29.542C33.3459 29.2217 32.9114 29.0417 32.4583 29.0417H14.6182C13.5582 29.0419 12.5242 28.7134 11.6587 28.1015C10.7932 27.4896 10.1387 26.6244 9.78533 25.625H30.164C32.1665 25.6252 34.1053 24.9219 35.6419 23.6379C37.1785 22.3539 38.2151 20.5709 38.5708 18.6003C38.6107 18.3795 38.6067 18.1529 38.559 17.9336C38.5113 17.7142 38.4208 17.5065 38.2928 17.3221C38.1647 17.1378 38.0016 16.9805 37.8128 16.8592C37.6239 16.7379 37.413 16.655 37.1921 16.6153Z" fill="url(#paint3_linear_146_56)"></path></g><defs><linearGradient id="paint0_linear_146_56" x1="11.9583" y1="34.1666" x2="11.9583" y2="41" gradientUnits="userSpaceOnUse"><stop stop-color="#7E5AA9"></stop><stop offset="1" stop-color="#A35E75"></stop></linearGradient><linearGradient id="paint1_linear_146_56" x1="29.0417" y1="34.1666" x2="29.0417" y2="41" gradientUnits="userSpaceOnUse"><stop stop-color="#7E5AA9"></stop><stop offset="1" stop-color="#A35E75"></stop></linearGradient><linearGradient id="paint2_linear_146_56" x1="34.1667" y1="0" x2="34.1667" y2="13.6667" gradientUnits="userSpaceOnUse"><stop stop-color="#7E5AA9"></stop><stop offset="1" stop-color="#A35E75"></stop></linearGradient><linearGradient id="paint3_linear_146_56" x1="19.299" y1="0" x2="19.299" y2="32.4583" gradientUnits="userSpaceOnUse"><stop stop-color="#7E5AA9"></stop><stop offset="1" stop-color="#A35E75"></stop></linearGradient><clipPath id="clip0_146_56"><rect width="41" height="41" fill="white"></rect></clipPath></defs>
						</svg>
					</div> -->
				</div>
			</div>
			<div class="about forContainer verify">
				<form action="/verify-product.php?add=2" method="post">
				<div class="container">
					<h1>SECURITY CODE</h1>
					<img src="https://chillbar.com.ua/src/barcode.webp" alt="">
					<div class="block">
						<p>Будь ласка, введіть тут свій код безпеки, щоб дізнатися, чи купили ви оригінальну електронну сигарету ChillBar чи ні.</p>
						<input type="text" placeholder="security code" name="txtcode" maxlength="16">
						<input type="submit" id="send" class="btn" value="Дізнатися" style="width: 0; height: 0; overflow: hidden; visibility: hidden;">
						<button  class='btn' id='btn'>Дізнатися</button>
						<p style="line-height: 40px; font-size: 16px;">
						<?php
							if(($_GET['add']==2&&!empty($_POST['txtcode'])) or !empty($_GET['code'])){
								if($proLogCode==""){
									echo "<span style='color:red;'>Ой! Щось не так. Ми не можемо перевірити ваш продукт.</span>";
								}else{
									echo "Ви успішно підтвердили свій продукт. Вітаю!<br>";
									echo "Серійний номер: <span id='black'>" . $proLogCode . "</span><br>";
									if(substr($autiColor,0,1) > 0){
										for($i=1;$i<=strlen($autiColor);$i++){
											if(substr($autiColor,$i-1,1)=="1"){
												$color="black";
											}else if(substr($autiColor,$i-1,1)=="2"){
												$color="red";
											}else if(substr($autiColor,$i-1,1)=="3"){
												$color="green";
											}else {
												$color="blue";
											}
											if($i%4==0){
												$auti=$auti."<span style='color:".$color.";' >".substr($code,$i-1,1)."</span>&nbsp;";
											}else{
												$auti=$auti."<span style='color:".$color.";' >".substr($code,$i-1,1)."</span>";

											}
										}
										echo 'Код безпеки:'.$auti.'<br><br>';
									}else{
										for($i=1;$i<=strlen($code);$i++){
											if($i%4==0){
												$auti=$auti.substr($code,$i-1,1)."&nbsp;";
											}else{
												$auti=$auti.substr($code,$i-1,1);
											}
										}
										echo 'Код безпеки:'.$auti.'<br><br>';
									}
								}
							}else{
								echo "<span style='color:red;'>Введіть код безпеки (16 символів) у полі пошуку!</span>";
							}
						?>
						</p>
					</div>
				</div>
				</form>
			</div>
			<div class="footer forContainer">
				<div class="bg-layer"></div>
				<div class="container">
					<div class="left">
						<svg width="373" height="50" viewBox="0 0 373 50" class="logo" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clip-path="url(#clip0_116_6)"><path d="M57.2604 1.40714H21.4039C21.4039 1.40714 0 4.2816 0 24.9528C0 45.6241 20.5729 49.4139 21.3919 49.4139H75.1194V1.40714H65.5446V41.2221H23.9572C23.9572 41.2221 9.34803 38.2332 9.34803 25.1194C9.34803 12.0057 21.3015 9.55881 22.9776 9.55881H57.1581L57.2604 1.40714Z" fill="#1D1D1B"></path><path d="M82.7212 21.6689H110.348V1.41113H120.306V49.4159H110.557V28.6423H82.7212V21.6689Z" fill="#1D1D1B"></path><path d="M140.461 1.41113H130.738V11.2369H140.461V1.41113Z" fill="#1D1D1B"></path><path d="M140.461 15.3258H130.738V49.4139H140.461V15.3258Z" fill="#1D1D1B"></path><path d="M160.749 1.41113H151.523V49.4159H160.749V1.41113Z" fill="#1D1D1B"></path><path d="M181.613 1.41113H172.388V49.4159H181.613V1.41113Z" fill="#1D1D1B"></path><path d="M245.241 48.8759L273.01 2.56936C273.01 2.56936 276.314 -3.21369 280.489 2.56936C284.664 8.35241 308.898 49.3958 308.898 49.3958H298.44L290.231 35.4912H269.499L273.168 28.5359H286.238L276.418 12.3891L254.611 49.3958H244.887L245.241 48.8759Z" fill="#1D1D1B"></path><path d="M315.838 49.984V1.40714H352.919C352.919 1.40714 367.815 1.95513 367.815 19.1738C367.815 22.9756 368.295 31.6071 358.073 35.3647L372.102 49.3938H360.153L348.157 36.1335H330.306V29.2706H352.387C352.387 29.2706 359.832 27.6968 359.832 19.2039C359.866 18.0176 360.835 9.52468 351.618 9.52468H323.696V49.984H315.838Z" fill="#1D1D1B"></path><path d="M235.672 24.3065C235.672 24.3065 242.308 22.5601 242.308 13.3325C242.308 13.3325 243.287 1.40912 227.841 1.40912H191.808V49.9839H227.875C227.875 49.9839 242.858 50.8692 242.858 35.3507C242.753 33.3594 243.603 27.5924 235.672 24.3065ZM228.678 41.2923H199.532V9.56079H226.129C226.129 9.56079 233.711 9.4544 233.711 15.9521C233.711 15.9521 234.232 21.6869 228.399 21.6869H205.923V28.5359H228.536C228.536 28.5359 234.929 29.1662 234.929 34.9291C234.935 35.0717 234.899 41.2923 228.678 41.2923Z" fill="#1D1D1B"></path></g><defs><clipPath id="clip0_116_6"><rect width="372.102" height="50" fill="white"></rect></clipPath></defs>
						</svg>
						<p>© <span>2020</span>—2022 Усі права захищені.</p>
					</div>
					<div class="right">
						<ul>
							<li><a href="/">Головне меню</a></li>
							<li><a href="https://chillbar.com.ua/products">Товари</a></li>
							<li><a href="https://chillbar.com.ua/about">Про нас</a></li>
							<li><a href="https://chillbar.com.ua/contact">Контакти</a></li>
						</ul>
						<ul>
							<li>Клієнтам</li>
							<li><a href="https://chillbar.com.ua/ref">Обмін та повернення</a></li>
							<li><a href="https://chillbar.com.ua/conf">Політика конфіденційності</a></li>
							<li><a href="https://chillbar.com.ua/cookie">Політика Cookie</a></li>
						</ul>
						<ul>
							<li>Контактна інформація</li>
							<li><a href="tel:+380683737157">+380 68 37 37 157</a></li>
							<li><a href="tel:+380683737157">+380 68 37 37 157</a></li>
							<li><a href="mailto:vashemilo@google.com">vashemilo@google.com</a></li>
						</ul>
					</div>
					<div class="bottom">
						<div class="icons">
							<svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M32.0263 3.52363L4.60979 18.2258C3.7606 18.7118 3.7606 20.0484 4.7311 20.4129L29.964 30.9839C30.6919 31.3484 31.5411 30.7409 31.6624 30.0119L33.7247 4.73869C33.846 3.64513 32.8755 3.03761 32.0263 3.52363Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
								<path d="M31.5411 4.86011L15.7705 24.301V33.1709C15.7705 34.2645 17.2263 34.872 17.9541 34.0215L23.0492 27.9462" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
							</svg>
							<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#clip0_117_242)"><path d="M29.0417 3.41675H11.9584C7.24098 3.41675 3.41675 7.24098 3.41675 11.9584V29.0417C3.41675 33.7592 7.24098 37.5834 11.9584 37.5834H29.0417C33.7592 37.5834 37.5834 33.7592 37.5834 29.0417V11.9584C37.5834 7.24098 33.7592 3.41675 29.0417 3.41675Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M27.3337 19.4238C27.5446 20.8455 27.3017 22.2976 26.6397 23.5733C25.9778 24.8491 24.9304 25.8837 23.6465 26.5299C22.3627 27.1761 20.9077 27.401 19.4887 27.1727C18.0697 26.9443 16.7587 26.2743 15.7424 25.258C14.7261 24.2417 14.0561 22.9308 13.8278 21.5117C13.5994 20.0927 13.8243 18.6378 14.4705 17.3539C15.1167 16.0701 16.1513 15.0227 17.4271 14.3607C18.7029 13.6987 20.1549 13.4559 21.5766 13.6667C23.0269 13.8817 24.3695 14.5575 25.4062 15.5942C26.4429 16.6309 27.1187 17.9735 27.3337 19.4238Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_117_242"><rect width="41" height="41" fill="white"></rect></clipPath></defs>
							</svg>
							<svg width="34" height="38" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M33 10.0083C30.0666 10.1388 24.04 8.51996 23.4 1H17.8V22.9332C17.8 29.1998 12.8651 31.8824 9.578 29.5014C5.40338 26.4778 8.20006 20.1916 13.4 20.9748V14.3166C9.40006 14.3166 1 15.8832 1 25.6748C1 38.2082 14.6292 37.8166 17.8 36.1648C22.9596 33.477 24.2 30.5654 24.2 24.1082C24.2 18.2332 24.2 14.7083 24.2 13.1416C25.5334 13.7944 29.16 15.1782 33 15.4916" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
$(document).ready(function(){
	$(".openmenu").click(function(){
		$(".menu").addClass("active-menu");
		$(".menu").css("opacity","1");
	});
	$(".active-menu").click(function(){
		$(".menu").removeClass("active-menu");
	});
	$("#btn").click(function(){
		$("#send").click();
	});
	$("#logo").click(function(){
		window.location.href="/"
	});
});	
</script>
</body>
</html>
