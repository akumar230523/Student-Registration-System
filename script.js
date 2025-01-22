const form = document.getElementById("studentform");
const addButton = document.getElementById("addbtn");
const student = document.getElementById("studentlist");


addButton.addEventListener("click", () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;
    const email = document.getElementById("email").value;
    if (id && name && contact && email) {
        localStorage.setItem(id, JSON.stringify([name, contact, email]));   // Add Record, Set student data to local storage.
        form.reset();
        displayRecords();
    } else {
        alert("Please fill in all fields.");
    }
});

// Display Records Function
function displayRecords() {

    studentlist.innerHTML = '';

    let total_stu = localStorage.length;
    for (let i = 0; i < total_stu; i++) {
        let studentID = localStorage.key(i);

        // Get student data from local storage
        let studentData = JSON.parse(localStorage.getItem(studentID));
        const alldata = document.createElement("div");

        // Set background color
        if (i % 2 == 0) {
            alldata.style.cssText = "background-color: darkgray;";
        } else {
            alldata.style.cssText = "background-color: lightgray;";
        }
        
        // Display student data
        alldata.innerHTML = `&nbsp <b> Student ID: </b> ${studentID} <br>
                             &nbsp Name: ${studentData[0]} <br> 
                             &nbsp Contact: ${studentData[1]} <br> 
                             &nbsp Email: ${studentData[2]} <br>`;
        
        // Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editRecord(studentID);

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteRecord(studentID);

        alldata.appendChild(editButton);
        alldata.appendChild(deleteButton);
        studentlist.appendChild(alldata);
    }
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// Edit Student Record Function
function editRecord(studentID) {
    let studentData = JSON.parse(localStorage.getItem(studentID));
    let newName = prompt("Enter new Name:", studentData[0]);
    let newContact = prompt("Enter new Contact:", studentData[1]);
    let newEmail = prompt("Enter new Email:", studentData[2]);
    if (newName && newContact && newEmail) {
        localStorage.setItem(studentID, JSON.stringify([newName, newContact, newEmail]));
        displayRecords();
    }
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


// Delete Student Record Function
function deleteRecord(studentID) {
    if (confirm("Are you sure to remove this record?")) {
        localStorage.removeItem(studentID);
        displayRecords();
    }
}



