import { useState } from 'react';
import { Button, Center, Container, Grid, Input } from '@mantine/core';

import { useAppDispatch } from '../redux/store';
import { createGame } from '../redux/game.slice';

import AddPlayerInput from '../components/AddPlayerInput';

function NewGamePage() {
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [betSize, setBetSize] = useState(0);
  const [gameName, setGameName] = useState('Game #1');

  const dispatch = useAppDispatch();

  const onStartGame = () => {
    dispatch(
      createGame({
        betSize,
        name: gameName,
        playerNames,
      }),
    );
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
              <Input
                type="number"
                inputMode="numeric"
                size="xl"
                value={betSize}
                onChange={(e) => setBetSize(e.target.valueAsNumber)}
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={{ base: 12 }}>
            <Button variant="light" size="xl" fullWidth onClick={onStartGame}>
              Start Game
            </Button>
          </Grid.Col>
        </Grid>
      </Center>
    </Container>
  );
}

export default NewGamePage;
