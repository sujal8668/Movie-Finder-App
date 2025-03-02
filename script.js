// Light mode Code

const themeSwitcher = document.getElementById("themeSwitcher");
const body = document.body;
// Check local storage for theme preference
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
}
// Toggle theme on click
themeSwitcher.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  // Save the theme preference in local storage
  if (body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

//Main code goes here
const input = document.querySelector("input");
const btn = document.querySelector("button");
const card = document.querySelector(".card");

// Shows User Info
fetchMovie("Inception"); 

async function fetchMovie(title) {
  const resp = await fetch(`https://www.omdbapi.com/?apikey=f155676c&t=${title}`);
  const respData = await resp.json();
  return respData;
}

btn.addEventListener("click", async () => {
  const inputVal = input.value.trim();
  if (!inputVal) {
    alert("Please enter a movie title.");
    return;
  }

  const searchResult = await fetchMovie(inputVal);

  if (searchResult.Response === "False") {
    alert("Movie not found");
  } else {
    card.innerHTML = `
     <div class="jj">
        <div class="avatar">
            <img src="${searchResult.Poster}" alt="${searchResult.Title}">
        </div>
        <div class="info">
            <h2>${searchResult.Title}</h2>
            <p><i style="color: yellow; font-size: 30px;" class="ri-star-fill"></i> ${searchResult.imdbRating || "N/A"}</p>
            <div class="follow-info">
                <div class="single">
                    <span>${searchResult.Rated || "N/A"}</span>
                </div>
                <div class="single">
                    <span>${searchResult.Year || "N/A"}</span>
                </div>
                <div class="single">
                    <span>${searchResult.Runtime || "N/A"}</span>
                </div>
            </div>
            <div class="genre">
                ${searchResult.Genre.split(", ").map(genre => `<p>${genre}</p>`).join("")}
            </div>
            <a href="https://www.imdb.com/title/${searchResult.imdbID}" target="_blank">Visit Movie ></a>
                            </div>
        </div>
        <div class="content">
            <h2>Plot:</h2>
            <p>${searchResult.Plot || "No plot available."}</p>
            <br>
            <h2>Cast:</h2>
            <p>${searchResult.Actors || "No cast info available."}</p>
        </div>
    `;
  }
});


// Function for adding enter key to search results
function enter(event) {
  if (event.key === "Enter") {
    btn.click();
  }
}
input.addEventListener("keyup", enter);
