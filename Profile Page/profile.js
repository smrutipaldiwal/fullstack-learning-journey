function displayUserProfile(user) {
    document.getElementById("username").textContent = `Name: ${user.name}`;
    document.getElementById("email").textContent = `Email: ${user.email}`;
    document.getElementById("role").textContent = `Role: ${user.role}`;
    document.getElementById("location").textContent = `Location: ${user.location}`;
}       

let user = JSON.parse(localStorage.getItem("user")) || {
    name: "Smruti Agrawal",
    email: "smruti.agrawal@example.com",
    role: "Full Stack Developer",
    location: "Bengaluru, India"    
};

document.addEventListener("DOMContentLoaded", () => {
    displayUserProfile(user);
});

const button = document.getElementById("edit-profile-btn");

button.addEventListener("click", () => {
    const newName = prompt("Enter new name:", user.name);
    const newEmail = prompt("Enter new email:", user.email);
    const newRole = prompt("Enter new role:", user.role);
    const newLocation = prompt("Enter new location:", user.location);
    
    if (newName === null || newEmail === null || newRole === null || newLocation === null) return;

    if(newName.trim() === "" || newEmail.trim() === "" || newRole.trim() === "" || newLocation.trim() === "") {
        alert("All fields are required.");
        return;
    }

    if(newName.trim() === user.name && newEmail.trim() === user.email && newRole.trim() === user.role && newLocation.trim() === user.location) {
        alert("No changes made.");
        return;
    }

    user.name = newName.trim();
    user.email = newEmail.trim();
    user.role = newRole.trim();
    user.location = newLocation.trim();
    localStorage.setItem("user", JSON.stringify(user));
    displayUserProfile(user);
});