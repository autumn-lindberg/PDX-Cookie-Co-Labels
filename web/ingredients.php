<?php
  session_start();
  if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
      header("Location: index.php");
      exit;
  }
  else {
    /*config settings*/
    $serverName = getenv("CLEARDB_SERVERNAME");
    $userName = getenv("CLEARDB_UN");
    $pw = getenv("CLEARDB_PW");
    $db = getenv("CLEARDB_DB");

    $CURRENTUSER = $_SESSION["session_username"];

    $userTableName = $CURRENTUSER . "_user_info";
    $labelsTableName = $CURRENTUSER . "_labels";
    $ingredientsTableName = $CURRENTUSER . "_ingredients";

    /*GET ALL DATA FROM INGREDIENTS TABLE AND STORE THEM*/
    $ingredientsQuery = 1;
    $grabIngredientData = new mysqli($serverName, $userName, $pw, $db);
    if($grabIngredientData->connect_errno) {
      echo "connection failed: " . $grabIngredientData->connect_error . "<br>";
    }
    $grabIngredientsPrep = $grabIngredientData->prepare("SELECT ingredient_id, ingredient_name, ingredient_contents, milk, egg, fish, shellfish, tree_nuts, wheat, peanuts, soy, tree_nut_name FROM " . $ingredientsTableName);
    $grabIngredientsPrep->execute();
    $res = $grabIngredientsPrep->get_result();
    $data = $res->fetch_all(MYSQLI_ASSOC);
    $grabIngredientData->close();

    /*grab data, slap it in a div, and make it JSON*/
    echo "<div class='encodedJSON'>";
    echo json_encode($data);
    echo "</div>";
  }
?>
<!doctype html>
<html>
<head>
  <!--meta tags-->
  <meta charset="utf-8">
  <title>PDX Label Co</title>
  <meta name="description" content="PDX Cookie Co's label app">
  <meta name="title" content="PDX Label Co">
  <meta robots="noindex/nofollow">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="icon" type="image/jpg" href="IMG/cookies.png">
  <!--Bootstrap CSS-->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <!-- Bootstrap Icons -->
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
   <!--stylesheet-->
  <link rel="stylesheet" href="CSS/ingredients.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Display:wght@900&display=swap');  /*title*/
    @import url('https://fonts.googleapis.com/css2?family=Hepta+Slab&display=swap');  /*nav text*/
    @import url('https://fonts.googleapis.com/css2?family=Emblema+One&family=Hepta+Slab&display=swap');
  </style>
</head>
<body>
  <!--NAVIGATION-->
  <nav class="navbar navbar-expand-lg navColor navHeight">
    <div class="container-fluid d-flex align-stretch">
      <a class="navbar-brand order-2 h-75" href="./index.php">
        <img src="IMG/cookies.png" style="width:75px">
      </a>
      <button class="navbar-toggler order-1 toggleButtonColor btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse order-3 flex-grow-1" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item ps-4 pe-3">
            <a class="nav-link" href="labels.php">
              <h2 class="navText text-dark">LABELS</h2>
            </a>
          </li>
          <li class="nav-item ps-3 pe-4">
            <a class="nav-link" href="ingredients.php">
              <h2 class="navText text-dark">INGREDIENTS</h2>
            </a>
          </li>
          <li class="nav-item ps-5">
            <form action="./clearData.php" method="POST">
              <button name="logout" type="submit" class="btn btn-dark"><h3>LOGOUT</h3></button>
            </form>
          </li>
        </ul>
      </div>
      <div class="mh-50 text-white order-4 d-flex titleContainer">
        <a href="index.php" class="titleLink">
          <h1 class="align-self-center titleText">PDX LABEL CO</h1>
        </a>
      </div>
    </div><!--END FLEX CONTAINER-->
  </nav><!--END NAVIGATION-->
  <!--MAIN CONTAINER-->
  <div class="container-fluid bodyBanner">
    <div class="container contentBox h-100 d-flex flex-column"> <!--CONTENT BOX-->

      <div class="p-3 mx-auto welcomeBox">
        <h1 class="welcomeText">
        <?php
          echo $CURRENTUSER;
        ?>
        's Ingredients
        </h1>
      </div>
