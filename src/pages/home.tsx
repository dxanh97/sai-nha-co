import { Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import TopNav from '../components/shared/TopNav';
import GamesList from '../components/GamesList';
import AddActionButton from '../components/shared/AddActionButton';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box>
      <TopNav isHome title="Sải Nhà Cố" />
      <GamesList />
      <AddActionButton onClick={() => navigate('/new-game')} />
    </Box>
  );
}

export default HomePage;
