let jsonStringElement = document.querySelector('.encodedJSON')
let resultsSpace = document.querySelector('.resultsbody')
let jsonString = jsonStringElement.innerHTML;

// remove first brace and commas
jsonString = jsonString.replace('[','')
jsonString = jsonString.replaceAll('},','} ')

let jsonCharArray = jsonString.split("")

// yank off one char at end and add space
jsonCharArray.splice(jsonCharArray.length - 1, 1, '')

let myString = "";
for(let x = 815; x < 840; x++) {
  myString += jsonCharArray[x];
}

// join back up, then parse by space after squiggly
let jsonStringSpaced = jsonCharArray.join("")
let jsonStringArray = jsonStringSpaced.split("} ")

let index2 = 0;
// add missing squigglies
jsonStringArray.forEach((e) => {
  if(index2 != jsonStringArray.length - 1) {
    jsonStringArray[index2] = e + "}";
  }
  index2++;
})

// create array to store actual objects
let ingredientsObjects = [];

// populate object array
for(let printIndex = 0; printIndex < jsonStringArray.length; printIndex++) {
  ingredientsObjects[printIndex] = JSON.parse(jsonStringArray[printIndex])
}

let flexOrderNum = 1;
let modalID = 0;

//adjust ingredient id's to be correct (fuck you clearDB)
ingredientsObjects.forEach((a) => {
  a.ingredient_id = Math.floor(a.ingredient_id / 10.0) + 1;
})


////////// INGREDIENTS INGREDIENTS INGREDIENTS INGREDIENTS //////////
////////// INGREDIENTS INGREDIENTS INGREDIENTS INGREDIENTS //////////
////////// INGREDIENTS INGREDIENTS INGREDIENTS INGREDIENTS //////////

