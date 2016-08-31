<?php
error_reporting(E_ALL);
parse_str($_SERVER['QUERY_STRING']);
$json_route=$_POST['route'];
$dir="../../../data/dss/IDOT/state_data/geo_json/trip_planner/trip_route4.geojson";
file_put_contents($dir,$json_route);
?> 
