import React, { Component } from 'react';
import { useState } from 'react';
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

function OnderzoekDetails() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
  setModal(!modal);
  console.log("called");
}

if(modal) {
  document.body.classList.add('active-modal')
} else {
  document.body.classList.remove('active-modal')
}
  return (
      <section className='Onderzoek'>
        <section className='logo'>
        <img src='../../Assets/image.png' width='250px' height='250px'/>
        </section>
        <section className='OnderzoekInhoud'>
      <h1 className='Onderzoekstitel'>Onderzoek</h1>
      <p className='OnderzoeksTekst'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut egestas ante, nec tempus massa. Aenean tristique fermentum neque nec aliquam. Donec laoreet interdum commodo.p</p>
      <button onClick={toggleModal} className='DeelneemKnop'>Neem deel</button>
      </section>
      {modal && (<section className="pmodal">
        <div className="poverlay"></div>
        <div className="pmodal-content">
          <h2 className="popuptitel"><strong>LET OP</strong></h2>
          <p className="popuptekst">Je gaat nu deelnemen -onderzoeksnaam-</p>
          <button className='add-modal' onClick={toggleModal}>Neem Deel</button>
          <button className="cancel-modal" onClick={toggleModal}>Cancel</button>
        </div>
      </section>)
}
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
