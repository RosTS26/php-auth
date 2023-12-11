<?php
	session_start();
	if ($_SESSION['user_info']) header('Location: game.php');
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
		<form action="vendor/login.php" method="post">
			<fieldset class="account-info">
				<label>Имя пользователя</label>
				<input type="text" name="username" placeholder="Введите имя">
				<label>Пароль</label>
				<input type="password" name="password" placeholder="Введите пароль">
			</fieldset>
			<fieldset class="account-action">
				<input class="btn" type="submit" name="submit" value="Войти">
				<p>
					У вас нет аккаунта? <a href="regist.php">зарегистрируйтесь</a>!
				</p>
			</fieldset>
		</form>
	</div>
	<?php
		if ($_SESSION['msgError']) {
			echo '<div class="msgError"><p>' . $_SESSION['msgError'] .'</p></div>';
	 		unset($_SESSION['msgError']);
		} else if ($_SESSION['message']) {
			echo '<div class="msg"><p>' . $_SESSION['message'] .'</p></div>';
	 		unset($_SESSION['message']);
		}
	?>	
</body>
</html>