<?php

include_once('../geoPHP/geoPHP.inc');

/*import geoPHP for spatial format conversion*/
function wkt_to_json($wkt) {
  $geom = geoPHP::load($wkt,'wkt');
  return $geom->out('json');
}
/*end of import geoPHP for spatial format conversion*/

/*This link is used for testing, it has a fixed coordinates for query string*/


/*start of script configuration*/
error_reporting(E_ALL);
ini_set('display_errors', 0);
set_time_limit(0);
ini_set('memory_limit', '1G');




function group_array($arr) {
    $hash = array();
    foreach ($arr as $row) {
        $key = $row[0];
        $val = $row[1];
        if (!isset($hash[$key])) {
            $hash[$key] = array();
        }
        if ($val != -1) {
            $hash[$key][] = $val;
        }
    }
    return $hash;
}

function search_for_node($id, $hash) {
    $children = array($id);
    $visited = array();
    while (!empty($children)) {
        $node = array_pop($children);
        if (!in_array($node, $visited)) {
            $visited[] = $node;
            $children = array_merge($children, $hash[$node]);
            $children = array_unique($children);
        }
    }
    return $visited;
}




$file = 'huc12_comid_convert_river_reverse.csv';
$hash_file = 'huc12_comid_convert_river_re2.json';
/*
$file = 'huc12_featureid.csv';
$hash_file = 'hash_huc12.json';
*/

$t01 = microtime(true);

    $data = file_get_contents($file) or die("Data file not found...");
    $data = explode("\n", $data);
    $data = array_filter($data, 'trim');
    $data = array_map('trim', $data);
    $data = array_map(function ($row) {
        $row = explode(",", $row);
        return array($row[1], $row[0]);
    }, $data);
    $data = group_array($data);
    file_put_contents($hash_file, json_encode($data));





//echo implode(", ", $visited) . "\n";



