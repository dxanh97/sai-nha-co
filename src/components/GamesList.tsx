import { ActionIcon, Card, Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useNavigate } from 'react-router-dom';
import { IconInfoSquareRounded, IconTrash } from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectAllGames } from '../redux/game.selector';
import { deleteGame } from '../redux/game.slice';
import { deleteGameRounds } from '../redux/round.slice';
import { formatDateTime } from '../utils/helpers';

import Empty from './shared/Empty';
import PlayerAvatars from './shared/PlayerAvatars';

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
      {allGames.length === 0 && <Empty subTitle="Tạo game mới đê" />}
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
                <IconInfoSquareRounded />
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
    </>
  );
}

export default GamesList;
