import { ActionIcon, Box, Card, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../redux/store';
import { selectAllGames } from '../redux/game.selector';

import TopNav from '../components/shared/TopNav';
import Empty from '../components/shared/Empty';
import PlayerAvatars from '../components/game-screen/PlayerAvatars';
import { formatDateTime } from '../utils/helpers';

function HomePage() {
  const navigate = useNavigate();

  const allGames = useAppSelector(selectAllGames);

  return (
    <Box>
      <TopNav isHome title="Bet Log" />

      {allGames.length === 0 && (
        <Empty emoji="👀" subTitle="Create a game and start logging" />
      )}
      {allGames.map((x) => (
        <Card
          key={x.id}
          shadow="sm"
          mb="sm"
          onClick={() => navigate(`/game/${x.id}`)}
        >
          <Group justify="space-between">
            <Text fw={800}>{x.name}</Text>
            <Text>🗑️</Text>
          </Group>
          <Text c="dimmed">{formatDateTime(x.timestamp)}</Text>
          <PlayerAvatars playerNames={x.playerNames} />
        </Card>
      ))}
      <ActionIcon
        variant="light"
        size="xl"
        radius="xl"
        pos="fixed"
        bottom={20}
        right={20}
        onClick={() => navigate('/new-game')}
      >
        <Text fz="xl" lh={0}>
          ➕
        </Text>
      </ActionIcon>
    </Box>
  );
}

export default HomePage;
