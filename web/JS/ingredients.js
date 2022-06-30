////////// TABLE OF CONTENTS TABLE OF CONTENTS TABLE OF CONTENTS //////////
////////// TABLE OF CONTENTS TABLE OF CONTENTS TABLE OF CONTENTS //////////
////////// TABLE OF CONTENTS TABLE OF CONTENTS TABLE OF CONTENTS //////////

// get json data

// for each ingredient, do all this (tabbed comments)
    // GENERATE ALLERGEN INFORMATION

    // CREATE TABLE ROW STRUCTURE
        // ingredient name and allergens
        // edit button
        // delete button
        // order buttons in DOM

        // CREATE EDIT BUTTON MODAL STRUCTURE
            // header
            // body
                // check boxes
            // footer

        // PUT MODAL STRUCTURE IN PROPER ORDER

        // DELETE BUTTON

    // ADD TABLE ROW TO TABLE

// search box listener
// nut allergen validation




//get json data
labelsObjects = [];
ingredientsObjects = [];
async function loadLabels() {
  const response = await fetch('./JSON/labels.json');
  const objects = await response.json();
  // copy response into array
  for (let i = 0; i < objects.length; i++) {
    labelsObjects[i] = objects[i];
  }
}
async function loadIngredients() {
  const response = await fetch('./JSON/ingredients.json');
  const objects = await response.json();
  // copy response into array
  for (let i = 0; i < objects.length; i++) {
    ingredientsObjects[i] = objects[i];
  }
}
loadIngredients()
loadLabels()
Promise.all([
    loadLabels(),
    loadIngredients()
])
.then(() => {
  let flexOrderNum = 1;
  let modalID = 0;
  let formNumber = 0;
  let realIngredientIDs = [];
  //adjust ingredient id's to be correct (fuck you clearDB)
  ingredientsObjects.forEach((a, index) => {
    realIngredientIDs[index] = a.ingredient_id;
    a.ingredient_id = Math.floor(a.ingredient_id / 10.0) + 1;
    index++;
  })

// for each ingredient, do all this
  ingredientsObjects.forEach((e, realIndex) => {

// GENERATE ALLERGEN INFORMATION
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

// CREATE TABLE ROW STRUCTURE

// ingredient name and allergens
    let myTR = document.createElement('tr')
    let ingredientColumn = document.createElement('th')
    let allergenColumn = document.createElement('td')
    ingredientColumn.scope = "row";
    ingredientColumn.className = "ingredientsColumn align-middle";
    ingredientColumn.innerHTML = e.ingredient_name;
    allergenColumn.className = "align-middle allergensColumn";
    allergenColumn.innerHTML = allergensString;

// edit button
    let editColumn = document.createElement('td')
    let editButton = document.createElement('button')
    editButton.className = "btn btn-dark ms-2 me-2 editButton";
    editColumn.className = "align-middle editColumn text-center";
    editButton.innerHTML = "<i class='bi-pencil align-self-center h-100 w-100 editButton'></i>";
    editButton.type="button";
    editButton.setAttribute("data-bs-toggle", "modal")
    let myModalID = "myModal" + modalID;
    let bsTarget = "#" + myModalID;
    editButton.setAttribute("data-bs-target", bsTarget)

// delete button
    let deleteColumn = document.createElement('td')
    let deleteButton = document.createElement('button')
    let hiddenLabelForm = document.createElement('form')
    let hiddenLabelID = document.createElement('input')
    let deleteLabelFormName = "editModalForm" + formNumber;
    let deleteModalName = "deleteModal" + formNumber;
    deleteButton.innerHTML = "<i class='bi-trash-fill align-self-center h-100 w-100 deleteButton'></i>";
    deleteButton.type="button";
    deleteButton.setAttribute("data-bs-toggle","modal")
    let deleteModalNameCopy = "#" + deleteModalName;
    deleteButton.setAttribute("data-bs-target", deleteModalNameCopy)
    deleteButton.className = "btn btn-dark ms-2 me-2 mainTableButton deleteButton";
    deleteColumn.className = "align-middle deleteColumn text-center";
    formNumber += 1;
    hiddenLabelForm.className = deleteLabelFormName;
    hiddenLabelForm.setAttribute("id", deleteLabelFormName)
    hiddenLabelForm.setAttribute("action", "./removeIngredient.php")
    hiddenLabelForm.setAttribute("method", "POST")
    hiddenLabelID.type = "hidden";
    hiddenLabelID.value = realIngredientIDs[realIndex];
    realIndex++;
    hiddenLabelID.name = "ingredientID";

// delete button modal
    let deleteModal = document.createElement('div')
    let deleteDialog = document.createElement('div')
    let deleteContent = document.createElement('div')
    let deleteHeader = document.createElement('div')
    let deleteTitle = document.createElement('h4')
    let deleteBody = document.createElement('div')
    let bodyText = document.createElement('p')
    let deleteFooter = document.createElement('div')
    let deleteCancel = document.createElement('button')
    let deleteConfirm = document.createElement('button')
    let msg = "Are you sure you want to delete ";
    msg += e.ingredient_name;
    msg += "?";
    bodyText.className = "confirmDeleteBody";
    bodyText.innerHTML = msg;
    deleteTitle.innerHTML = "CONFIRM DELETION";
    deleteModal.setAttribute("id",deleteModalName)
    deleteModal.className = "modal fade";
    deleteDialog.className = "modal-dialog modal-lg";
    deleteContent.className = "modal-content";
    deleteHeader.className = "modal-header";
    deleteBody.className = "modal-body";
    deleteFooter.className = "modal-footer"
    deleteCancel.className = "btn btn-danger dismissWidth mx-auto";
    deleteCancel.setAttribute("type","button")
    deleteCancel.setAttribute("data-bs-dismiss","modal")
    deleteCancel.innerHTML = "CANCEL";
    deleteConfirm.className = "btn btn-success mx-auto saveWidth submitBtn";
    deleteConfirm.setAttribute("type","submit")
    deleteConfirm.innerHTML = "DELETE"
    deleteModal.appendChild(deleteDialog)
    deleteDialog.appendChild(deleteContent)
    deleteContent.appendChild(deleteHeader)
    deleteHeader.appendChild(deleteTitle)
    deleteContent.appendChild(deleteBody)
    deleteBody.appendChild(bodyText)
    deleteContent.appendChild(deleteFooter)
    deleteFooter.appendChild(deleteCancel)
    deleteFooter.appendChild(deleteConfirm)

// order buttons in DOM
    myTR.appendChild(ingredientColumn)
    myTR.appendChild(allergenColumn)
    myTR.appendChild(editColumn)
    editColumn.appendChild(editButton)
    myTR.appendChild(deleteColumn)
    deleteColumn.appendChild(hiddenLabelForm)
    hiddenLabelForm.appendChild(hiddenLabelID)
    hiddenLabelForm.appendChild(deleteButton)
    hiddenLabelForm.appendChild(deleteModal)

// CREATE EDIT BUTTON MODAL STRUCTURE
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

// header
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

// body
    let modalBody = document.createElement('div')
    modalBody.className = "modal-body";
    let textArea = document.createElement('textarea')
    textArea.className = "form-control ingredientDescription";
    textArea.setAttribute("name", "ingredient_description")
    textArea.setAttribute("rows", "10")
    textArea.defaultValue = e.ingredient_contents;

// check boxes
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

// footer
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
    // hidden input with ingredient id to post to editIngredient.php
    let formHidden = document.createElement('input')
    formHidden.setAttribute("type", "hidden")
    formHidden.setAttribute("name", "ingredient_id")
    formHidden.setAttribute("value", e.ingredient_id);

// put modal structure in proper order
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
    // If the name contains "base", order it first
    if(e.ingredient_name.toLowerCase().includes("base")) {
      let flexOrder = "order-";
      flexOrder += flexOrderNum;
      myTR.className += flexOrder;
      flexOrderNum += 1;
    }

// ADD TABLE ROW TO TABLE
    let tableEntries = document.querySelector('.resultsBody')
    tableEntries.appendChild(myTR)
    modalID += 1;
  })  //end forEach in ingredientsObjects

// search box listener
  const myform = document.forms['modalForm']
  const box = myform.querySelector('input[type="text"]')
  box.addEventListener('keyup', (x) => {
    const searchTerm = x.target.value.toLowerCase()
    const listToSearch = document.querySelectorAll('.ingredientsColumn')
    listToSearch.forEach((v) => {
      const trClass = v.parentNode.className;
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

// input validation for tree nuts
  const tree_nutsCheck = document.querySelector('.tree_nutsCheck')
  const treeNutBox = document.querySelector('.treeNutInputSize');
  tree_nutsCheck.addEventListener('change', (a) => {
    if(a.target.checked == true) {
      treeNutBox.setAttribute("required","")
    } else {
      treeNutBox.removeAttribute("required")
    }
  }) // end toggle listener

}); // end then clause for promises
