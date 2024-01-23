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
        <FetchProfielData />
      </QueryClientProvider>
    );
  }
}

const FetchProfielData = () => {
  const { data: profileData, isLoading, isError, error } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const response = await fetch('https://localhost:7288/profiel/GetProfileData');
      if (!response.ok) {
        console.error(response);
        throw new Error('Unable to fetch profile data');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error(error);
    return <div>Error fetching profile data</div>;
  }

  return(
    <ProfielDataContent data={profileData}/>
  );
}

const ProfielDataContent = (props) => {
  const profileData = props.data;
  return(
    <div>
      <h1 className='pagetitle'>Mijn Gegevens</h1>
      <section className='profiel-section'>
        <h2 className='subtitle profielh2'>Persoonlijke gegevens</h2>
        <ProfielGegeven typeGegeven="Naam" value={profileData.naam} />
        <ProfielGegeven typeGegeven="Email" value={profileData.email} />
        <ProfielGegeven typeGegeven="Beschikbaarheid" value={profileData.beschikbaarheid} />
      </section>
      <section className='profiel-section'>
        <h2 className='subtitle profielh2'>Adres</h2>
        <ProfielGegeven typeGegeven="Straatnaam" value={profileData.straat} />
        <ProfielGegeven typeGegeven="Huisnummer" value={profileData.huisNr} />
        <ProfielGegeven typeGegeven="Postcode" value={profileData.postcode} />
      </section>
      <section className='profiel-section'>
        <h2 className='subtitle profielh2'>Medische gegevens</h2>
        <FetchMedischeData />
      </section>
      <ProfileButton />
    </div>
  );
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
            <p className='Profiel-Data'><span className='typeGegevenNaam'>{prop.typeGegeven}</span>: {prop.value}</p>
        </div>
    );
}

const FetchMedischeData = () => {
  const { data: medischeData, isLoading, isError, error } = useQuery({
    queryKey: ['medischeData'],
    queryFn: async () => {
      const response = await fetch('https://localhost:7288/profiel/GetMedischeGegevens');
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
    <MedischeDataContent data={medischeData}/>
  );
};

const MedischeDataContent = (props) => {
  const medischeData = props.data;

  return(
    <div className='Medische-DataItem'>
      <ul className='Medische-DataLijst'>
        {medischeData.map((item, index) => (
          <li className='Medische-DataLijstItem' key={index}>
            <div>
              <ProfielGegeven typeGegeven="Ziekte" value={item.beperking} />
              <ProfielGegeven typeGegeven="Hulpmiddelen" value={item.hulpmiddelen} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}