<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
set_time_limit(0);
ini_set('memory_limit', '1G');

class Dao {
	private $connection = null;
	private static $instance = null;

	public static function getInstance() {
		if (null === static::$instance) {
			static::$instance = new static();
		}
		return static::$instance;
	}

	private function __construct() {
		$this->connection = pg_pconnect("host=127.0.0.1 port=5432 dbname=IWDSS user=haowen password=haowen1") or die('Connection failed');
	}
	public function getResult($sql, $params) {
		$result = pg_query_params($this->connection, $sql, $params);
		return pg_fetch_assoc($result);
	}
	public function getResults($sql, $params) {
		$result = pg_query_params($this->connection, $sql, $params);
		$result = pg_fetch_all($result);
		return $result ? $result : array();
	}
}

class Helper {
	public static function render($result) {
		
		$result_geom=isset($result['geometry'])?$result['geometry'] : array();
		$result_huc=isset($result['hucs'])?$result['hucs'] : '';
		$result_area=isset($result['ws_area'])?$result['ws_area'] : '';
		$result = array (
			"type" => "Feature",
		    "properties" => array("hucs" => $result_huc,"area" => $result_area,"streamCat"=>isset($result['streamcat'])?$result['streamcat'] : ""),
		    "geometry" => json_decode($result_geom),
		);
		echo json_encode($result);
	}
	/*
		$input = isset($_GET['input']) ? $_GET['input'] : "";
		$result['hucs'] = $this->hucs; //haowen added
		$result['streamcat'] = $this->streamcat; //haowen added
		$result['streamcat_para'] = $this->catPara; //haowen added*/
}

class Model {
	private static $instance = null;

	public static function getInstance() {
		if (null === static::$instance) {
			static::$instance = new static();
		}
		return static::$instance;
	}

	public function getEnclosingCatchmentHuc12($lat, $lng) {
		$sql = 'SELECT featureid as catchment, huc_12 as huc12 FROM nhd_structure.catchment_join WHERE ST_CONTAINS(geom,ST_SetSRID(ST_GeomFromText($1),4326))';
		$point = sprintf("POINT(%s %s)", $lng, $lat);
		$params = array($point);
		return Dao::getInstance()->getResult($sql, $params);
	}

	public function getRiverIdsInCatchment($catchment) {
		$sql = 'select comid as riverid from nhd_structure.river_master where featureid = $1';
		$params = array($catchment);
		return Dao::getInstance()->getResults($sql, $params);
	}

	public function getRiverIdsInHuc12($huc12) {
		$sql = 'select comid as riverid from nhd_structure.river_master where huc_12 = $1';
		$params = array($huc12);
		return Dao::getInstance()->getResults($sql, $params);
	}

	public function getRiverFlowNetwork($riverids) {
		$riverids = implode("','", $riverids);
		$riverids = "'" . $riverids . "'";
		$sql = "select * from nhd_structure.river_conn where downstream in ($riverids)";
		return Dao::getInstance()->getResults($sql, array());
	}

	public function getCatchmentsFromRiverids($riverids, $huc12) {
		$riverids = implode("','", $riverids);
		$riverids = "'" . $riverids . "'";
		$sql = "select featureid as catchment from nhd_structure.catchment_join where featureid in ($riverids) and huc_12 = $1";
		$params = array($huc12);
		return Dao::getInstance()->getResults($sql, $params);
	}

	public function getUpstreamHuc12sFromRiverids($riverids, $huc12) {
		$riverids = implode("','", $riverids);
		$riverids = "'" . $riverids . "'";
		$sql = "select huc_12 as huc12 from nhd_structure.catchment_join where huc_12 <> $1 and featureid in (select cast(upstream as numeric) from nhd_structure.river_conn where downstream in ($riverids))";
		$params = array($huc12);
		return Dao::getInstance()->getResults($sql, $params);
	}
	public function getStreamCatFrom($catPara, $comid_input) {
		$comid_input = implode("','", $comid_input);
		$comid_input = "'" . $comid_input . "'";
		$sql = "select $catPara from epa_streamcat.streamcat_iowa where comid in ($comid_input)";
		return Dao::getInstance()->getResults($sql, array());
	}
}

abstract class BaseRequest {
	protected $input = null;
	public function __construct($input) {
		$this->input = $input;
	}
	abstract public function getSql();
	public function getParams() {
		return array($this->input);
	}
	public function handle() {
		$sql = $this->getSql();
		$params = $this->getParams();
		return Dao::getInstance()->getResult($sql, $params);
	}
}

