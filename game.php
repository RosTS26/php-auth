<?php
	session_start();
	if (!$_SESSION['user_info']) header('Location: index.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Рулетка</title>
	<link rel="stylesheet" type="text/css" href="assets/css/game.css">
	<link rel="stylesheet" type="text/css" href="assets/css/style.css">
	<!--Подключаем библиотеку-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
</head>
<body>
	<script src="script/script.js" defer></script>
	<div class="indexBox">
		<canvas id="game" width="700px" height="630px"></canvas>
		<input type="button" value="Spin" id="btnSpin">
	</div>
	<form>
		<?php
			echo '<div class="msg"><p>'.$_SESSION['user_info']['name'].'</p></div>';
			echo '<div class="msg"><p><div id="money">'.$_SESSION['user_info']['money'].'</div></p></div>';
		?>
		<a href="vendor/logout.php">Выйти из профиля</a>
	</form>
</body>
</html>