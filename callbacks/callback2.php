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

$sql = "INSERT INTO messages(testo) VALUES('".$_POST['field1'][2]."')";
$result = $conn->query($sql);

//mysqli_insert_id returns last id incremented by the row enter

$sql = "SELECT * FROM messages WHERE ID = ".mysqli_insert_id($conn).";";
$result = $conn->query($sql);

$myrow = mysqli_fetch_row($result);

array_push($paramList, $myrow);

echo json_encode($paramList);


$conn->close();
?>