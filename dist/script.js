// querySelectors
const inputField = document.querySelector("#input-field");
const movieList = document.querySelector(".movies_container-list");
const radioButtons = document.querySelectorAll(".radio");
const search = document.querySelector(".nav_menu-found");
const searchButton = document.querySelector("#search-btn");
const toTopBtn = document.querySelector("#topPageBtn");
const navMenu = document.querySelector(".nav_menu");

// Global variables
const allMovies = "all";
const recentMovies = "new";
const recentMovieYear = "2014";
const targetUrl = "https://www.imdb.com";

// addEventListeners
window.addEventListener("scroll", () => scrollFunction());
inputField.addEventListener("keypress", () => returnSearch());
searchButton.addEventListener("click", () => returnSearch());
toTopBtn.addEventListener("click", () => (document.documentElement.scrollTop = 0));

// Filters, optimzed search
const newMovies = movies.filter(movie => movie.Year >= recentMovieYear);

const addMoviesToDOM = array =>
  array.forEach(movie => {
    const newLi = document.createElement("li");
    const imdbLink = document.createElement("a");
    const poster = document.createElement("img");
    const { Poster, imdbID } = movie; // Destructure

    imdbLink.target = "_blank";
    imdbLink.href = `${targetUrl}/title/${imdbID}`;
    poster.src = Poster;
    newLi.appendChild(imdbLink).appendChild(poster);
    movieList.appendChild(newLi);
  });

// Movie amount tracker
const addMovieNumber = list => (search.innerHTML = `<h1> Found: ${list.length} movies</h1>`);

// Change statement on radio buttons
const radioChange = radioButtons.forEach(radio =>
  radio.addEventListener("change", () => {
    clear = () => {
      movieList.innerHTML = "";
      inputField.value = "";
    };
    if (radio.value === recentMovies) {
      clear();
      renderPage(newMovies);
    } else if (radio.value === allMovies) {
      clear();
      renderPage(movies);
    } else {
      clear();
      renderPage(filterByTitle(radio.value));
    }
  })
);

// Search, optimized
const filterByTitle = userInput =>
  movies.filter(movie => movie.Title.toLowerCase().includes(userInput.toLowerCase()));

// Returned search
const returnSearch = () => {
  const searchValue = inputField.value;
  movieList.innerHTML = "";
  renderPage(filterByTitle(searchValue));
};

// Top of page button
const scrollFunction = () => {
  document.documentElement.scrollTop > 200
    ? (toTopBtn.style.display = "block")
    : (toTopBtn.style.display = "none");
};

// initialize function to control everything at the start of everything
const renderPage = list => {
  addMoviesToDOM(list);
  addMovieNumber(list);
};
renderPage(movies);
