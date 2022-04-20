document.addEventListener('DOMContentLoaded', () => {

let jsonStringElement = document.querySelector('.encodedJSON')
let resultsSpace = document.querySelector('.resultsBody')
let jsonString = jsonStringElement.innerHTML;

// parse json into ingredients and labels
let ingredients = jsonString.match(/^\[[^\]]+\]/)
ingredients = ingredients.join("")
let labels = jsonString.match(/[^\]]+\]$/)
labels = labels.join("")

// remove first brace and last brace
labels = labels.replaceAll('}]','}')
labels = labels.replaceAll('[{','{')
ingredients = ingredients.replaceAll('}]','}')
ingredients = ingredients.replaceAll('[{','{')

// create array to store actual objects
let labelsObjects = [];
let ingredientsObjects = [];

// SPLIT LABELS INTO ITS COMPONENT JSON
// add comma at the end so that parses all including end
labels += ",";
ingredients += ",";
// replace to prep for split
// split will yank off extra curly and space
labels = labels.replaceAll("},","}} ")
ingredients = ingredients.replaceAll("},","}} ")

// split into array of properly formatted json strings
labels = labels.split("} ")
ingredients = ingredients.split("} ")

// record size of labels and ingredient arrays
let labelsSize = labels.length - 1;
let ingredientsSize = ingredients.length - 1;

for(let n = 0; n < labelsSize; n++) {
  labelsObjects[n] = JSON.parse(labels[n])
}
for(let f = 0; f < ingredientsSize; f++) {
  ingredientsObjects[f] = JSON.parse(ingredients[f])
}

let flexOrderNum = 1;
let modalID = 0;
let formNumber = 0;

//adjust ingredient id's to be correct (fuck you clearDB)
ingredientsObjects.forEach((a) => {
  a.ingredient_id = Math.floor(a.ingredient_id / 10.0) + 1;
})

////////// LABELS TABLE LABELS TABLE LABELS TABLE //////////
////////// LABELS TABLE LABELS TABLE LABELS TABLE //////////
////////// LABELS TABLE LABELS TABLE LABELS TABLE //////////

