<?php

session_start();
require_once 'connect.php';

$username = $_POST['username'];
$password = md5($_POST['password']);
$password_confirm = md5($_POST['password_confirm']);
$check_username = mysqli_query($connect, "SELECT * FROM `user` WHERE `name` = '$username'");

if (mysqli_num_rows($check_username) > 0) {
	$_SESSION['msgError'] = 'Пользователь с таким именем уже существует!';
	header('Location: ../regist.php');
} else {
	if ($password === $password_confirm) {
		mysqli_query($connect, "INSERT INTO `user` (`id`, `name`, `password`, `money`) VALUES (NULL, '$username', '$password', 1000)");
		$_SESSION['message'] = 'Регистрация прошла успешно!';
		header('Location: ../index.php');
	} else {
		$_SESSION['msgError'] = 'Пароли не совпадают!';
		header('Location: ../regist.php');
	}
}

?>