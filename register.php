<?php
$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "rci_db";

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$password = $_POST['password'];


$hashed_password = password_hash($password, PASSWORD_BCRYPT);


$sql = "INSERT INTO users (username, password) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $hashed_password);

if ($stmt->execute()) {
    echo "Registration successful!";
} else {
    echo "Error: " . $stmt->error;
}


$stmt->close();
$conn->close();
?>
