import React, { Component } from 'react';
import '../../stylesheets/Profiel.css'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

export class ProfielData extends Component {
    static displayName = ProfielData.name;

  render() {
    return (
      <QueryClientProvider client={queryClient}>
      <div>
        <h1 className='pagetitle'>Mijn Gegevens</h1>
        <section className='profiel-section'>
          <h2 className='subtitle profielh2'>Persoonlijke gegevens</h2>
          <ProfielGegeven typeGegeven="Naam"/>
          <ProfielGegeven typeGegeven="Email"/>
          <ProfielGegeven typeGegeven="Beschikbaarheid"/>
        </section>
        <section className='profiel-section'>
        <h2 className='subtitle profielh2'>Adres</h2>
          <ProfielGegeven typeGegeven="Straatnaam"/>
          <ProfielGegeven typeGegeven="Huisnummer"/>
          <ProfielGegeven typeGegeven="Postcode"/>
        </section>
        <section className='profiel-section'>
        <h2 className='subtitle profielh2'>Medische gegevens</h2>
          <FetchMedischeData />
        </section>
        <ProfileButton/>
      </div>
      </QueryClientProvider>
    );
  }
}

const ProfileButton = () => {
    return(
      <div className='ProfileButton-Content'>
        <a href="/profiel/edit"><button className='ProfileButton' title='Bewerk je gegevens op een andere pagina'><strong>Bewerk Gegevens</strong></button></a>
      </div>
    );
}

const ProfielGegeven = (prop) => {
    return(
        <div className='Profiel-DataItem'>
            <p className='Profiel-Data'>{prop.typeGegeven}: {prop.value}</p>
        </div>
    );
}

const FetchMedischeData = () => {
  const { data: medischeData, isLoading, isError, error } = useQuery({
    queryKey: ['medischeData'],
    queryFn: async () => {
      const response = await fetch('/Profiel/GetMedischeGegevens');
      if (!response.ok) {
        console.error(response);
        throw new Error('Unable to fetch medical data');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error(error)
    return <div>Error fetching medical data</div>;
  }

  return (
    <div className='Medische-DataItem'>
      <h3>Medische gegevens</h3>
      <ul>
        {medischeData.map((item, index) => (
          <li key={index}>
            <div>
              <ProfielGegeven typeGegeven="Ziekte" value={item.beperking} />
              <ProfielGegeven typeGegeven="Hulpmiddelen" value={item.hulpmiddelen} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};