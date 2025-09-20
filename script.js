const searchBox = document.querySelector("#search");
const resultsContainer = document.querySelector("#results");
const detailsContainer = document.querySelector("#details");

async function fetchCountries(query = "") {
  try {
    let url = query
      ? `https://restcountries.com/v3.1/name/${query}`
      : "https://restcountries.com/v3.1/all";

    const res = await fetch(url);
    if (!res.ok) throw new Error("No countries found");
    const data = await res.json();

    displayCountries(data);
  } catch (err) {
    resultsContainer.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

function displayCountries(countries) {
  resultsContainer.innerHTML = countries
    .map(
      (country) => `
      <div class="card" data-code="${country.cca3}">
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
        <h3>${country.name.common}</h3>
        <p><strong>Region:</strong> ${country.region}</p>
      </div>
    `
    )
    .join("");

 
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const code = card.getAttribute("data-code");
      showCountryDetails(code);
    });
  });
}

async function showCountryDetails(code) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await res.json();
    const country = data[0];

 
  } catch (err) {
    detailsContainer.innerHTML = `<p style="color:red;">Details not available</p>`;
    detailsContainer.style.display = "block";
  }
}

searchBox.addEventListener("input", (e) => {
  const query = e.target.value.trim().toLowerCase();
  if (query) {
    fetchCountries(query);
  } else {
    fetchCountries();
  }
});


fetchCountries();