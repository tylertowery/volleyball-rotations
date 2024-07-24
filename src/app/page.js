'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import PlayerCard from '../app/components/player-cards';

export default function Home() {
  const [numPlayers, setNumPlayers] = useState(0);
  const [players, setPlayers] = useState([]);
  const [created, setCreated] = useState(false);
  const [spots, setSpots] = useState([]);
  const [settersStay, setSettersStay] = useState(false);

  const handleNumPlayersChange = (e) => {
    console.log(e.target.value);
    setNumPlayers(parseInt(e.target.value, 10));
    setPlayers([]);
    setSettersStay(false);
    setCreated(false);
  }

  const handleInputChange = (index, field, value) => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      if (!newPlayers[index]) {
        newPlayers[index] = { name: '', position: '', spot: index + 1 };
      }
      newPlayers[index][field] = value;
      return newPlayers;
    });
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

  const rotatePlayers = (players, numPlayers) => {
    const frontRightIndex = numPlayers === 6 ? 2 : (numPlayers === 7 ? 3 : (numPlayers === 8 ? 4 : 5));
    const backRightIndex = 1;

    const setterFrontRight = players.some(player => player.spot === frontRightIndex && player.position === 'setter');

    return players.map(player => {
      if (settersStay) {
        if (player?.spot === frontRightIndex && player?.position === 'setter') {
          let newSpot = 1;
          return { ...player, spot: newSpot };
        } else if (setterFrontRight && numPlayers === 7 && player.spot === 2) {
          return { ...player };
        } else if (setterFrontRight && numPlayers === 8 && player.spot === 2) {
          return { ...player };
        } else if (setterFrontRight && numPlayers === 8 && player.spot === 3) {
          return { ...player };
        } else if (setterFrontRight && numPlayers === 9 && player.spot === 2) {
          return { ...player };
        } else if (setterFrontRight && numPlayers === 9 && player.spot === 3) {
          return { ...player };
        } else if (setterFrontRight && numPlayers === 9 && player.spot === 4) {
          return { ...player };
        } else {
          let newSpot = player.spot - 1;
          if (newSpot === 0) {
            newSpot = players.length;
          }
          return { ...player, spot: newSpot };
        }
      } else {
        let newSpot = player.spot - 1;
        if (newSpot === 0) {
          newSpot = players.length;
        }
        return { ...player, spot: newSpot };
      }
    });
  }

  const handleRotation = () => {
    setPlayers(prevPlayers => rotatePlayers(prevPlayers, numPlayers));
  }

  const getPositionName = (spot, numPlayers) => {
    const positions = getPlayerPositionsArray(numPlayers);
    return positions[spot - 1];
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
                  className='player-name-input'
                  placeholder={`Player ${index + 1}`}
                  required
                />
                <select
                  onChange={(e) => handleInputChange(index, 'position', e.target.value)}
                  className='position-select'
                  required
                >
                  <option value=''>Select Position</option>
                  <option value='setter'>Setter</option>
                  <option value='hitter'>Hitter</option>
                  <option value='middle'>Middle</option>
                  <option value='flex-hitter'>Flex Hitter</option>
                  <option value='flex-setter'>Flex Setter</option>
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
            {numPlayers > 6 ?
              <div className='setters-stay-section'>
                <input
                  type='checkbox'
                  id='settersStay'
                  name='settersStay'
                  checked={settersStay}
                  onChange={(e) => setSettersStay(e.target.checked)} />
                <label htmlFor='settersStay'>Setters stay</label>
              </div>
              :
              null}
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
                const namedSpot = getPositionName(player.spot, numPlayers);
                return (
                  <PlayerCard
                    key={index}
                    name={player.name}
                    position={player.position}
                    index={index}
                    spot={namedSpot}
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
