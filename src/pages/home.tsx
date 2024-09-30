import {
  //
  Avatar,
  Button,
  Center,
  Container,
  Grid,
} from '@mantine/core';

function Home() {
  return (
    <Container my="md">
      <Center>
        <Grid>
          <Grid.Col span={{ base: 12 }}>
            <Grid justify="center">
              <Avatar size="xl" radius="md">
                <span>📒</span>
              </Avatar>
            </Grid>
          </Grid.Col>
          <Grid.Col span={{ base: 12 }}>
            <Button variant="light" fullWidth>
              New Game
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12 }}>
            <Button variant="light" fullWidth>
              Game History
            </Button>
          </Grid.Col>
        </Grid>
      </Center>
    </Container>
  );
}

export default Home;
