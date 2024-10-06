import { useEffect } from 'react';
import { Box, Button, Flex, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useNavigate, useParams } from 'react-router-dom';

import { selectGameById } from '../redux/game.selector';
import { useAppDispatch, useAppSelector } from '../redux/store';
import PlayerAvatars from '../components/game-screen/PlayerAvatars';
import AddRoundButton from '../components/game-screen/AddRoundButton';
import { createRound } from '../redux/round.slice';
import RoundsList from '../components/game-screen/RoundsList';

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

      <RoundsList gameId={game.id} />

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
