import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import '../../stylesheets/Onderzoek.css'

export class Onderzoek extends Component {
    static displayName = Onderzoek.name;

  render() {
    return (
      <div className='Onderzoekspagina'>
        <OnderzoekTop />
        <OnderzoekDetails />
      </div>
    );
  }


}

const PaginaTitel = () => {
  return(
    <div className='Titel'>
      <h1 className='OnderzoekPaginaTitel' title='Paginatitel'>Onderzoeken</h1>
      <h2 className='vervolgh1' title='vervolgpTitel'>Van Access-Ability en partners.</h2>
    </div>
  )
}

const Zoekbalk = () => {
  return(
    <div>
      <section className='Zoekbalk' >
        <input type="text" class="OnderzoekSearchInput" placeholder="Zoek onderzoek bij naam" title='zoekbalk-input'/>
        <button className='search' aria-label="Zoek input"><div class="search-icon" title='zoekbalk-knop'>&#128269;</div></button>
      </section>
    </div>
  )
  }
 const Onderzoeklijst = []
function OnderzoekDetails() {
  const [modal, setModal] = useState(false);
  const [onderzoek, setOnderzoek] = useState([]);

  const toggleModal = () => {
  setModal(!modal);
  console.log("called");
}

const sendData = async () => {
  // pakt OnderzoekID van data-oz-id attribuut
  let id = document.querySelector('.Onderzoek').getAttribute('data-oz-id');
  // pakt van sessionstorage de huidige UserId
  const uId = sessionStorage.getItem('GUID');
  // stuurt post request naar deelneem endpoint
  const response = await fetch('https://localhost:7288/Onderzoeks/Deelnemen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: uId,
      onderzoeksId: id
    })
  });
  console.log(response.ok);
// INGELOGD ok!!
// set een key genaamd 'GUID' in de sessionstorage en als value de huidige userId (is nog hardcoded)
sessionStorage.setItem('GUID', '147f296c-24c5-4759-a64c-9d76155fe2be');

  setModal(!modal);
}

useEffect(() => {
  fetch('https://localhost:7288/Onderzoeks/GetOnderzoeken')
  .then(response => response.json())
  .then(jsonData => setOnderzoek(jsonData))
  .catch(error => console.log(error))
}, []);

if(modal) {
  document.body.classList.add('active-modal')
} else {
  document.body.classList.remove('active-modal')
} // for loop voor elk element in OnderzoekList
  return (
        onderzoek.map((key, i) => (
          <section className='Onderzoek' data-oz-id={key.id}>
        <section className='logo'>
        <img src='../../Assets/image.png' width='250px' height='250px' alt='logo accesability'/>
        </section>
        <section className='OnderzoekInhoud'>
      <h1 className='Onderzoekstitel' title='Naam onderzoek'>{key.naam}</h1>
      <p className='OnderzoeksTekst' title='beschrijving onderzoek'>{key.beschrijving}</p>
      <button onClick={toggleModal} className='DeelneemKnop' title='Neem deel aan onderzoek'>Neem deel</button>
      </section>
      {modal && (<section className="pmodal">
        <div className="poverlay"></div>
        <div className="pmodal-content">
          <h2 className="popuptitel" title='Popuptitel'><strong>LET OP</strong></h2>
          <p className="popuptekst" title='Popuptekst'>Je gaat nu deelnemen {key.naam}</p>
          <button className='add-modal' onClick={sendData} title='Deelnemen'>Neem Deel</button>
          <button className="cancel-modal" onClick={toggleModal} title='Niet deelnemen'>Cancel</button>
        </div>
      </section>)
}
      </section>
        ))
      
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
