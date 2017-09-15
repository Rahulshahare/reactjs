<?php//Readstate.php
include_once"../db/dbConfig.php";
include_once"../include/commonFunctions.php";
include_once"../include/constant.php";
?>
<?php
                  include_once"../files/class/class.location.state.php";
                  $NewArray = array();
                  $a = array();
                  $state = new location($dbh);
                  $row = $state->getAllLocationByweight('3');
                  //print_r($row);
                  /*foreach($row as $key){   
                      $a['id'] = $key->lid;
                      $a['name'] = $key->location_name;
                      
                                            array_push($NewArray, $a);
                     // echo $key->location_name;
                  }

                  /*foreach($NewArray as $key){

                      echo $key['id']." ";
                      echo $key['name']."<br/>";
                  }*/
                  $json_data = json_encode((array)$row);
                  $l_name = json_encode((array)$row->location_name);
                  

//return($NewArray);
//echo"L=";
print_r($json_data);
//echo"<h1>its new</h1>";
//print_r($l_name);
//echo "<script>";
//echo "var location =".json_encode((array)$row).";";
//echo "</script>";
?>