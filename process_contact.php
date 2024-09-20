<?php
header('Content-Type: text/plain; charset=utf-8');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rci_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user = isset($_POST['username']) ? $conn->real_escape_string($_POST['username']) : '';
    $message = isset($_POST['message']) ? $conn->real_escape_string($_POST['message']) : '';

    $stmt = $conn->prepare("INSERT INTO contact_messages (username, message) VALUES (?, ?)");
    if ($stmt === false) {
        die("Prepare failed: " . htmlspecialchars($conn->error));
    }
    $stmt->bind_param("ss", $user, $message);

    if ($stmt->execute()) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Error: " . htmlspecialchars($stmt->error);
    }

    $stmt->close();
} else {
    http_response_code(405); 
    echo "Method Not Allowed";
}

$conn->close();
?>
