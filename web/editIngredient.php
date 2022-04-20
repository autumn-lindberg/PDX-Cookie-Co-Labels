<?php
session_start();
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("Location: index.php");
    exit;
}
else {
  $ingredientID = $_POST["ingredient_id"];
  $ingredientTitle = $_POST["ingredient_title"];
  $ingredientDesc = $_POST["ingredient_description"];

  /*config settings*/
  $url = parse_url(getenv("CLEARDB_DATABASE_URL"));

  $serverName = $url["host"];
  $userName = $url["user"];
  $pw = $url["pass"];
  $db = substr($url["path"], 1);

  $CURRENTUSER = $_SESSION["session_username"];

  $userTableName = $CURRENTUSER . "_user_info";
  $labelsTableName = $CURRENTUSER . "_labels";
  $ingredientsTableName = $CURRENTUSER . "_ingredients";

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

  if(isset($_POST["milkInput"])){
    $milk = "true";
  }
  else {
    $milk = "false";
  }
  if(isset($_POST["eggInput"])) {
    $egg = "true";
  }
  else {
    $egg = "false";
  }
  if(isset($_POST["fishInput"])) {
    $fish = "true";
  }
  else {
    $fish = "false";
  }
  if(isset($_POST["shellfishInput"])) {
    $shellfish = "true";
  }
  else {
    $shellfish = "false";
  }
  if(isset($_POST["tree_nutsInput"])) {
    $tree_nuts = "true";
  }
  else {
    $tree_nuts = "false";
  }
  if(isset($_POST["wheatInput"])) {
    $wheat = "true";
  }
  else {
    $wheat = "false";
  }
  if(isset($_POST["peanutsInput"])) {
    $peanuts = "true";
  }
  else {
    $peanuts = "false";
  }
  if(isset($_POST["soyInput"])) {
    $soy = "true";
  }
  else {
    $soy = "false";
  }
  if($tree_nuts == "true") {
      $treeNutName = $_POST["treeNutName"];
  } else {
    $treeNutName = "";
  }

  $ingredientID = $ingredientID - 1;
  $ingredient_id_string = $ingredientID . $onesDigit;
  $ingredient_id_int = (int)$ingredient_id_string;

  $connection = new mysqli($serverName, $userName, $pw, $db);
  $updateIngredientsTable = $connection->prepare("UPDATE " . $ingredientsTableName  . " SET ingredient_name=?, ingredient_contents=?, milk=?, egg=?, fish=?, shellfish=?, tree_nuts=?, wheat=?, peanuts=?, soy=?, tree_nut_name=? WHERE ingredient_id=?");
  $updateIngredientsTable->bind_param("sssssssssssi", $ingredientTitle, $ingredientDesc, $milk, $egg, $fish, $shellfish, $tree_nuts, $wheat, $peanuts, $soy, $treeNutName, $ingredient_id_int);
  $updateIngredientsTable->execute();
  $connection->close();

  header("Location: ingredients.php");
}
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
