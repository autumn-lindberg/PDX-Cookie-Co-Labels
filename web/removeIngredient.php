<?php
require 'db_config.php';
 session_start();
 if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
     header("Location: index.php");
     exit;
 }
 else {

   $ingredientID = $_POST["ingredientID"];

   $CURRENTUSER = $_SESSION["session_username"];

   $userTableName = $CURRENTUSER . "_user_info";
   $labelsTableName = $CURRENTUSER . "_labels";
   $ingredientsTableName = $CURRENTUSER . "_ingredients";

   $updateDB = new mysqli($serverName, $userName, $pw, $db);
   if($updateDB->connect_errno) {
     echo "connection failed: " . $updateDB->connect_error . "<br>";
   }
   $updatePrep = $updateDB->prepare("DELETE FROM " . $ingredientsTableName . " WHERE ingredient_id=?");
   $updatePrep->bind_param("i", $ingredientID);
   $updatePrep->execute();
   $updateDB->close();

   echo "<script> window.location.replace('./ingredients.php') </script>";


}  /*END ELSE LOGGED IN*/

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
