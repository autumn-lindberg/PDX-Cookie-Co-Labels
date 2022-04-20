<?php
session_start();
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("Location: index.php");
    exit;
}
else {

  $ingredientTitle = $_POST["new_ingredient_title"];
  $ingredientDesc = $_POST["new_ingredient_description"];

  /*config settings*/
  $serverName = $_ENV["CLEARDB_SERVERNAME"];
  $userName = $_ENV["CLEARDB_UN"];
  $pw = $_ENV["CLEARDB_PW"];
  $db = $_ENV["CLEARDB_DB"];

  $CURRENTUSER = $_SESSION["session_username"];

  $userTableName = $CURRENTUSER . "_user_info";
  $labelsTableName = $CURRENTUSER . "_labels";
  $ingredientsTableName = $CURRENTUSER . "_ingredients";


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

  $connection = new mysqli($serverName, $userName, $pw, $db);

  $updateIngredientsTable = $connection->prepare("INSERT INTO " . $ingredientsTableName  . " (ingredient_id, ingredient_name, ingredient_contents, milk, egg, fish, shellfish, tree_nuts, wheat, peanuts, soy, tree_nut_name) VALUES (DEFAULT,?,?,?,?,?,?,?,?,?,?,?)");
  $updateIngredientsTable->bind_param("sssssssssss", $ingredientTitle, $ingredientDesc, $milk, $egg, $fish, $shellfish, $tree_nuts, $wheat, $peanuts, $soy, $treeNutName);
  $updateIngredientsTable->execute();
  $connection->close();

  //header("Location: ingredients.php");
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
