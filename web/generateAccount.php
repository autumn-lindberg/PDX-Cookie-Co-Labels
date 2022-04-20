<?php

  /*FIRST TIME ACCOUNT CREATION*/
  /*preg match recognizes regex pattern*/
  /*it stores the matches in an array $postUNcopy */
  $postUN = $_POST["email"];
  preg_match("/^\w+/", $postUN, $postUNcopy);
  $CURRENTUSER = $postUNcopy[0];
  $postPW = $_POST["psw"];
  $hashed_pw = password_hash($postPW, PASSWORD_DEFAULT);

  /*server config */
  $env_array = getenv();
  foreach ($env_array as $key=>$value) {
    if($key == "CLEARDB_SERVERNAME") {
      $serverName = $value;
    }
    if($key == "CLEARDB_UN") {
      $userName = $value;
    }
    if($key == "CLEARDB_PW") {
      $pw = $value;
    }
    if($key == "CLEARDB_DB") {
      $db = $value;
    }
      echo gettype($key) . " => $key => $value <br />";
  }
  echo $serverName . "<br>";
  echo $userName . "<br>";
  echo $pw . "<br>";
  echo $db . "<br>";

  $userTableName = $CURRENTUSER . "_user_info";
  $labelsTableName = $CURRENTUSER . "_labels";
  $ingredientsTableName = $CURRENTUSER . "_ingredients";

  /*FIRST TIME ACCOUNT CREATION*/

  /*search userListTable username column with regex*/
  $userListTable = "label_users";
  $currentUserRegex = "^" . $CURRENTUSER;
  $createUserName = new mysqli($serverName, $userName, $pw, $db);
  if($createUserName->connect_errno) {
    echo "connection failed: " . $createUserName->connect_error . "<br>";
  }
  $checkUserName = $createUserName->prepare("SELECT username FROM label_users WHERE username REGEXP ?");
  $checkUserName->bind_param("s", $currentUserRegex);
  $checkUserName->execute();
  $res = $checkUserName->get_result();
  $data = $res->fetch_all(MYSQLI_ASSOC);

  /*check data*/
  $num = 1;
  while(!(empty($data))) {  /*while there are results*/
    /*append username*/
    if(is_numeric(substr($CURRENTUSER, -1))) {
      $endNum = (int)substr($CURRENTUSER, -1);
      $endNum = $endNum + 1;
      substr_replace($CURRENTUSER ,"", -1);
    }
    $CURRENTUSER = $CURRENTUSER . $num;

    /*adjust for regex*/
    $currentUserRegex = "^" . $CURRENTUSER;

    /*run query again*/
    $checkUserName->bind_param("s", $currentUserRegex);
    $checkUserName->execute();
    $res = $checkUserName->get_result();
    $data = $res->fetch_all(MYSQLI_ASSOC);

  }
  $createUserName->close();

  /*create tables in user's database*/
  $firstTimeTableCreation = new mysqli($serverName, $userName, $pw, $db);
  if($firstTimeTableCreation->connect_errno) {
    echo "connection failed: " . $firstTimeTableCreation->connect_error . "<br>";
  }

  $createLabelsTable = "CREATE TABLE " . $labelsTableName . " (label_id INT PRIMARY KEY AUTO_INCREMENT, label_name VARCHAR(50), id_list VARCHAR(50000));";
  $createIngredientsTable = "CREATE TABLE " . $ingredientsTableName . " (ingredient_id INT PRIMARY KEY AUTO_INCREMENT, ingredient_name VARCHAR(50), ingredient_contents VARCHAR(50000), milk VARCHAR(10), egg VARCHAR(10), fish VARCHAR(10), shellfish VARCHAR(10), tree_nuts VARCHAR(10), wheat VARCHAR(10), peanuts VARCHAR(10), soy VARCHAR(10), tree_nut_name VARCHAR(50));";
  $firstTimeTableCreation->query($createUserInfoTable);
  $firstTimeTableCreation->query($createLabelsTable);
  $firstTimeTableCreation->query($createIngredientsTable);

  $firstTimeTableCreation->close();

  /*INSERT DEFAULT VALUES*/
  /*ingredients*/

  $populateDefaults = new mysqli($serverName, $userName, $pw, $db);
  if($populateDefaults->connect_errno) {
    echo "connection failed: " . $populateDefaults->connect_error . "<br>";
  }
  $populateLabelsQuery = "INSERT INTO " . $ingredientsTableName . " (ingredient_id, ingredient_name, ingredient_contents, milk, egg, fish, shellfish, tree_nuts, wheat, peanuts, soy, tree_nut_name) VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  $populateLabelsWithDefaults = $populateDefaults->prepare($populateLabelsQuery);
  $populateLabelsWithDefaults->bind_param("sssssssssss", $ingredientName, $ingredients, $milk, $egg, $fish, $shellfish, $tree_nuts, $wheat, $peanuts, $soy, $tree_nut_name);

  $ingredientName = "Oreo Cookie Base";
  $ingredients = "flour,sugar,butter,oreo pudding mix(sugar,cookies(unbleached enriched flour(wheat flour,niacin,reduced iron,thiamine mononitrate(vitamin b1),riboflavin(vitamin b2),folic acid),sugar,canola and/or palm oil,cocoa(processed with alkali),invert sugar,chocolate,leavening(baking soda and/or calcium phosphate),salt,soy lecithin,natural flavor),modified cornstarch,contains less than 2% of natual and artificial flavor,salt,disodium phosphate,tetrasodium pyrophosphate,mono- and diglycerides,artificial color),eggs,artificially flaovred vanilla(water,sugar,caramel color,artificial flavor,citric acid,sodium benzoate(preservative)),baking powder(cornstarch,bicarbonate of soda,sodium aluminium sulfate,monocalcium phosphate)";
  $milk = "true";
  $egg = "true";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "false";
  $peanuts = "false";
  $soy = "false";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Vanilla Base";
  $ingredients = "flour,sugar,butter,vanilla pudding mix(sugar,modified cornstarch,contains less than 2% of sodium phosphate,tetrasodium pyrophosphate,salt,mono- and diglycerides,artificial color,natural and artificial flavor,yellow 5,yellow 6),eggs,artificially flavored vanilla(water,sugar,caramel color,artificial flavor,citric acid,sodium benzoate(preservative)),baking powder(cornstarch,bicarbonate of soda,sodium aluminium sulfate,monocalcium phosphate)";
  $milk = "true";
  $egg = "true";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "false";
  $peanuts = "false";
  $soy = "false";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Chocolate Base";
  $ingredients = "sugar,flour,butter,chololate pudding mix(sugar,modified cornstarch,cocoa processed with alkali,sodium phosphate,contains less than 2% of tetrasodium pyrophosphate,natural and artificial flavor,salt,artificial color,mono- and diglycerides,red 40,yellow 5,blue 1),eggs,artificially flavored vanilla(water,sugar,caramel color,artificial flavor,citric acid,sodium benzoate(preservative)),coffee,baking powder(cornstarch,bicarbonate of soda,sodium aluminium sulfate,monocalcium phosphate)";
  $milk = "true";
  $egg = "true";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "false";
  $peanuts = "false";
  $soy = "false";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Snickers";
  $ingredients = "milk chocolate(sugar,cocoa butter,chocolate,skim milk,lactose,milkfat,soy lecithin),peanuts,corn syrup,sugar,palm oil,skim milk,lactose,salt,egg whites,artificial flavor";
  $milk = "true";
  $egg = "true";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "false";
  $peanuts = "true";
  $soy = "true";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Twix";
  $ingredients = "milk chocolate(sugar,cocoa butter,chocolate,skim milk,lactose,milkfat,soy lecithin,pgpr,artificial flavors),enriched wheat flour(wheat flour,niacin,reduced iron,thiamine mononitrate,riboflavin,folic acid),sugar,palm oil,corn syrup, skim milk,dextrose,less than 2% - salt,cocoa powder,soy lecithin,modified corn starch,baking soda,artificial flavor";
  $milk = "true";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "true";
  $peanuts = "true";
  $soy = "true";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Oreo";
  $ingredients = "unbleached enriched flour(wheat flour,niacin,reduced iron,thiamine mononitrate(vitamin b1),riboflavin(vitamin b2),folic acid),sugar,palm and/or canola oil,cocoa(processed with alkali),high fructose corn syrup,leavening(baking soda and/or calcium phosphate),salt,soy lecithin,chocolate,artificial flavor";
  $milk = "false";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "true";
  $wheat = "true";
  $peanuts = "false";
  $soy = "true";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Reese's Pieces";
  $ingredients = "sugar,partially defatted peanuts,partially hydrogenated vegetable oil(palm kernel and soybean oil),corn syrup,dextrose,contains 2% or less of: artificial color(yellow 5 lake,red 40 lake,yellow 6 lake,blue 1 lake),salt,resinous glaze,soy lecithin,modified cornstarch,carnauba wax,vanillin,artificial flavor,milk";
  $milk = "true";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "true";
  $wheat = "false";
  $peanuts = "true";
  $soy = "true";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Semi-Sweet Chips";
  $ingredients = "cane sugar,unsweetened chocolate,cocoa butter,whole milk powder,soy lecithin,vanilla extract";
  $milk = "false";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "false";
  $peanuts = "false";
  $soy = "false";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Reese's Peanut Butter Cups";
  $ingredients = "milk chocolate(sugar,cocoa butter,chocolate,non-fat milk,milk fat,lactose,lecithin(soy),pgpr,emulsifier),peanuts,sugar,dextrose,partially defatted peanuts,hydrogenated vegetable oil(palm kernel oil,soybean oil),contains 2% of less of: corn syrup,salt,palm kernel oil,artificial color(yellow 5 lake,yellow 6 lake,red 40 lake,blue 1 lake),confectioner's glaze,lecithin(soy),modified corn starch,tbhq and citric acid,carnauba wax,vanillin,artificial flavor";
  $milk = "true";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "false";
  $peanuts = "true";
  $soy = "true";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Peanut Butter Chips";
  $ingredients = "partially defatted peanuts,sugar,hydrogenated vegetable oil(palm kernel oil,soybean oil),corn syrup solids,dextrose,reduced protein whey(milk),contains 2% or less of: salt,palm kernel oil,vanillin,artificial flavor,lecithin(soy)";
  $milk = "true";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "false";
  $peanuts = "true";
  $soy = "true";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "White Chocolate Chips";
  $ingredients = "sugar,palm kernel oil,whole milk powder,nonfat dry milk,palm oil,soy lecithin,vanilla extract";
  $milk = "false";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "false";
  $peanuts = "false";
  $soy = "false";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Milk Chocolate Chips";
  $ingredients = "cane sugar,unsweetened chocolate,whole milk powder,cocoa butter,soy lecithin,vanilla extract";
  $milk = "false";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "false";
  $peanuts = "false";
  $soy = "false";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Dark Chocolate Oreo";
  $ingredients = "sugar,unbleached enriched flour(wheat flour,niacin,reduced iron,thiamine mononitrate(vitamin b1),riboflavin(vitamin b2),folic acid),palm and/or canola oil,cocoa(processed with alkali),high fructose corn syrup,leavening(baking soda and/or calcium phosphate),salt,soy lecithin,chocolate,artificial flavor";
  $milk = "false";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "true";
  $peanuts = "false";
  $soy = "true";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Nutella";
  $ingredients = "sugar,palm oil,hazelnuts,cocoa,skimmed milk powder,lecithin,vanillin";
  $milk = "false";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "true";
  $wheat = "false";
  $peanuts = "false";
  $soy = "false";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Cosmic Brownie";
  $ingredients = "enriched bleached flour(wheat flour,niacin,reduced iron,thiamin mononitrate(vitamin b1),riboflavin(vitamin b2),folic acid),corn syrup,palm and soybean oils with tbhq and citric acid,sugar,dextrose,water,cocoa.contains 2% or less of: soy flour,cosmic candy pieces(semi-sweet chocolate chips(sugar, chocolate, cocoa butter, soy lecithin, vanilla),sugar,corn starch,titanium dioxide,gum arabic,confectioner’s glaze,carnauba wax,yellow 5 lake,yellow 6 lake,blue 1 lake,red 3,milk),high fructose corn syrup,eggs,soy lecithin,salt,corn starch, leavening(sodium aluminum phosphate, baking soda),caramel color,natural and artificial flavors,red 40,soybean oil,whey, palm and palm kernel oil,titanium dioxide,yellow 5 lake,yellow 6 lake,blue 1 lake,red 3,blue 2 lake,egg whites,modified corn starch citric acid,asorbic acid(to preserve freshness),polysorbate 60,mono- and diglycerides";
  $milk = "true";
  $egg = "true";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "true";
  $peanuts = "false";
  $soy = "true";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Buttercream Frosting";
  $ingredients = "sugar,palm oil,water,corn syrup,corn starch,canola oil,contains 2% or less of: salt,mono and diglycerides,artificial color(yellow 5, red 40, yellow 6),polysorbate 60,modified corn starch,potassium sorbate(preservative),soy lecithin,xanthan gum,citric acid,natural and artificial flavors,antioxidants(ascorbyl palmitate,mixed tocopherols,chamomile and rosemary extracts)";
  $milk = "false";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "false";
  $peanuts = "false";
  $soy = "true";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Cream Cheese Base";
  $ingredients = "flour,sugar,butter,vanilla pudding mix(sugar,modified cornstarch,contains less than 2% of sodium phosphate,tetrasodium pyrophosphate,salt,mono- and diglycerides,artificial color,natural and artificial flavor,yellow 5,yellow 6),eggs,cream cheese extract(propylene glycol,alcohol,natural flavors,cream cheese(pasteurized milk and cream,cheese culture,salt,carob bean gum),nonfat dry milk),baking powder(cornstarch,bicarbonate of soda,sodium aluminium sulfate,monocalcium phosphate)";
  $milk = "true";
  $egg = "true";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "false";
  $peanuts = "false";
  $soy = "false";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Cinnamon Chips";
  $ingredients = "sugar,skim milk,hydrogenated vegetable oil(palm kernel oil,soybean oil,palm oil),palm kernel oil,cornstarch,natural and artificial flavor,artificial color(yellow 6 lake,yellow 5 lake,blue 2 lake),salt,lecithin(soy)";
  $milk = "false";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "false";
  $peanuts = "true";
  $soy = "false";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Cinnamon Rolls";
  $ingredients = "enriched wheat flour(wheat flour,niacin,reduced iron,ascorbic acid,thiamine mononitrate,riboflavin,enzyme,folic acid),water,margarine(soybean oil,palm oil,water,salt,whey(milk),monoglycerides,soybean lecithin,natural flavor,annatto extract(color),turmeric extract(color),vitamin a palmitate,vitamin d3),sugar,invert sugar,milk,leavening blend(sodium acid pyrophosphate,sodium bicarbonate,cornstarch,monocalcium phosphate,calcium sulfate),mono and diglycerides,salt,vinegar,sugar,margarine(soybean oil,palm oil,water,salt,whey(milk),monoglycerides,soybean lecithin,natural flavor,annatto extract(color),turmeric extract(color),vitamin a palmitate,vitamin d3),cinnamon,potato starch,molasses,water,sugar,corn syrup,honey,citric acid,pectin,sodium alginate,mono and diglycerides,sodium benzoate(preservative),artificial flavor,agar-agar";
  $milk = "true";
  $egg = "true";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "true";
  $peanuts = "true";
  $soy = "true";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Cream Cheese Icing";
  $ingredients = "sugar,palm oil,water,corn syrup,corn starch,canola oil,salt,mono And diglycerides,artificial color(yellow 5 and red 40),artificial flavor,polysorbate 60,modified corn starch,potassium sorbate(preservative),soy lecithin,xanthan gum,citric acid,antioxidants(ascorbyl palmitate,mixed tocopherols,chamomile and rosemary extracts)";
  $milk = "false";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "false";
  $peanuts = "false";
  $soy = "true";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Frosted Animal Cookies";
  $ingredients = "sugar,enriched flour(wheat flour,niacin,reduced iron,thiamin mononitrate(vitamin b1),riboflavin(vitamin b2),folic acid),vegetable oil(coconut,cottonseed,palm,palm kernel and/or partially hydrogenated soybean oil),high fructose corn syrup,whey,cornstarch,emulsifiers(soy lecithin,sorbitan monostearate,polysorbate 60),salt,artificial colors(blue 1,color added,red no 3, red 40, red 40 lake,yellow 5,yellow 6),baking soda,confectioners glaze,natural and artificial flavor,carnauba wax";
  $milk = "true";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "true";
  $peanuts = "false";
  $soy = "true";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Peanut Butter";
  $ingredients = "roasted peanuts,sugar,molasses,fully hydrogenated vegetable oils(rapeseed and soybean),mono and diglycerides,salt";
  $milk = "false";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "false";
  $peanuts = "true";
  $soy = "false";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $ingredientName = "Peanut Butter Oreo";
  $ingredients = "sugar,unbleached enriched flour(wheat flour,niacin,reduced iron,thiamine mononitrate(vitamin b1),riboflavin(vitamin b2),folic acid),peanut butter(peanuts,hydrogenated rapeseed and/or soybean and/or cottonseed oils,salt),canola and/or palm and/or soybean and/or palm kernel oil,cocoa(processed with alkali),maltodextrin,high fructose corn syrup, cornstarch,leavening(baking soda and/or calcium phosphate),salt,soy lecithin,invert sugar,chocolate,vanillin";
  $milk = "false";
  $egg = "false";
  $fish = "false";
  $shellfish = "false";
  $tree_nuts = "false";
  $wheat = "true";
  $peanuts = "true";
  $soy = "true";
  $tree_nut_name = "";
  $populateLabelsWithDefaults->execute();

  $populateDefaults->close();

  /*labels*/

  $populateLabels = new mysqli($serverName, $userName, $pw, $db);
  if($populateLabels->connect_errno) {
    echo "connection failed: " . $populateLabels->connect_error . "<br>";
  }
  $populateLabelsPrep = $populateLabels->prepare("INSERT INTO " . $labelsTableName . "(label_id, label_name, id_list) VALUES (DEFAULT, ?, ?)");
  $populateLabelsPrep->bind_param("ss", $labelName, $idList);

  $labelName = "Peanut Butter Bomb";
  $idList = "2,7,8,9,10";
  $populateLabelsPrep->execute();

  $labelName = "Em's Chocolate Sexual";
  $idList = "3,12,13,14,15";
  $populateLabelsPrep->execute();

  $labelName = "Better Than Sex";
  $idList = "2,5,11,6,16";
  $populateLabelsPrep->execute();

  $labelName = "Cinnamon Roll";
  $idList = "17,18,19,20,11";
  $populateLabelsPrep->execute();

  $labelName = "Frosted Animal Cheesecake";
  $idList = "2,11,21,20";
  $populateLabelsPrep->execute();

  $labelName = "Peanut Butter Oreo";
  $idList = "3,8,10,9,6,22,23";
  $populateLabelsPrep->execute();

  $populateLabels->close();

  /*update master table (usertable in user_info db)*/
  $updateMasterTable = new mysqli($serverName, $userName, $pw, $db);
  if($updateMasterTable->connect_errno) {
    echo "connection failed: " . $updateMasterTable->connect_error . "<br>";
  }
  $updateMasterPrep = $updateMasterTable->prepare("INSERT INTO label_users(userid, username, email, pw) VALUES (DEFAULT, ?, ?, ?)");
  $updateMasterPrep->bind_param("sss", $CURRENTUSER, $postUN, $hashed_pw);
  $updateMasterPrep->execute();
  $updateMasterTable->close();

  echo "created account. <br>";

  /*start session*/
  session_start();

  /*set session variables*/
  $_SESSION["loggedin"] = true;
  $_SESSION["session_username"] = $CURRENTUSER;

  /*redirect to labels.php*/
  header("Location: ./sendEmail.php");
  exit;


  /*END FIRST TIME ACCOUNT CREATION*/


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
