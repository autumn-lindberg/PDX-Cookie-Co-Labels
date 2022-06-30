////////// TABLE OF CONTENTS TABLE OF CONTENTS TABLE OF CONTENTS //////////
////////// TABLE OF CONTENTS TABLE OF CONTENTS TABLE OF CONTENTS //////////
////////// TABLE OF CONTENTS TABLE OF CONTENTS TABLE OF CONTENTS //////////

// get json data
// function listenForSearch()
// add search listener to add new label

// for each label, do all this (tabbed comments)
    // GRAB ITS ID LIST (ingredient list)

    // CREATE TABLE ROW STRUCTURE
        // label name
        // print button
        // edit button
        // delete btn
        // delete btn modal
        // order buttons in DOM

        // CREATE PRINT'S MODAL STRUCTURE
            // print button modal's head
            // print button modal's body
                // for each ingredient in ID list, do this
                    // go through every ingredient from database
                        // if found, add ingriedient info to table
                    // edit and optimize label
            // print button modal's footer
                // print label in new window when print is clicked
            // put modal elements in proper order

        // CREATE EDIT'S MODAL STRUCTURE
            // edit button's modal head
            // edit button's modal body
                // add listener to search box using listenForSearch()
                // LEFT TABLE
                    // left table header
                    // left table body
                        // for each ingredient in label, do this
                            // cycle thru all ingredients from database
                                // add to left table if found
                    // edit button's modal footer
                    // put edit button's modal elements in proper order

// POPULATE RIGHT TABLES
    // create an array of tables to drop into their corresponding right table
    // for each label in database, do all this
        // table header
        // table body
            // for each ingredient in DB, create a table row to put into right tableS (plural)
                // create row structure for RIGHT TABLE
                // add event listener to add button
            // add table row into array

    // add table structure to from array to DOM

// search box listener

// get json data
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
  const resultsSpace = document.querySelector('.resultsBody')
  let flexOrderNum = 1;
  let modalID = 0;
  let formNumber = 0;
  //adjust ingredient id's to be correct (fuck you clearDB)
  ingredientsObjects.forEach((a) => {
    a.ingredient_id = Math.floor(a.ingredient_id / 10.0) + 1;
  })

// function listenForSearch()
  function listenForSearch (g) {
    const searchTerm = g.target.value.toLowerCase()
    const leftTableRow = document.querySelectorAll('.leftTableRow')
    const rightTableRow = document.querySelectorAll('.rightTableRow')
    // left table
    leftTableRow.forEach((v) => {
      const trClass = v.className;
      // grab their label names
      if(v.firstChild.innerHTML.toLowerCase().includes(searchTerm)) {
        // if class is set, clear it and correct
        if(!(trClass.includes("d-table-row"))) {
          v.className = "leftTableRow d-table-row";
        }
      }  // else not match
      else {
        // if class is set, just clear it
        if(!(trClass.includes("d-none"))) {
          v.className = "leftTableRow d-none";
        }
      } // end else
    }) // end list search
    // right table
    rightTableRow.forEach((v) => {
      const trClass = v.className;
      // grab their label names
      if(v.firstChild.innerHTML.toLowerCase().includes(searchTerm)) {
        // if class is set, clear it and correct
        if(!(trClass.includes("d-table-row"))) {
          v.className = "leftTableRow d-table-row";
        }
      }  // else not match
      else {
        // if class is set, just clear it
        if(!(trClass.includes("d-none"))) {
          v.className = "leftTableRow d-none";
        }
      } // end else
    }) // end list search
  } // end listenForSearch function

// add search listener to add new label
const newLabelSearch = document.querySelector('.newLabelSearch')
newLabelSearch.addEventListener('keyup', listenForSearch)

