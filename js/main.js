let page = 1;
const perPage = 10;
let searchName = null;

function loadCountriesData(page, perPage, searchName = null) {
  let url = `https://web-422-countries-api-a1.vercel.app/api/countries?page=${page}&perPage=${perPage}`;
  if (searchName) url += `&name=${searchName}`;

  fetch(url)
    .then(res => {
        return res.ok ? res.json() : Promise.reject(res.status);
    })
    .then(data => {
      const tableBody = document.querySelector('#countriesTable tbody');
      tableBody.innerHTML = "";
      if(data.length){
        // non-empty array (countries available)
        data.map(country => {
          const languages = country.languages.map(lang => lang.name).join(', ');
          const currencies = country.currencies.map(cur => `${cur.name} (${cur.symbol})`).join(', ');
          const population = country.population.toLocaleString();
          const area = country.area.toLocaleString();

          // const row = document.createElement('tr');
          // row.innerHTML = `
          //   <td>${country.name}</td>
          //   <td><img src="${country.flag} alt="${country.name} flag" /></td>
          //   <td>${country.capital}</td>
          //   <td>${country.population}</td>
          // `;
          // tableBody.appendChild(row);
          // row.addEventListener('click', () => showCountryDetails(country));

          const row = `
            <tr data-id="${country._id}">
              <td>${country.name}</td>
              <td><img src="${country.flag}" alt="${country.name} flag" /></td>
              <td>${country.nativeName}</td>
              <td><img src="${country.coatOfArms}" alt="${country.name} coat of arms" /></td>
              <td><b>𝛼2:</b>${country.a2code}<br><b>𝛼3:</b>${country.a3code}</td>
              <td>${country.capital}</td>
              <td>${languages}</td>
              <td>${population}</td>
              <td>${area}</td>
              <td>${currencies}</td>
              <td>${country.region}</td>
              <td>${country.subregion}</td>
              <td>${country.continents.join(', ')}</td>
            </tr>
          `;
          tableBody.insertAdjacentHTML('beforeend', row);
        });
      }else{
        // empty array (no countries available)
        if (page > 1) {
          page--;   // Prevent user from paging further
          loadCountriesData(page, perPage, searchName);  // Reload data for the previous page
        } else {
          const row = document.createElement('tr');
          row.innerHTML = `<td colspan="13"><strong>No data available</strong></td>`;
          tableBody.appendChild(row);
        }
      }
      document.getElementById('current-page').textContent = `${page}`;
    }).catch(err => {
        // error (no countries available)
        const tableBody = document.querySelector('#countriesTable tbody');
        tableBody.innerHTML = `<tr><td colspan="13"><strong>Error loading data: ${err}</strong></td></tr>`;
        console.error("Error loading data", err);
    });
}
// Display country details in a modal
function showCountryDetails(country) {
  const modalTitle = document.querySelector('#detailsModal .modal-title');
  const modalBody = document.querySelector('#detailsModal .modal-body');

  // Populate modal with country details
  modalTitle.textContent = country.name;
  modalBody.innerHTML = `
    <p><strong>Capital:</strong>${country.capital}</p>
    <p><strong>Population:</strong>${country.population.toLocaleString()}</p>
    <p><strong>Region:</strong>${country.region}</p>
  `;

  // Show the modal
  const modal = new bootstrap.Modal(document.getElementById('detailsModal'));
  modal.show();
}
loadCountriesData(page, perPage);