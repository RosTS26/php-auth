<?php
	session_start();
	if (!$_SESSION['user_info']) header('Location: index.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="assets/css/style.css">
	<title>Авторизация и регистрация</title>
</head>
<body>
	<div class="registration">
		<form>
			<?php
				echo '<div class="msg"><p>' . $_SESSION['user_info']['name'] . '</p></div>';
			?>
			<a href="vendor/logout.php">Выйти из профиля</a>
		</form>
	</div>
</body>
</html>