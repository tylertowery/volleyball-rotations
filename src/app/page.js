'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import PlayerCard from '../app/components/player-cards';

export default function Home() {
  const [numPlayers, setNumPlayers] = useState(0);
  const [players, setPlayers] = useState({});
  const [created, setCreated] = useState(false);
  const [spots, setSpots] = useState([]);

  const handleNumPlayersChange = (e) => {
    console.log(e.target.value);
    setNumPlayers(parseInt(e.target.value, 10));
    setPlayers({});
    setCreated(false);
  }

  const handleInputChange = (index, field, value) => {
    setPlayers(prevPlayers => ({
      ...prevPlayers,
      [index]: {
        ...prevPlayers[index],
        [field]: value
      }
    }));
  }

  const getPlayerPositionsArray = (numPlayers) => {
    if (numPlayers === 6) {
      return ['bottom-right', 'top-right', 'top-middle', 'top-left', 'bottom-left', 'bottom-middle'];
    } else if (numPlayers === 7) {
      return ['bottom-right', 'extra-1', 'top-right', 'top-middle', 'top-left', 'bottom-left', 'bottom-middle'];
    } else if (numPlayers === 8) {
      return ['bottom-right', 'extra-1', 'extra-2', 'top-right', 'top-middle', 'top-left', 'bottom-left', 'bottom-middle'];
    } else if (numPlayers === 9) {
      return ['bottom-right', 'extra-1', 'extra-2', 'extra-3', 'top-right', 'top-middle', 'top-left', 'bottom-left', 'bottom-middle'];
    }
    return [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCreated(true);
  }

  const handleRotation = (e) => {
    const newSpots = [...spots];
    const newFront = newSpots.pop();
    newSpots.unshift(newFront);
    setSpots(newSpots);
  }

  useEffect(() => {
    const initialSpots = getPlayerPositionsArray(numPlayers);
    setSpots(initialSpots);
  }, [numPlayers]);

  return (
    <div className='page'>
      <h1>Volleyball Player Rotation</h1>
      <div className='player-number-selector'>
        <label>Select Number of Players:</label>
        <select value={numPlayers} onChange={handleNumPlayersChange}>
          <option key={0} value={0}>---</option>
          <option key={6} value={6}>6</option>
          <option key={7} value={7}>7</option>
          <option key={8} value={8}>8</option>
          <option key={9} value={9}>9</option>
        </select>
      </div>
      <div>
        {numPlayers > 0 && !created ?
          <form className='player-form' onSubmit={handleSubmit}>
            <h2>Enter Player Names</h2>
            {[...Array(numPlayers)].map((_, index) => (
              <div>
                <input
                  onChange={((e) => handleInputChange(index, 'name', e.target.value))}
                  key={index}
                  type='text'
                  placeholder={`Player ${index + 1}`}
                  style={{ margin: '8px 0', padding: '6px' }}
                  required
                />
                <select
                  onChange={(e) => handleInputChange(index, 'position', e.target.value)}
                  required
                >
                  <option value=''>Select Position</option>
                  <option value='setter'>Setter</option>
                  <option value='hitter'>Hitter</option>
                  <option value='middle'>Middle</option>
                </select>
              </div>
            ))}
            <button type='submit'>Create Player Cards</button>
          </form>
          : null
        }
      </div>
      <div>
        {created && (
          <div className='rotating-players'>
            <div className='net-header'>
              <h1 className={`net ${numPlayers === 6 ? 'stretch' : ''}`}>NET</h1>
              {numPlayers === 6 ?
                null
                :
                <h1 className='subs'>Subs</h1>}
            </div>
            <div className={`player-cards-container cards items-${Object.keys(players).length}`}>
              {Object.keys(players).map((key, index) => {
                const player = players[key];
                const spot = spots[index];
                return (
                  <PlayerCard
                    key={index}
                    name={player.name}
                    position={player.position}
                    index={index}
                    spot={spot}
                    handleInputChange={handleInputChange}
                  />)
              })}
            </div>
            <button className='styled-button' onClick={handleRotation}>Rotate</button>
          </div>
        )}
      </div>
    </div>
  );
}
