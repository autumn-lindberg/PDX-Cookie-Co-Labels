<?php
  session_start();
  if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
      header("Location: index.php");
      exit;
  }
  else {
    echo "<div class='encodedJSON'>";
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

    /*GET ALL DATA FROM LABELS TABLE AND STORE THEM*/
    $grabLabels = new mysqli($serverName, $userName, $pw, $db);
    if($grabLabels->connect_errno) {
      echo "connection failed: " . $grabLabels->connect_error . "<br>";
    }
    unset($grabLabelsPrep);
    $grabLabelsPrep = $grabLabels->prepare("SELECT label_id, label_name, id_list FROM " . $labelsTableName);
    $grabLabelsPrep->execute();
    $res = $grabLabelsPrep->get_result();
    $data = $res->fetch_all(MYSQLI_ASSOC);
    $grabLabels->close();

    /*GET ALL DATA FROM CORRESPONDING INGREDIENTS*/
      $entryIndex = 0;

      /*prepare one statement for multiple uses*/
      $grabIngredients = new mysqli($serverName, $userName, $pw, $db);
      if($grabIngredients->connect_errno) {
        echo "connection failed: " . $grabIngredients->connect_error . "<br>";
      }
      $grabIngredientsPrep = $grabIngredients->prepare("SELECT ingredient_id, ingredient_name, ingredient_contents, milk, egg, fish, shellfish, tree_nuts, wheat, peanuts, soy, tree_nut_name FROM " . $ingredientsTableName);
      $grabIngredientsPrep->execute();
      $myRes = $grabIngredientsPrep->get_result();
      $myData = $myRes->fetch_all(MYSQLI_ASSOC);
      echo json_encode($myData);

      $grabIngredients->close();
      $entryIndex = $entryIndex + 1;

    /*grab data, slap it in a div, and make it JSON*/
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
  <link rel="stylesheet" href="CSS/labels.css">
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
        's Labels
        </h1>
      </div>
<!--SEARCH BOX AND ADD LABEL MODAL-->
      <div class="d-flex flex-row mx-auto interFaceWidth">
        <form class="modalForm w-100 d-flex flex-row" id="modalForm" action="./addLabel.php" method="POST">
          <div class="me-2 searchBox">
            <input type="text" class="form-control border border-light searchBoxHeight" placeholder="SEARCH...">
          </div>
          <button type="button" class="ms-2 btn btn-dark addLabel" data-bs-toggle="modal" data-bs-target="#addLabelModal">ADD LABEL [+]</button>
          <div class="modal fade modalHeight addLabelModal" id="addLabelModal">
            <div class="modal-dialog modal-xl modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title w-100">
                    <input class="form-control titleInput" type="text" name="new_ingredient_title" placeholder="Label Name..." required>
                  </h3>
                </div>
                <div class="modal-body modalBodyHeight newLabel">

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger dismissWidth mx-auto" data-bs-dismiss="modal">CANCEL</button>
                  <button type="submit" class="btn btn-success saveWidth mx-auto submitBtn">SAVE</button>
                  <input class="removeText" type="hidden" name="removeString" value="">
                  <input class="appendText" type="hidden" name="appendString" value="">
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
            <th scope="col">Label</th>
            <th scope="col" class="printWidth">Print</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody class="resultsBody">
        </tbody>
        </table>
        <script src="JS/labels.js"></script>
      </div>

    </div><!--END CONTENT BOX-->
  </div>

  <!--Bootstrap JS-->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

</body>
</html>
