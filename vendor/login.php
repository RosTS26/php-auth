<?php

session_start();
require_once 'connect.php';

$username = $_POST['username'];
$password = md5($_POST['password']);

$check_user = mysqli_query($connect, "SELECT * FROM `user` WHERE `name` = '$username' AND `password` = '$password'");

if (mysqli_num_rows($check_user) > 0) {
	$user = mysqli_fetch_assoc($check_user);

	$_SESSION['user_info'] = [
		"id" => $user['id'],
		"name" => $user['name'],
		"money" => $user['money']
	];

	//$jsonData = json_encode($_SESSION['user_info']);

	header('Location: ../game.php');
} else {
	$_SESSION['msgError'] = 'Неверный логин или пароль!';
	header('Location: ../index.php');
}

?>