/********************************************************************************
*  WEB422 – Assignment 2
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Sheng-Lin Yang
*  Student ID: 160443222
*  Date: Sep-30-2024
*
********************************************************************************/

let page = 1;
const perPage = 10;
let searchName = null;

function loadCountriesData() {
  let url = `https://web-422-countries-api.vercel.app/api/countries?page=${page}&perPage=${perPage}`;
  if (searchName) url += `&name=${searchName}`;

  const tableBody = document.querySelector('#countriesTable tbody');
  tableBody.innerHTML = "";
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
          const currencies = Array.isArray(country.currencies) 
            ? country.currencies.map(cur => `${cur.name} (${cur.symbol})`).join(', ') 
            : 'N/A';

          const row = `
            <tr data-id="${country._id}">
              <td>${country.name}</td>
              <td><img src="${country.flag}" alt="${country.name} flag" width="30" /></td>
              <td>${country.nativeName}</td>
              <td><img src="${country.coatOfArms}" alt="${country.name} coat of arms" width="30" /></td>
              <td><b>𝛼2:</b>${country.a2code}<br><b>𝛼3:</b>${country.a3code}</td>
              <td>${country.capital}</td>
              <td>${country.languages}</td>
              <td>${country.population.toLocaleString()}</td>
              <td>${country.area.toLocaleString()}</td>
              <td>${currencies}</td>
              <td>${country.region}</td>
              <td>${country.subregion}</td>
              <td>${country.continents}</td>
            </tr>
          `;
          const tableRow = document.createElement('tr');
          tableRow.innerHTML = row;
          tableRow.addEventListener('click', () => showCountryDetails(country));
          tableBody.appendChild(tableRow);
        });
      }else{
        // empty array (no countries available)
        if (page > 1) {
          page--;   // Prevent user from paging further
          loadCountriesData();  // Reload data for the previous page
        } else {
          const row = document.createElement('tr');
          row.innerHTML = `<td colspan="4"><strong>No data available</strong></td>`;
          tableBody.appendChild(row);
        }
      }
      // document.getElementById('current-page').textContent = `${page}`;
      document.getElementById('current-page').textContent = page;
    }).catch(err => {
        // error (no countries available)
        const tableBody = document.querySelector('#countriesTable tbody');
        tableBody.innerHTML = `<tr><td colspan="4"><strong>Error loading data: ${err}</strong></td></tr>`;
        console.error("Error loading data", err);
    });
}

// Display country details in a modal
function showCountryDetails(country) {
  const modalTitle = document.querySelector('#detailsModal .modal-title');
  const modalBody = document.querySelector('#detailsModal .modal-body');

  // Populate modal with country details
  modalTitle.innerHTML = `${country.name} <img src="${country.coatOfArms}" alt="${country.name} coat of arms" width="30" />`;
  modalBody.innerHTML = `
    <img src="${country.flag}" alt="${country.name} flag" width="465" />
    <p><strong>Native Name:</strong> ${country.name}</p>
    <p><strong>𝛼2/𝛼3 Code:</strong> ${country.a2code}/${country.a3code}</p>
    <p><strong>Capital:</strong> ${country.capital}</p>
    <p><strong>Area:</strong> ${country.area.toLocaleString()}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Latitude/Longitude:</strong> ${country.latlng.split(',')[0]}/${country.latlng.split(',')[1]}</p>
    <p><strong>Languages:</strong> ${country.languages}</p>
    <p><strong>Top-Level Domain:</strong></p>
    <ul>${country.tld.map(domain => `<li>${domain}</li>`).join('')}</ul>
    <p><strong>Currencies:</strong></p>
    <ul>
      ${Array.isArray(country.currencies)
        ? country.currencies.map(cur => `<li>${cur.name} (${cur.symbol})</li>`).join('')
        : '<li>N/A</li>'}
    </ul>
    <p><strong>Continents:</strong> ${country.continents}</p>
    <p><strong>Region/Subregion:</strong> ${country.region}/${country.subregion}</p>
    <p><strong>Map on Google: </strong><a href="${country.googleMaps}" target="_blank">${country.googleMaps}</a></p>
  `;

  // Show the modal
  const modal = new bootstrap.Modal(document.getElementById('detailsModal'));
  modal.show();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Load the initial data
  loadCountriesData();
  
  // Pagination buttons
  document.getElementById('previous-page').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the previous page clicked
    if (page > 1) {
      page--;
      loadCountriesData();
    }
  });

  document.getElementById('next-page').addEventListener('click', (e) => {
    e.preventDefault();
    page++;
    loadCountriesData();
  });

  // Submit event for the "searchForm"
  document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission
    const inputValue = document.getElementById('name').value.trim(); // Get the value of the "name" input
    searchName = inputValue ? inputValue : null; // Set the global searchName
    page = 1;
    loadCountriesData(); // Call the function to load data
  });

  // Clear form and reset search
  document.getElementById('clearForm').addEventListener('click', () => {
    document.getElementById('name').value = "";
    searchName = null;
    loadCountriesData();
  });
});

loadCountriesData();
