<?php
	
	$connect = mysqli_connect('localhost', 'root', '', 'roulette');

	if (!$connect) {
		die("Error connect to DataBase!");
	}
?>