class Huc12Request extends BaseRequest {
	public function getSql() {
		return 'select ST_AsGeoJSON(geom,4) as geometry, hucs as hucs, ST_Area(ST_Transform(ST_SetSRID(geom,4326),32615)) as ws_area from nhd_structure.huc_12_upstream where poi=$1';
	}
}

class Huc10Request extends BaseRequest {
	public function getSql() {
		return 'select ST_AsGeoJSON(geom,4) as geometry, hucs as hucs, ST_Area(ST_Transform(ST_SetSRID(geom,4326),32615)) as ws_area from nhd_structure.huc_12_upstream t1 where poi in (select huc_12 from nhd_structure.river_master where huc_10 = $1 ) order by t1.area_gcs desc limit 1';
	}
}

class Huc8Request extends BaseRequest {
	public function getSql() {
		return 'select ST_AsGeoJSON(geom,4) as geometry, hucs as hucs, ST_Area(ST_Transform(ST_SetSRID(geom,4326),32615)) as ws_area from nhd_structure.huc_12_upstream t1 where poi in (select huc_12 from nhd_structure.river_master where huc_8 = $1 ) order by t1.area_gcs desc limit 1';
	}
}

class CountyRequest extends BaseRequest {
	public function getSql() {
		return 'select ST_AsGeoJSON(geom,4) as geometry, hucs as hucs, ST_Area(ST_Transform(ST_SetSRID(geom,4326),32615)) as ws_area from nhd_structure.county_upstream where poi=$1 and location_type=$2';
	}
	public function getParams() {
		return array($this->input, 'county');
	}
}

class CityRequest extends BaseRequest {
	public function getSql() {
		return 'select ST_AsGeoJSON(geom,4) as geometry, hucs as hucs, ST_Area(ST_Transform(ST_SetSRID(geom,4326),32615)) as ws_area from nhd_structure.county_upstream where poi=$1 and location_type=$2';
	}
	public function getParams() {
		return array($this->input, 'city');
	}
}

class CatRequest extends BaseRequest {
	protected $lat = null;
	protected $lng = null;
	public function __construct($input) {
		parent::__construct($input);
		$input = explode(",", $input);
		$this->lat = $input[0];
		$this->lng = $input[1];	
		$this->hucs = "streamcat_service"; //haowen added	
		$this->streamcat = null; //haowen added
		$this->catPara = null; //haowen added
	}
	
	public function getSql() {
		$comid_input = Model::getInstance()->getEnclosingCatchmentHuc12($this->lat, $this->lng);
		$catPara =$_GET['catPara']; isset($_GET['catPara']) ? $_GET['catPara'] : "wsareasqkm";
		$this->catPara=$catPara;		
		$this->streamcat =Model::getInstance()->getStreamCatFrom($this->catPara, $comid_input);
		$comid_input = implode("','", $comid_input);
		$comid_input = "'" . $comid_input . "'";
		//echo "select $catPara from epa_streamcat.streamcat_iowa where comid in ($comid_input)";
		return "select $catPara from epa_streamcat.streamcat_iowa where comid in ($comid_input)";
	}
	public function getParams() {
		return array();
	}
	public function handle() {
		$result = parent::handle();
		$result['hucs'] = $this->hucs; //haowen added
		$result['streamcat'] = $this->streamcat; //haowen added
		$result['streamcat_para'] = $this->catPara; //haowen added
		return $result;
	}
}

