import { useState } from 'react';
import { Button, Center, Container, Grid, Input } from '@mantine/core';

import AddPlayerInput from '../components/AddPlayerInput';

function NewGamePage() {
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [betSize, setBetSize] = useState(0);

  return (
    <Container my="md">
      <Center>
        <Grid>
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
            <Button variant="light" fullWidth>
              Start Game
            </Button>
          </Grid.Col>
        </Grid>
      </Center>
    </Container>
  );
}

export default NewGamePage;
