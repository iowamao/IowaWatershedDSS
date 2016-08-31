<?php

error_reporting(E_ALL);
/*

if (is_dir($dir)) {
   rmdir($dir);
   echo "delete";
}
*/
$dir="var";

 function deleteContent($path){
      try{
        $iterator = new DirectoryIterator($path);
        foreach ( $iterator as $fileinfo ) {
          if($fileinfo->isDot())continue;
          if($fileinfo->isDir()){
            if(deleteContent($fileinfo->getPathname()))
              @rmdir($fileinfo->getPathname());
          }
          if($fileinfo->isFile()){
            @unlink($fileinfo->getPathname());
          }
        }
      } catch ( Exception $e ){
         // write log
		 echo "false";
         return false;
      }
	  echo "true";
      return true;
    }
	//deleteContent($dir);

?>