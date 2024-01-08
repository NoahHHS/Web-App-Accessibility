import React, { Component } from 'react';
import '../../stylesheets/Bedrijf.css'

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
      <div>
        <h1 class="pagetitle">Bedrijfs Pagina</h1>
          <section class="searchbar">         {/* een search bar met de knop als img er naast */}
              <input type="text" placeholder="Onderzoek.." name="search"/>
              <button type="submit"><img src='../../../Assets/SearchIcon.png' alt="SearchIcon"/></button>
        </section>
            {/* Unordered List Section */}
          <div className="dark-list-container">
              <ul className="dark-list">
                  <li className="dark-list-item">Onderzoek 1</li>
                  <li className="dark-list-item">Onderzoek 2</li>
                  <li className="dark-list-item">Onderzoek 3</li>
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
      <span className="close" onClick={this.closeModal}>&times;</span>
      <h2>Enter Data</h2>
      <input type="text" value={this.state.inputData} onChange={this.handleInputChange} />
      <button onClick={this.handleAddButtonClick}>Toevoegen</button>
    </div>
  </div>
)} 
      </div>
    );
  }
}