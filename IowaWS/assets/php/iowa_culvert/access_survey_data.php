<?php
error_reporting(E_ALL);

$db="cfs_v1";
parse_str($_SERVER['QUERY_STRING']);
$query = str_replace("-"," ",$query);
$result_array=array();

$dbconn = pg_pconnect("host=127.0.0.1 port=5432 dbname=".$db." user=haowen password=haowen1") or die('Connection failed'); 
$res_intersect = pg_query($dbconn, $query);
while ($row = pg_fetch_row($res_intersect)) {
	    foreach ($row as $value) { 
			array_push($result_array,$value);
	}
}
echo implode(",", $result_array);

?>