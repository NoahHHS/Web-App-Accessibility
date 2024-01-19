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
    // Simulate fetching data from the database
    const onderzoekDataFromDB = [
      'Onderzoek 1',
      'Onderzoek 2',
      'Onderzoek 3',
      'Onderzoek 4',
      'Onderzoek 5',
      'Onderzoek 6',
    ];

    const bedrijfAccountDataFromDB = [
      'BedrijfAccount 1',
      'BedrijfAccount 2',
      'BedrijfAccount 3',
      'BedrijfAccount 4',
      'BedrijfAccount 5',
      'BedrijfAccount 6',
    ];

    const gebruikerDataFromDB = [
      'Gebruiker 1',
      'Gebruiker 2',
      'Gebruiker 3',
      'Gebruiker 4',
      'Gebruiker 5',
      'Gebruiker 6',
    ];

    this.setState({
      onderzoekData: onderzoekDataFromDB,
      bedrijfAccountData: bedrijfAccountDataFromDB,
      gebruikerData: gebruikerDataFromDB,
      filteredOnderzoekData: onderzoekDataFromDB,
      filteredBedrijfAccountData: bedrijfAccountDataFromDB,
      filteredGebruikerData: gebruikerDataFromDB,
    });
  }

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
    // To be implemented
    this.closeModal();
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
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state or perform any other action with the filtered data
    this.setState({ filteredOnderzoekData: filteredData });
  };

  handleBedrijfAccountSearch = (searchTerm) => {
    // Implement your search logic here, e.g., filtering the list
    const filteredData = this.state.bedrijfAccountData.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state or perform any other action with the filtered data
    this.setState({ filteredBedrijfAccountData: filteredData });
  };

  handleGebruikerSearch = (searchTerm) => {
    // Implement your search logic here, e.g., filtering the list
    const filteredData = this.state.gebruikerData.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state or perform any other action with the filtered data
    this.setState({ filteredGebruikerData: filteredData });
  };

  render() {
    return (
      <div className="mid-section">
        <h1 className="pagetitle">Medewerker Pagina</h1>

        {/* Aangevraagde Onderzoeken */}
        <h2 className="itemtitle">Aangevraagde onderzoeken</h2>
        <div className="ZoekbalkContainer">
          <Zoekbalk
            placeholder="Zoek door aangevraagde onderzoeken"
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
                {onderzoek}
              </li>
            ))}
          </ul>
        </div>

        {/* Aangevraagde Bedrijf Accounts */}
        <h2 className="itemtitle">Aaangevraagde bedrijf accounts</h2>
        <div className="ZoekbalkContainer">
          <Zoekbalk
            placeholder="Zoek door aangevraagde bedrijf accounts"
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
                {gebruiker}
              </li>
            ))}
          </ul>
        </div>

        {/* Onderzoek Modal/Pop-up */}
        {this.state.isOnderzoekModalOpen && (
          <div>
            <div className="modal-overlay"></div>
            <div className="modal-container">
              <span className="sluiten" onClick={this.closeModal}>
                &times;
              </span>
              <h2 className="Otitel">Onderzoeksdata</h2>
              <p className="Otext">Naam van het onderzoek</p>
              <input
                type="text"
                id="titel"
                className="Oinput"
                placeholder={this.state.selectedItem}
              />
              <p className="Otext">beschrijving</p>
              <input
                type="text"
                id="beschrijving"
                className="Oinput"
                placeholder="onderzoek"
              />
              <p className="Otext">Locatie onderzoek</p>
              <input type="text" id="plek" className="Oinput" placeholder="Locatie" />
              <p className="Otext">Datum onderzoek</p>
              <input
                type="date"
                id="tijd"
                className="Oinput"
                placeholder="01/01/2025"
              />
              <p className="Otext">Link naar onderzoek.</p>
              <input type="text" id="link" className="Oinput" placeholder="link" />
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
              <p className="Otext">Details voor: {this.state.selectedItem}</p>
              {/* Add more details as needed */}
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
