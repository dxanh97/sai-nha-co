import { ActionIcon, Card, Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useNavigate } from 'react-router-dom';
import { IconInfoCircle, IconTrash } from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectAllGames } from '../redux/game.selector';
import { deleteGame } from '../redux/game.slice';
import { deleteGameRounds } from '../redux/round.slice';
import { formatDateTime } from '../utils/helpers';

import Empty from './shared/Empty';
import PlayerAvatars from './shared/PlayerAvatars';
import AddActionButton from './shared/AddActionButton';

function GamesList() {
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
      onConfirm: () => {
        dispatch(deleteGame(gameId));
        dispatch(deleteGameRounds(gameId));
      },
    });
  };

  return (
    <>
      {allGames.length === 0 && (
        <Empty title="Chưa có game nào" subTitle="Tạo game mới đê" />
      )}
      {allGames.map((x) => (
        <Card key={x.id} shadow="sm" p="xs" mt="sm" radius="md" withBorder>
          <Group justify="space-between">
            <Text fw={800} fz={20}>
              {x.name}
            </Text>
            <Group gap="xs">
              <ActionIcon
                variant="subtle"
                onClick={() => navigate(`/game/${x.id}`)}
              >
                <IconInfoCircle />
              </ActionIcon>
              <ActionIcon variant="subtle" onClick={() => onDeleteGame(x.id)}>
                <IconTrash />
              </ActionIcon>
            </Group>
          </Group>
          <Text c="dimmed">{formatDateTime(x.timestamp)}</Text>
          <PlayerAvatars playerNames={x.playerNames} />
        </Card>
      ))}
      <AddActionButton onClick={() => navigate('/new-game')} />
    </>
  );
}

export default GamesList;
