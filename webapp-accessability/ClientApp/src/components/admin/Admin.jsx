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
    // Simulate fetching gebruiker data from the database or API
    const gebruikerDataFromDB = [
      'Gebruiker 1',
      'Gebruiker 2',
      'Gebruiker 3',
      'Gebruiker 4',
      'Gebruiker 5',
      'Gebruiker 6',
    ];

    this.setState({
      gebruikerData: gebruikerDataFromDB,
      filteredGebruikerData: gebruikerDataFromDB,
    });
  };

  fetchOnderzoekData = () => {
    // Fetch onderzoek data from the API or database
    fetch('/admin/GetOnderzoeken')
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

  handleVerwijderButtonClick = () => {
    // Perform the delete operation
    const { selectedItem } = this.state;
    if (!selectedItem) return;

    fetch(`/admin/VerwijderOnderzoek/${selectedItem.Id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Refresh onderzoek data after deletion
        this.fetchOnderzoekData();
      })
      .catch((error) => console.error('Error deleting onderzoek:', error));

    // Close the modal
    this.closeModal();
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
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state or perform any other action with the filtered data
    this.setState({ filteredGebruikerData: filteredData });
  };

  handleOnderzoekSearch = (searchTerm) => {
    // Implement your search logic here, e.g., filtering the list
    const filteredData = this.state.onderzoekData.filter((item) =>
      item.Naam.toLowerCase().includes(searchTerm.toLowerCase())
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
                {gebruiker}
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
                {onderzoek.Naam}
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
              <p className="Otext">Details voor: {this.state.selectedItem}</p>
              {/* Add more details as needed */}
              <div className="Opslaanknop-Verwijderknop-container">
                <button
                  className="Opslaanknop"
                  onClick={this.handleOpslaanButtonClick}
                >
                  Opslaan
                </button>
                <button
                  className="Verwijderknop"
                  onClick={this.handleVerwijderButtonClick}
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
              <p className="Otext">Naam van het onderzoek: {this.state.selectedItem.Naam}</p>
              <p className="Otext">Beschrijving: {this.state.selectedItem.Omschrijving}</p>
              <p className="Otext">StartDatum: {this.state.selectedItem.StartDatum}</p>
              <p className="Otext">EindDatum: {this.state.selectedItem.EindDatum}</p>
              <p className="Otext">Status: {this.state.selectedItem.Status}</p>
              <p className="Otext">Type: {this.state.selectedItem.Type}</p>
              <p className="Otext">MedewerkerId: {this.state.selectedItem.MedewerkerId}</p>
              <p className="Otext">LinkId: {this.state.selectedItem.LinkId}</p>
              <p className="Otext">LocatieId: {this.state.selectedItem.LocatieId}</p>

              <div className="Opslaanknop-Verwijderknop-container">
                <button
                  className="Opslaanknop"
                  onClick={this.handleOpslaanButtonClick}
                >
                  Opslaan
                </button>
                <button
                  className="Verwijderknop"
                  onClick={this.handleVerwijderButtonClick}
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