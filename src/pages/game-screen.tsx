import { useEffect } from 'react';
import { Box, Button, Flex, Tabs, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useNavigate, useParams } from 'react-router-dom';

import { selectGameById } from '../redux/game.selector';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { createRound } from '../redux/round.slice';

import PlayerAvatars from '../components/game-screen/PlayerAvatars';
import AddRoundButton from '../components/game-screen/AddRoundButton';
import RoundsList from '../components/game-screen/RoundsList';
import Leaderboard from '../components/game-screen/Leaderboard';

function GameScreenPage() {
  const { gameId = '' } = useParams();
  const game = useAppSelector((s) => selectGameById(s, gameId));

  const navigate = useNavigate();
  useEffect(() => {
    if (game) return;
    navigate('/');
  }, [navigate, game]);

  const { betSize, playerNames, name: gameName } = game ?? {};

  const dispatch = useAppDispatch();
  const onSaveRound = (statsMap: Map<string, number>) => {
    dispatch(
      createRound({
        gameId: game.id,
        stats: Object.fromEntries(statsMap.entries()),
      }),
    );
  };

  return game ? (
    <Box>
      <Flex justify="space-between" align="center">
        <Text size="xl" fw={800}>
          {gameName}
        </Text>
        <PlayerAvatars playerNames={playerNames} />
      </Flex>

      <Tabs variant="pills" radius="xl" defaultValue="1">
        <Tabs.List>
          <Tabs.Tab value="1">Rounds Log</Tabs.Tab>
          <Tabs.Tab value="2">Leaderboard</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="1">
          <RoundsList gameId={game.id} />
        </Tabs.Panel>
        <Tabs.Panel value="2">
          <Leaderboard gameId={game.id} />
        </Tabs.Panel>
      </Tabs>

      <AddRoundButton
        betSize={betSize}
        playerNames={playerNames}
        onSave={onSaveRound}
      />

      {false && (
        <Button
          variant="subtle"
          fullWidth
          mb="xs"
          onClick={() => {
            modals.openConfirmModal({
              title: 'End the current game?',
              size: 'sm',
              radius: 'md',
              withCloseButton: false,
              centered: true,
              labels: { confirm: 'Confirm', cancel: 'Cancel' },
              onConfirm: () => navigate('/'),
            });
          }}
        >
          End Game
        </Button>
      )}
    </Box>
  ) : null;
}

export default GameScreenPage;
