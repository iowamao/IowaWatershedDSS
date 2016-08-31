<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
set_time_limit(0);
ini_set('memory_limit', '1G');

//$dbconn = pg_pconnect("host=127.0.0.1 port=5432 dbname=IWDSS user=haowen password=haowen1") or die('Connection failed'); 
session_start(); 
$_SESSION['dbconn'] = pg_pconnect("host=127.0.0.1 port=5432 dbname=IWDSS user=haowen password=haowen1") or die('Connection failed'); 



?>