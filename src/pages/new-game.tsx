import { useState } from 'react';
import {
  Button,
  Center,
  Container,
  Grid,
  Input,
  NumberInput,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

import { useAppDispatch } from '../redux/store';
import { createGame } from '../redux/game.slice';

import AddPlayerInput from '../components/AddPlayerInput';

function NewGamePage() {
  const [playerNames, setPlayerNames] = useState<string[]>([]);
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
    <Container my="md">
      <Center>
        <Grid>
          <Grid.Col>
            <Input.Wrapper label="Game Name" size="xl">
              <Input
                size="xl"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col>
            <AddPlayerInput
              playerNames={playerNames}
              onChange={setPlayerNames}
            />
          </Grid.Col>
          <Grid.Col>
            <Input.Wrapper label="Bet size" size="xl">
              <NumberInput
                inputMode="numeric"
                size="xl"
                value={betSize}
                onChange={(e) => setBetSize(parseInt(`${e}`, 10))}
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={{ base: 12 }}>
            <Button
              variant="light"
              size="xl"
              fullWidth
              disabled={playerNames.length < 2}
              onClick={onStartGame}
            >
              Start Game
            </Button>
          </Grid.Col>
        </Grid>
      </Center>
    </Container>
  );
}

export default NewGamePage;
