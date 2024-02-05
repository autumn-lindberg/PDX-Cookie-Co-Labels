// queries
const createAccountButton = document.querySelector(".createAccountButton");
const createAccountForm = document.querySelector(".loginContainer");

// add listener for create account button
createAccountButton.addEventListener("click", submit);
function submit(e) {
  // keep button from submitting
  e.preventDefault();
  e.stopPropagation();

  // grab input box nodes
  const emailBox = document.querySelector(".skewEmailBox");
  const pwBox = document.querySelector(".pwBox1");
  const pwVerify = document.querySelector(".pwInputAgain");
  const emailContent = emailBox.value;
  const pwContent = pwBox.value;
  const pwVerifyContent = pwVerify.value;

  // VALIDATE EMAIL AND ADJUST CLASSES
  if (
    !emailContent.match(
      /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )
  ) {
    emailBox.className += " is-invalid";
  }
  // email box is valid
  if (
    emailContent.match(
      /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )
  ) {
    //if it has invalid class, replace it. otherwise add valid class
    if (emailBox.className.includes("is-invalid")) {
      emailBox.classname = emailBox.className.replace("is-invalid", "is-valid");
    } else {
      emailBox.className += " is-valid";
    }
  }
  // VALIDATE PASSWORD, ADJUST CLASSES
  // if not matches or empty
  if (
    pwContent != pwVerifyContent ||
    pwContent == "" ||
    pwVerifyContent == ""
  ) {
    pwBox.className += " is-invalid";
    pwVerify.className += " is-invalid";
  }
  // if matches
  else {
    // check if meets requirements
    if (!pwContent.match(/(?=.*[a-z])(?=.*[!@#$%^&*_0-9])(.{8,})$/)) {
      pwBox.className += " is-invalid";
      pwVerify.className += " is-invalid";
    }
    // if meets requirements
    if (pwContent.match(/(?=.*[a-z])(?=.*[!@#$%^&*_0-9])(.{8,})$/)) {
      // if has invalid class already
      if (
        pwBox.className.includes("is-invalid") ||
        pwBox.className.includes("is-invalid")
      ) {
        // replace invalid with valid
        pwBox.className = pwBox.className.replace("is-invalid", "is-valid");
        pwVerify.className = pwVerify.className.replace(
          "is-invalid",
          "is-valid"
        );
      }
      // has no class on it
      else {
        pwBox.className += " is-valid";
        pwVerify.className += " is-valid";
      }
      // take off event listener and simulate click
      e.target.removeEventListener("click", submit, false);
      e.target.click();
    } // else matches and meets requirements
  } // else matches
} // function
