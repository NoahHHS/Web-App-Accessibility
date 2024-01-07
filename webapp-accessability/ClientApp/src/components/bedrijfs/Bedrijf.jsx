import React, { Component } from 'react';
import '../../stylesheets/Bedrijf.css'

export class Bedrijfs extends Component {
    static displayName = Bedrijfs.name;

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
                  <li className="dark-list-item">List Item 1</li>
                  <li className="dark-list-item">List Item 2</li>
                  <li className="dark-list-item">List Item 3</li>
                  {/* Add more list items as needed */}
              </ul>
          </div>
          <div className="add-button-container">
            <button className="add-button">Toevoegen</button>
          </div>        
      </div>
    );
  }
}