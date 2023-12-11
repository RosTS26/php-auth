<?php 

session_start();
require_once '../vendor/connect.php';

$id = $_SESSION['user_info']['id'];
$money = $_POST['money'];
$_SESSION['user_info']['money'] = $money;
mysqli_query($connect, "UPDATE `user` SET `money` = '$money' WHERE `id` = '$id'");

?>