import { useState } from 'react';

export default function PlayerCard({ name, position, index, spot, handleInputChange }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [isEditingPosition, setIsEditingPosition] = useState(false);
  const [editedPosition, setEditedPosition] = useState(position);

  const handleNameClick = () => {
    setIsEditingName(true);
  }

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  }

  const handleNameBlur = () => {
    setIsEditingName(false);
    handleInputChange(index, 'name', editedName);
  }

  const handlePositionClick = () => {
    setIsEditingPosition(true);
  }

  const handlePositionChange = (e) => {
    setEditedPosition(e.target.value);
  }

  const handlePositionBlur = () => {
    setIsEditingPosition(false);
    handleInputChange(index, 'position', editedPosition);
  }

  return (
    <div className={`player-card ${spot} ${position}`}>
      {isEditingName ?
        <input
          type='text'
          value={editedName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          autoFocus
        />
        :
        <h3 onClick={handleNameClick}>{name}</h3>
      }
      {isEditingPosition ?
        <select
          value={editedPosition}
          onChange={handlePositionChange}
          onBlur={handlePositionBlur}
          autoFocus
        >
          <option value=''>Select Position</option>
          <option value='setter'>Setter</option>
          <option value='hitter'>Hitter</option>
          <option value='middle'>Middle</option>
        </select>
        :
        <h4 onClick={handlePositionClick}>{`(${position})`}</h4>
      }
    </div>
  );
}