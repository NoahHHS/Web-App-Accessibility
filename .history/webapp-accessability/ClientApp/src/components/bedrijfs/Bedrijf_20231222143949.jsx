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
      </div>
    );
  }
}