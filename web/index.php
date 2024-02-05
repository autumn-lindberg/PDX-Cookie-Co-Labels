<?php
  session_start();
  if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("Location: ./labels.php");
    exit;
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
  <!--Bootstrap-->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <!-- Bootstrap Icons -->
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
   <!--stylesheet-->
  <link rel="stylesheet" href="CSS/stylesheet.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Display:wght@900&display=swap');  /*title*/
    @import url('https://fonts.googleapis.com/css2?family=Hepta+Slab&display=swap');  /*nav text*/
    @import url('https://fonts.googleapis.com/css2?family=Emblema+One&family=Hepta+Slab&display=swap');
  </style>
</head>
<body>
  <!--NAVIGATION-->
  <nav class="navbar navbar-expand-lg navColor navHeight w-100">
    <div class="container-fluid d-flex align-stretch w-100">
      <a class="navbar-brand order-2 h-75" href="#">
        <img src="IMG/cookies.png" class="logoHeight">
      </a>
      <button class="navbar-toggler toggler order-1 hamburger" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar" aria-expanded="true">
        <i class="bi-list hamburger"></i>
      </button>
      <div class="collapse navbar-collapse order-3 flex-grow-1 mobileNavBackground" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item ps-4 pe-3 mobileNavAdjust">
            <a class="nav-link" href="index.php">
              <h2 class="navText text-dark">LABELS</h2>
            </a>
          </li>
          <li class="nav-item ps-3 pe-4 mobileNavAdjust">
            <a class="nav-link" href="ingredients.php">
              <h2 class="navText text-dark">INGREDIENTS</h2>
            </a>
          </li>
        </ul>
      </div>
      <div class="mh-50 text-white order-4 d-flex titleContainer">
        <a href="#" class="titleLink">
          <h1 class="align-self-center titleText">PDX LABEL CO</h1>
        </a>
      </div>
    </div><!--END FLEX CONTAINER-->
  </nav><!--END NAVIGATION-->

  <!--MAIN CONTAINER-->
  <div class="container-fluid bodyBanner">
    <div class="container contentBox h-100 d-flex"> <!--CONTENT BOX-->
      <form class="container d-flex w-75 align-self-center loginContainer flex-wrap justify-content-center" action="verify.php" method="POST">
        <!--login box-->
        <div class="h-auto loginBox d-flex flex-column justify-content-center">
          <div class="form-group mt-4 mx-auto w-75 d-flex flex-column unContainerHeight mb-3">
            <label for="email_input" class="form-label loginButtonsText skewEmailText align-items-center pb-2">USERNAME</label>
            <input type="text" class="form-control skewEmailBox boxWidth align-items-center" id="email_input" placeholder="Enter Username..." name="username">
          </div>
          <div class="form-group mx-auto w-75 pwContainerHeight">
            <label for="password_input" class="form-label loginButtonsText passwordText">PASSWORD</label>
            <input type="password" class="form-control skewPwBox boxWidth" id="password_input" placeholder="Enter Password..." name="psw">
          </div>
        </div>
        <!--buttons box-->
        <div class="h-auto buttonsBox d-flex flex-column justify-content-center pe-4">
          <button type="submit" class="btn rounded-circle loginButtonsText submitBtn p-4 mb-4" name="submitbutton" value"login"><h3>LOGIN!</H3></button>
          <button type="submit" class="btn loginButtonsText createAccountButton p-2 mt-4" name="submitbutton" value="create">CREATE<br id="createAccountSpacing">ACCOUNT</button>
        </div>

      </form>
    </div><!--END CONTENT BOX-->
  </div>
  <!--END MAIN CONTAINER-->

  <footer class="container-fluid footerBanner">
    <div class="container h-100 d-flex footerColor">
      <div class="h-100 addressBox">
        <pre class="mt-3 mb-0 footerTextBox">
PDX Cookie Co
7919 SE Stark
Portland, OR 9721
        </pre>
      </div>
      <div class="h-100 insta_link_box d-flex">
        <i class="bi-instagram align-self-center h-100 w-100 instaSize"></i>
      </div>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

</body>
</html>
