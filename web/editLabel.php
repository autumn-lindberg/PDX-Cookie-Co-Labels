<?php
require 'db_config.php';
 session_start();
 if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
     header("Location: index.php");
     exit;
 }
 else {

   $removeString = $_POST["removeString"];
   $appendString = $_POST["appendString"];
   $labelName = $_POST["labelName"];
   $newTitle = $_POST["ingredient_title"];

   $CURRENTUSER = $_SESSION["session_username"];

   $userTableName = $CURRENTUSER . "_user_info";
   $labelsTableName = $CURRENTUSER . "_labels";
   $ingredientsTableName = $CURRENTUSER . "_ingredients";

   /*input validate new title*/


   /*NEITHER POPULATED NEITHER POPULATED*/
   /*NEITHER POPULATED NEITHER POPULATED*/
   /*NEITHER POPULATED NEITHER POPULATED*/

   if($removeString == "" && $appendString == "") {
     /*update title*/
     $updateDB = new mysqli($serverName, $userName, $pw, $db);
     if($updateDB->connect_errno) {
       echo "connection failed: " . $updateDB->connect_error . "<br>";
     }
     $updatePrep = $updateDB->prepare("UPDATE " . $labelsTableName . " SET label_name=? WHERE label_name=?");
     $updatePrep->bind_param("ss", $newTitle, $labelName);
     $updatePrep->execute();
     $updateDB->close();
     /* redirect */
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

   /* query clearDB to get last digit of ingredient id */
   $getOnesDigit = new mysqli($serverName, $userName, $pw, $db);
   if($getOnesDigit->connect_errno) {
     echo "connection failed: " . $getOnesDigit->connect_error . "<br>";
   }
   $grabOnesPrep = $getOnesDigit->prepare("SELECT label_id FROM " . $labelsTableName . " WHERE label_id < 10");
   $grabOnesPrep->execute();
   $res = $grabOnesPrep->get_result();
   $onesData = $res->fetch_all(MYSQLI_ASSOC);
   $getOnesDigit->close();

   foreach($onesData as $value) {
     $onesDigit = $value["label_id"];
   }

   /*ONLY ADD POPULATED ONLY ADD POPULATED*/
   /*ONLY ADD POPULATED ONLY ADD POPULATED*/
   /*ONLY ADD POPULATED ONLY ADD POPULATED*/


   if($removeString[0] == "" && $appendString[0] != "") {

     /*grab the id_list where ingredient_name is posted labelName*/
     $grabIdList = new mysqli($serverName, $userName, $pw, $db);
     if($grabIdList->connect_errno) {
       echo "connection failed: " . $grabIdList->connect_error . "<br>";
     }
     $grabIdPrep = $grabIdList->prepare("SELECT id_list FROM " . $labelsTableName . " WHERE label_name=?");
     $grabIdPrep->bind_param("s",$labelName);
     $grabIdPrep->execute();
     $res = $grabIdPrep->get_result();
     $data = $res->fetch_all(MYSQLI_ASSOC);
     $grabIdList->close();
     /*store result in the form of a string and format it*/
     /*foreach only runs once*/
     foreach($data as $value) {
       /*grab id list and turn into an array*/
       $addIdList = $value["id_list"];
       $idListArray = explode(",", $addIdList);

       /*add remaining elements to end of array*/
       foreach($appendString as $valueToAppend) {

         array_push($idListArray, $valueToAppend);
       }
     }
     $idListArray = array_unique($idListArray);
     $myIdList = join(",", $idListArray);

     /*update database*/
     $updateDB = new mysqli($serverName, $userName, $pw, $db);
     if($updateDB->connect_errno) {
       echo "connection failed: " . $updateDB->connect_error . "<br>";
     }
     $updatePrep = $updateDB->prepare("UPDATE " . $labelsTableName . " SET id_list=?,label_name=? WHERE label_name=?");
     $updatePrep->bind_param("sss", $myIdList, $newTitle, $labelName);
     $updatePrep->execute();
     $updateDB->close();

     /*redirect*/
     echo "<script> window.location.replace('./labels.php') </script>";

   }  /*end add only populated*/


   /*ONLY REMOVE POPULATED ONLY REMOVE POPULATED*/
   /*ONLY REMOVE POPULATED ONLY REMOVE POPULATED*/
   /*ONLY REMOVE POPULATED ONLY REMOVE POPULATED*/


   if($appendString[0] == "" && $removeString[0] != "") {

     /*grab the id_list where ingredient_name is posted labelName*/
     $grabIdList = new mysqli($serverName, $userName, $pw, $db);
     if($grabIdList->connect_errno) {
       echo "connection failed: " . $grabIdList->connect_error . "<br>";
     }
     $grabIdPrep = $grabIdList->prepare("SELECT id_list FROM " . $labelsTableName . " WHERE label_name=?");
     $grabIdPrep->bind_param("s",$labelName);
     $grabIdPrep->execute();
     $res = $grabIdPrep->get_result();
     $data = $res->fetch_all(MYSQLI_ASSOC);
     $grabIdList->close();
     /*store result in the form of a string and format it*/
     /*foreach only runs once*/
     foreach($data as $value) {

       /*get current id list*/
       $removeIdList = $value["id_list"];
       /*turn it into an array*/
       $idListArray = explode(",", $removeIdList);

       /*array diff it*/
       $idListArray = array_diff($idListArray, $removeString);
     }

     $idListArray = array_unique($idListArray);
     $myIdList = join(",", $idListArray);

     /*update database*/
     $updateDB = new mysqli($serverName, $userName, $pw, $db);
     if($updateDB->connect_errno) {
       echo "connection failed: " . $updateDB->connect_error . "<br>";
     }
     $updatePrep = $updateDB->prepare("UPDATE " . $labelsTableName . " SET id_list=?,label_name=? WHERE label_name=?");
     $updatePrep->bind_param("sss", $myIdList, $newTitle, $labelName);
     $updatePrep->execute();
     $updateDB->close();

     /*redirect*/
     echo "<script> window.location.replace('./labels.php') </script>";
   }


   /*BOTH POPULATED BOTH POPULATED BOTH POPULATED*/
   /*BOTH POPULATED BOTH POPULATED BOTH POPULATED*/
   /*BOTH POPULATED BOTH POPULATED BOTH POPULATED*/


   if($removeString[0] != "" && $appendString[0] != "") {

     /*remove duplicate values seen in both lists */
     $appendStringCopy = $appendString;
     $removeStringCopy = $removeString;
     $appendString = array_diff($appendString, $removeStringCopy);
     $removeString = array_diff($removeString, $appendStringCopy);

     /*grab the id_list where ingredient_name is posted labelName*/
     $grabIdList = new mysqli($serverName, $userName, $pw, $db);
     if($grabIdList->connect_errno) {
       echo "connection failed: " . $grabIdList->connect_error . "<br>";
     }
     $grabIdPrep = $grabIdList->prepare("SELECT id_list FROM " . $labelsTableName . " WHERE label_name=?");
     $grabIdPrep->bind_param("s",$labelName);
     $grabIdPrep->execute();
     $res = $grabIdPrep->get_result();
     $data = $res->fetch_all(MYSQLI_ASSOC);
     $grabIdList->close();

     /*store result in the form of a string and format it*/
     /*foreach only runs once*/
     foreach($data as $value) {


     /* ADD STRING ADD STRING ADD STRING */
     /* ADD STRING ADD STRING ADD STRING */
     /* ADD STRING ADD STRING ADD STRING */


     if(!(empty($appendString))) { //if add string isn't empty, do add

       $currentIdList = $value["id_list"];
       $currentIdListArray = explode(",", $currentIdList);
       var_dump($currentIdListArray);

       foreach($appendString as $appendValue) {
         array_push($currentIdListArray, $appendValue);
       }

    }


     /* REMOVE STRING REMOVE STRING REMOVE STRING */
     /* REMOVE STRING REMOVE STRING REMOVE STRING */
     /* REMOVE STRING REMOVE STRING REMOVE STRING */


     /*if remove list isn't empty, do remove*/
     if(!(empty($appendString))) {


       /*array diff it*/
       $idListArray = array_diff($currentIdListArray, $removeString);
       $idListArray = array_unique($idListArray);
     }

   }  /* end forEach (only cycles once) */

   $currentIdList = join(",", $idListArray);

   /*update database*/
   $updateDB = new mysqli($serverName, $userName, $pw, $db);
   if($updateDB->connect_errno) {
     echo "connection failed: " . $updateDB->connect_error . "<br>";
   }
   $updatePrep = $updateDB->prepare("UPDATE " . $labelsTableName . " SET id_list=?,label_name=? WHERE label_name=?");
   $updatePrep->bind_param("sss", $currentIdList, $newTitle, $labelName);
   $updatePrep->execute();
   $updateDB->close();

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