class PointRequest extends BaseRequest {
	protected $lat = null;
	protected $lng = null;

	
	public function __construct($input) {
		parent::__construct($input);
		$input = explode(",", $input);
		$this->lat = $input[0];
		$this->lng = $input[1];
		$this->hucs = null; //haowen added
		$this->streamcat = null; //haowen added
		$this->catPara = null; //haowen added
	}
	public function getSql() {
		$catchment = Model::getInstance()->getEnclosingCatchmentHuc12($this->lat, $this->lng);
		// print_r($catchment);
		$riverids_in_catchment = Model::getInstance()->getRiverIdsInCatchment($catchment['catchment']);
		$riverids_in_catchment = array_map(function($arr){return $arr['riverid'];}, $riverids_in_catchment);
		// print_r($riverids_in_catchment);
		$riverids_in_huc12 = Model::getInstance()->getRiverIdsInHuc12($catchment['huc12']);
		$riverids_in_huc12 = array_map(function($arr){return $arr['riverid'];}, $riverids_in_huc12);
		// print_r($riverids_in_huc12);
		$river_flow_network = Model::getInstance()->getRiverFlowNetwork($riverids_in_huc12);
		$river_flow_network = array_map(function($arr){return array($arr['downstream'], $arr['upstream']);}, $river_flow_network);
		// print_r($river_flow_network);
		$hash = $this->group_array($river_flow_network);
		$upstream_riverids = $this->search_for_node($riverids_in_catchment, $hash);
		$upstream_catchments = Model::getInstance()->getCatchmentsFromRiverids($upstream_riverids, $catchment['huc12']);
		$upstream_catchments = array_map(function($arr){return $arr['catchment'];}, $upstream_catchments);
		// print_r($upstream_catchments);
		$upstream_catchments = implode("','", $upstream_catchments);
		$upstream_catchments = "'" . $upstream_catchments . "'";
		$upstream_huc12 = Model::getInstance()->getUpstreamHuc12sFromRiverids($upstream_riverids, $catchment['huc12']);
		$upstream_huc12 = array_map(function($arr){return $arr['huc12'];}, $upstream_huc12);
		// print_r($upstream_huc12);
		$upstream_huc12 = implode("','", $upstream_huc12);
		$upstream_huc12 = "'" . $upstream_huc12 . "'";
		$this->hucs =implode(",",$riverids_in_huc12).",".implode(",",$riverids_in_catchment); //haowen added
		
		//$this->catPara =$_POST['catPara']; isset($_GET['catPara']) ? $_GET['catPara'] : "wsareasqkm";
		$this->catPara =$_GET['catPara']; isset($_GET['catPara']) ? $_GET['catPara'] : "wsareasqkm";
		$this->streamcat =Model::getInstance()->getStreamCatFrom($this->catPara, $catchment);
		
		return "select ST_AsGeoJSON(1,geom,4,0) as geometry, ST_Area(ST_Transform(ST_SetSRID(geom,4326),32615)) as ws_area from (SELECT ST_UNION(geom) as geom FROM (SELECT ST_SetSRID(geom,4326) as geom FROM nhd_structure.catchment_join where featureid in ($upstream_catchments) UNION select ST_SetSRID(geom,4326) as geom from nhd_structure.huc_12_upstream where poi in ($upstream_huc12)) as t) as t2";
	}
	public function getParams() {
		return array();
	}
	public function group_array($arr) {
	    $hash = array();
	    foreach ($arr as $row) {
	        $key = $row[0];
	        $val = $row[1];
	        if (!isset($hash[$key])) {
	            $hash[$key] = array();
	        }
	        if (!isset($hash[$val])) {
	            $hash[$val] = array();
	        }
	        if ($val != -1) {
	            $hash[$key][] = $val;
	        }
	    }
	    return $hash;
	}
	public function search_for_node($riverids, $hash) {
	    $children = $riverids;
	    $visited = array();
	    while (!empty($children)) {
	        $node = array_pop($children);
	        if (!in_array($node, $visited)) {
	            $visited[] = $node;
				//if(in_array($node, $hash)){					
					$children = array_merge($children, $hash[$node]);
					$children = array_unique($children);					
				//}
	            
	        }
	    }
	    return $visited;
	}
	public function handle() {
		$result = parent::handle();
		$result['hucs'] = $this->hucs; //haowen added
		$result['streamcat'] = $this->streamcat; //haowen added
		$result['streamcat_para'] = $this->catPara; //haowen added
		return $result;
	}
}


class RequestFactory {
	public static function build() {
		$input = isset($_GET['input']) ? $_GET['input'] : "";
		$type = isset($_GET['location_type']) ? $_GET['location_type'] : "";
		$input = str_replace('_',' ',$input);

		switch ($type) {
			case 'HUC12':
				return new Huc12Request($input);
				break;
			case 'HUC10':
				return new Huc10Request($input);
				break;
			case 'HUC8':
				return new Huc8Request($input);
				break;
			case 'city':
				return new CityRequest($input);
				break;
			case 'county':
				return new CountyRequest($input);
				break;
			case 'poi':
				return new PointRequest($input);
				break;
			case 'cat':
				return new CatRequest($input);
				break;
			default:
				die ('Invalid input.');
				break;
		}
	}
}

$request = RequestFactory::build();
$result = $request->handle();
Helper::render($result);
