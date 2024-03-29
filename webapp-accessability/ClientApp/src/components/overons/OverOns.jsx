import React, { Component } from 'react';
import FontSizeAdjuster from '../fontSizeAdjuster'
import '../../stylesheets/OverOns.css'

export class OverOns extends Component {
    static displayName = OverOns.name;

  render() {
    return (
      <div className='overOns'>
        <div className='OverOns-content'>
          <Introductie />
          <Missie />
          <Achtergrond />
          <Vacature />
          <FontSizeAdjuster/>
        </div>
      </div>
    );
  }
}

const Introductie = () => {
  return(
    <section className='overOns-Section'>
      <h1 className='OveronsTitel'>Over Ons</h1>
      <p className='beschrijving OverOnsTekst'>
        Stichting Accessibility zet zich in voor een <span className='overOnsSpan'>digitaal</span>, <span className='overOnsSpan'>fysiek</span> en <span className='overOnsSpan'>sociaal</span> toegankelijke samenleving. Een samenleving waarin iedereen zelfstandig kan meedoen en zich optimaal kan ontplooien, ook als je een beperking hebt. Accessibility ondersteunt (maatschappelijke) organisaties bij het realiseren van toegankelijkheid. Zo dragen wij bij aan een inclusieve samenleving met voorzieningen die toegankelijk en bruikbaar zijn voor iedereen.
      </p>
    </section>
  );
}
const Missie = () => {
  return(
    <section className='overOns-Section'>
      <h2 className='OverOnsSubTitle'>Onze Missie</h2>
      <p className='beschrijving OverOnsTekst'>
        Bij Accessibility werken we aan een inclusieve samenleving waarin <span className='overOnsSpan'><strong>iedereen</strong></span> kan meedoen en tot zijn recht komt. Steeds meer organisaties sluiten zich aan bij onze ambities. Al zoeken ze nog naar hoe ze dit voor elkaar kunnen krijgen. Samen met onze klanten en partners bouwen we iedere dag aan een toegankelijker Nederland. We zetten onze kennis en expertise in om fysieke, sociale én digitale omgevingen toegankelijk te maken; in het bijzonder voor mensen met een (visuele) beperking. Onze experts denken graag met hen mee en bieden begeleiding op maat. Dit doen zij in nauwe samenwerking met ervaringsdeskundigen.
        <br /><br />Met onze trainingen, producten en diensten kan iedere organisatie morgen nog aan de slag met toegankelijkheid. Zo vertalen we onze kennis naar joúw praktijk. Wij denken in mogelijkheden – iedere dag opnieuw – binnen jouw doelen en budget. Zodat jouw organisatie doet waar jullie voor staan; voor collega’s, klanten en/of burgers.
        <br /><br />
      </p>
      <DoeMeeButton />
    </section>
  );
}
const Achtergrond = () => {
  return(
    <section className='overOns-Section'>
      <h2 className='OverOnsSubTitle'>Achtergrond</h2>
      <p className='beschrijving OverOnsTekst'>
        Begin deze eeuw digitaliseerde de samenleving in een rap tempo. Maar waren al die websites en digitale hulpmiddelen wel door iedereen te gebruiken? Toegankelijkheid stond nog in de kinderschoenen. Als eerste organisatie in Nederland begon Stichting Accessibility in 2001 met het toegankelijk maken van ICT voor mensen met een visuele beperking. 
        Later verbreedden wij onze aandacht naar toegankelijkheid voor álle mensen met een (tijdelijke) beperking. Hierdoor zijn we sinds 2020 ook actief in de fysieke en sociale omgeving. 
        <br /><br />Met onze experts werken we elke dag aan het verankeren van toegankelijkheid in organisaties in Nederland; van overheidsinstellingen tot bedrijven. Gelukkig kunnen we hierin met steeds meer partnerorganisaties optrekken. 
        Onze beweging blijft niet onopgemerkt. De regelgeving beweegt mee: mede dankzij onze inspanningen is de internationale richtlijn op het gebied van digitale websites en apps, de WCAG, gerealiseerd. Daarnaast denken we mee met diverse richtlijnen op inclusief design en fysieke toegankelijkheid.  
        Stichting Accessibility heeft een ANBI-status en zit in de adviescommissie van het W3C.
      </p>
  </section>
  );
}

const Vacature = () => {
  return(
    <section className='overOns-Section'>
      <h2 className='OverOnsSubTitle'>Nieuwsgierig naar onze vacatures?</h2>
      <p className='beschrijving OverOnsTekst Vacature'>
        Bekijk op deze pagina de vacatures die we momenteel open hebben staan. 
        <br /><strong>We bieden ook stageplekken!</strong>
      </p>
  </section>
  );
}

const DoeMeeButton = () => {
  return(
    <a href="/onderzoek">
      <button className='doeMeeButton' title='Ga naar de onderzoekspagina'><strong>Doe nu mee!</strong></button>
    </a>
  );
}



