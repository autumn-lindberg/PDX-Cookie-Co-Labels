<?php
  session_start();
  if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
      header("Location: labels.php");
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
  <link rel="stylesheet" href="CSS/create-account.css">
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
        <img src="IMG/cookies.png" class="logoHeight">
      </a>
      <button class="navbar-toggler toggler order-1 hamburger" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar" aria-expanded="true">
        <i class="bi-list hamburger"></i>
      </button>
      <div class="collapse navbar-collapse order-3 flex-grow-1 mobileNavBackground" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item ps-4 pe-3">
            <a class="nav-link" href="index.php">
              <h2 class="navText text-dark">LABELS</h2>
            </a>
          </li>
          <li class="nav-item ps-3 pe-4">
            <a class="nav-link" href="ingredients.php">
              <h2 class="navText text-dark">INGREDIENTS</h2>
            </a>
          </li>
        </ul>
      </div>
      <div class="mh-50 text-white order-4 d-flex titleContainer">
        <a href="./index.php" class="titleLink">
          <h1 class="align-self-center titleText">PDX LABEL CO</h1>
        </a>
      </div>
    </div><!--END FLEX CONTAINER-->
  </nav><!--END NAVIGATION-->

  <!--MAIN CONTAINER-->
  <div class="container-fluid bodyBanner">
    <div class="container contentBox h-100 d-flex"> <!--CONTENT BOX-->
      <form class="container d-flex w-75 align-self-center flex-wrap loginContainer justify-content-center" action="./generateAccount.php" method="POST">
        <!--login box-->
        <div class="h-auto loginBox d-flex flex-column justify-content-center">
          <div class="form-group mx-auto w-75 mt-2 d-flex flex-column emailHeight">
            <label for="email_input" class="form-label loginButtonsText skewEmailText align-items-center">EMAIL</label>
            <input type="text" class="form-control skewEmailBox boxWidth align-items-center" id="email_input" placeholder="Enter Email..." name="email">
          </div>
          <div class="form-group mx-auto pwHeight">
            <label for="password_input" class="form-label passwordLabel pb-2">PASSWORD</label>
            <input type="password" class="form-control pwBox1 boxWidth mb-2" id="password_input" placeholder="Enter Password..." name="psw">
            <label for="pw_again" class="form-label pwAgain mb-1">Once More!</label>
            <input type="password" class="form-control skewPwBox pwInputAgain boxWidth" id="pw_again" placeholder="Enter Password Again..." name="pw_again">
          </div>
        </div>
        <!--buttons box-->
        <div class="buttonsBox d-flex flex-column justify-content-center">
          <div class="h-25 mt-3 mb-4 ms-3 me-3 reqsBox">
            <h2 class="pswReqs">Password must contain 8 or more total characters, and include at least one number</h2>
          </div>
          <button type="submit" class="loginButtonsText createAccountButton p-2 mt-4 h-auto">CREATE<br>ACCOUNT</button>
        </div>

      </form>
    </div><!--END CONTENT BOX-->
  </div>
  <!--END MAIN CONTAINER-->

  <footer class="container-fluid footerBanner">
    <div class="container h-100 d-flex footerColor">
      <div class="h-100 addressBox">
        <pre class="mt-3 mb-0">
PDX Cookie Co
7919 SE Stark
Portland, OR 97219
        </pre>
      </div>
      <div class="h-100 insta_link_box d-flex">
        <i class="bi-instagram align-self-center h-100 w-100 instaSize"></i>
      </div>
    </div>
  </footer>
  <script src="./JS/create-account.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>
