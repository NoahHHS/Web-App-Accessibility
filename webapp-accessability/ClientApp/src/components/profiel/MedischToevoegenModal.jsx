import React, { useState } from 'react';
import '../../stylesheets/MedischPopUp.css'

const MedischToevoegenModal = ({ isOpen, onClose, onAddMedischData }) => {
  const [beperking, setBeperking] = useState('');
  const [hulpmiddelen, setHulpmiddelen] = useState('');

  const handleAddClick = () => {
    // Validate input or perform any other necessary checks

    // Call the callback function to add the medical data
    onAddMedischData({
      beperking,
      hulpmiddelen,
    });

    // Close the modal
    onClose();
  };

  return (
    <div className={`medisch-modal ${isOpen ? 'open' : 'closed'}`}>
      <div className="medisch-modal-content">
        <div className='medisch-model-block mmblock1'>
            <h2 className='medisch-modal-title'>Voeg Medische Gegevens Toe</h2>
            <h3 className='medisch-modal-beschrijving'>Voeg nieuwe medische gegevens toe aan je account <br /> door een beperking en de bijhorende hulpmiddelen in te voeren</h3>
            <p className='medisch-modal-warning'><strong>Alle gegevens moeten ingevuld worden</strong></p>
        </div>
        <div className='medisch-model-block mmblock2'>
            <label className='medisch-modal-label'>
            Beperking:<br/>
            <input className='medisch-modal-input' type="text" value={beperking} onChange={(e) => setBeperking(e.target.value)} aria-label='Vul hier je beperking in'/>
            </label>
            <label className='medisch-modal-label'>
            Hulpmiddelen:<br/>
            <input className='medisch-modal-input' type="text" value={hulpmiddelen} onChange={(e) => setHulpmiddelen(e.target.value)} aria-label='Vul hier je hulpmiddelen in'/>
            </label>
            <div className="medisch-modal-buttons">
            <button className='medisch-modal-button medisch-voegtoe' onClick={handleAddClick}  aria-label='Klik hier om de medische gegevens toe te voegen aan je account'>Toevoegen</button>
            <button className='medisch-modal-button medisch-annuleer' onClick={onClose} aria-label='Annuleer proces en ga terug'>Annuleren</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MedischToevoegenModal;
