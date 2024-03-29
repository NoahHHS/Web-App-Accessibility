import React, { Component } from 'react';
import { Zoekbalk } from '../reusables/reusables.jsx';
import '../../stylesheets/Bedrijf.css';
import '../../stylesheets/reusables.css';

export class Bedrijfs extends Component {
  static displayName = Bedrijfs.name;

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      naam: '',
      beschrijving: '',
      plek: '',
      tijd: '',
      link: '',
      onderzoekData: [],
      filteredOnderzoekData: [],
    };
  }

  componentDidMount() {
    const bedrijfId = 'bedrijf-id-1';

    fetch(`https://localhost:7288/Bedrijfs/GetOnderzoeken/${bedrijfId}`, {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          onderzoekData: data,
          filteredOnderzoekData: data,
        });
      })
      .catch((error) => console.error('Error fetching onderzoek data:', error));
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      naam: '',
      beschrijving: '',
      plek: '',
      tijd: '',
      link: '',
    });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleAddButtonClick = async () => {
    if (!this.state.naam || !this.state.beschrijving || !this.state.plek || !this.state.tijd) {
      console.error('Please fill in all required fields.');
      return;
    }

    const bedrijfId = 'bedrijf-id-1';
    const newOnderzoek = {
      naam: this.state.naam,
      omschrijving: this.state.beschrijving,
      locatie: this.state.plek,
      startDatum: this.state.tijd,
      link: this.state.link,
      bedrijfId: bedrijfId,
    };

    try {
      const response = await fetch('https://localhost:7288/Bedrijfs/CreateOnderzoek', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOnderzoek),
      });

      if (response.ok) {
        this.fetchOnderzoekData();
        this.closeModal();
      } else {
        console.error('Failed to create onderzoek. Please try again.');
      }
    } catch (error) {
      console.error('Error creating onderzoek:', error);
    }
  };

  fetchOnderzoekData = () => {
    // Implement the logic to fetch updated data after adding a new onderzoek
    // You can use a similar fetch as in componentDidMount
  };

  handleSearch = (searchTerm) => {
    const filteredData = this.state.onderzoekData.filter((item) =>
      item.naam.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.setState({ filteredOnderzoekData: filteredData });
  };

  render() {
    return (
      <div className="mid-section">
        <h1 className="pagetitle">Bedrijfs Pagina</h1>
        <div className="ZoekbalkContainer">
          <Zoekbalk
            placeholder="zoek uw onderzoeken"
            data={this.state.onderzoekData}
            onSearch={this.handleSearch}
          />
        </div>

        <div className="OnderzoekList-container">
          <ul className="OnderzoekList">
            {this.state.filteredOnderzoekData.map((onderzoek, index) => (
              <li key={index} className="OnderzoekList-item">
                {onderzoek.naam}
              </li>
            ))}
          </ul>
        </div>

        <div className="add-button-container">
          <button className="add-button" onClick={this.openModal}>
            Toevoegen
          </button>
        </div>

        {this.state.isModalOpen && (
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
                id="naam"
                className="Oinput"
                value={this.state.naam}
                onChange={this.handleInputChange}
              />
              <p className="Otext">Geef een beschrijving van het onderzoek</p>
              <textarea
                type="text"
                id="beschrijving"
                className="Otextarea"
                value={this.state.beschrijving}
                onChange={this.handleInputChange}
              />
              <p className="Otext">Waar bevindt het onderzoek zich?</p>
              <input
                type="text"
                id="plek"
                className="Oinput"
                value={this.state.plek}
                onChange={this.handleInputChange}
              />
              <p className="Otext">Wanneer is het onderzoek?</p>
              <input
                type="date"
                id="tijd"
                className="Oinput"
                value={this.state.tijd}
                onChange={this.handleInputChange}
              />
              <p className="Otext">Voeg hier de link naar het onderzoek toe.</p>
              <input
                type="text"
                id="link"
                className="Oinput"
                value={this.state.link}
                onChange={this.handleInputChange}
              />
              <div className="ToevoegKnop-container">
                <button className="ToevoegKnop" onClick={this.handleAddButtonClick}>
                  Toevoegen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