<!--SEARCH BOX AND ADD LABEL MODAL-->
      <div class="d-flex flex-row mx-auto interFaceWidth">
        <form class="modalForm w-100 d-flex flex-row" id="modalForm" action="./addIngredient.php" method="POST">
          <div class="me-2 searchBox">
            <input type="text" class="form-control border border-light searchBoxHeight" placeholder="SEARCH...">
          </div>
          <button type="button" class="ms-2 btn btn-dark addLabel" data-bs-toggle="modal" data-bs-target="#addLabelModal">ADD INGREDIENT [+]</button>
          <div class="modal fade" id="addLabelModal">
            <div class="modal-dialog modal-xl modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title w-100 d-flex">
                    <input class="form-control w-100 me-2 ingredientTitle" type="text" name="new_ingredient_title" placeholder="Ingredient Name..." required>
                  </h3>
                </div>
                <div class="modal-body d-flex flex-column">
                  <label for="ingredientDescription">Contents</label>
                  <textarea class="form-control w-100 m-2 ingredientDescription" rows="20" name="new_ingredient_description" id="ingredientDescription" required></textarea>
                  <div class="d-flex">
                    <div class="form-check m-3">
                      <input class="form-check-input" type="checkbox" id="milkCheck" name="milkInput">
                      <label class="form-check-label" for="milkCheck">Milk</label>
                    </div>
                    <div class="form-check m-3">
                      <input class="form-check-input" type="checkbox" id="eggCheck" name="eggInput">
                      <label class="form-check-label" for="eggCheck">Egg</label>
                    </div>
                    <div class="form-check m-3">
                      <input class="form-check-input" type="checkbox" id="fishCheck" name="fishInput">
                      <label class="form-check-label" for="fishCheck">Fish</label>
                    </div>
                    <div class="form-check m-3">
                      <input class="form-check-input" type="checkbox" id="shellfishCheck" name="shellfishInput">
                      <label class="form-check-label" for="shellfishCheck">Shellfish</label>
                    </div>
                    <div class="form-check m-3">
                      <input class="form-check-input tree_nutsCheck" type="checkbox" id="tree_nutsCheck" name="tree_nutsInput">
                      <label class="form-check-label" for="tree_nutsCheck">Tree Nuts</label>
                    </div>
                    <div class="form-check m-3">
                      <input class="form-check-input" type="checkbox" id="wheatCheck" name="wheatInput">
                      <label class="form-check-label" for="wheatCheck">Wheat</label>
                    </div>
                    <div class="form-check m-3">
                      <input class="form-check-input" type="checkbox" id="peanutsCheck" name="peanutsInput">
                      <label class="form-check-label" for="peanutsCheck">Peanuts</label>
                    </div>
                    <div class="form-check m-3">
                      <input class="form-check-input" type="checkbox" id="soyCheck" name="soyInput">
                      <label class="form-check-label" for="soyCheck">Soy</label>
                    </div>
                    <div class="m-3 treeNutNameWidth">
                      <label for="treeNutName">Tree Nut Name</label>
                      <input id="treeNutName" class="form-check-input w-100 treeNutInputSize" type="text" name="treeNutName" value="">
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger dismissWidth mx-auto" data-bs-dismiss="modal">CANCEL</button>
                    <button type="submit" class="btn btn-success saveWidth mx-auto">SAVE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

      <div class="interFaceWidth mx-auto mb-4 flex-grow-1 ingredientsArea tableHeight">
        <!--GRAB INGREDIENTS AND INFO, DISPLAY THEM HERE-->
        <table class="table table-striped table-responsive w-100 h-100 mb-0">
        <thead class="resultsHead">
          <tr>
            <th scope="col">Ingredient</th>
            <th scope="col">Allergens</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody class="resultsBody">
        </tbody>
        </table>
        <script src="JS/ingredients.js"></script>
      </div>

    </div><!--END CONTENT BOX-->
  </div>

  <!--Bootstrap JS-->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

</body>
</html>