ingredientsObjects.forEach((e) => {

  // check allergen information
  let allergensString = "";

  if(e.milk == "true") {
    allergensString += "milk, ";
  }  //milk
  if(e.egg == "true") {
    allergensString += "egg, ";
  }  //eggs
  if(e.fish == "true") {
    allergensString += "fish, ";
  }  //fish
  if(e.shellfish == "true") {
    allergensString += "shellfish, ";
  }  //shellfish
  if(e.tree_nuts == "true") {
    allergensString += "tree nuts(";
    allergensString += e.tree_nut_name;
    allergensString += "), ";
  }  //tree_nuts
  if(e.wheat == "true") {
    allergensString += "wheat, ";
  }  //wheat
  if(e.peanuts == "true") {
    allergensString += "peanuts, ";
  }  //peanuts
  if(e.soy == "true") {
    allergensString += "soy, ";
  }  //soy

  // yank off ending comma and space
  allergensString  = allergensString.slice(0, -2)

  ////////// CREATE TABLE STRUCTURE CREATE TABLE STRUCTURE //////////
  ////////// CREATE TABLE STRUCTURE CREATE TABLE STRUCTURE //////////
  ////////// CREATE TABLE STRUCTURE CREATE TABLE STRUCTURE //////////

  let myTR = document.createElement('tr')
  let ingredientColumn = document.createElement('th')
  let allergenColumn = document.createElement('td')
  let editColumn = document.createElement('td')
  let editButton = document.createElement('button')

  // order table sctructure in the DOM
  myTR.appendChild(ingredientColumn)
  myTR.appendChild(allergenColumn)
  myTR.appendChild(editColumn)
  editColumn.appendChild(editButton)

  // add classes and attributes to table structure
  ingredientColumn.scope = "row";
  editButton.className = "btn btn-dark ms-2 me-2 editButton";
  editColumn.className = "align-middle editColumn";
  ingredientColumn.className = "ingredientsColumn align-middle";
  ingredientColumn.innerHTML = e.ingredient_name;
  allergenColumn.className = "align-middle";
  allergenColumn.innerHTML = allergensString;
  editButton.innerHTML = "<i class='bi-pencil align-self-center h-100 w-100 editButton'></i>";
  editButton.type="button";

  // ids and attributes for modal button
  editButton.setAttribute("data-bs-toggle", "modal")
  let myModalID = "myModal" + modalID;
  let bsTarget = "#" + myModalID;
  editButton.setAttribute("data-bs-target", bsTarget)

  // If the name contains "base", order it first
  if(e.ingredient_name.toLowerCase().includes("base")) {
    let flexOrder = "flex-order-";
    flexOrder += flexOrderNum;
    myTR.className += flexOrder;
    flexOrderNum += 1;
  }

  ////////// EDIT BUTTON MODAL EDIT BUTTON MODAL EDIT BUTTON MODAL //////////
  ////////// EDIT BUTTON MODAL EDIT BUTTON MODAL EDIT BUTTON MODAL //////////
  ////////// EDIT BUTTON MODAL EDIT BUTTON MODAL EDIT BUTTON MODAL //////////

  // create modal structure (next sibling of triggering button)
  let modalDiv = document.createElement('div')
  modalDiv.className = "modal fade";
  modalDiv.id = myModalID;
  let modalDialogue = document.createElement('div')
  modalDialogue.className = "modal-dialog modal-xl modal-dialog-centered";
  let modalContent = document.createElement('div')
  modalContent.className = "modal-content";
  let modalForm = document.createElement('form')
  modalForm.className = "modalForm";
  modalForm.setAttribute("action", "./editIngredient.php")
  modalForm.setAttribute("method", "POST")

  // edit button modal header
  let modalHeader = document.createElement('div')
  modalHeader.className = "modal-header";
  let modalTitle = document.createElement('h3')
  modalTitle.className = "modal-title w-100 d-flex";
  let modalTitleInput = document.createElement('input')
  modalTitleInput.className = "form-control w-100 me-2 ingredientTitle";
  modalTitleInput.setAttribute("name", "ingredient_title")
  modalTitleInput.setAttribute("type", "text")
  modalTitleInput.defaultValue = e.ingredient_name;
  modalTitle.appendChild(modalTitleInput)

  // edit button modal body
  let modalBody = document.createElement('div')
  modalBody.className = "modal-body";
  let textArea = document.createElement('textarea')
  textArea.className = "form-control ingredientDescription";
  textArea.setAttribute("name", "ingredient_description")
  textArea.setAttribute("rows", "10")
  textArea.defaultValue = e.ingredient_contents;

  ///// CHECKBOX SECTION CHECKBOX SECION /////
  ///// CHECKBOX SECTION CHECKBOX SECION /////
  ///// CHECKBOX SECTION CHECKBOX SECION /////

  let checkBoxArea = document.createElement('div')
  checkBoxArea.className = "d-flex";

  // milk
  let milkCheckArea = document.createElement('div')
  milkCheckArea.className = "form-check m-3";
  let milkInput = document.createElement('input')
  milkInput.className = "form-check-input";
  milkInput.setAttribute("type","checkbox")
  milkInput.setAttribute("id","milkCheck")
  milkInput.setAttribute("name","milkInput")
  if(e.milk == "true") {
    milkInput.checked = true;
  }
  let milkLabel = document.createElement('label')
  milkLabel.className = "form-check-label";
  milkLabel.setAttribute("for","milkCheck")
  milkLabel.innerHTML = "Milk";

  // eggs
  let eggCheckArea = document.createElement('div')
  eggCheckArea.className = "form-check m-3";
  let eggInput = document.createElement('input')
  eggInput.className = "form-check-input";
  eggInput.setAttribute("type","checkbox")
  eggInput.setAttribute("id","eggCheck")
  eggInput.setAttribute("name","eggInput")
  if(e.egg == "true") {
    eggInput.checked = true;
  }
  let eggLabel = document.createElement('label')
  eggLabel.className = "form-check-label";
  eggLabel.setAttribute("for","eggCheck")
  eggLabel.innerHTML = "Egg";

  // fish
  let fishCheckArea = document.createElement('div')
  fishCheckArea.className = "form-check m-3";
  let fishInput = document.createElement('input')
  fishInput.className = "form-check-input";
  fishInput.setAttribute("type","checkbox")
  fishInput.setAttribute("id","fishCheck")
  fishInput.setAttribute("name","fishInput")
  if(e.fish == "true") {
    fishInput.checked = true;
  }
  let fishLabel = document.createElement('label')
  fishLabel.className = "form-check-label";
  fishLabel.setAttribute("for","fishCheck")
  fishLabel.innerHTML = "Fish";

  // shellfish
  let shellfishCheckArea = document.createElement('div')
  shellfishCheckArea.className = "form-check m-3";
  let shellfishInput = document.createElement('input')
  shellfishInput.className = "form-check-input";
  shellfishInput.setAttribute("type","checkbox")
  shellfishInput.setAttribute("id","shellfishCheck")
  shellfishInput.setAttribute("name","shellfishInput")
  if(e.shellfish == "true") {
    shellfishInput.checked = true;
  }
  let shellfishLabel = document.createElement('label')
  shellfishLabel.className = "form-check-label";
  shellfishLabel.setAttribute("for","shellfishCheck")
  shellfishLabel.innerHTML = "Shellfish";

  // tree nuts
  let tree_nutsCheckArea = document.createElement('div')
  tree_nutsCheckArea.className = "form-check m-3";
  let tree_nutsInput = document.createElement('input')
  tree_nutsInput.className = "form-check-input";
  tree_nutsInput.setAttribute("type","checkbox")
  tree_nutsInput.setAttribute("id","tree_nutsCheck")
  tree_nutsInput.setAttribute("name","tree_nutsInput")
  if(e.tree_nuts == "true") {
    tree_nutsInput.checked = true;
  }
  let tree_nutsLabel = document.createElement('label')
  tree_nutsLabel.className = "form-check-label";
  tree_nutsLabel.setAttribute("for","tree_nutsCheck")
  tree_nutsLabel.innerHTML = "Tree Nuts";
  tree_nutsInput.addEventListener('change', (a) => {
    let treeNutBox = a.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.childNodes[1];
    if(a.target.checked == true) {
      treeNutBox.setAttribute("required","")
    } else {
      treeNutBox.removeAttribute("required")
    }

  }) // end event listener for tree nut checkbox

  // wheat
  let wheatCheckArea = document.createElement('div')
  wheatCheckArea.className = "form-check m-3";
  let wheatInput = document.createElement('input')
  wheatInput.className = "form-check-input";
  wheatInput.setAttribute("type","checkbox")
  wheatInput.setAttribute("id","wheatCheck")
  wheatInput.setAttribute("name","wheatInput")
  if(e.wheat == "true") {
    wheatInput.checked = true;
  }
  let wheatLabel = document.createElement('label')
  wheatLabel.className = "form-check-label";
  wheatLabel.setAttribute("for","wheatCheck")
  wheatLabel.innerHTML = "Wheat";

  //peanuts
  let peanutsCheckArea = document.createElement('div')
  peanutsCheckArea.className = "form-check m-3";
  let peanutsInput = document.createElement('input')
  peanutsInput.className = "form-check-input";
  peanutsInput.setAttribute("type","checkbox")
  peanutsInput.setAttribute("id","peanutsCheck")
  peanutsInput.setAttribute("name","peanutsInput")
  if(e.peanuts == "true") {
    peanutsInput.checked = true;
  }
  let peanutsLabel = document.createElement('label')
  peanutsLabel.className = "form-check-label";
  peanutsLabel.setAttribute("for","peanutsCheck")
  peanutsLabel.innerHTML = "Peanuts";

  //soy
  let soyCheckArea = document.createElement('div')
  soyCheckArea.className = "form-check m-3";
  let soyInput = document.createElement('input')
  soyInput.className = "form-check-input";
  soyInput.setAttribute("type","checkbox")
  soyInput.setAttribute("id","soyCheck")
  soyInput.setAttribute("name","soyInput")
  if(e.soy == "true") {
    soyInput.checked = true;
  }
  let soyLabel = document.createElement('label')
  soyLabel.className = "form-check-label";
  soyLabel.setAttribute("for","soyCheck")
  soyLabel.innerHTML = "Soy";

  //tree nut name
  let treeNutNameArea = document.createElement('div')
  treeNutNameArea.className = "m-3 treeNutNameWidth";
  let treeNutNameInput = document.createElement('input')
  treeNutNameInput.className = "form-check-input w-100 treeNutInputSize";
  treeNutNameInput.setAttribute("type","text")
  treeNutNameInput.setAttribute("id","treeNutName")
  treeNutNameInput.setAttribute("name","treeNutName")
  treeNutNameInput.setAttribute("value",e.tree_nut_name)
  treeNutNameInput.value = e.tree_nut_name;
  let treeNutNameLabel = document.createElement('label')
  treeNutNameLabel.setAttribute("for","treeNutName")
  treeNutNameLabel.innerHTML = "Tree Nut Name";

  // organize structure of checkboxes
  milkCheckArea.appendChild(milkInput)
  milkCheckArea.appendChild(milkLabel)
  checkBoxArea.appendChild(milkCheckArea)

  eggCheckArea.appendChild(eggInput)
  eggCheckArea.appendChild(eggLabel)
  checkBoxArea.appendChild(eggCheckArea)

  fishCheckArea.appendChild(fishInput)
  fishCheckArea.appendChild(fishLabel)
  checkBoxArea.appendChild(fishCheckArea)

  shellfishCheckArea.appendChild(shellfishInput)
  shellfishCheckArea.appendChild(shellfishLabel)
  checkBoxArea.appendChild(shellfishCheckArea)

  tree_nutsCheckArea.appendChild(tree_nutsInput)
  tree_nutsCheckArea.appendChild(tree_nutsLabel)
  checkBoxArea.appendChild(tree_nutsCheckArea)

  wheatCheckArea.appendChild(wheatInput)
  wheatCheckArea.appendChild(wheatLabel)
  checkBoxArea.appendChild(wheatCheckArea)

  peanutsCheckArea.appendChild(peanutsInput)
  peanutsCheckArea.appendChild(peanutsLabel)
  checkBoxArea.appendChild(peanutsCheckArea)

  soyCheckArea.appendChild(soyInput)
  soyCheckArea.appendChild(soyLabel)
  checkBoxArea.appendChild(soyCheckArea)

  treeNutNameArea.appendChild(treeNutNameLabel)
  treeNutNameArea.appendChild(treeNutNameInput)
  checkBoxArea.appendChild(treeNutNameArea)

  modalBody.appendChild(textArea)
  modalBody.appendChild(checkBoxArea)

  // edit button footer
  let modalFooter = document.createElement('div')
  modalFooter.className = "modal-footer d-flex d-inline-flex w-100";
  let dismissBtn = document.createElement('button')
  dismissBtn.className = "btn btn-danger dismissWidth mx-auto";
  dismissBtn.setAttribute("type", "button")
  dismissBtn.setAttribute("data-bs-dismiss", "modal")
  dismissBtn.innerHTML = "CANCEL";
  let saveBtn = document.createElement('button')
  saveBtn.setAttribute("type", "submit")
  saveBtn.className = "btn btn-success mx-auto saveWidth";
  saveBtn.innerHTML = "UPDATE";

  //hidden input with ingredient id to post to editIngredient.php
  let formHidden = document.createElement('input')
  formHidden.setAttribute("type", "hidden")
  formHidden.setAttribute("name", "ingredient_id")
  formHidden.setAttribute("value", e.ingredient_id);

  //put modal elements in proper order
  modalForm.appendChild(modalHeader)
  modalForm.appendChild(modalTitle)
  modalForm.appendChild(modalBody)
  modalForm.appendChild(modalFooter)
  modalForm.appendChild(formHidden)

  modalDiv.appendChild(modalDialogue)
  modalDialogue.appendChild(modalContent)
  modalHeader.appendChild(modalTitle)

  modalFooter.appendChild(dismissBtn)
  modalFooter.appendChild(saveBtn)
  editColumn.appendChild(modalDiv)

  modalContent.appendChild(modalForm)

  // ADD ENTIRE STRUCTURE TO BODY OF TABLE
  let tableEntries = document.querySelector('.resultsBody')
  tableEntries.appendChild(myTR)

  modalID += 1;
})  //end forEach

