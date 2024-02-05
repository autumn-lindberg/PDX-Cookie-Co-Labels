<?php

$env = parse_ini_file('../.env');

/* config vars */
//$url = parse_url(getenv("DATABASE_URL"));
//$url = parse_url($env["DATABASE_URL"]);

$serverName = $env["HOST"];
$userName = $env["USER"];
$pw = $env["PASS"];
$db = $env["DB"];


?>
