import { Box, Card, Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectAllGames } from '../redux/game.selector';
import { deleteGame } from '../redux/game.slice';
import { formatDateTime } from '../utils/helpers';

import TopNav from '../components/shared/TopNav';
import Empty from '../components/shared/Empty';
import PlayerAvatars from '../components/game-screen/PlayerAvatars';
import AddActionButton from '../components/shared/AddActionButton';

function HomePage() {
  const navigate = useNavigate();

  const allGames = useAppSelector(selectAllGames);

  const dispatch = useAppDispatch();

  const onDeleteGame = (gameId: string) => {
    modals.openConfirmModal({
      title: 'Delete this game?',
      size: 'sm',
      radius: 'md',
      withCloseButton: false,
      centered: true,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => dispatch(deleteGame(gameId)),
    });
  };

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
            <Text
              onClick={(e) => {
                e.stopPropagation();
                onDeleteGame(x.id);
              }}
            >
              🗑️
            </Text>
          </Group>
          <Text c="dimmed">{formatDateTime(x.timestamp)}</Text>
          <PlayerAvatars playerNames={x.playerNames} />
        </Card>
      ))}
      <AddActionButton onClick={() => navigate('/new-game')} />
    </Box>
  );
}

export default HomePage;
