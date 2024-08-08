// API endpoints
const randomUserUrl = "https://randomuser.me/api/";
const catFactUrl = "https://catfact.ninja/fact";
const breweryUrl = "https://api.openbrewerydb.org/v1/breweries/random";

// DOM elements
const userImage = document.getElementById("user-image");
const userName = document.getElementById("user-name");
const userLocation = document.getElementById("user-location");
const catFact = document.getElementById("cat-fact");
const breweryName = document.getElementById("brewery-name");
const breweryAddress = document.getElementById("brewery-address");

// Function to display loading indicators
function showLoading(container) {
  const loading = document.createElement("div");
  loading.classList.add("loading");
  loading.textContent = "Loading...";
  container.appendChild(loading);
}

// Function to remove loading indicators
function hideLoading(container) {
  const loading = container.querySelector(".loading");
  if (loading) {
    loading.remove();
  }
}

// Fetch data from APIs and update UI
Promise.all([fetch(randomUserUrl), fetch(catFactUrl), fetch(breweryUrl)])
  .then((responses) => Promise.all(responses.map((res) => res.json())))
  .then(([userData, catFactData, breweryData]) => {
    // Update user information
    showLoading(document.getElementById("random-user"));
    userImage.src = userData.results[0].picture.large;
    userName.textContent = `${userData.results[0].name.first} ${userData.results[0].name.last}`;
    userLocation.textContent = `${userData.results[0].location.city}, ${userData.results[0].location.state}`;
    hideLoading(document.getElementById("random-user"));

    // Update cat fact
    showLoading(document.getElementById("cat-fact"));
    catFact.textContent = catFactData.fact;
    hideLoading(document.getElementById("cat-fact"));

    // Update brewery information
    showLoading(document.getElementById("brewery"));
    breweryName.textContent = breweryData[0].name;
    breweryAddress.textContent = breweryData[0].street;
    hideLoading(document.getElementById("brewery"));
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
