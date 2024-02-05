<?php


/* config vars */

$serverName = getenv("HOST");
$userName = getenv("USER");
$pw = getenv("PASS");
$db = getenv("DB");

var_dump($serverName)
var_dump($userName)
var_dump($pw)
var_dump($db)

/*
$env = parse_ini_file('../.env');
$serverName = $env["HOST"];
$userName = $env["USER"];
$pw = $env["PASS"];
$db = $env["DB"];
*/

?>
