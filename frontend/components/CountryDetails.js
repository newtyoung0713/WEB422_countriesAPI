// components/CountryDetails.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";


export default function CountryDetails({ country }) {
  return (<Container>
    <Row>
      <Col lg>
        <img
          onError={(event) => {
            event.target.onerror = null; // Remove the event handler to prevent infinite loop
            event.target.src =
              "https://placehold.co/600x400?text=Photo+Not+Available";
          }}
          className="img-fluid w-100"
          src={country.coatOfArms || "https://placehold.co/600x400?text=Photo+Not+Available"}
          alt="Country Coat of Arms"
        />
        <br />
        <br />
      </Col>
      <Col lg>
        <h2>{country.name}</h2><br />
        <p><b>Native Name:</b> {country.nativeName}</p>
        <p><b>𝛼2/𝛼3 Code:</b> {country.a2code}/{country.a3code}</p>
        <p><b>Capital:</b> {country.capital}</p>
        <p><b>Languages:</b> {country.languages}</p>
        <p><b>Population:</b> {country.population.toLocaleString()}</p> 
        <p><b>Area:</b> {Math.round(country.area).toLocaleString()} Km<sup>2</sup> ({Math.round(country.area * 0.386102).toLocaleString()} sq mi)</p>
        <p><b>Latitude/Longitude:</b> ({country.latlng.split(',')[0]}/{country.latlng.split(',')[1]})</p>
        <p><b>Top-Level Domain:</b></p>
          <ul>
            {country.tld.map((domain, index) => (
              <li key={index}>{domain}</li>
            ))}
          </ul>
        <p><b>Currencies:</b></p>
        <ul>
          {country.currencies.map((currency, index) => (
            <li key={index}>{currency.name} ({currency.symbol})</li>
          ))}
        </ul>
        
        <p><b>Continents:</b> {country.continents}</p>
        <p><b>Region/Subregion:</b> {country.region}/{country.subregion}</p>
        <p><b>Map on Google:</b> <a href={country.googleMaps} target="_blank" rel="noopener noreferrer">{country.googleMaps}</a></p>
        <br />
      </Col>
    </Row>
  </Container>);
};