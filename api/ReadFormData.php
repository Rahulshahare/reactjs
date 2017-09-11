<?php

if(count($_POST)>0){
    $email = $_POST['Email'];
    $name = $_POST['Name'];
    $dob = $_POST['DOB'];
    $mobile = $_POST['Mobile'];
    $data = "We have Receive Following data:";
    $data .= "Name is {$name}, <br/>
              Email is {$email}, <br/>
              DOB is {$dob},<br/>
              and Mobile Number is {$mobile}.";
              //echo $data;
    $value = [
    "Name" => "{$name}",
    "Email" => "{$email}",
    "dob"=> "{$dob}",
    "Mobile"=>"{$mobile}"
];
    
    //echo"New Array is";
    
   
    //echo " \"NewData\" :".json_encode($value).";";
  
    //print_r($value);
   echo json_encode((array)$value);

}else{
    echo"Error";
}
?>