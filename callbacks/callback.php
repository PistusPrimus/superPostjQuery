<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "prova";

$paramList = array();

array_push($paramList, $_POST);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


$sql = "INSERT INTO users(nickname,email,bio) VALUES('".$_POST['field1'][1]."','".$_POST['field1'][2]."','".$_POST['field1'][3]."')";
$result = $conn->query($sql);

$sql = "SELECT nickname,bio,email FROM users WHERE ID = ".mysqli_insert_id($conn).";";
$result = $conn->query($sql);

$myrow = mysqli_fetch_row($result);

array_push($paramList, $myrow);

echo json_encode($paramList);

$conn->close();
?>