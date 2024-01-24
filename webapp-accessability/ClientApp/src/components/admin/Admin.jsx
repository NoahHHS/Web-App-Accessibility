import React, { Component } from 'react';
import { Zoekbalk } from '../reusables/reusables.jsx';
import '../../stylesheets/admin.css';
import '../../stylesheets/reusables.css';

export class Admin extends Component {
  static displayName = Admin.name;

  constructor(props) {
    super(props);
    this.state = {
      isGebruikerModalOpen: false,
      isOnderzoekModalOpen: false,
      inputData: '',
      gebruikerData: [],
      onderzoekData: [],
      selectedItem: '',
      filteredGebruikerData: [],
      filteredOnderzoekData: [],
    };
  }

  componentDidMount() {
    // Fetch gebruiker data from the database or API
    this.fetchGebruikerData();

    // Fetch onderzoek data from the database or API
    this.fetchOnderzoekData();
  }

  fetchGebruikerData = () => {
    // Fetch gebruiker data from the API or database
    fetch('https://localhost:7288/admin/GetGebruikers')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          gebruikerData: data,
          filteredGebruikerData: data,
        });
      })
      .catch((error) => console.error('Error fetching gebruiker data:', error));
  };

  fetchOnderzoekData = () => {
    // Fetch onderzoek data from the API or database
    fetch('https://localhost:7288/admin/GetOnderzoeken')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          onderzoekData: data,
          filteredOnderzoekData: data,
        });
      })
      .catch((error) => console.error('Error fetching onderzoek data:', error));
  };

  openGebruikerModal = () => {
    this.setState({ isGebruikerModalOpen: true });
  };

  openOnderzoekModal = () => {
    this.setState({ isOnderzoekModalOpen: true });
  };

  closeModal = () => {
    this.setState({
      isGebruikerModalOpen: false,
      isOnderzoekModalOpen: false,
      selectedItem: '',
    });
  };

  handleInputChange = (e) => {
    this.setState({ inputData: e.target.value });
  };

  handleOpslaanButtonClick = () => {
    // Perform any actions you need when the "Opslaan" button is clicked

    // Close the modal
    this.closeModal();
  };

  handleVerwijderOnderzoekButtonClick = () => {
    const { selectedItem } = this.state;
    
    if (selectedItem.id) {
      // Delete onderzoek
      fetch(`https://localhost:7288/admin/VerwijderOnderzoek/${selectedItem.id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then(() => {
          // Refresh data after deletion
          this.fetchOnderzoekData();
          // Close the modal
          this.closeModal();
        })
        .catch((error) => console.error('Error deleting onderzoek:', error));
    }
  };

  handleVerwijderGebruikerButtonClick = () => {
    const { selectedItem } = this.state;
  
    if (selectedItem.id) {
      // Delete gebruiker
      fetch(`https://localhost:7288/admin/VerwijderGebruiker/${selectedItem.id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then(() => {
          // Refresh data after deletion
          this.fetchGebruikerData();
          // Close the modal
          this.closeModal();
        })
        .catch((error) => console.error('Error deleting gebruiker:', error));
    }
  };

  handleGebruikerItemClick = (item) => {
    this.setState({ selectedItem: item });
    this.openGebruikerModal();
  };

  handleOnderzoekItemClick = (item) => {
    this.setState({ selectedItem: item });
    this.openOnderzoekModal();
  };

  handleGebruikerSearch = (searchTerm) => {
    // Implement your search logic here, e.g., filtering the list
    const filteredData = this.state.gebruikerData.filter((item) =>
      item.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state or perform any other action with the filtered data
    this.setState({ filteredGebruikerData: filteredData });
  };

  handleOnderzoekSearch = (searchTerm) => {
    // Implement your search logic here, e.g., filtering the list
    const filteredData = this.state.onderzoekData.filter((item) =>
      item.naam.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state or perform any other action with the filtered data
    this.setState({ filteredOnderzoekData: filteredData });
  };

  render() {
    return (
      <div className='mid-section'>
        <h1 className="pagetitle">Admin Pagina</h1>

        {/* Gebruikers */}
        <h2 className="itemtitle">Gebruikers</h2>
        <div className='ZoekbalkContainer'>
          <Zoekbalk
            placeholder="Zoek gebruikers"
            data={this.state.gebruikerData}
            onSearch={this.handleGebruikerSearch}
          />
        </div>
        <div className="GebruikerList-container">
          <ul className="GebruikerList">
            {this.state.filteredGebruikerData.map((gebruiker, index) => (
              <li
                key={index}
                className="GebruikerList-item"
                onClick={() => this.handleGebruikerItemClick(gebruiker)}
                style={{ cursor: 'pointer' }}
              >
                {gebruiker.userName}
              </li>
            ))}
          </ul>
        </div>

       {/* Onderzoeken */}
       <h2 className="itemtitle">Onderzoeken</h2>
        <div className='ZoekbalkContainer'>
          <Zoekbalk
            placeholder="Zoek door alle onderzoeken"
            data={this.state.onderzoekData}
            onSearch={this.handleOnderzoekSearch}
          />
        </div>
        <div className="OnderzoekList-container">
          <ul className="OnderzoekList">
            {this.state.filteredOnderzoekData.map((onderzoek, index) => (
              <li
                key={index}
                className="OnderzoekList-item"
                onClick={() => this.handleOnderzoekItemClick(onderzoek)}
                style={{ cursor: 'pointer' }}
              >
                {onderzoek.naam}
              </li>
            ))}
          </ul>
        </div>

        {/* Gebruiker Modal/Pop-up */}
        {this.state.isGebruikerModalOpen && (
  <div>
    <div className="modal-overlay"></div>
    <div className="modal-container">
      <span className="sluiten" onClick={this.closeModal}>
        &times;
      </span>
      <h2 className="Otitel">Gebruikersdata</h2>

      {/* Conditionally render rows */}
      {this.state.selectedItem.naam && (
        <p className="GebruikerAccountText">Naam: {this.state.selectedItem.naam}</p>
      )}
      {this.state.selectedItem.userName && (
        <p className="GebruikerAccountText">Gebruikersnaam: {this.state.selectedItem.userName}</p>
      )}
      {this.state.selectedItem.email && (
        <p className="GebruikerAccountText">E-mail: {this.state.selectedItem.email}</p>
      )}
      {this.state.selectedItem.rol && (
        <p className="GebruikerAccountText">Rol: {this.state.selectedItem.rol}</p>
      )}
      {this.state.selectedItem.bedrijfsNaam && (
        <p className="GebruikerAccountText">Bedrijfsnaam: {this.state.selectedItem.bedrijfsNaam}</p>
      )}
      {this.state.selectedItem.voorkeurBenadering && (
        <p className="GebruikerAccountText">Voorkeur Benadering: {this.state.selectedItem.voorkeurBenadering}</p>
      )}
      {this.state.selectedItem.beschikbaarheid && (
        <p className="GebruikerAccountText">Beschikbaarheid: {this.state.selectedItem.beschikbaarheid}</p>
      )}

      {/* Address details */}
      {this.state.selectedItem.adres && (
        <p className="GebruikerAccountText">Adres: {`${this.state.selectedItem.adres.straat} ${this.state.selectedItem.adres.huisNr} ${this.state.selectedItem.adres.toevoeging}, ${this.state.selectedItem.adres.postcode}`}</p>
      )}

      {/* Medische gegevens */}
      {this.state.selectedItem.medischegegevens && this.state.selectedItem.medischegegevens.length > 0 && (
        <div>
          <h3>Medische Gegevens</h3>
          <ul>
            {this.state.selectedItem.medischegegevens.map((medisch, index) => (
              <li key={index}>
                {medisch.beperking && (
                  <p>Beperking: {medisch.beperking}</p>
                )}
                {medisch.hulpmiddelen && (
                  <p>Hulpmiddelen: {medisch.hulpmiddelen}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Deelnames */}
      {this.state.selectedItem.deelnames && this.state.selectedItem.deelnames.length > 0 && (
        <div>
          <h3>Deelnames</h3>
          <ul>
            {this.state.selectedItem.deelnames.map((deelname, index) => (
              <li key={index}>
                {deelname.datum && (
                  <p>Datum: {deelname.datum}</p>
                )}
                {deelname.onderzoek && deelname.onderzoek.naam && (
                  <p>Onderzoek: {deelname.onderzoek.naam}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="Opslaanknop-Verwijderknop-container">
        <button
          className="Opslaanknop"
          onClick={this.handleOpslaanButtonClick}
        >
          Opslaan
        </button>
        <button
          className="Verwijderknop"
          onClick={this.handleVerwijderGebruikerButtonClick}
        >
          Verwijderen
        </button>
      </div>
    </div>
  </div>
)}

       {/* Onderzoek Modal/Pop-up */}
       {this.state.isOnderzoekModalOpen && (
          <div>
            <div className="modal-overlay"></div>
            <div className="modal-container">
              <span className="sluiten" onClick={this.closeModal}>
                &times;
              </span>
              <h2 className="Otitel">Onderzoeksdata</h2>
              <p className="OnderzoekText">Naam van het onderzoek: {this.state.selectedItem.naam}</p>
              <p className="OnderzoekText">Beschrijving: {this.state.selectedItem.omschrijving}</p>
              <p className="OnderzoekText">StartDatum: {this.state.selectedItem.startDatum}</p>
              <p className="OnderzoekText">EindDatum: {this.state.selectedItem.eindDatum}</p>
              <p className="OnderzoekText">Status: {this.state.selectedItem.status}</p>
              <p className="OnderzoekText">Type: {this.state.selectedItem.type}</p>
              <p className="OnderzoekText">MedewerkerId: {this.state.selectedItem.medewerkerId}</p>
              <p className="OnderzoekText">LinkId: {this.state.selectedItem.linkId}</p>
              <p className="OnderzoekText">LocatieId: {this.state.selectedItem.locatieId}</p>

              <div className="Opslaanknop-Verwijderknop-container">
                <button
                  className="Opslaanknop"
                  onClick={this.handleOpslaanButtonClick}
                >
                  Opslaan
                </button>
                <button
                  className="Verwijderknop"
                  onClick={this.handleVerwijderOnderzoekButtonClick}
                >
                  Verwijderen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Admin;
