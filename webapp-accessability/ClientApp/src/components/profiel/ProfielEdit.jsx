import React, { useState, useEffect } from 'react';
import '../../stylesheets/Profiel.css'
// Import for TanStack Query
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
// Import the MedischToevoegenModal component
import MedischToevoegenModal from './MedischToevoegenModal';

const queryClient = new QueryClient();

//------------------------------ ProfielEdit pagina component ------------------------------
const ProfielEdit = () => {
  const [showMedischToevoegenModal, setShowMedischToevoegenModal] = useState(false);
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    beschikbaarheid: '',
    straat: '',
    huisNr: 0,
    toevoeging: '',
    postcode: '',
  });

  const handleAddMedischData = (data) => {
    // Perform any necessary actions, such as sending a request to add data to the server
    console.log('Adding medical data:', data);
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSaveButtonClick = () => {
    fetch('https://localhost:7288/profiel/UpdateAccount', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Handle success, e.g., show a success message
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error, e.g., show an error message
      });
  };

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfielData = async () => {
      try {
        const response = await fetch('https://localhost:7288/profiel/GetProfileData' , {credentials: 'include'});
        if (!response.ok) {
          throw new Error('Unable to fetch profile data');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfielData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1 className='pagetitle'>Bewerk Gegevens</h1>
        <ProfielDataContent
          data={formData}
          onInputChange={handleInputChange}
          onSaveButtonClick={handleSaveButtonClick}
        />
        <FetchMedischeData />

        {/* Render the button to open the modal */}
        <VoegMedischToeButton onClick={() => {
          console.log('Button clicked');
          setShowMedischToevoegenModal(true);
        }} />

        {/* Render the modal */}
        <MedischToevoegenModal
          isOpen={showMedischToevoegenModal}
          onClose={() => setShowMedischToevoegenModal(false)}
          onAddMedischData={handleAddMedischData}
        />
      </div>
    </QueryClientProvider>
  );
};

//------------------------------ Functional components ------------------------------
const SaveButton = (props) => {
  return (
    <div className='ProfileButton-Content'>
      <button
        className='ProfileButton'
        title='Sla veranderingen op'
        onClick={props.onSaveButtonClick}
      >
        <strong>Save</strong>
      </button>
      <p className='ProfileButton-Warning'>
        Sla je veranderingen op!<br />anders worden ze ongedaan gemaakt
      </p>
    </div>
  );
};

const VoegMedischToeButton = ({ onClick }) => {
  return (
    <div className='ProfileButton-Content'>
      <button className='ProfileButton' aria-label='voeg een aandoening of beperking toe' title='voeg een aandoening of beperking toe' onClick={onClick}>
        <strong>+ Voeg Toe</strong>
      </button>
    </div>
  );
};

const DataItem = (props) => {
  const { field, value, data, onInputChange } = props;

  return (
    <div className='DataItem'>
      <p className='DataItem-Name'>{value}</p>
      <input
        id={`info-${field}`}
        className='DataItem-Field'
        type='text'
        placeholder={value} // Use value instead of placeholder
        value={data[field] || ''}
        onChange={(e) => onInputChange(field, e.target.value)}
      />
    </div>
  );
};

const DataItemMedisch = (prop) => {
  return(
      <div className='Profiel-DataItem'>
          <p className='Profiel-Data'><span className='typeGegevenNaam'>Beperking</span>: {prop.beperking}</p>
          <p className='Profiel-Data'><span className='typeGegevenNaam'>Hulpmiddelen</span>: {prop.hulpmiddelen}</p>
      </div>
  );
}

const VerwijderMedischButton = ({ beperking, hulpmiddelen, onDeleteMedischeGegeven }) => {
  const handleDeleteClick = () => {
    onDeleteMedischeGegeven(beperking, hulpmiddelen);
  };

  return (
    <button
      className='VerwijderButton'
      aria-label='Verwijder een aandoening'
      onClick={handleDeleteClick}
    >
      <strong>Verwijder aandoening</strong>
    </button>
  );
};


//------------------------------ Page content ------------------------------
// Component die alle medische gegevens rendered
const MedischeDataContent = (props) => {
  const medischeData = props.data;

  const handleDeleteMedischeGegeven = (beperking, hulpmiddelen) => {
    console.log('Beperking:', beperking);
    console.log('Hulpmiddelen:', hulpmiddelen);

    fetch(`https://localhost:7288/profiel/DeleteMedischeGegeven?_Beperking=${encodeURIComponent(beperking)}&_Hulpmiddelen=${encodeURIComponent(hulpmiddelen)}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.statusText}`);
      }
  
      // If the response is not JSON, simply return the response text
      if (!response.headers.get('content-type')?.includes('application/json')) {
        return response.text();
      }
  
      // Otherwise, parse the JSON response
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
      // Handle success, e.g., refresh the data
      // You may want to refetch the data or update the state to reflect the changes
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error, e.g., show an error message
    });
  };

  return (
    <section className='profiel-section'>
      <h2 className='subtitle profielh2'>Medische gegevens</h2>
      <ul className='Medische-DataLijst'>
        {medischeData.map((item, index) => (
          <li className='Medische-DataLijstItem' key={index}>
            <div className='ListItemBox'>
              <DataItemMedisch value="Ziekte" beperking={item.beperking} hulpmiddelen={item.hulpmiddelen} />
              <VerwijderMedischButton
                beperking={item.beperking}
                hulpmiddelen={item.hulpmiddelen}
                onDeleteMedischeGegeven={handleDeleteMedischeGegeven}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

// Component die alle profiel gegevens rendered
const ProfielDataContent = (props) => {
  const profileData = props.data

  return(
    <div>
      <section className='profiel-section'>
      <h2 className='subtitle profielh2'>Persoonlijke gegevens</h2>
      <p className='ProfileButton-Warning'>Alle invoervelden zijn verplicht in te vuillen<br/> Kan je iets niet invullen? vul een '-' of gewoon een spatie in.</p>
        <DataItem value="Naam" field='naam' placeholder={profileData.naam} data={props.data} onInputChange={props.onInputChange} aria-label='Naam invoerveld, voer hier je naam in'/>
        <DataItem value="Email" field='email' placeholder={profileData.email} data={props.data} onInputChange={props.onInputChange} aria-label='Email invoerveld, voer hier je email in'/>
        <DataItem value="Beschikbaarheid" field='beschikbaarheid' placeholder={profileData.beschikbaarheid} data={props.data} onInputChange={props.onInputChange} aria-label='Beschikbaarheid invoerveld, voer hier je beschikbaarheid in'/>
      </section>

      <section className='profiel-section'>
      <h2 className='subtitle profielh2'>Adres</h2>
        <DataItem value="Straatnaam" field='straat' placeholder={profileData.straat} data={props.data} onInputChange={props.onInputChange} aria-label='Straatnaam invoerveld, voer hier je straatnaam in'/>
        <DataItem value="Huisnummer" field='huisNr' placeholder={profileData.huisNr} data={props.data} onInputChange={props.onInputChange} aria-label='huisnummer invoerveld, voer hier de bijhorende huisnummer in'/>
        <DataItem value="Toevoeging" field='toevoeging' placeholder={profileData.toevoeging} data={props.data} onInputChange={props.onInputChange} aria-label='Toevoeging invoerveld, vul een spatie in of een andere toets als je er geen toevoeging hebt'/>
        <DataItem value="Postcode" field='postcode' placeholder={profileData.postcode} data={props.data} onInputChange={props.onInputChange} aria-label='Postcode invoerveld, voer hier je postcode in, geen spaties'/>
      </section>
      <SaveButton onSaveButtonClick={props.onSaveButtonClick} />
    </div>
  );
}

//------------------------------ Get Data from api ------------------------------
// Fetch medische gegevens van de database via ProfielController
const FetchMedischeData = () => {
  const { data: medischeData, isLoading, isError, error } = useQuery({
    queryKey: ['medischeData'],
    queryFn: async () => {
      const response = await fetch('https://localhost:7288/profiel/GetMedischeGegevens', {credentials: 'include'});
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


export default ProfielEdit;