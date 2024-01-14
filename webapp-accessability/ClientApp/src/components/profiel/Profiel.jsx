import React, { Component } from 'react';
import '../../stylesheets/Profiel.css'

export class Profiel extends Component {
    static displayName = Profiel.name;

  render() {
    return (
      <div>
        <h1 className='pagetitle'>Mijn Gegevens</h1>
        <section className='profiel-section'>
          <h2 className='subtitle'>Persoonlijke gegevens</h2>
          <DataItem value="Naam"/>
          <DataItem value="Achternaam"/>
          <DataItem value="Email"/>
        </section>
        <SaveButton/>
        <section className='profiel-section'>
        <h2 className='subtitle'>Adres</h2>
          <DataItem value="Straatnaam"/>
          <DataItem value="Huisnummer"/>
          <DataItem value="Postcode"/>
          <DataItem value="Stad"/>
        </section>
        <SaveButton/>
        <section className='profiel-section'>
        <h2 className='subtitle'>Medische gegevens</h2>
          <DataItem value="Ziekte"/>
          <DataItem value="Hulpmiddelen"/>
        </section>
        <SaveButton/>
      </div>
    );
  }
}

const SaveButton = () => {
    return(
      <div className='SaveButton-Content'>
        <button className='SaveButton' title='Sla veranderingen op'><strong>Save</strong></button>
        <p className='SaveButton-Warning'>Sla je veranderingen op!<br/>anders worden ze ongedaan gemaakt</p>
      </div>
    );
}

const DataItem = (prop) => {
  return(
    <div className='DataItem'>
      <p className='DataItem-Name'>{prop.value}</p>
      <input id='info-name' className="DataItem-Field" type="text"/>
    </div>
  );
}