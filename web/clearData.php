<?php
  session_start();
  // Unset all of the session variables
  $_SESSION = array();
  // Destroy the session.
  session_destroy();
  // Redirect to login page
  header("Location: ./index.php");
  exit;

 ?>
 <!DOCTYPE html>
 <html>
   <head>
     <!--meta tags-->
     <meta charset="utf-8">
     <meta robots="noindex/nofollow">
     <link rel="icon" type="image/jpg" href="IMG/cookies.png">
   </head>
   <body>
   </body>
 </html>
