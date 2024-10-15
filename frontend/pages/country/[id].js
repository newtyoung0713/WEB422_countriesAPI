// pages/country/[id].js
import { useRouter } from "next/router";
import useSWR from "swr";
import CountryDetails from "@/components/CountryDetails";
import Error from "next/error";
import PageHeader from "@/components/PageHeader";

export default function Country() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(id ? `https://web-422-countries-api.vercel.app/api/countries/${id}` : null);
  
  if (isLoading) return null;

  if (error || !data) return <Error statusCode={404} />;

  return (<>
    <PageHeader text={data.name} />

    <CountryDetails country={data} />
  </>);
};