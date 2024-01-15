import React, { Component } from 'react';
import {Zoekbalk} from '../reusables/reusables.jsx'
import '../../stylesheets/Medewerker.css'
import '../../stylesheets/reusables.css'
export class Medewerker extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      isGebruikerModalOpen: false,
      isOnderzoekModalOpen: false,
      inputData: '',
    };
}

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

handleAddButtonClick = () => {
  // Perform any actions you need when the "Opslaan" button is clicked
  console.log('Data added:', this.state.inputData);

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

render() {
  return (
    <div className='mid-section'>
      <h1 class="pagetitle">Medewerker Pagina</h1>

      <h2 class="itemtitle">Aangevraagde onderzoeken</h2>
      <div className='ZoekbalkContainer'>
        <Zoekbalk placeholder="Zoek door aangevraagde onderzoeken"/>
      </div>
          {/* Unordered List Section */}
        <div className="OnderzoekList-container">
            <ul className="OnderzoekList">
                <li className="OnderzoekList-item" onClick={() => this.handleOnderzoekItemClick('Onderzoek 1')} style={{ cursor: 'pointer' }}>Onderzoek 1</li>
                <li className="OnderzoekList-item" onClick={() => this.handleOnderzoekItemClick('Onderzoek 2')} style={{ cursor: 'pointer' }}>Onderzoek 2</li>
                <li className="OnderzoekList-item" onClick={() => this.handleOnderzoekItemClick('Onderzoek 3')} style={{ cursor: 'pointer' }}>Onderzoek 3</li>
                <li className="OnderzoekList-item" onClick={() => this.handleOnderzoekItemClick('Onderzoek 4')} style={{ cursor: 'pointer' }}>Onderzoek 4</li>
                <li className="OnderzoekList-item" onClick={() => this.handleOnderzoekItemClick('Onderzoek 5')} style={{ cursor: 'pointer' }}>Onderzoek 5</li>
                <li className="OnderzoekList-item" onClick={() => this.handleOnderzoekItemClick('Onderzoek 6')} style={{ cursor: 'pointer' }}>Onderzoek 6</li>
                {/* Add more list items as needed */}
            </ul>
        </div>

      <h2 class='itemtitle'>Aaangevraagde bedrijf accounts</h2>
      <div className='ZoekbalkContainer'>
        <Zoekbalk placeholder='Zoek door aangevraagde bedrijf accounts'/>
      </div>
      {/* Unordered List  */}

      <h2 class="itemtitle">Gebruikers</h2>
      <div className='ZoekbalkContainer'>
        <Zoekbalk placeholder="Zoek gebruikers"/>
      </div>
          {/* Unordered List Section */}
        <div className="GebruikerList-container">
            <ul className="GebruikerList">
                <li className="GebruikerList-item" onClick={() => this.handleGebruikerItemClick('Gebruiker 1')} style={{ cursor: 'pointer' }}>Gebruiker 1</li>
                <li className="GebruikerList-item" onClick={() => this.handleGebruikerItemClick('Gebruiker 2')} style={{ cursor: 'pointer' }}>Gebruiker 2</li>
                <li className="GebruikerList-item" onClick={() => this.handleGebruikerItemClick('Gebruiker 3')} style={{ cursor: 'pointer' }}>Gebruiker 3</li>
                <li className="GebruikerList-item" onClick={() => this.handleGebruikerItemClick('Gebruiker 4')} style={{ cursor: 'pointer' }}>Gebruiker 4</li>
                <li className="GebruikerList-item" onClick={() => this.handleGebruikerItemClick('Gebruiker 5')} style={{ cursor: 'pointer' }}>Gebruiker 5</li>
                <li className="GebruikerList-item" onClick={() => this.handleGebruikerItemClick('Gebruiker 6')} style={{ cursor: 'pointer' }}>Gebruiker 6</li>
                {/* Add more list items as needed */}
            </ul>
        </div>

              {/* Modal/Pop-up */}
              {this.state.isOnderzoekModalOpen && (
<div>
  <div className="modal-overlay"></div>
  <div className="modal-container">
    <span className="sluiten" onClick={this.closeModal}>&times;</span>
    <h2 className="Otitel">Onderzoeksdata</h2>
        <p className="Otext">Naam van het onderzoek</p>
        <input type="text" id="titel" className="Oinput" placeholder={this.state.selectedItem} />
        <p className="Otext">beschrijving</p>
        <input type="text" id="beschrijving" className="Oinput" placeholder='onderzoek'/>
        <p className="Otext">Locatie onderzoek</p>
        <input type="text" id="plek" className="Oinput" placeholder='Locatie'/>
        <p className="Otext">Datum onderzoek</p>
        <input type="date" id="tijd" className="Oinput" placeholder='01/01/2025'/>
        <p className="Otext">Link naar onderzoek.</p>
        <input type="text" id="link" className="Oinput" placeholder='link' />
        <div className="Accepteren-Afwijzen-Container">
          <button className="Accepteren" onClick={this.handleAddButtonClick}>Accepteren</button>
          <button className="Afwijzen" onClick={this.handleAddButtonClick}>Afwijzen</button>
        </div>
  </div>
</div>
)} 


      {/* Gebruiker Modal/Pop-up */}
      {this.state.isGebruikerModalOpen && (
        <div>
          <div className="modal-overlay"></div>
          <div className="modal-container">
            <span className="sluiten" onClick={this.closeModal}>&times;</span>
            <h2 className="Otitel">Gebruikersdata</h2>
            <p className="Otext">Details voor: {this.state.selectedItem}</p>
            {/* Add more details as needed */}
            <div className="add-button-container">
              <button className="OplsaanKnop" onClick={this.handleAddButtonClick}>Opslaan</button>
            </div>
          </div>
        </div>
      )}

</div>
    );
  }
}