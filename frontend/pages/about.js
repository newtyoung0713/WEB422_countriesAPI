// pages/about.js
import React from "react";
import Link from "next/link";
import { Card } from "react-bootstrap";
import CountryDetails from "@/components/CountryDetails";
import PageHeader from "@/components/PageHeader";

export async function getStaticProps() {
  const countryId = "66f6396e32a2645627e96b09";
  const res = await fetch(`https://web-422-countries-api.vercel.app/api/countries/${countryId}`);
  const data = await res.json();

  return {
    props: {
      country: data,
    },
  };
};

export default function About({ country }) {
  return (<>
    <PageHeader text="About the Developer - Sheng-Lin Yang" />
    <Card>
      <Card.Body>
        <p>Hello! I'm Sheng-Lin Yang, a Full-Stack developer with interests in big data, Python, and web development.</p>
        <p>I'm passionate about building useful and efficient applications that enhance productivity and provide great user experiences.</p>
        <Link href={`/country/${country._id}`} passHref legacyBehavior>
          <a>Learn more about {country.name}</a>
        </Link>
      </Card.Body>
      <CountryDetails country={country} />
    </Card>
    <br />
  </>);
};