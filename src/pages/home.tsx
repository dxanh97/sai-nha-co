import { Box, Button, Center, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Stack h="100%">
      <Box ta="center">
        <Center h="200px">
          <Text size="100px">📒</Text>
        </Center>
      </Box>
      <Link to="/new-game">
        <Button variant="light" fullWidth>
          New Game
        </Button>
      </Link>
      <Link to="/history">
        <Button variant="light" fullWidth>
          History
        </Button>
      </Link>
    </Stack>
  );
}

export default HomePage;
