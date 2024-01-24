import React, { useState } from 'react';

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
    <div className={`modal ${isOpen ? 'open' : 'closed'}`}>
      <div className="modal-content">
        <h2>Voeg Medische Gegevens Toe</h2>
        <label>
          Beperking:
          <input type="text" value={beperking} onChange={(e) => setBeperking(e.target.value)} />
        </label>
        <label>
          Hulpmiddelen:
          <input type="text" value={hulpmiddelen} onChange={(e) => setHulpmiddelen(e.target.value)} />
        </label>
        <div className="modal-buttons">
          <button onClick={handleAddClick}>Toevoegen</button>
          <button onClick={onClose}>Annuleren</button>
        </div>
      </div>
    </div>
  );
};

export default MedischToevoegenModal;
