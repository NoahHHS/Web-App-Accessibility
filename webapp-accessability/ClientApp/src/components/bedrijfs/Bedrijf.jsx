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
      inputData: '',
      onderzoekData: [], // State to store onderzoek data
      filteredOnderzoekData: [], // State to store filtered onderzoek data
    };
  }

  componentDidMount() {
    // Simulate fetching data from the database
    const onderzoekDataFromDB = ['Onderzoek 1', 'Onderzoek 2', 'Onderzoek 3'];

    this.setState({
      onderzoekData: onderzoekDataFromDB,
      filteredOnderzoekData: onderzoekDataFromDB, // Initialize with all data
    });
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleInputChange = (e) => {
    this.setState({ inputData: e.target.value });
  };

  handleAddButtonClick = () => {
    // Simulate adding data to the list
    const newOnderzoekData = [...this.state.onderzoekData, this.state.inputData];

    // Update state with the new data
    this.setState({ onderzoekData: newOnderzoekData, filteredOnderzoekData: newOnderzoekData });

    // Close the modal
    this.closeModal();
  };

  handleSearch = (searchTerm) => {
    // Implement your search logic here, e.g., filtering the list
    const filteredData = this.state.onderzoekData.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state or perform any other action with the filtered data
    this.setState({ filteredOnderzoekData: filteredData });
  };

  render() {
    return (
      <div className="mid-section">
        <h1 className="pagetitle">Bedrijfs Pagina</h1>
        <div className="ZoekbalkContainer">
          <Zoekbalk
            placeholder="zoek uw onderzoeken"
            data={this.state.onderzoekData} // Pass the list to be searched
            onSearch={this.handleSearch}
          />
        </div>

        {/* Display the filtered or original list based on the search */}
        <div className="OnderzoekList-container">
          <ul className="OnderzoekList">
            {this.state.filteredOnderzoekData.map((onderzoek, index) => (
              <li key={index} className="OnderzoekList-item">
                {onderzoek}
              </li>
            ))}
          </ul>
        </div>

        <div className="add-button-container">
          <button className="add-button" onClick={this.openModal}>
            Toevoegen
          </button>
        </div>

        {/* Modal/Pop-up */}
        {this.state.isModalOpen && (
          <div>
            <div className="modal-overlay"></div>
            <div className="modal-container">
              <span className="sluiten" onClick={this.closeModal}>
                &times;
              </span>
              <h2 className="Otitel">Onderzoeksdata</h2>
              <p className="Otext">Naam van het onderzoek</p>
              <input type="text" id="titel" className="Oinput" />
              <p className="Otext">geef een beschrijving van het onderzoek</p>
              <textarea type="text" id="beschrijving" className="Otextarea" />
              <p className="Otext">Waar bevindt het onderzoek zich?</p>
              <input type="text" id="plek" className="Oinput" />
              <p className="Otext">Wanneer is het onderzoek?</p>
              <input type="date" id="tijd" className="Oinput" />
              <p className="Otext">Voeg hier de link naar het onderzoek toe.</p>
              <input type="text" id="link" className="Oinput" />
              <div className="ToevoegKnop-container ">
                <button
                  className="ToevoegKnop"
                  onClick={this.handleAddButtonClick}
                >
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
