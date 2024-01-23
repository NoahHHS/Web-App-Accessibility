import React, { Component } from 'react';
import { Zoekbalk } from '../reusables/reusables.jsx';
import '../../stylesheets/Medewerker.css';
import '../../stylesheets/reusables.css';

export class Medewerker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGebruikerModalOpen: false,
      isOnderzoekModalOpen: false,
      isBedrijfAccountModalOpen: false,
      inputData: '',
      onderzoekData: [],
      bedrijfAccountData: [],
      gebruikerData: [],
      selectedItem: '',
      filteredOnderzoekData: [],
      filteredBedrijfAccountData: [],
      filteredGebruikerData: [],
    };
  }

  componentDidMount() {
    // Fetch gebruiker data from the Medewerker controller
    this.fetchGebruikerData();

    // Fetch bedrijf account data from the Medewerker controller
    this.fetchBedrijfAccountData();

    // Fetch onderzoek data from the Medewerker controller
    this.fetchOnderzoekData();
  }

  fetchGebruikerData = () => {
    fetch('https://localhost:7288/medewerker/GetGebruikers')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          gebruikerData: data,
          filteredGebruikerData: data,
        });
      })
      .catch((error) => console.error('Error fetching gebruiker data:', error));
  };

  fetchBedrijfAccountData = () => {
    fetch('https://localhost:7288/medewerker/GetBedrijfAccounts')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          bedrijfAccountData: data,
          filteredBedrijfAccountData: data,
        });
      })
      .catch((error) => console.error('Error fetching bedrijf account data:', error));
  };

  fetchOnderzoekData = () => {
    fetch('https://localhost:7288/medewerker/GetOnderzoeken')
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

  openBedrijfAccountModal = () => {
    this.setState({ isBedrijfAccountModalOpen: true });
  };

  openOnderzoekModal = () => {
    this.setState({ isOnderzoekModalOpen: true });
  };

  closeModal = () => {
    this.setState({
      isGebruikerModalOpen: false,
      isOnderzoekModalOpen: false,
      isBedrijfAccountModalOpen: false,
      selectedItem: '',
    });
  };

  handleInputChange = (e) => {
    this.setState({ inputData: e.target.value });
  };

  handleAddButtonClick = () => {
    // Perform any actions you need when the "Opslaan" button is clicked
    console.log('Data added:', this.state.inputData);

    // Close the modal
    this.closeModal();
  };

  handleAccepterenClick = () => {
    const { selectedItem } = this.state;
  
    if (selectedItem.id) {
      // Make a request to update the onderzoek status
      fetch(`https://localhost:7288/medewerker/UpdateOnderzoekStatus/${selectedItem.id}`, {
        method: 'PUT',
      })
        .then((response) => {
          if (response.ok) {
            // Refresh data after the update
            this.fetchOnderzoekData();
            // Close the modal
            this.closeModal();
          } else {
            console.error('Error updating onderzoek status');
          }
        })
        .catch((error) => console.error('Error updating onderzoek status:', error));
    }
  };

  handleAfwijzenClick = () => {
    // To be implemented
    this.closeModal();
  };

  handleGebruikerItemClick = (item) => {
    this.setState({ selectedItem: item });
    this.openGebruikerModal();
  };

  handleBedrijfAccountItemClick = (item) => {
    this.setState({ selectedItem: item });
    this.openBedrijfAccountModal();
  };

  handleOnderzoekItemClick = (item) => {
    this.setState({ selectedItem: item });
    this.openOnderzoekModal();
  };

  handleOnderzoekSearch = (searchTerm) => {
    // Implement your search logic here, e.g., filtering the list
    const filteredData = this.state.onderzoekData.filter((item) =>
      item.naam.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state or perform any other action with the filtered data
    this.setState({ filteredOnderzoekData: filteredData });
  };

  handleBedrijfAccountSearch = (searchTerm) => {
    // Implement your search logic here, e.g., filtering the list
    const filteredData = this.state.bedrijfAccountData.filter((item) =>
      item.bedrijfsnaam.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state or perform any other action with the filtered data
    this.setState({ filteredBedrijfAccountData: filteredData });
  };

  handleGebruikerSearch = (searchTerm) => {
    // Implement your search logic here, e.g., filtering the list
    const filteredData = this.state.gebruikerData.filter((item) =>
      item.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state or perform any other action with the filtered data
    this.setState({ filteredGebruikerData: filteredData });
  };

  render() {
    return (
      <div className="mid-section">
        <h1 className="pagetitle">Medewerker Pagina</h1>

        {/* Onderzoeken */}
        <h2 className="itemtitle">Onderzoeken</h2>
        <div className="ZoekbalkContainer">
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

        {/* Bedrijf Accounts */}
        <h2 className="itemtitle">Bedrijf Accounts</h2>
        <div className="ZoekbalkContainer">
          <Zoekbalk
            placeholder="Zoek bedrijf accounts"
            data={this.state.bedrijfAccountData}
            onSearch={this.handleBedrijfAccountSearch}
          />
        </div>
        <div className="BedrijfAccountList-container">
          <ul className="BedrijfAccountList">
            {this.state.filteredBedrijfAccountData.map((bedrijfAccount, index) => (
              <li
                key={index}
                className="BedrijfAccountList-item"
                onClick={() => this.handleBedrijfAccountItemClick(bedrijfAccount)}
                style={{ cursor: 'pointer' }}
              >
                {bedrijfAccount}
              </li>
            ))}
          </ul>
        </div>

        {/* Gebruikers */}
        <h2 className="itemtitle">Gebruikers</h2>
        <div className="ZoekbalkContainer">
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

        {this.state.isOnderzoekModalOpen && (
          <div>
            <div className="modal-overlay"></div>
            <div className="modal-container">
              <span className="sluiten" onClick={this.closeModal}>
                &times;
              </span>
              <h2 className="Otitel">Onderzoeksdata</h2>
              <p className="Otext">Naam van het onderzoek: {this.state.selectedItem.naam}</p>
              <p className="Otext">Beschrijving: {this.state.selectedItem.omschrijving}</p>
              <p className="Otext">StartDatum: {this.state.selectedItem.startDatum}</p>
              <p className="Otext">EindDatum: {this.state.selectedItem.eindDatum}</p>
              <p className="Otext">Type: {this.state.selectedItem.type}</p>
              <p className="Otext">MedewerkerId: {this.state.selectedItem.medewerkerId}</p>
              <p className="Otext">LinkId: {this.state.selectedItem.linkId}</p>
              <p className="Otext">LocatieId: {this.state.selectedItem.locatieId}</p>

              <div className="Accepteren-Afwijzen-Container">
                <button
                  className="Accepteren"
                  onClick={this.handleAccepterenClick}
                >
                  Accepteren
                </button>
                <button
                  className="Afwijzen"
                  onClick={this.handleAfwijzenClick}
                >
                  Afwijzen
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BedrijfAccount Modal/pop-up */}
        {this.state.isBedrijfAccountModalOpen && (
          <div>
            <div className="modal-overlay">
              <div className="modal-container">
                <span className="sluiten" onClick={this.closeModal}>
                  &times;
                </span>
                <h2 className="Otitel">BedrijfAccount data</h2>
                <p className="BedrijfAccountText">
                  {this.state.selectedItem} vraagt een bedrijfs account aan.
                </p>
                <h3 className="BedrijfAccountSubtitel">Persoonsgegevens</h3>
                <p className="BedrijfAccountText">
                  Naam: {this.state.selectedItem}
                </p>
                <p className="BedrijfAccountText">
                  Bedrijf: {this.state.selectedItem}
                </p>
                <p className="BedrijfAccountText">
                  Telefoon: {this.state.selectedItem}
                </p>
                <p className="BedrijfAccountText">
                  Email: {this.state.selectedItem}
                </p>
                <div className="Opslaanknop-container">
                <button
                  className="Opslaanknop"
                  onClick={this.handleAddButtonClick}
                >
                  Opslaan
                </button>
              </div>
              </div>
            </div>
          </div>
        )}

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
            <p className="Otext">Naam: {this.state.selectedItem.naam}</p>
          )}
          {this.state.selectedItem.userName && (
            <p className="Otext">Gebruikersnaam: {this.state.selectedItem.userName}</p>
          )}
          {this.state.selectedItem.email && (
            <p className="Otext">E-mail: {this.state.selectedItem.email}</p>
          )}
          {this.state.selectedItem.rol && (
            <p className="Otext">Rol: {this.state.selectedItem.rol}</p>
          )}
          {this.state.selectedItem.bedrijfsNaam && (
            <p className="Otext">Bedrijfsnaam: {this.state.selectedItem.bedrijfsNaam}</p>
          )}
          {this.state.selectedItem.voorkeurBenadering && (
            <p className="Otext">Voorkeur Benadering: {this.state.selectedItem.voorkeurBenadering}</p>
          )}
          {this.state.selectedItem.beschikbaarheid && (
            <p className="Otext">Beschikbaarheid: {this.state.selectedItem.beschikbaarheid}</p>
          )}

          {/* Address details */}
          {this.state.selectedItem.adres && (
            <p className="Otext">Adres: {`${this.state.selectedItem.adres.straat} ${this.state.selectedItem.adres.huisNr} ${this.state.selectedItem.adres.toevoeging}, ${this.state.selectedItem.adres.postcode}`}</p>
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
              <div className="Opslaanknop-container">
                <button
                  className="Opslaanknop"
                  onClick={this.handleAddButtonClick}
                >
                  Opslaan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
