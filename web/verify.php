<?php
  if ($_POST['submitbutton'] == 'create') {
    header("Location: create-account.php");
    exit;
  }
  /*PHP VERIFY EMAIL CODE*/
  $postUN = $_POST["username"];
  $postPW = $_POST["psw"];

  /*DB CONFIG*/
  $serverName = $_ENV["CLEARDB_SERVERNAME"];
  $userName = $_ENV["CLEARDB_UN"];
  $pw = $_ENV["CLEARDB_PW"];
  $db = $_ENV["CLEARDB_DB"];

  /*check if email matches any records*/
  $userTableConnection = new mysqli($serverName, $userName, $pw, $db);
  if($userTableConnection->connect_errno) {
    echo "connection failed: " . $userTableConnection->connect_error . "<br>";
  }
  $userTable = "usertable";
  $idCol = "id";
  $emailCol = "email";
  $checkTable = $userTableConnection->prepare("SELECT * FROM label_users WHERE username = ?");
  $checkTable->bind_param("s", $postUN);
  $checkTable->execute();
  $result = $checkTable->get_result();
  $myData = $result->fetch_all(MYSQLI_ASSOC);
  $userTableConnection->close();

  if(empty($myData)) {
    echo "<script>parent.self.location='./clearData.php';</script>";
  }
  else {
  /*USERNAME EXISTS*/
    /*check password*/
    $checkPassword = new mysqli($serverName, $userName, $pw, $db);
    if($checkPassword->connect_errno) {
      echo "connection failed: " . $checkPassword->connect_error . "<br>";
    }
    $checkPasswordPrep = $checkPassword->prepare("SELECT userid, pw FROM label_users WHERE username = ?");
    $checkPasswordPrep->bind_param("s", $postUN);
    $checkPasswordPrep->execute();
    $existingUserResult = $checkPasswordPrep->get_result();
    $existingUserPW = $existingUserResult->fetch_all(MYSQLI_ASSOC);
    $checkPassword->close();

    foreach($existingUserPW as $pwFromDB) {
      if(password_verify($postPW, $pwFromDB["pw"])) {
        /*IF CORRECT, START SESSION*/
        session_start();
        /*set session variables*/
        $_SESSION["loggedin"] = true;
        $_SESSION["session_username"] = $_POST["username"];
        /*redirect to labels.php*/
        header("Location: labels.php");
        exit;
      }
      else {    /*INCORRECT PASSWORD*/
        echo "<script>parent.self.location='./clearData.php';</script>";
      }
    }
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
