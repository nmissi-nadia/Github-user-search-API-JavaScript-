const apiUrl = "https://api.github.com/users";
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultDiv = document.getElementById("result");
const themeToggle = document.getElementById("themeToggle");

// Toggle dark mode
themeToggle.addEventListener("click", () => {
  const body = document.body;
  body.classList.toggle("dark");

  // Change button text
  const isDark = body.classList.contains("dark");
  themeToggle.innerText = isDark ? "Light" : "Dark";

  // Save theme preference
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Set theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.innerText = "Light";
  } else {
    themeToggle.innerText = "Dark";
  }
});

// Fetch and display user data
async function fetchUserData() {
  const username = searchInput.value.trim();
  if (username) {
    try {
      const response = await fetch(`${apiUrl}/${username}`);
      if (!response.ok) throw new Error("User not found");
      const user = await response.json();
      displayUser(user);
    } catch (error) {
      resultDiv.innerHTML = `<p class="text-red-500">${error.message}</p>`;
    }
  } else {
    resultDiv.innerHTML = `<p class="text-red-500">Please enter a username</p>`;
  }
}

// Button click listener
searchButton.addEventListener("click", fetchUserData);

function displayUser(user) {
  resultDiv.innerHTML = `
    <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div class="flex items-center space-x-4">
        <img src="${user.avatar_url}" alt="${user.login}" class="w-16 h-16 rounded-full shadow-lg" />
        <div>
          <h2 class="text-2xl font-semibold text-black">${user.name || user.login}</h2>
          <p class="text-gray-600 dark:text-gray-400">${user.bio || "This profile has no bio"}</p>
        </div>
      </div>
      <ul class="mt-4 grid grid-cols-3 gap-4">
        <li class="text-center">
          <h3 class="font-bold text-black">${user.public_repos}</h3>
          <p class="text-sm text-gray-500">Repos</p>
        </li>
        <li class="text-center">
          <h3 class="font-bold text-black">${user.followers}</h3>
          <p class="text-sm text-gray-500">Followers</p>
        </li>
        <li class="text-center text-black">
          <h3 class="font-bold">${user.following}</h3>
          <p class="text-sm text-gray-500">Following</p>
        </li>
      </ul>
      <div class="mt-4">
        <p class="text-black"><strong>Location:</strong> ${user.location || "Not available"}</p>
        <p class="text-black"><strong>Blog:</strong> ${user.blog ? `<a href="${user.blog}" target="_blank" class="text-blue-500">${user.blog}</a>` : "Not available"}</p>
        <p class="text-black"><strong>Company:</strong> ${user.company || "Not available"}</p>
      </div>
    </div>
  `;
}
