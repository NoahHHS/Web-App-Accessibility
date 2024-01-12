import React, { Component } from 'react';
import '../../stylesheets/Onderzoek.css'

export class Onderzoek extends Component {
    static displayName = Onderzoek.name;

  render() {
    return (
      <div className='Onderzoekspagina'>
        <OnderzoekTop />
        <OnderzoekDetails />
        <OnderzoekDetails />
      </div>
    );
  }
}

const PaginaTitel = () => {
  return(
    <div className='Titel'>
      <h1 className='OnderzoekPaginaTitel'>Onderzoeken</h1>
      <h2 className='vervolgh1'>Van Access-Ability en partners.</h2>
    </div>
  )
}

const Zoekbalk = () => {
  return(
    <div>
      <section className='Zoekbalk' >
      <input type="text" class="OnderzoekSearchInput" placeholder="Zoek onderzoek bij naam"/>
      <button className='search'><div class="search-icon">&#128269;</div></button>
      </section>
    </div>
  )
}

const OnderzoekDetails = () => {
  return (
      <section className='Onderzoek'>
        <section className='logo'>
        <img src='../../Assets/image.png' width='250px' height='250px'/>
        </section>
        <section className='OnderzoekInhoud'>
      <h1 className='Onderzoekstitel'>Onderzoek</h1>
      <p className='OnderzoeksTekst'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut egestas ante, nec tempus massa. Aenean tristique fermentum neque nec aliquam. Donec laoreet interdum commodo.p</p>
      <button className='DeelneemKnop'>Neem deel</button>
      </section>
      </section>
  )
}

const OnderzoekTop = () => {
  return (
    <section id='onderzoek'>
      <div className='Top'>
        <PaginaTitel />
        <Zoekbalk />
      </div>
    </section>
  )
}
