import React, { Component } from 'react';
import './Bedrijf.css'
export class Bedrijfs extends Component {
    static displayName = Bedrijfs.name;

  render() {
    return (
      <div>
        <h1 class="pagetitle">Bedrijfs Pagina</h1>
          <div class="searchbar">
              <input type="text" placeholder="Onderzoek.." name="search"/>
              <button type="submit"><img src={require('./SearchIcon.png')}/></button>
          </div>
        </div>
    );
  }
}