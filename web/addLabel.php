<?php

 session_start();
 if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
     header("Location: index.php");
     exit;
 }
 else {

   $removeString = $_POST["removeString"];
   $appendString = $_POST["appendString"];
   $newTitle = $_POST["new_ingredient_title"];

   /* config vars */
   $serverName = getenv("CLEARDB_SERVERNAME");
   $userName = getenv("CLEARDB_UN");
   $pw = getenv("CLEARDB_PW");
   $db = getenv("CLEARDB_DB");

   $CURRENTUSER = $_SESSION["session_username"];

   $userTableName = $CURRENTUSER . "_user_info";
   $labelsTableName = $CURRENTUSER . "_labels";
   $ingredientsTableName = $CURRENTUSER . "_ingredients";


   /*NEITHER POPULATED NEITHER POPULATED*/
   /*NEITHER POPULATED NEITHER POPULATED*/
   /*NEITHER POPULATED NEITHER POPULATED*/

   if($removeString == "" && $appendString == "") {
     echo "<script> window.location.replace('./labels.php') </script>";
   }

   /*remove initial comma if it has one but only if not empty*/
   if($removeString != "" && strpos(",", $removeString) == 0) {
     $removeString = substr($removeString, 1);
   }
   if($appendString != "" && strpos(",", $appendString) == 0) {
     $appendString = substr($appendString, 1);
   }

   /* turn into an array */
   $removeString = explode(",", $removeString);
   $appendString = explode(",", $appendString);

   /*ONLY ADD POPULATED ONLY ADD POPULATED*/
   /*ONLY ADD POPULATED ONLY ADD POPULATED*/
   /*ONLY ADD POPULATED ONLY ADD POPULATED*/


   if($removeString[0] == "" && $appendString[0] != "") {

     $appendString = array_unique($appendString);

     $appendString = join(",", $appendString);

     /*add to database*/
     $addToDB = new mysqli($serverName, $userName, $pw, $db);
     if($addToDB->connect_errno) {
       echo "connection failed: " . $addToDB->connect_error . "<br>";
     }
     $updateStmt = "INSERT INTO " . $labelsTableName . " (label_id, label_name, id_list) VALUES (DEFAULT,\"" . $newTitle . "\",\"" . $appendString . "\")";
     $addToDB->query($updateStmt);
     $addToDB->close();

     /*redirect*/
     echo "<script> window.location.replace('./labels.php') </script>";

   }  /*end add only populated*/


   /*BOTH POPULATED BOTH POPULATED BOTH POPULATED*/
   /*BOTH POPULATED BOTH POPULATED BOTH POPULATED*/
   /*BOTH POPULATED BOTH POPULATED BOTH POPULATED*/


   if($removeString[0] != "" && $appendString[0] != "") {

     /*remove duplicate values seen in both lists */
     $appendStringCopy = $appendString;
     $removeStringCopy = $removeString;
     $appendString = array_diff($appendString, $removeStringCopy);
     $removeString = array_diff($removeString, $appendStringCopy);

     /* ADD STRING ADD STRING ADD STRING */
     /* ADD STRING ADD STRING ADD STRING */
     /* ADD STRING ADD STRING ADD STRING */

     /* AFTER REMOVING DUPLICATES, ONLY CORRECT VALUES ARE LEFT */

     if(!(empty($appendString))) { //if add string isn't empty, do add

       $appendString = array_unique($appendString);
       $appendString = join(",", $appendString);

       /*add to database*/
       $addToDB = new mysqli($serverName, $userName, $pw, $db);
       if($addToDB->connect_errno) {
         echo "connection failed: " . $addToDB->connect_error . "<br>";
       }
       $updateStmt = "INSERT INTO " . $labelsTableName . " (label_id, label_name, id_list) VALUES (DEFAULT,\"" . $newTitle . "\",\"" . $appendString . "\")";
       $addToDB->query($updateStmt);
       $addToDB->close();

     }

    /*redirect back to labels page*/
    echo "<script> window.location.replace('./labels.php') </script>";

    }  /*end both lists are populated */
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
