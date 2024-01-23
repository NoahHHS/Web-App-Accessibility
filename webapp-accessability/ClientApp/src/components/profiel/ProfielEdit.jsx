import React, { Component, useState, useEffect } from 'react';
import '../../stylesheets/Profiel.css'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

//------------------------------ ProfielEdit pagina component ------------------------------
export class ProfielEdit extends Component {
    static displayName = ProfielEdit.name;

    constructor(props) {
      super(props);
      this.state = {
        userData: {
          naam: '',
          email: '',
          beschikbaarheid: '',
          straatnaam: '',
          huisnr: '',
          postcode: '',
          stad: '',
          medischeData: [
            {
            ziekte: '',
            hulpmiddelen: ''
            }
          ]
        },
      };
    }

  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <h1 className='pagetitle'>Bewerk Gegevens</h1>
          <FetchProfielData/>
          <FetchMedischeData/>
          <SaveButton/>
        </div>
      </QueryClientProvider>
    );
  }
}

//------------------------------ Functional components ------------------------------
const SaveButton = () => {
    return(
      <div className='ProfileButton-Content'>
        <button className='ProfileButton' title='Sla veranderingen op'><strong>Save</strong></button>
        <p className='ProfileButton-Warning'>Sla je veranderingen op!<br/>anders worden ze ongedaan gemaakt</p>
      </div>
    );
}

const DataItem = (prop) => {
  return(
    <div className='DataItem'>
      <p className='DataItem-Name'>{prop.value}</p>
      <input id='info-name' className="DataItem-Field" type="text" placeholder={prop.placeholder}/>
    </div>
  );
}

//------------------------------ Page content ------------------------------
// Component die alle medische gegevens rendered
const MedischeDataContent = (props) => {
  const medischeData = props.data

  return(
    <section className='profiel-section'>
      <h2 className='subtitle profielh2'>Medische gegevens</h2>

      <ul className='Medische-DataLijst'>
        {medischeData.map((item, index) => (
          <li className='Medische-DataLijstItem' key={index}>
            <div>
              <DataItem value="Ziekte" placeholder={item.beperking} aria-label='Ziekte invoerveld'/>
              <DataItem value="Hulpmiddelen" placeholder={item.hulpmiddelen} aria-label='Hulpmiddelen invoerveld'/>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Component die alle profiel gegevens rendered
const ProfielDataContent = (props) => {
  const profileData = props.data

  return(
    <div>
      <section className='profiel-section'>
      <h2 className='subtitle profielh2'>Persoonlijke gegevens</h2>
        <DataItem value="Naam" placeholder={profileData.naam} aria-label='Naam invoerveld, voer hier je naam in'/>
        <DataItem value="Email" placeholder={profileData.email} aria-label='Email invoerveld, voer hier je email in'/>
        <DataItem value="Beschikbaarheid" placeholder={profileData.beschikbaarheid} aria-label='Beschikbaarheid invoerveld, voer hier je beschikbaarheid in'/>
      </section>

      <section className='profiel-section'>
      <h2 className='subtitle profielh2'>Adres</h2>
        <DataItem value="Straatnaam" placeholder={profileData.straatnaam} aria-label='Straatnaam invoerveld, voer hier je straatnaam in'/>
        <DataItem value="Huisnummer" placeholder={profileData.huisnr} aria-label='huisnummer invoerveld, voer hier de bijhorende huisnummer in'/>
        <DataItem value="Toevoeging" placeholder={profileData.toevoeging} aria-label='huisnummer invoerveld, voer hier de bijhorende huisnummer in'/>
        <DataItem value="Postcode" placeholder={profileData.postcode} aria-label='Postcode invoerveld, voer hier je postcode in, geen spaties'/>
      </section>
    </div>
  );
}

//------------------------------ Get Data from api ------------------------------
// Fetch medische gegevens van de database via ProfielController
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

// Fetch profiel gegevens van de database via ProfielController
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