labelsObjects.forEach((e) => {

  //grab label id list
  let idList = e.id_list;

  //parse label's id list
  let myIDs = idList.split(",")

  // CREATE TABLE STRUCTURE
  let myTR = document.createElement('tr')
  myTR.className = "tableRow";
  let labelColumn = document.createElement('th')
  let printColumn = document.createElement('td')
  let printButton = document.createElement('button')
  let printModal = document.createElement('div')
  let editColumn = document.createElement('td')
  let editButton = document.createElement('button')
  let editModal = document.createElement('div')
  let printModalBody = document.querySelector('.modal-body')

  // Order table structure in DOM
  myTR.appendChild(labelColumn)
  myTR.appendChild(printColumn)
  myTR.appendChild(editColumn)
  printColumn.appendChild(printButton)
  printColumn.appendChild(printModal)
  editColumn.appendChild(editButton)
  editColumn.appendChild(editModal)

  //add classes to table structure
  labelColumn.scope = "row";
  labelColumn.className = "ingredientsColumn align-middle";
  labelColumn.innerHTML = e.label_name;
  editButton.innerHTML = "<i class='bi-pencil align-self-center h-100 w-100 editButton'></i>";
  editButton.type="button";
  editButton.className = "btn btn-dark ms-2 me-2 editButton";
  editColumn.className = "align-middle editColumn";
  printButton.innerHTML = "<i class='bi-printer align-self-center h-100 w-100 editButton'></i>";
  printButton.type="button";
  printButton.className = "btn btn-dark ms-2 me-2 printButton";
  printColumn.className = "align-middle printColumn";

  ////////// PRINT BUTTON MODAL PRINT BUTTON MODAL //////////
  ////////// PRINT BUTTON MODAL PRINT BUTTON MODAL //////////
  ////////// PRINT BUTTON MODAL PRINT BUTTON MODAL //////////

  // create print button's modal structure
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

  // print button's modal head
  let printModalHeader = document.createElement('div')
  printModalHeader.className = "modal-header";
  let printModalTitle = document.createElement('h3')
  printModalTitle.className = "modal-title w-100";
  let printModalTitleInput = document.createElement('div')
  printModalTitleInput.className = "text-center w-100";
  printModalTitleInput.innerHTML = e.label_name;
  printModalTitle.appendChild(printModalTitleInput)

  ///// PRINT BUTTON MODAL BODY /////
  ///// PRINT BUTTON MODAL BODY /////
  ///// PRINT BUTTON MODAL BODY /////

  printModalBody = document.createElement('div')
  printModalBody.className = "modalBody printModalBody";
  let printModalScroll = document.createElement('div')
  printModalScroll.className = "modalNoScroll mx-auto mt-3 mb-3";
  printModalBody.appendChild(printModalScroll)
  let address = document.createElement('div')

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

  ///// CYCLE THROUGH PARSED INGREDIENTS LIST /////
  ///// CYCLE THROUGH PARSED INGREDIENTS LIST /////
  ///// CYCLE THROUGH PARSED INGREDIENTS LIST /////

  myIDs.forEach((z) => {

    // go through every ingredient from database
    for(let b = 0; b < ingredientsObjects.length - 1; b++) {

      // if it matches the ingredient id from the list
      if(z == ingredientsObjects[b].ingredient_id) {

        // add ingredient to list - list first if it's a base
        if(ingredientsObjects[b].ingredient_name.toLowerCase().includes("base")) {
          myDescription = ingredientsObjects[b].ingredient_name + "," + myDescription;
          myIngredients = ingredientsObjects[b].ingredient_name + "(" + ingredientsObjects[b].ingredient_contents + ")," + myIngredients;
        }
        else {
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

    // OPTIMIZE ALLERGEN LIST
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
  printModalBodyBox.appendChild(descriptionBox)
  printModalBodyBox.appendChild(ingredientsDiv)
  printModalBodyBox.innerHTML += "<br>";
  printModalBodyBox.appendChild(allergensDiv)
  printModalBodyBox.innerHTML += "<br>";
  printModalBodyBox.innerHTML += "<div class='d-flex justify-content-center' style='text-align:center; font-family:Wire One,Hepta Slab,serif,sans-serif; margin-bottom: 15pt;'><b class='text-center'>PDX Cookie Co - 7919 SE Stark St Portland OR 97215</b></div>";
  printModalBodyBox.innerHTML += "<div class='d-flex justify-content-center' style='text-align:center; font-family:Wire One,Hepta Slab,serif,sans-serif; font-size: 15pt;'><b class='text-center'>Net Wt 5.0 Oz (142g)</b></div>";
  printModalScroll.appendChild(printModalBodyBox)


  // PRINT BUTTON's MODAL FOOTER
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

  // add event listener to print button
  saveBtn.addEventListener('click', (j) => {

    // GRAB CONTENT from inside the box in the print modal's body
    let printTitle = e.label_name;
    let myIDs = printModalBodyBox.innerHTML;

    // open in in new window
    let myWindow = window.open('','','height=800px, width=1500px')
    myWindow.document.write('<html>')
    myWindow.document.write('<link rel="preconnect" href="https://fonts.googleapis.com">')
    myWindow.document.write('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>')
    myWindow.document.write('<link href="https://fonts.googleapis.com/css2?family=Wire+One&display=swap" rel="stylesheet">')
    myWindow.document.write('<body><div style="height:525px; font-weight:bold; width:350px; background: linear-gradient(to right, #333 1px, white 1px, white calc(100% - 1px), #333); font-size:11px">')
    myWindow.document.write('<p style="text-align:center; font-weight:bold; font-family:Wire One,sans-serif">')
    myWindow.document.write(printTitle)
    myWindow.document.write('</p>')
    myWindow.document.write('<p style="font-family:Wire One,sans-serif">')
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

  ////////// EDIT BUTTON'S MODAL EDIT BUTTON'S MODAL //////////
  ////////// EDIT BUTTON'S MODAL EDIT BUTTON'S MODAL //////////
  ////////// EDIT BUTTON'S MODAL EDIT BUTTON'S MODAL //////////

  // create modal structure
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

  // edit button's modal header
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

  ////////// LEFT TABLE LEFT TABLE LEFT TABLE LEFT TABLE LEFT TABLE //////////
  ////////// LEFT TABLE LEFT TABLE LEFT TABLE LEFT TABLE LEFT TABLE //////////
  ////////// LEFT TABLE LEFT TABLE LEFT TABLE LEFT TABLE LEFT TABLE //////////

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

  //PARSE INGREDIENTS
  let idListString = e.id_list;
  ingredientList = e.id_list;
  myIDs = ingredientList.split(",")

  ///// LEFT TABLE BODY LEFT TABLE BODY LEFT TABLE BODY /////
  ///// LEFT TABLE BODY LEFT TABLE BODY LEFT TABLE BODY /////
  ///// LEFT TABLE BODY LEFT TABLE BODY LEFT TABLE BODY /////

  myIDs.forEach((z) => {

    // cycle thru all ingredients from database
    for(let b = 0; b < ingredientsObjects.length - 1; b++) {

      // if the current id from parsed list matches db list
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
        editModalRemoveButton.className = "btn btn-dark p-0 editModalRemoveButton";
        editModalRemoveButton.setAttribute("type","button")
        editModalRemoveButton.innerHTML = "<i class='bi-dash-square-fill align-self-center h-100 w-100 editModalRemoveButton'></i>";

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

  // for each label's modal, have an empty, hidden div to add list to
  let appendSpace = document.createElement('input')
  appendSpace.className = "appendText";
  appendSpace.setAttribute("type","hidden")
  appendSpace.setAttribute("name","appendString")
  appendSpace.setAttribute("value","")
  printModalForm.appendChild(appendSpace)

  // for each label's modal, have an empty, hidden div to add list to
  let appendLabelName = document.createElement('input')
  appendLabelName.className = "labelName";
  appendLabelName.setAttribute("type","hidden")
  appendLabelName.setAttribute("name","labelName")
  appendLabelName.setAttribute("value",e.label_name)
  printModalForm.appendChild(appendLabelName)

  modalID += 1;
})  // end forEach

////////// END LEFT TABLE/FOREACH ENTRY IN LABELS - START RIGHT TABLE //////////
////////// END LEFT TABLE/FOREACH ENTRY IN LABELS - START RIGHT TABLE //////////
////////// END LEFT TABLE/FOREACH ENTRY IN LABELS - START RIGHT TABLE //////////

// create an array of tables to drop into their corresponding right table
let tableArray = [];
let ingredientsIndex = 0;

// cycle through ALL LABELS - creating an array with the same table in each index
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

  // cycle through all of ingredients from database
  // it looks nested because each entry in labels table
  // needs a copy of the full ingredients list
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
    editModalRemoveButtonAll.className = "btn btn-dark p-0 editModalAddButton";
    editModalRemoveButtonAll.setAttribute("type","button")
    editModalRemoveButtonAll.innerHTML = "<i class='bi-plus-square-fill align-self-center h-100 w-100 editModalAddButton'></i>";
    editModalRemoveButtonColAll.appendChild(editModalRemoveButtonAll)
    editModalTrAll.appendChild(editModalPrimaryColumnAll)
    editModalTrAll.appendChild(editModalHiddenColAll)
    editModalTrAll.appendChild(editModalRemoveButtonColAll)
    editModalTableBodyAll.appendChild(editModalTrAll)
    editModalTableAll.appendChild(editModalTableBodyAll)
    rowAll[rowAllIndex] = editModalTrAll;

    // ADD EVENT LISTENER TO ADD BUTTON on RIGHT TABLE
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
      })

    })  // END EVENT LISTENER

  }  // end cycle through all ingredients from database (for right table)

  // add table row into array
  tableArray[ingredientsIndex] = editModalTableAll;
  ingredientsIndex++;

})  // END ALL LABELS CYCLE FOR ARRAY OF TABLES


//add table structure to spacetoplaces
let spaceToPlace = document.querySelectorAll('.modalScrollAll')

for(let b = 0; b < spaceToPlace.length; b++) {

  //add table structure to dom from array
  spaceToPlace[b].appendChild(tableArray[b])

}

///// ADD NEW LABEL MODAL BODY /////
///// ADD NEW LABEL MODAL BODY /////
///// ADD NEW LABEL MODAL BODY /////

let newLabelModalBody = document.querySelector('.newLabel')

// add search bar
let newLabelSearch = document.createElement('input')
newLabelSearch.className = "form-control mt-1 mb-4 mx-auto border border-dark modalSearch";
newLabelSearch.setAttribute("type","text")
newLabelSearch.setAttribute("placeholder","Search...")
// add search bar to DOM
newLabelModalBody.appendChild(newLabelSearch)
// table titles
let tableTitles = document.createElement('div')
tableTitles.className = "d-flex justify-content-center mx-auto titlesBoxWidth";
// left table title
let newLabelTitle = document.createElement('div')
newLabelTitle.className = "d-flex justify-content-center w-50 pe-5";
let newLabelTitleP = document.createElement('p')
newLabelTitleP.className = "ms-2 me-2 mt-2 mb-2";
newLabelTitleP.innerHTML = "Ingredients in Label Name...";
// right table title
let newLabelAllIngredients = document.createElement('div')
newLabelAllIngredients.className = "d-flex justify-content-center w-50 pe-5";
let newLabelAllIngredientsP = document.createElement('p')
newLabelAllIngredientsP.className = "ms-2 me-2 mt-2 mb-2";
newLabelAllIngredientsP.innerHTML = "All Ingredients";

// add table titles to DOM
newLabelTitle.appendChild(newLabelTitleP)
newLabelAllIngredients.appendChild(newLabelAllIngredientsP)
tableTitles.appendChild(newLabelTitle)
tableTitles.appendChild(newLabelAllIngredients)
newLabelModalBody.appendChild(tableTitles)

// boxes for new Label table
let newLabelTablesBox = document.createElement('div')
newLabelTablesBox.className = "d-flex d-inline-flex w-100 newLabelTablesBox";
newLabelModalBody.appendChild(newLabelTablesBox)

////////// LEFT TABLE LEFT TABLE LEFT TABLE //////////
////////// LEFT TABLE LEFT TABLE LEFT TABLE //////////
////////// LEFT TABLE LEFT TABLE LEFT TABLE //////////

// create box for table to be in
let newLeftTableBox = document.createElement('div')
newLeftTableBox.className = "modalScroll border border-secondary border-rounded mx-auto mt-3 mb-3";
// add new left table to DOM
newLabelTablesBox.appendChild(newLeftTableBox)

// left table header
let newModalTable = document.createElement('table')
newModalTable.className = "table"
let newModalTableHeader = document.createElement('thead')
newModalTableHeader.className = "editModalTablelHeader";
let newModalHeaderRow = document.createElement('tr')
let newModalLabelName = document.createElement('th')
newModalLabelName.setAttribute("scope","col")
newModalLabelName.innerHTML = "Ingredient Name";
let newHiddenTh = document.createElement('th')
newHiddenTh.setAttribute("scope","col")
let newModalAddHeader = document.createElement('th')
newModalAddHeader.setAttribute("scope","col")
newModalAddHeader.className = "editModalAddHeader";
newModalAddHeader.innerHTML = "Remove";

// left table body
newModalTableBody = document.createElement('tbody')
newModalTableBody.className = "editModalResults";

// order table body in DOM
newModalHeaderRow.appendChild(newModalLabelName)
newModalHeaderRow.appendChild(newHiddenTh)
newModalHeaderRow.appendChild(newModalAddHeader)
newModalTable.appendChild(newModalTableHeader)
newModalTable.appendChild(newModalTableBody)
newModalTableHeader.appendChild(newModalHeaderRow)

newLeftTableBox.appendChild(newModalTable)

////////// RIGHT TABLE RIGHT TABLE RIGHT TABLE ///////////
////////// RIGHT TABLE RIGHT TABLE RIGHT TABLE ///////////
////////// RIGHT TABLE RIGHT TABLE RIGHT TABLE ///////////

// create box for table to be in
let newRightTableBox = document.createElement('div')
newRightTableBox.className = "modalScroll border border-secondary border-rounded mx-auto mt-3 mb-3";
// add new right table to DOM
newLabelTablesBox.appendChild(newRightTableBox)

// table header
let newModalTableAll = document.createElement('table')
newModalTableAll.className = "table";
let newModalTableHeaderAll = document.createElement('thead')
newModalTableHeaderAll.className = "editModalTablelHeaderAll";
let newModalHeaderRowAll = document.createElement('tr')
let newModalLabelNameAll = document.createElement('th')
newModalLabelNameAll.setAttribute("scope","col")
newModalLabelNameAll.innerHTML = "Ingredient Name";
let newHiddenColAll = document.createElement('th')
newHiddenColAll.setAttribute("scope","col")
let newModalRemoveHeaderAll = document.createElement('th')
newModalRemoveHeaderAll.setAttribute("scope","col")
newModalRemoveHeaderAll.className = "editModalRemoveHeader";
newModalRemoveHeaderAll.innerHTML = "Add";

// organize table structure
newModalHeaderRowAll.appendChild(newModalLabelNameAll)
newModalHeaderRowAll.appendChild(newHiddenColAll)
newModalHeaderRowAll.appendChild(newModalRemoveHeaderAll)
newModalTableHeaderAll.appendChild(newModalHeaderRowAll)
newModalTableAll.appendChild(newModalTableHeaderAll)

newRightTableBox.appendChild(newModalTableAll)

// table body
let newModalTableBodyAll = document.createElement('tbody')
newModalTableBodyAll.className = "editModalTableBodyAll";
newModalTableAll.appendChild(newModalTableBodyAll)

// create an array to store rows in
let newRowAll = [];
let newRowAllIndex = 0;

// cycle through all of ingredients from database
// it looks nested because each entry in labels table
// needs a copy of the full ingredients list
for(let w = 0; w < ingredientsObjects.length; w++) {

  //change syntax so that it works with foreach
  let tableRow = ingredientsObjects[w];

  // create row structure for RIGHT TABLE
  let newModalTrAll = document.createElement('tr')
  newModalTrAll.className = "rightTableRow"
  let newModalPrimaryColumnAll = document.createElement('th')
  newModalPrimaryColumnAll.setAttribute("scope","row")
  newModalPrimaryColumnAll.innerHTML = ingredientsObjects[w].ingredient_name;
  let newModalHiddenColAll = document.createElement('td')
  let newHiddenInputAll = document.createElement('input')
  newHiddenInputAll.className = "hiddenInputAll";
  newHiddenInputAll.setAttribute("type","hidden")
  newHiddenInputAll.setAttribute("value", ingredientsObjects[w].ingredient_id)
  newModalHiddenColAll.appendChild(newHiddenInputAll)
  let newModalRemoveButtonColAll = document.createElement('td')
  let newModalRemoveButtonAll = document.createElement('button')
  newModalRemoveButtonAll.className = "btn btn-dark p-0 editModalAddButton";
  newModalRemoveButtonAll.setAttribute("type","button")
  newModalRemoveButtonAll.innerHTML = "<i class='bi-plus-square-fill align-self-center h-100 w-100 editModalAddButton'></i>";
  newModalRemoveButtonColAll.appendChild(newModalRemoveButtonAll)
  newModalTrAll.appendChild(newModalPrimaryColumnAll)
  newModalTrAll.appendChild(newModalHiddenColAll)
  newModalTrAll.appendChild(newModalRemoveButtonColAll)
  newModalTableBodyAll.appendChild(newModalTrAll)
  newModalTableAll.appendChild(newModalTableBodyAll)
  newRowAll[newRowAllIndex] = newModalTrAll;

  // ADD EVENT LISTENERS TO BUTTON
  newModalRemoveButtonAll.addEventListener('click', (m) => {
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
    }) // end foreach
  }) //end event listener

} // end for loop cycling thru all ingredients

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

//ADD LISTENER TO POP UP MODALS
for(let i = 1; i <= labelsObjects.length + 1; i++) {
  let classname = document.forms[i]
  let box = classname.querySelector('.modalSearch')
  let titleInput = classname.querySelector('.titleInput')

  titleInput.addEventListener('keyup', (d) => {

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

  }) // end keyup listener

  box.addEventListener('keyup', (g) => {
    let searchTerm = g.target.value.toLowerCase()
    let leftTableRow = document.querySelectorAll('.leftTableRow')
    let rightTableRow = document.querySelectorAll('.rightTableRow')

    // left table
    leftTableRow.forEach((v) => {
      let trClass = v.className;
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
      let trClass = v.className;
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


  }) //end event listener

} // end add listener for loop


}) //end dom content loaded
