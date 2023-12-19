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

// 1e section van de homepage
// dit is het verwelkomingscherm
const HomeIntro = () => {
  return(
    <section id="Home">
      <div className='Intro'>
        <div className='textSection'></div>
        <div className='imgSection'></div>
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