// for each label, do all this
  labelsObjects.forEach((e) => {

// GRAB ITS ID LIST (ingredient list)
    let idList = e.id_list;
    //parse label's id list
    let myIDs = idList.split(",")

// CREATE TABLE ROW STRUCTURE
    let myTR = document.createElement('tr')
    myTR.className = "tableRow";

// label name
    let labelColumn = document.createElement('th')
    labelColumn.scope = "row";
    labelColumn.className = "labelsColumn align-middle";
    labelColumn.innerHTML = e.label_name;

// print button
    let printColumn = document.createElement('td')
    let printButton = document.createElement('button')
    let printModal = document.createElement('div')
    let printModalBody = document.querySelector('.modal-body')
    printButton.innerHTML = "<i class='bi-printer align-self-center h-100 w-100'></i>";
    printButton.type = "button";
    printButton.className = "btn btn-dark ms-2 me-2 mainTableButton";
    printColumn.className = "align-middle printColumn";

// edit button
    let editColumn = document.createElement('td')
    let editButton = document.createElement('button')
    let editModal = document.createElement('div')
    editButton.innerHTML = "<i class='bi-pencil align-self-center h-100 w-100'></i>";
    editButton.type = "button";
    editButton.className = "btn btn-dark ms-2 me-2 mainTableButton";
    editColumn.className = "align-middle editColumn";

// delete btn
    let deleteColumn = document.createElement('td')
    let deleteButton = document.createElement('button')
    let hiddenLabelForm = document.createElement('form')
    let hiddenLabelID = document.createElement('input')
    let deleteLabelFormName = "editModalForm" + formNumber;
    let deleteModalName = "deleteModal" + formNumber;
    hiddenLabelForm.className = deleteLabelFormName;
    hiddenLabelForm.setAttribute("id", deleteLabelFormName)
    hiddenLabelForm.setAttribute("action", "./removeLabel.php")
    hiddenLabelForm.setAttribute("method", "POST")
    hiddenLabelID.type = "hidden";
    hiddenLabelID.value = e.label_id;
    hiddenLabelID.name = "labelID";
    deleteButton.innerHTML = "<i class='bi-trash-fill align-self-center h-100 w-100'></i>";
    deleteButton.type = "button";
    deleteButton.setAttribute("data-bs-toggle","modal")
    let deleteModalNameCopy = "#" + deleteModalName;
    deleteButton.setAttribute("data-bs-target", deleteModalNameCopy)
    deleteButton.className = "btn btn-dark ms-2 me-2 mainTableButton";
    deleteColumn.className = "align-middle deleteColumn text-center";

// delete btn modal
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
    msg += e.label_name;
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
    myTR.appendChild(labelColumn)
    myTR.appendChild(printColumn)
    myTR.appendChild(editColumn)
    myTR.appendChild(deleteColumn)
    printColumn.appendChild(printButton)
    printColumn.appendChild(printModal)
    editColumn.appendChild(editButton)
    editColumn.appendChild(editModal)
    deleteColumn.appendChild(hiddenLabelForm)
    hiddenLabelForm.appendChild(hiddenLabelID)
    hiddenLabelForm.appendChild(deleteButton)
    hiddenLabelForm.appendChild(deleteModal)

// CREATE PRINT'S MODAL STRUCTURE
    printButton.setAttribute("data-bs-toggle", "modal")
    let printModalID = "myModal" + modalID;
    let bsTarget = "#" + printModalID;
    modalID += 1;
    printButton.setAttribute("data-bs-target", bsTarget)
    let printModalDiv = document.createElement('div')
    printModalDiv.className = "modal fade printModalDiv";
    printModalDiv.id = printModalID;
    let printModalDialogue = document.createElement('div')
    printModalDialogue.className = "modal-dialog modal-xl modal-dialog-centered modalHeight";
    let printModalContent = document.createElement('div')
    printModalContent.className = "modal-content";

// print button modal's head
    let printModalHeader = document.createElement('div')
    printModalHeader.className = "modal-header";
    let printModalTitle = document.createElement('h3')
    printModalTitle.className = "modal-title w-100";
    let printModalTitleInput = document.createElement('div')
    printModalTitleInput.className = "text-center w-100";
    printModalTitleInput.innerHTML = e.label_name;
    printModalTitle.appendChild(printModalTitleInput)

// print button modal's body
    printModalBody = document.createElement('div')
    printModalBody.className = "modalBody printModalBody";
    let printModalScroll = document.createElement('div')
    printModalScroll.className = "modalNoScroll mx-auto mt-3 mb-3";
    printModalBody.appendChild(printModalScroll)
    let address = document.createElement('div')
    let printBox = document.createElement('div')
    //create box for ingredients
    let printModalBodyBox = document.createElement('div')
    printModalBodyBox.className = "ms-2 me-2 mt-2 mb-2 font-weight:bold";
    printModalBodyBox.setAttribute("style", "font-family:Wire One,sans-serif")
    //create space for allergens
    let allergensString = "";
    //create string to store ingredients list in
    let myIngredients = "";
    //create string to store description in
    let myDescription = "";

// for each ingredient in ID list, do this
    myIDs.forEach((z) => {

// go through every ingredient from database
      for(let b = 0; b < ingredientsObjects.length - 1; b++) {

// if ingredient is found, add its information to the label
        if(z == ingredientsObjects[b].ingredient_id) {
          // add ingredient to list - list first if it's a base
          if(ingredientsObjects[b].ingredient_name.toLowerCase().includes("base")) {
            myDescription = ingredientsObjects[b].ingredient_name + ", " + myDescription;
            myIngredients = ingredientsObjects[b].ingredient_name + "(" + ingredientsObjects[b].ingredient_contents + ")," + myIngredients;
          } else {
            // add ingredients to ingredient list
            myIngredients += ingredientsObjects[b].ingredient_name + "(";
            myIngredients += ingredientsObjects[b].ingredient_contents + "),";
            //add ingredients to description
            myDescription += ingredientsObjects[b].ingredient_name + ", ";
          }
          // check allergen information
          if(ingredientsObjects[b].milk == "true") {
            if(!(allergensString.includes("milk"))) {
              allergensString += "milk, ";
            }
          }  //milk
          if(ingredientsObjects[b].egg == "true") {
            if(!(allergensString.includes("egg"))) {
              allergensString += "egg, ";
            }
          }  //eggs
          if(ingredientsObjects[b].fish == "true") {
            if(!(allergensString.includes("fish"))) {
              allergensString += "fish, ";
            }
          }  //fish
          if(ingredientsObjects[b].shellfish == "true") {
            if(!(allergensString.includes("shellfish"))) {
              allergensString += "shellfish, ";
            }
          }  //shellfish
          if(ingredientsObjects[b].tree_nuts == "true") {
            if(!(allergensString.includes("tree nuts"))) {
              allergensString += "tree nuts(";
              allergensString += ingredientsObjects[b].tree_nut_name;
              allergensString += "), ";
            }
          }  //tree_nuts
          if(ingredientsObjects[b].wheat == "true") {
            if(!(allergensString.includes("wheat"))) {
              allergensString += "wheat, ";
            }
          }  //wheat
          if(ingredientsObjects[b].peanuts == "true") {
            if(!(allergensString.includes("peanuts"))) {
              allergensString += "peanuts, ";
            }
          }  //peanuts
          if(ingredientsObjects[b].soy == "true") {
            if(!(allergensString.includes("soy"))) {
              allergensString += "soy, ";
            }
          }  // soy
        }  // if matches
      }  // myIDs cycle

// edit and optimize label
      allergensString = allergensString.replaceAll(".",",")
      allergensString = allergensString.split("")
      allergensString[allergensString.length - 2] = ".";
      allergensString = allergensString.join("")
    }) // end cycle through parsed ingredients list
    // remove last comma and replace with period.
    myIngredients = myIngredients.split("")
    myIngredients[myIngredients.length - 1] = ".";
    // join back up as a string
    myIngredients = myIngredients.join("")
    // remove last two chars from description and replace with period.
    myDescription = myDescription.split("")
    myDescription[myDescription.length - 1] = "";
    myDescription[myDescription.length - 2] = "";
    // join back up as a string
    myDescription = myDescription.join("")
    //add description, content, and allergens to labelDescription div
    let descriptionBox = document.createElement('div')
    descriptionBox.className = "d-flex justify-content-center description";
    descriptionBox.setAttribute("style", "text-align:center; font-family:Wire One,Hepta Slab,serif,sans-serif; font-size: 10pt")
    let descriptionP = document.createElement('p')
    descriptionP.className = "text-center";
    descriptionP.innerHTML = myDescription;
    descriptionBox.appendChild(descriptionP)
    let ingredientsDiv = document.createElement('div')
    ingredientsDiv.setAttribute("style", "font-family:Wire One,Hepta Slab,serif,sans-serif;")
    ingredientsDiv.innerHTML = myIngredients;
    let allergensDiv = document.createElement('div')
    allergensDiv.setAttribute("style", "font-family:Wire One,Hepta Slab,serif,sans-serif;")
    allergensDiv.innerHTML = "Contains: " + allergensString;
    // text at bottom of label
    printBox.appendChild(descriptionBox)
    printBox.appendChild(ingredientsDiv)
    printBox.innerHTML += "<br>";
    printBox.appendChild(allergensDiv)
    printBox.innerHTML += "<br>";
    printBox.innerHTML += "<div class='d-flex justify-content-center' style='text-align:center; font-family:Wire One,Hepta Slab,serif,sans-serif; margin-bottom: 15pt;'><b class='text-center'>PDX Cookie Co - 7919 SE Stark St Portland OR 97215</b></div>";
    printBox.innerHTML += "<div class='d-flex justify-content-center' style='text-align:center; font-family:Wire One,Hepta Slab,serif,sans-serif; font-size: 15pt;'><b class='text-center'>Net Wt 5.0 Oz (142g)</b></div><br>";
    printModalScroll.appendChild(printBox)
    printModalScroll.appendChild(printModalBodyBox)
    // font size selector
    let fontSize = 10;
    fontString = fontSize + "px";
    let fontAdjustBox = document.createElement('div')
    fontAdjustBox.innerHTML = "Font Size <br>";
    fontAdjustBox.className = "text-center mx-auto w-50 fontAdjust";
    let fontButtonsBox = document.createElement('div')
    fontButtonsBox.className = "d-inline-flex align-items-center";
    let minusButton = document.createElement('i')
    minusButton.className = "bi-dash-square plusMinus w-100 h-100";
    let fontSizeDiv = document.createElement('div')
    fontSizeDiv.className = "fontAdjust ps-3 pe-3";
    fontSizeDiv.innerHTML = fontString;
    let plusButton = document.createElement('i')
    plusButton.className = "bi-plus-square plusMinus w-100 h-100";
    fontButtonsBox.appendChild(minusButton)
    fontButtonsBox.appendChild(fontSizeDiv)
    fontButtonsBox.appendChild(plusButton)
    fontAdjustBox.appendChild(fontButtonsBox)
    printModalBodyBox.appendChild(fontAdjustBox)
    minusButton.addEventListener('mouseover', (e) => {
      e.target.style.cursor = "pointer";
    })
    plusButton.addEventListener('mouseover', (e) => {
      e.target.style.cursor = "pointer";
    })
    minusButton.addEventListener('click', () => {
      fontSize -= 1;
      fontString = fontSize + "pt";
      fontSizeDiv.innerHTML = fontString;
    })
    plusButton.addEventListener('click', () => {
      fontSize += 1;
      fontString = fontSize + "pt";
      fontSizeDiv.innerHTML = fontString;
    })

// print button modal's footer
    let printModalFooter = document.createElement('div')
    printModalFooter.className = "modal-footer d-flex d-inline-flex w-100";
    let dismissBtn = document.createElement('button')
    dismissBtn.className = "btn btn-danger dismissWidth mx-auto";
    dismissBtn.setAttribute("type", "button")
    dismissBtn.setAttribute("data-bs-dismiss", "modal")
    dismissBtn.innerHTML = "CANCEL";
    let saveBtn = document.createElement('button')
    saveBtn.setAttribute("type", "submit")
    saveBtn.className = "btn btn-success mx-auto saveWidth";
    saveBtn.innerHTML = "PRINT";

// print label in new window when print is clicked
    saveBtn.addEventListener('click', (j) => {
      // GRAB CONTENT from inside the box in the print modal's body
      let printTitle = e.label_name;
      let myIDs = printBox.innerHTML;
      // open in in new window
      let myWindow = window.open('','','height=800px, width=1500px')
      myWindow.document.write('<html>')
      myWindow.document.write('<meta name="viewport" content="width=device-width,initial-scale=1">')
      myWindow.document.write('<link rel="preconnect" href="https://fonts.googleapis.com">')
      myWindow.document.write('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>')
      myWindow.document.write('<link href="https://fonts.googleapis.com/css2?family=Hepta+Slab&family=Wire+One&display=swap" rel="stylesheet">')
      myWindow.document.write('<body>')
      myWindow.document.write('<div style="height:525px; font-weight:bold; width:350px; font-size:' + fontString + '">')
      let titleSize = fontSize + 2;
      let titleString = titleSize + "pt";
      myWindow.document.write('<p style="text-align:center; font-size:' + titleString +  '; font-family:Wire One,sans-serif">')
      myWindow.document.write(printTitle)
      myWindow.document.write('</p>')
      myWindow.document.write('<p style="font-family:Wire One,sans-serif; font-weight:bold; letter-spacing:1px">')
      myWindow.document.write(myIDs)
      myWindow.document.write('</div></div></body></html>')
      myWindow.document.close()
      // print it! after the fonts load
      myWindow.document.addEventListener('DOMContentLoaded', (d) => {
            myWindow.print()
      })
    })  // end event listener on print button inside modal

// put modal elements in proper order
    printModalContent.appendChild(printModalHeader)
    printModalContent.appendChild(printModalTitle)
    printModalContent.appendChild(printModalBody)
    printModalContent.appendChild(printModalFooter)
    printModalDiv.appendChild(printModalDialogue)
    printModalDialogue.appendChild(printModalContent)
    printModalHeader.appendChild(printModalTitle)
    printModalFooter.appendChild(dismissBtn)
    printModalFooter.appendChild(saveBtn)
    printColumn.appendChild(printModalDiv)

// CREATE EDIT'S MODAL STRUCTURE
    editButton.setAttribute("data-bs-toggle", "modal")
    let editModalID = "myEditModal" + modalID;
    bsTarget = "#" + editModalID;
    modalID += 1;
    editButton.setAttribute("data-bs-target", bsTarget)
    let editModalDiv = document.createElement('div')
    editModalDiv.className = "modal fade editModalSize";
    editModalDiv.id = editModalID;
    let editModalDialogue = document.createElement('div')
    editModalDialogue.className = "modal-dialog modal-xl modal-dialog-centered";
    let editModalContent = document.createElement('div')
    editModalContent.className = "modal-content";
    let printModalForm = document.createElement('form')
    let printModalFormName = "editModalForm" + formNumber;
    printModalForm.className = printModalFormName;
    formNumber += 1;
    printModalForm.setAttribute("id", printModalFormName)
    printModalForm.setAttribute("action", "./editLabel.php")
    printModalForm.setAttribute("method", "POST")

// edit button's modal head
    let editModalHeader = document.createElement('div')
    editModalHeader.className = "modal-header";
    editModalTitle = document.createElement('h3')
    editModalTitle.className = "modal-title w-100";
    editModalTitleInput = document.createElement('input')
    editModalTitleInput.className = "form-control w-100 titleInput";
    editModalTitleInput.setAttribute("name", "ingredient_title")
    editModalTitleInput.setAttribute("type", "text")
    editModalTitleInput.setAttribute("required", "")
    editModalTitleInput.defaultValue = e.label_name;
    editModalTitle.appendChild(editModalTitleInput)

// edit button's modal body
    let editModalSearch = document.createElement('input')
    editModalSearch.className = "form-control mt-1 mb-4 mx-auto border border-dark modalSearch";
    editModalSearch.setAttribute("type","text")
    editModalSearch.setAttribute("placeholder","Search...")
    let editModalBody = document.createElement('div')
    editModalBody.className = "modal-body modalBody mb-5";
    let editModalBodyBox = document.createElement('div')
    editModalBodyBox.className = "d-flex d-inline-flex w-100";
    let editModalScroll = document.createElement('div')
    editModalScroll.className = "modalScroll border border-secondary border-rounded mx-auto mt-3 mb-3";
    let editModalScrollAll = document.createElement('div')
    editModalScrollAll.className = "modalScrollAll border border-secondary mx-auto mt-3 mb-3";
    let tableTitleBox = document.createElement('div')
    tableTitleBox.className = "d-flex justify-content-center mx-auto titlesBoxWidth";
    let leftTableTitleBox = document.createElement('div')
    leftTableTitleBox.className = "d-flex justify-content-center w-50 pe-5";
    let rightTableTitleBox = document.createElement('div')
    rightTableTitleBox.className = "d-flex justify-content-center w-50 ps-5";
    let leftTableTitle = document.createElement('p')
    leftTableTitle.className = "ms-2 me-2 mt-2 mb-2";
    leftTableTitle.innerHTML = "Ingredients in " + e.label_name;
    let rightTableTitle = document.createElement('p')
    rightTableTitle.innerHTML = "All Ingredients";
    rightTableTitle.className = "ms-2 me-2 mt-2 mb-2";
    // add modal body to DOM
    editModalBodyBox.appendChild(editModalScroll)
    editModalBodyBox.appendChild(editModalScrollAll)
    editModalBody.appendChild(editModalSearch)
    editModalBody.appendChild(tableTitleBox)
    tableTitleBox.appendChild(leftTableTitleBox)
    leftTableTitleBox.appendChild(leftTableTitle)
    tableTitleBox.appendChild(rightTableTitleBox)
    rightTableTitleBox.appendChild(rightTableTitle)
    editModalBody.appendChild(editModalBodyBox)

// search box listener
    editModalSearch.addEventListener('keyup', listenForSearch) //end event listener

// LEFT TABLE

// left table header
    let editModalTable = document.createElement('table')
    editModalTable.className = "table"
    let editModalTableHeader = document.createElement('thead')
    editModalTableHeader.className = "editModalTablelHeader";
    let editModalHeaderRow = document.createElement('tr')
    let editModalLabelName = document.createElement('th')
    editModalLabelName.setAttribute("scope","col")
    editModalLabelName.innerHTML = "Ingredient Name";
    let hiddenTh = document.createElement('th')
    hiddenTh.setAttribute("scope","col")
    let editModalAddHeader = document.createElement('th')
    editModalAddHeader.setAttribute("scope","col")
    editModalAddHeader.className = "editModalAddHeader";
    editModalAddHeader.innerHTML = "Remove";

// left table body
    editModalTableBody = document.createElement('tbody')
    editModalTableBody.className = "editModalResults";
    // order table body in DOM
    editModalHeaderRow.appendChild(editModalLabelName)
    editModalHeaderRow.appendChild(hiddenTh)
    editModalHeaderRow.appendChild(editModalAddHeader)
    editModalTable.appendChild(editModalTableHeader)
    editModalTable.appendChild(editModalTableBody)
    editModalTableHeader.appendChild(editModalHeaderRow)


// for each ingredient in label, do this
    myIDs.forEach((z) => {

// cycle thru all ingredients from database
      for(let b = 0; b < ingredientsObjects.length - 1; b++) {

// add to left table if found
        if(z == ingredientsObjects[b].ingredient_id) {
          // create table row structure
          let editModalTR = document.createElement('tr')
          editModalTR.className = "leftTableRow";
          let editModalPrimaryColumn = document.createElement('th')
          editModalPrimaryColumn.setAttribute("scope","row")
          editModalPrimaryColumn.innerHTML = ingredientsObjects[b].ingredient_name;
          let hiddenCol = document.createElement('td')
          let hiddenID = document.createElement('input')
          hiddenID.setAttribute("type","hidden")
          hiddenID.setAttribute("value", ingredientsObjects[b].ingredient_id);
          hiddenCol.appendChild(hiddenID)
          let editModalRemoveButtonCol = document.createElement('td')
          let editModalRemoveButton = document.createElement('button')
          editModalRemoveButton.className = "btn p-0 editModalRemoveButton";
          editModalRemoveButton.setAttribute("type","button")
          editModalRemoveButton.innerHTML = "<i class='bi-dash-square align-self-center h-100 w-100 editModalRemoveButton minusIcon'></i>";
          // add event listener to REMOVE button
          editModalRemoveButton.addEventListener('click', (s) => {
            // prevent default behavior and bubbling
            s.stopPropagation()
            // find tr from target and remove
            let mytr = s.target.parentNode.parentNode.parentNode.remove()
            // find target's ingredient id
            let targetIngredientId = s.target.parentNode.parentNode.previousSibling.firstChild.value;
            // ADD TO ALL OF THEM, ONLY POST HIDDENDIV VALUES TO EDITLABEL.PHP
            // add id of clicked ingredient to hidden input removeText
            let hiddenDiv = document.querySelectorAll('.removeText')
            hiddenDiv.forEach((x) => {
              x.value += "," + targetIngredientId;
              })
          }) // end remove button's event listener
          //add table row to DOM
          editModalScroll.appendChild(editModalTable)
          editModalRemoveButtonCol.appendChild(editModalRemoveButton)
          editModalTR.appendChild(editModalPrimaryColumn)
          editModalTR.appendChild(hiddenCol)
          editModalTR.appendChild(editModalRemoveButtonCol)
          editModalTableBody.appendChild(editModalTR)
        }  // end if matches
      }  //end all ingredients
    }) // end foreach from entries in left table

// edit button's modal footer
    editModalFooter = document.createElement('div')
    editModalFooter.className = "modal-footer d-flex d-inline-flex w-100";
    dismissBtn = document.createElement('button')
    dismissBtn.className = "btn btn-danger dismissWidth mx-auto";
    dismissBtn.setAttribute("type", "button")
    dismissBtn.setAttribute("data-bs-dismiss", "modal")
    dismissBtn.innerHTML = "CANCEL";
    saveBtn = document.createElement('button')
    saveBtn.setAttribute("type", "submit")
    saveBtn.className = "btn btn-success mx-auto saveWidth submitBtn";
    saveBtn.innerHTML = "UPDATE";

// put edit button's modal elements in proper order
    printModalForm.appendChild(editModalHeader)
    printModalForm.appendChild(editModalBody)
    printModalForm.appendChild(editModalFooter)
    editModalDiv.appendChild(editModalDialogue)
    editModalDialogue.appendChild(editModalContent)
    editModalHeader.appendChild(editModalTitle)
    editModalFooter.appendChild(dismissBtn)
    editModalFooter.appendChild(saveBtn)
    editColumn.appendChild(editModalDiv)
    editModalContent.appendChild(printModalForm)
    // foreach entry in labels table - ADD ENTIRE TABLE ROW STRUCTURE TO DOM
    let tableEntries = document.querySelector('.resultsBody')
    tableEntries.appendChild(myTR)
    // for each label's modal, have an empty, hidden div to put removeList into
    let removeSpace = document.createElement('input')
    removeSpace.className = "removeText";
    removeSpace.setAttribute("type","hidden")
    removeSpace.setAttribute("name","removeString")
    removeSpace.setAttribute("value","")
    printModalForm.appendChild(removeSpace)
    // for each label's modal, have an empty, hidden div to put addList into
    let appendSpace = document.createElement('input')
    appendSpace.className = "appendText";
    appendSpace.setAttribute("type","hidden")
    appendSpace.setAttribute("name","appendString")
    appendSpace.setAttribute("value","")
    printModalForm.appendChild(appendSpace)
    // for each label's modal, have an empty, hidden div to put labelName into
    let appendLabelName = document.createElement('input')
    appendLabelName.className = "labelName";
    appendLabelName.setAttribute("type","hidden")
    appendLabelName.setAttribute("name","labelName")
    appendLabelName.setAttribute("value",e.label_name)
    printModalForm.appendChild(appendLabelName)
    modalID += 1;
  })  // end forEach

