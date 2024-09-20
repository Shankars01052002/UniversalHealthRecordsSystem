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

$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        echo "Login successful!";
        header("Location: dashboard.html");
        exit();
    } else {
        echo "Invalid username or password";
    }
} else {
    echo "Invalid username or password";
}

$stmt->close();
$conn->close();
?>
