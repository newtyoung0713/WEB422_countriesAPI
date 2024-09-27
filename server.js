// server.js
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
*  Date: Sep-13-2024
*
*  Published URL: https://web-422-countries-api.vercel.app/
*
********************************************************************************/

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const CountriesDB = require("./modules/countriesDB.js");
const db = new CountriesDB();

const HTTP_PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.status(201).json({ message: "API Listening" });
});

app.post('/api/countries', async (req, res) => {
  try {
    const countryData = req.body;
    const newCountry = await db.addNewCountry(countryData);
    res.status(201).json(newCountry);
  } catch (error) {
    console.error('Error adding new country:', error);
    res.status(500).json({ message: 'Failed to add new country' });
  }
});

app.get('/api/countries', async (req, res) => {
  try {
    const {page, perPage, name} = req.query;

    if (!page || !perPage || isNaN(page) || isNaN(perPage) )  {
      return res.status(400).json({ message: 'Invalid query params: page and perPage must be numbers' });
    }
    const countries = await db.getAllCountries(+page, +perPage, name);
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ message: 'Failed to fetch countries' });
  }
});

app.get('/api/countries/:id', async (req, res) => {
  const country_id = req.params.id;
  try {
    const country = await db.getCountryById(country_id);
    res.status(200).json(country);
  } catch (error) {
    console.error('Error fetching the country:', error);
    res.status(500).json({ message: 'Failed to fetch the country' });
  }
});

app.put('/api/countries/:id', async (req, res) => {
  const country_id = req.params.id;
  const countryData = req.body;
  try {
    const updateCountry = await db.updateCountryById(countryData, country_id);

    if (updateCountry.matchedCount === 0)
      return res.status(404).json({ message: 'Country Not Found' });

    res.json({ message: 'Country updated successfully' });
  } catch (error) {
    console.error('Error updating the country:', error);
    res.status(500).json({ message: 'Failed to update the country' });
  }
});

app.delete('/api/countries/:id', async (req, res) => {
  const country_id = req.params.id;
  try {
    const deleteCountry = await db.deleteCountryById(country_id);

    if (deleteCountry.matchedCount === 0)
      return res.status(404).json({ message: 'Country Not Found' });

    res.json({ message: 'Country deleted successfully' });
  } catch (error) {
    console.error('Error updating the country:', error);
    res.status(500).json({ message: 'Failed to update the country' });
  }
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
  app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
  });
}).catch((err)=>{
  console.log(err);
});
