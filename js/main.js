const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search schools.json and filter it

const searchSchools = async searchText => {
  const res = await fetch("data/schools.json");
  const schools = await res.json();

  // Get matches to current textinput
  let matches = schools.filter(school => {
    // matches start of sentence based on the input, also contains the global and the case insensitive flags
    const regex = new RegExp(`^${searchText}`, "gi");
    // return array that matches those
    return school.name.match(regex) || school.abbr.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
    // also remove the html after you removed the search terms
    matchList.innerHTML = "";
  }
  outputHTML(matches);
};

// Show the results in the HTML
const outputHTML = matches => {
  if (matches.length > 0) {
    // map returns array from an array
    const html = matches
      .map(
        match => `
        <div class="card card-body mb-4">
            <h4>${match.name} (${match.abbr})</h4>
            <h5>Tuition: ${match.description}</h5>
            <h6>Session: ${match.date}</h6>
            <a href = "${match.url}">${match.url}</a>
        </div>
        `
      )
      .join("");

    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchSchools(search.value));