import React, { Component } from 'react';
import '../stylesheets/Home.css'

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <HomeIntro />
        <HomeContent />
      </div>
    );
  }
}

// Component die de titel en de beschrijving bepaald in de intro
const IntroText = () => {
  return(
    <div className='textSection'>
      <h1 className='hometitle'>Access-Ability</h1>
      <h2 className='motto'>motto</h2>
    </div>
  );
}

// Component die de hoofdpagina foto of logo levert
const Introimg = () => {
  return(
    <div className='imgSection'>
      <img className="homeimg" src="../../Assets/icon_accessibility_on-dark_transp.png" alt="intro foto" />
    </div>
  );
}


// 1e section van de homepage
// dit is het verwelkomingscherm
const HomeIntro = () => {
  return(
    <section id="Home">
      <div className='Intro'>
        <IntroText />
        <Introimg />
      </div>
    </section>
  );
}

// 2e section van de homepage
// hier komen de content buttons die je verwijzen naar andere paginas
const HomeContent = () => {
  return(
    <section className="contentSection">
      <div className='buttonContainer'>
        <button className='pageButton onderzoekbutton'>Onderzoeken</button>
        <button className='pageButton profilebutton'>Mijn Profiel</button>
        <button className='pageButton'>Privacy</button>
        <button className='pageButton'>Over ons</button>
      </div>
    </section>
  );
}
