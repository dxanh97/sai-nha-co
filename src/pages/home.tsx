import { ActionIcon, Box, Card, Group, Input, Text } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { useNavigate } from 'react-router-dom';
import { IconEdit, IconTrashX } from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectAllGames } from '../redux/game.selector';
import { deleteGame, updateGameName } from '../redux/game.slice';
import { formatDateTime } from '../utils/helpers';

import TopNav from '../components/shared/TopNav';
import Empty from '../components/shared/Empty';
import PlayerAvatars from '../components/shared/PlayerAvatars';
import AddActionButton from '../components/shared/AddActionButton';

function HomePage() {
  const navigate = useNavigate();

  const allGames = useAppSelector(selectAllGames);

  const dispatch = useAppDispatch();

  const onDeleteGame = (gameId: string) => {
    modals.openConfirmModal({
      title: 'Xoá game này?',
      size: 'sm',
      radius: 'md',
      withCloseButton: false,
      centered: true,
      labels: { confirm: 'Oke', cancel: 'Thoi' },
      onConfirm: () => dispatch(deleteGame(gameId)),
    });
  };

  const handleUpdateName = useDebouncedCallback((id: string, name: string) => {
    dispatch(updateGameName({ id, name }));
  }, 500);

  return (
    <Box>
      <TopNav isHome title="Sải Nhà Cố" />

      {allGames.length === 0 && <Empty emoji="👀" subTitle="Tạo game mới đê" />}
      {allGames.map((x) => (
        <Card
          key={x.id}
          shadow="sm"
          p="xs"
          pt={0}
          mt="sm"
          radius="md"
          withBorder
        >
          <Group justify="space-between">
            <Input
              variant="unstyled"
              defaultValue={x.name}
              size="lg"
              fw={800}
              onChange={(e) => handleUpdateName(x.id, e.target.value)}
            />
            <Group>
              <ActionIcon
                variant="subtle"
                onClick={() => navigate(`/game/${x.id}`)}
              >
                <IconEdit />
              </ActionIcon>
              <ActionIcon variant="subtle" onClick={() => onDeleteGame(x.id)}>
                <IconTrashX />
              </ActionIcon>
            </Group>
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
