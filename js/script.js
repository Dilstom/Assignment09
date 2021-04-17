// CREATE AN ARRAY OF EMPLOYEES
let employees = [];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
if (localStorage.employees) {
  // IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
  employees = JSON.parse(localStorage.employees);
}
// GET DOM ELEMENTS
const $ = (id) => document.getElementById(id);
let empCount = $("empCount");
let form = $("addForm");
let empTable = $("employees");

let count = 0;

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
if (employees.length > 0) {
  console.log("empl: ", employees);
  buildGrid();
}

// ADD EMPLOYEE
form.addEventListener("submit", (e) => {
  // PREVENT FORM SUBMISSION
  e.preventDefault();

  // GET THE VALUES FROM THE TEXT BOXES
  let id = $("id").value;
  let name = $("name").value;
  let extension = $("extension").value;
  let email = $("email").value;
  let department = $("department").value;

  // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
  let newArr = [id, name, extension, email, department];

  // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
  employees.push(newArr);

  // BUILD THE GRID
  buildGrid();

  // RESET THE FORM
  form.reset();

  // SET FOCUS BACK TO THE ID TEXT BOX
  $("id").focus();
});

// DELETE EMPLOYEE
// empTable.addEventListener('click', (e) => {
function deleteEmployee(e, name) {
  // CONFIRM THE DELETE
  if (confirm(`Are you sure you want to delete ${name}?`)) {
    // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
    console.log("target: ", e.target.parentNode.parentNode.rowIndex);
    // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE

    // REMOVE EMPLOYEE FROM ARRAY
    employees.splice(e.target.parentNode.parentNode.rowIndex - 1, 1);
    count--;
    // BUILD THE GRID
    buildGrid();
  }
}

// BUILD THE EMPLOYEES GRID
function buildGrid() {
  console.log("emplyees array: ", employees);
  empCount.innerHTML = employees.length ? employees.length : "";
  // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
  if (document.querySelector("tbody")) {
    document.querySelector("tbody").remove();
  }
  // REBUILD THE TBODY FROM SCRATCH
  let tbBody = document.createElement("tbody");

  // LOOP THROUGH THE ARRAY OF EMPLOYEES
  // REBUILDING THE ROW STRUCTURE
  if (employees.length > 0) {
    empTable.appendChild(tbBody);
    for (let i of employees) {
      let newRow = tbBody.insertRow();

      let newIdCell = newRow.insertCell();
      let newNameCell = newRow.insertCell();
      let newEmailCell = newRow.insertCell();
      let newExtCell = newRow.insertCell();
      let newDepCell = newRow.insertCell();
      let newBtnCell = newRow.insertCell();

      newIdCell.innerHTML = i[0];
      newNameCell.innerHTML = i[1];
      newExtCell.innerHTML = i[2];
      newEmailCell.innerHTML = i[3];
      newDepCell.innerHTML = i[4];

      let delBtn = document.createElement("button");
      delBtn.className = "btn btn-danger btn-sm";
      delBtn.appendChild(document.createTextNode("X"));
      newBtnCell.appendChild(delBtn);
      delBtn.addEventListener("click", (e) => deleteEmployee(e, i[1]));
    }
  }

  // BIND THE TBODY TO THE EMPLOYEE TABLE
  empTable.appendChild(tbBody);

  // UPDATE EMPLOYEE COUNT
  count += 1;

  // STORE THE ARRAY IN STORAGE
  localStorage.employees = JSON.stringify(employees);
}
