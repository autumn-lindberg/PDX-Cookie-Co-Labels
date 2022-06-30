<?php
/* config vars */
$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

$serverName = $url["host"];
$userName = $url["user"];
$pw = $url["pass"];
$db = substr($url["path"], 1);


?>