// POPULATE RIGHT TABLES

// create an array of tables to drop into their corresponding right table
  let tableArray = [];
  let ingredientsIndex = 0;

// for each label in database, do all this
  labelsObjects.forEach((u) => {

// table header
    let editModalTableAll = document.createElement('table')
    editModalTableAll.className = "table";
    let editModalTableHeaderAll = document.createElement('thead')
    editModalTableHeaderAll.className = "editModalTablelHeaderAll";
    let editModalHeaderRowAll = document.createElement('tr')
    let editModalLabelNameAll = document.createElement('th')
    editModalLabelNameAll.setAttribute("scope","col")
    editModalLabelNameAll.innerHTML = "Ingredient Name";
    let hiddenColAll = document.createElement('th')
    hiddenColAll.setAttribute("scope","col")
    let editModalRemoveHeaderAll = document.createElement('th')
    editModalRemoveHeaderAll.setAttribute("scope","col")
    editModalRemoveHeaderAll.className = "editModalRemoveHeader";
    editModalRemoveHeaderAll.innerHTML = "Add";
    // organize table structure
    editModalHeaderRowAll.appendChild(editModalLabelNameAll)
    editModalHeaderRowAll.appendChild(hiddenColAll)
    editModalHeaderRowAll.appendChild(editModalRemoveHeaderAll)
    editModalTableHeaderAll.appendChild(editModalHeaderRowAll)
    editModalTableAll.appendChild(editModalTableHeaderAll)

// table body
    let editModalTableBodyAll = document.createElement('tbody')
    editModalTableBodyAll.className = "editModalTableBodyAll";
    // grab current ingredient id
    let hiddenIdAll = document.createElement('input')
    hiddenIdAll.setAttribute("type","hidden")
    hiddenIdAll.setAttribute("value", ingredientsObjects[ingredientsIndex].ingredient_id)
    // create an array to store rows in
    let rowAll = [];
    let rowAllIndex = 0;

// for each ingredient in DB, create a table row to put into right tableS (plural)
    for(let w = 0; w < ingredientsObjects.length; w++) {

// create row structure for RIGHT TABLE
      let editModalTrAll = document.createElement('tr')
      editModalTrAll.className = "rightTableRow"
      let editModalPrimaryColumnAll = document.createElement('th')
      editModalPrimaryColumnAll.setAttribute("scope","row")
      editModalPrimaryColumnAll.innerHTML = ingredientsObjects[w].ingredient_name;
      let editModalHiddenColAll = document.createElement('td')
      let hiddenInputAll = document.createElement('input')
      hiddenInputAll.className = "hiddenInputAll";
      hiddenInputAll.setAttribute("type","hidden")
      hiddenInputAll.setAttribute("value", ingredientsObjects[w].ingredient_id)
      editModalHiddenColAll.appendChild(hiddenInputAll)
      let editModalRemoveButtonColAll = document.createElement('td')
      let editModalRemoveButtonAll = document.createElement('button')
      editModalRemoveButtonAll.className = "btn p-0 editModalAddButton";
      editModalRemoveButtonAll.setAttribute("type","button")
      editModalRemoveButtonAll.innerHTML = "<i class='bi-plus-square align-self-center h-100 w-100 editModalAddButton addIcon'></i>";
      editModalRemoveButtonColAll.appendChild(editModalRemoveButtonAll)
      editModalTrAll.appendChild(editModalPrimaryColumnAll)
      editModalTrAll.appendChild(editModalHiddenColAll)
      editModalTrAll.appendChild(editModalRemoveButtonColAll)
      editModalTableBodyAll.appendChild(editModalTrAll)
      editModalTableAll.appendChild(editModalTableBodyAll)
      rowAll[rowAllIndex] = editModalTrAll;

// add event listener to add button
      editModalRemoveButtonAll.addEventListener('click', (m) => {
        // prevent default behavior and bubbling
        m.stopPropagation()
        // clear listener
        m.target.removeEventListener('click', () => {})
        // find target's ingredient id
        let targetIngredientIdAll = m.target.parentNode.parentNode.previousSibling.firstChild.value;
        // grab entire table row
        let rowStringAll = m.target.parentNode.parentNode.parentNode.innerHTML;
        // format it
        rowStringAll = "<tr>" + rowStringAll + "</tr>";
        // ADD TO ALL OF THEM, ONLY POST HIDDENDIV VALUES TO EDITLABEL.PHP
        // add it to the current labels list
        let labelsTablesAll = document.querySelectorAll('.editModalResults')
        labelsTablesAll.forEach((w) => {
          w.innerHTML += rowStringAll;
        })
        // add id of clicked ingredient to hidden input appendText
        let hiddenDiv = document.querySelectorAll('.appendText')
        hiddenDiv.forEach((x) => {
          x.value += "," + targetIngredientIdAll;
        })
        // query dom for ROW NOW IN LEFT TABLE
        let newListenerTarget = document.querySelectorAll('.editModalResults > tr > td > button')
        // add a new listener to ROW NOW IN LEFT TABLE
        newListenerTarget.forEach((s) => {
          let test = 0;
          // add its ingredient id to string list
          test = s.parentNode.previousSibling.firstChild.value;
          s.addEventListener('click', (q) => {
            //stop bubbling
            q.stopPropagation()
            // add clicked ingredient id to remove list
            let hiddenRemoveDiv = document.querySelectorAll('.removeText')
            hiddenRemoveDiv.forEach((x) => {
              x.value += "," + test;
            })
            // remove row
            q.target.parentNode.parentNode.parentNode.remove()
          })
        })  // end new listener
        // clear button of its old classes and assign new ones
        let entriesAll = document.querySelectorAll('.editModalResults > tr > td > button')
        entriesAll.forEach((h) => {
          if(h.className.includes("editModalAddButton")) {
            let newClass4 = h.className.replace("editModalAddButton","editModalRemoveButton")
            h.className = newClass4;
          }
        })
        //clear icon of its old classes and assign new ones
        let buttonAll = document.querySelectorAll('.editModalResults > tr > td > button > i')
        buttonAll.forEach((v) => {
          if(v.className.includes("editModalAddButton")) {
            let newClass5 = v.className.replace("editModalAddButton","editModalRemoveButton")
            newClass5 = newClass5.replace("plus","dash")
            v.className = newClass5;
          }
          if(v.className.includes("addIcon")) {
            let newClass6 = v.className.replace("addIcon","minusIcon")
            v.className += " " + newClass6;
          }
        })
      })  // END EVENT LISTENER
    }  // end cycle through all ingredients from database (for right table)

// add table row into array
    tableArray[ingredientsIndex] = editModalTableAll;
    ingredientsIndex++;
  })  // END ALL LABELS CYCLE FOR ARRAY OF TABLES
  //add one extra right table to table array
  tableArray[ingredientsIndex] = tableArray[ingredientsIndex - 1]

//add table structure to from array to DOM
  const spaceToPlace = document.querySelectorAll('.modalScrollAll')
  for(let b = 0; b < spaceToPlace.length; b++) {
    //add table structure to dom from array
    spaceToPlace[b].appendChild(tableArray[b])
  }

// search box listener
  const myform = document.forms['modalForm']
  const box = myform.querySelector('input[type="text"]')
  box.addEventListener('keyup', (x) => {
    let searchTerm = x.target.value.toLowerCase()
    const listToSearch = document.querySelectorAll('.labelsColumn')
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

}); // end then clause for promises
