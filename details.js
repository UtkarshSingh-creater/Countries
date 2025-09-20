const infoContainer = document.querySelector("#info");
const flagImg = document.querySelector("#flag");
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

async function fetchCountry(code) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    if (!res.ok) throw new Error("Country not found");
    const data = await res.json();
    displayCountry(data[0]);
  } catch (err) {
    infoContainer.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

function displayCountry(country) {
  flagImg.src = country.flags.svg;
  flagImg.alt = `Flag of ${country.name.common}`;

  const currencies = country.currencies
    ? Object.values(country.currencies).map((c) => c.name).join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const borders = country.borders
    ? country.borders
        .map((b) => `<a href="detail.html?code=${b}">${b}</a>`)
        .join(" ")
    : "None";
}


if (code) {
  fetchCountry(code);
} else {
  infoContainer.innerHTML = "<p style='color:red;'>No country selected.</p>";
}