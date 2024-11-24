const apiUrl = "https://api.github.com/users";
const searchInput = document.getElementById("searchInput");
const resultDiv = document.getElementById("result");
const themeToggle = document.getElementById("themeToggle");

// Toggle dark mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Set theme on load
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});

// Fetch and display user data
searchInput.addEventListener("keyup", async (event) => {
  if (event.key === "Enter") {
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
    }
  }
});

function displayUser(user) {
  resultDiv.innerHTML = `
    <div class="flex items-center space-x-4">
      <img src="${user.avatar_url}" alt="${user.login}" class="w-16 h-16 rounded-full shadow-lg" />
      <div>
        <h2 class="text-2xl font-semibold">${user.login}</h2>
        <p class="text-gray-600 dark:text-gray-400">${user.bio || "No bio available"}</p>
      </div>
    </div>
    <ul class="mt-4 space-y-2">
      <li><strong>Followers:</strong> ${user.followers}</li>
      <li><strong>Following:</strong> ${user.following}</li>
      <li><strong>Repositories:</strong> ${user.public_repos}</li>
    </ul>
  `;
}
