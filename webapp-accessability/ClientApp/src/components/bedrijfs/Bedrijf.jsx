import React, { Component } from 'react';
import {Zoekbalk} from '../reusables/reusables.jsx'
import '../../stylesheets/Bedrijf.css'
import '../../stylesheets/reusables.css'

export class Bedrijfs extends Component {
    static displayName = Bedrijfs.name;


    constructor(props) {
      super(props);
      this.state = {
          isModalOpen: false,
          inputData: '',
      };
  }

  openModal = () => {
      this.setState({ isModalOpen: true });
  }

  closeModal = () => {
      this.setState({ isModalOpen: false });
  }

  handleInputChange = (e) => {
      this.setState({ inputData: e.target.value });
  }

  handleAddButtonClick = () => {
      // Perform any actions you need when the "Add" button is clicked
      // For example, you can add the input data to your list
      console.log('Data added:', this.state.inputData);

      // Close the modal
      this.closeModal();
  }

  render() {
    return (
      <div className='mid-section'>
        <h1 class="pagetitle">Bedrijfs Pagina</h1>
        <div className='ZoekbalkContainer'>
          <Zoekbalk placeholder="zoek uw onderzoeken" />
        </div>
            {/* Unordered List Section */}
          <div className="OnderzoekList-container">
              <ul className="OnderzoekList">
                  <li className="OnderzoekList-item">Onderzoek 1</li>
                  <li className="OnderzoekList-item">Onderzoek 2</li>
                  <li className="OnderzoekList-item">Onderzoek 3</li>
                  {/* Add more list items as needed */}
              </ul>
          </div>
                <div className="add-button-container">
                    <button className="add-button" onClick={this.openModal}>Toevoegen</button>
                </div>

                {/* Modal/Pop-up */}
                {this.state.isModalOpen && (
  <div>
    <div className="modal-overlay"></div>
    <div className="modal-container">
      <span className="sluiten" onClick={this.closeModal}>&times;</span>
      <h2 className="Otitel">Onderzoeksdata</h2>
          <p className="Otext">Naam van het onderzoek</p>
          <input type="text" id="titel" className="Oinput" />
          <p className="Otext">geef een beschrijving van het onderzoek</p>
          <input type="text" id="beschrijving" className="Oinput" />
          <p className="Otext">Waar bevind het onderzoek?</p>
          <input type="text" id="plek" className="Oinput"/>
          <p className="Otext">Wanneer is het onderzoek?</p>
          <input type="date" id="tijd" className="Oinput" />
          <p className="Otext">Voeg hier de link naar het onderzoek toe.</p>
          <input type="text" id="link" className="Oinput" />
          <div className="add-button-container">
            <button className="ToevoegKnop" onClick={this.handleAddButtonClick}>Toevoegen</button>
          </div>
    </div>
  </div>
)} 
      </div>
    );
  }
}