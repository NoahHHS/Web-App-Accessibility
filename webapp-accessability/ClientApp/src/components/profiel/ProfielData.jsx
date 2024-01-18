import React, { Component } from 'react';
import '../../stylesheets/Profiel.css'

export class ProfielData extends Component {
    static displayName = ProfielData.name;

  render() {
    return (
      <div>
        <h1 className='pagetitle'>Mijn Gegevens</h1>
        <section className='profiel-section'>
          <h2 className='subtitle'>Persoonlijke gegevens</h2>
          <DataItem value="Naam" aria-label='Naam invoerveld, voer hier je naam in'/>
          <DataItem value="Achternaam" aria-label='Achternaam invoerveld, voer hier je achternaam in'/>
          <DataItem value="Email" aria-label='Email invoerveld, voer hier je email in'/>
        </section>
        <SaveButton/>
        <section className='profiel-section'>
        <h2 className='subtitle'>Adres</h2>
          <DataItem value="Straatnaam" aria-label='Straatnaam invoerveld, voer hier je straatnaam in'/>
          <DataItem value="Huisnummer" aria-label='huisnummer invoerveld, voer hier de bijhorende huisnummer in'/>
          <DataItem value="Postcode" aria-label='Postcode invoerveld, voer hier je postcode in, geen spaties'/>
          <DataItem value="Stad" aria-label='Stad invoerveld, voer hier in, in welke stad je woont'/>
        </section>
        <SaveButton/>
        <section className='profiel-section'>
        <h2 className='subtitle'>Medische gegevens</h2>
          <DataItem value="Ziekte" aria-label='Ziekte invoerveld, voer hier je Ziektes in, onderschijd de ziektes met een komma en een spatie'/>
          <DataItem value="Hulpmiddelen" aria-label='Hulpmiddelen invoerveld, voer de hulpmiddelen in die je gebruikt, onderschijd de middelen met een komma en spatie'/>
        </section>
        <SaveButton/>
      </div>
    );
  }
}

const ProfielGegeven = (prop) => {
    return(
        <div>
            <p>{prop.typeGegeven}: {prop.value}</p>
        </div>
    );
}