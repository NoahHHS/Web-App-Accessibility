import React, { Component } from 'react';
import '../../stylesheets/Profiel.css'

export class ProfielData extends Component {
    static displayName = ProfielData.name;

  render() {
    return (
      <div>
        <h1 className='pagetitle'>Mijn Gegevens</h1>
        <section className='profiel-section'>
          <h2 className='subtitle profielh2'>Persoonlijke gegevens</h2>
          <ProfielGegeven typeGegeven="Naam"/>
          <ProfielGegeven typeGegeven="Email"/>
          <ProfielGegeven typeGegeven="Beschikbaarheid"/>
        </section>
        <section className='profiel-section'>
        <h2 className='subtitle profielh2'>Adres</h2>
          <ProfielGegeven typeGegeven="Straatnaam"/>
          <ProfielGegeven typeGegeven="Huisnummer"/>
          <ProfielGegeven typeGegeven="Postcode"/>
          <ProfielGegeven typeGegeven="Stad"/>
        </section>
        <section className='profiel-section'>
        <h2 className='subtitle profielh2'>Medische gegevens</h2>
          <ProfielGegeven typeGegeven="Ziekte"/>
          <ProfielGegeven typeGegeven="Hulpmiddelen" />
        </section>
        <ProfileButton/>
      </div>
    );
  }
}

const ProfileButton = () => {
    return(
      <div className='ProfileButton-Content'>
        <a href="/profiel/edit"><button className='ProfileButton' title='Bewerk je gegevens op een andere pagina'><strong>Bewerk Gegevens</strong></button></a>
      </div>
    );
}

const ProfielGegeven = (prop) => {
    return(
        <div className='Profiel-DataItem'>
            <p className='Profiel-Data'>{prop.typeGegeven}: {prop.value}</p>
        </div>
    );
}