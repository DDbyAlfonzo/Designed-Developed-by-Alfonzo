<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    // Define the recipient email address
    $to = "youremail@example.com";
    $subject = "New message from $name";

    // Create the email content
    $body = "Name: $name\nEmail: $email\nMessage: $message";

    // Send the email
    $headers = "From: $email";
    
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for contacting us!";
    } else {
        echo "Sorry, there was an error sending your message. Please try again.";
    }
}
?>
