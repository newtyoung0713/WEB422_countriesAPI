/*********************************************************************************
*  WEB422 – Assignment 3
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Sheng-Lin Yang
*  Student ID: 160443222
*  Date: Oct-07-2024
*
********************************************************************************/ 


// pages/index.js
import useSWR from "swr";
import { useState, useEffect } from "react";
import { Pagination, Accordion } from "react-bootstrap";
import CountryDetails from "@/components/CountryDetails";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const { data, error } = useSWR(`https://web-422-countries-api.vercel.app/api/countries?page=${page}&perPage=10`);

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);
  
  const previous = () => {
    if (page > 1) setPage(page - 1);
  };
  
  const next = () => {
    setPage(page + 1);
  };

  return (<>
    <PageHeader text="Browse Countries: Sorted by Number of Ratings" />

    <Accordion>
      {pageData && pageData.map((country) => (
        <Accordion.Item eventKey={country._id} key={country._id}>
          <Accordion.Header>
          <img src={country.flag} alt={country.name} width={30} /> &nbsp;
          <b>{country.name}</b> &nbsp; ({country.nativeName}),&nbsp; {country.continents}
          </Accordion.Header>
          <Accordion.Body>
            <CountryDetails country={country} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>

    <Pagination className="mt-3">
      <Pagination.Prev onClick={previous} />
      <Pagination.Item>{page}</Pagination.Item>
      <Pagination.Next onClick={next} />
    </Pagination>
  </>);
};