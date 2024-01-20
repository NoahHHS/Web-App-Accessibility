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

//---------------------------- Variables and State ----------------------------
let signedIn = false; // hardcoded state of de user ingelogd is op het moment

//---------------------------- Top Section-Components ----------------------------
// Component die de titel en de beschrijving bepaald in de intro
const IntroButton = () => {
  if(signedIn === false){
    return(
      <a href="/registreer"><button className='Home-IntroButton' aria-label='Maak account' title='Ga naar registreerpagina'><strong>Start nu!</strong></button></a>
    );
  }
  else{
    <a href="/registreer"><button className='Home-IntroButton' title='Ga naar onderzoekspagina'><strong>Bekijk Onderzoeken</strong></button></a>
  }

}

const IntroText = () => {
  return(
    <div className='Home-textSection'>
      <h1 className='hometitle'>Access-Ability</h1>
      <h2 className='motto'>“The only disability is when people cannot see human potential.” – Debra Ruh</h2>
      <IntroButton />
    </div>
  );
}

// Component die de hoofdpagina foto of logo levert
const Introimg = () => {
  return(
    <div className='Home-imgSection'>
      <a href="/overons"><img className="homeimg" title="Logo Accessibility" src="../../Assets/icon_accessibility_on-dark_transp.png" alt="intro foto" /></a>
    </div>
  );
}


//---------------------------- Top Section ----------------------------
// dit is het verwelkomingsscherm
const HomeIntro = () => {
  return(
    <section id="Home">
      <div className='Home-Intro'>
        <IntroText />
        <Introimg />
      </div>
    </section>
  );
}

//---------------------------- Bottom Section ----------------------------
// hier komen de content buttons die je verwijzen naar andere paginas
const HomeContent = () => {
  return(
    <section className="Home-contentSection">
      <h1 className='Home-ContetSectionTitle'>Ga aan de slag</h1>
      <div className='Home-buttonContainer'>
        <a href="/onderzoek"><button className='pageButton onderzoekbutton'>Onderzoeken</button></a>
        <a href="/profiel"><button className='pageButton profilebutton'>Mijn Profiel</button></a>
      </div>
      <h1 className='Home-ContetSectionTitle'>Handige info</h1>
      <div className='Home-buttonContainer'>
        <a href="/privacystatement"><button className='pageButton'>Privacy</button></a>
        <a href="/overons"><button className='pageButton'>Over Ons</button></a>
      </div>
    </section>
  );
}