//ADD LISTENER TO MAIN SEARCH BOX
let myform = document.forms['modalForm']
let box = myform.querySelector('input[type="text"]')

box.addEventListener('keyup', (x) => {
  let searchTerm = x.target.value.toLowerCase()
  let listToSearch = document.querySelectorAll('.ingredientsColumn')
  listToSearch.forEach((v) => {
    let trClass = v.parentNode.className;
    // grab their label names
    if(v.innerHTML.toLowerCase().includes(searchTerm)) {
      // if class is set, clear it and correct
      if(!(trClass.includes("d-table-row"))) {
        v.parentNode.className = "tableRow d-table-row";
      }

    }  // else not match
    else {
      // if class is set, just clear it
      if(!(trClass.includes("d-none"))) {
        v.parentNode.className = "tableRow d-none";
      }

    } // end else
  }) // end list search
}) // end event listener

////////// INPUT VALIDATTION INPUT VALIDATION //////////
////////// INPUT VALIDATTION INPUT VALIDATION //////////
////////// INPUT VALIDATTION INPUT VALIDATION //////////

// new label tree nut toggle
let tree_nutsCheck = document.querySelector('.tree_nutsCheck')
let treeNutBox = document.querySelector('.treeNutInputSize');

tree_nutsCheck.addEventListener('change', (a) => {

  if(a.target.checked == true) {
    treeNutBox.setAttribute("required","")
  } else {
    treeNutBox.removeAttribute("required")
  }
}) // end toggle listener

// keyup listeners for bad input
for(let i = 1; i <= ingredientsObjects.length + 1; i++) {
  let classname = document.forms[i]
  let titleInput = classname.querySelector('.ingredientTitle')
  let descriptionInput = classname.querySelector('.ingredientDescription')

  descriptionInput.addEventListener('keyup', keyUpValidation)
  titleInput.addEventListener('keyup', keyUpValidation);
}
function keyUpValidation(d) {
  let title = d.target.value;
  let titleBox = d.target;
  // VALIDATE INPUT BOX AND ADJUST CLASSES
  if(title.match(/[{}\[\]]/)) {
    if(!(titleBox.classList.contains("is-invalid"))) {
      titleBox.classList.toggle("is-invalid")
    }

  } else { // else title is clean

    if(titleBox.classList.contains("is-invalid")) {
      titleBox.classList.toggle("is-invalid")
    }

  } // end else title clean

}
