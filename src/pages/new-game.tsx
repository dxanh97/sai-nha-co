import { useState } from 'react';
import { Button, Input, NumberInput, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { createGame } from '../redux/game.slice';

import AddPlayerInput from '../components/AddPlayerInput';
import { selectLatestGame } from '../redux/game.selector';

function NewGamePage() {
  const lastGame = useAppSelector(selectLatestGame);

  const [playerNames, setPlayerNames] = useState<string[]>(
    // TODO: remove testing data
    lastGame?.playerNames ?? ['Xanh', 'Dat', 'Hien', 'XH', 'MH'],
  );
  const [betSize, setBetSize] = useState(5);
  const [gameName, setGameName] = useState('Game #1');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onStartGame = () => {
    const id = nanoid();
    dispatch(
      createGame({
        id,
        betSize,
        name: gameName,
        playerNames,
      }),
    );
    navigate(`/game/${id}`);
  };

  return (
    <Stack>
      <Input.Wrapper label="Game Name">
        <Input value={gameName} onChange={(e) => setGameName(e.target.value)} />
      </Input.Wrapper>
      <AddPlayerInput
        playerNames={[...playerNames]}
        onChange={setPlayerNames}
      />
      <Input.Wrapper label="Bet size">
        <NumberInput
          inputMode="numeric"
          value={betSize}
          onChange={(e) => setBetSize(parseInt(`${e}`, 10))}
        />
      </Input.Wrapper>
      <Button
        variant="light"
        fullWidth
        disabled={playerNames.length < 2}
        onClick={onStartGame}
      >
        Start Game
      </Button>
    </Stack>
  );
}

export default NewGamePage;
