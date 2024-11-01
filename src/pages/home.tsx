import { Box } from '@mantine/core';

import TopNav from '../components/shared/TopNav';
import GamesList from '../components/GamesList';

function HomePage() {
  return (
    <Box>
      <TopNav isHome title="Sải Nhà Cố" />
      <GamesList />
    </Box>
  );
}

export default HomePage;
