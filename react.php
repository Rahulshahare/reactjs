<?php 

function AddNumber($a,$b){
    return($a+$b);
}
echo AddNumber(15,15);

$a = array('one', 'two','three','four','five','six');
array_push($a, 'seven','eight','nine','ten');

foreach ( $a as $key=>$value ) {
    echo "<br/>its ".($key+1)." ".$value;
}


$number = array(1,2,3,4,5,6,7,8,9);

function square($n){
    return($n*$n);
}

function cube($n){
    return($n*$n*$n);
}

echo"<br/>This is number array</br>";
print_r($number);


echo"<br/>Number array after squaring</br>";
$b = array_map("square", $number);
print_r($b);

echo"<br/>Number array after making its Cube<br/>";
$c = array_map("cube", $number);
print_r($c);

echo "<br/>sum of #number array =".array_sum($number);

?>