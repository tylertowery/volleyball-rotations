'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';

export default function Home() {
  const [numPlayers, setNumPlayers] = useState(0);
  const [playerNames, setPlayerNames] = useState([]);

  const handleNumPlayersChange = (e) => {
    console.log(e.target.value);
    setNumPlayers(parseInt(e.target.value, 10));
  }


  return (
    <div>
      <h1>Volleyball Player Rotation</h1>
      <div>
        <label>Select Number of Players:</label>
        <select value={numPlayers} onChange={handleNumPlayersChange}>
          <option key={0} value={0}>---</option>
          <option key={6} value={6}>6</option>
          <option key={7} value={7}>7</option>
          <option key={8} value={8}>8</option>
          <option key={9} value={9}>9</option>
        </select>
      </div>
      {numPlayers ?
        <div>
          <h2>Enter Player Names</h2>
          {[...Array(numPlayers)].map((_, index) => (
            <input
              key={index}
              type='text'
              placeholder={`Player ${index + 1}`}
              style={{ margin: '8px 0', padding: '6px' }}
            />))}
        </div>
        : null
      }
    </div>
  );
}
