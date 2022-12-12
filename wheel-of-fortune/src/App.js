import React from 'react';
import { Player } from './components/Player/Player';
import { Board } from './components/Board/Board';
import {Wheel} from './components/Wheel/Wheel'

function App() {
  return (
    <>
      <Player />
      <Board />
      <Wheel />

    </>
  );
}

export default App;
