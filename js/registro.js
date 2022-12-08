// Local User Storage
// Form
const createAccount = document.getElementById("CreateAccount");

// Inputs
const firstName = document.getElementById("FirstName");
const lastName = document.getElementById("LastName");
const userEmail = document.getElementById("UserEmail");
const userPassword_1 = document.getElementById("UserPassword-1");
const userPassword_2 = document.getElementById("UserPassword-2");

// User Table
const userList = document.getElementById("user-list");

// User Interface
// Function  CreateUser
function CreateUser(firstName, lastName, userEmail, userPassword_1) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.userEmail = userEmail;
  this.password = userPassword_1;
}

// UserInterface Class
class UI {
  static displayUsers() {
    const users = Store.getUsers();
    users.forEach(user => UI.addUserToList(user));
  }

  static addUserToList(user) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.userEmail}</td>
        <td>${user.password}</td>
        <td><a href="#" class="deleteUser">X</a></td>
      `;
    {
    }
    userList.appendChild(row);}

  static deleteUser(el) {
    if (el.classList.contains("deleteUser")) {
      el.parentElement.parentElement.remove();}}
  static clearFields() {
    firstName.value = "";
    lastName.value = "";
    userEmail.value = "";
    userPassword_1.value = "";
    userPassword_2.value = "";}}

// Local Storage Class: Handles Storage
class Store {
  static getUsers() {
    let users;
    if (localStorage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));}

    return users;}

  static addUser(user) {
    const users = Store.getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));}

  static removeUser(userEmail) {
    const users = Store.getUsers();

    users.forEach((user, index) => {
      if (user.userEmail === userEmail) {
        users.splice(index, 1);
      }});

    localStorage.setItem("users", JSON.stringify(users));}
}

// Event: Display Users
document.addEventListener("DOMContentLoaded", UI.displayUsers);

// Event: Add a User
function addUser() {
  const user = new CreateUser(
    firstName.value,
    lastName.value,
    userEmail.value,
    userPassword_1.value
  );
  if (user != "") {

    // Add user to UI
    UI.addUserToList(user);

    // Add user to store
    Store.addUser(user);
    // Clear fields
    UI.clearFields();
  }
}
// Call function  addUser
createAccount.addEventListener("submit", addUser);

// Event: Remove a User

function removeUser(e) {
  // Remove user from UI
  UI.deleteUser(e.target);

  // Remove user from store
  Store.removeUser(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .textContent
  );
}
// Call function  removeUser
userList.addEventListener("click", removeUser);

const rememberMe = document.querySelector(".remember");
const forgetMe = document.querySelector(".forget");
const form1 = document.querySelector("form");
const getName = document.querySelector("#FirstName");
const submitBtn = document.querySelector("#submitname");
const forgetBtn = document.querySelector("#forgetname");

const h1 = document.querySelector("h1");
form1.addEventListener("submit", function (e) {
  e.preventDefault();
});
submitBtn.addEventListener("click", function () {
  localStorage.setItem("name", getName.value);
  nameDisplayCheck();
});
forgetBtn.addEventListener("click", function () {
  localStorage.removeItem("name");
  nameDisplayCheck();
});
function nameDisplayCheck() {
  if (localStorage.getItem("name")) {
    let name = localStorage.getItem("name");
    h1.textContent = `${name}`
    forgetMe.style.display = "inline";
    rememberMe.style.display = "none";
  } else {
    h1.textContent = `Usuario anonimo`;
    forgetMe.style.display = "none";
    rememberMe.style.display = "inline";}}
    document.body.onload = nameDisplayCheck; 
