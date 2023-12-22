import React, { Component } from 'react';
import '../../stylesheets/Profiel.css'

export class Profiel extends Component {
    static displayName = Profiel.name;

  render() {
    return (
      <div>
        <h1 className='pagetitle'>Mijn Gegevens</h1>
        <section className='persoonsGegevens'>
          <DataItem>Naam</DataItem>
        </section>
        <section className='Adres'>

        </section>
        <section className='medischeGegevens'>

        </section>
        <section className='Bedrijfsgegevens'>

        </section>
      </div>
    );
  }
}

const DataItem = (prop) => {
  return(
    <div className='DataItem'>
      <p className='DataItem-Name'>{prop}</p>
      <input id='info-name' className="DataItem-Field" type="text" />
    </div>
  );
}