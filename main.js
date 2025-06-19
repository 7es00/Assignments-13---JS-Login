const registerForm = document.getElementById("registerForm");

//Register

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.find((user) => user.email === email);

    const successBox = document.getElementById("regSuccess");
    const errorBox = document.getElementById("regError");

    if (emailExists) {
      errorBox.textContent = "This email already exists, try another.";
      errorBox.classList.remove("d-none");
      successBox.classList.add("d-none");
    } else {
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      successBox.textContent = "Account created successfully! Redirecting...";
      successBox.classList.remove("d-none");
      errorBox.classList.add("d-none");
      setTimeout(() => (window.location.href = "index.html"), 1500);
    }
  });
}

//Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    const errorBox = document.getElementById("loginError");

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "home.html";
    } else {
      errorBox.textContent = "Invalid email or password.";
      errorBox.classList.remove("d-none");
    }
  });
}

//Show user home
const userSpan = document.getElementById("username");
if (userSpan) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "index.html";
  } else {
    userSpan.textContent = user.name;
  }
}

//Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
}
