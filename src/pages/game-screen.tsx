import { Button, Container } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useNavigate, useParams } from 'react-router-dom';

import { selectGameById } from '../redux/game.selector';
import { useAppSelector } from '../redux/store';
import PlayerAvatars from '../components/game-screen/PlayerAvatars';
import RoundCarousel from '../components/game-screen/RoundCarousel';

function GameScreenPage() {
  const { gameId = '' } = useParams();
  const game = useAppSelector((s) => selectGameById(s, gameId));

  const navigate = useNavigate();

  const { betSize, playerNames } = game;

  const openModal = () => {
    modals.openConfirmModal({
      title: 'End the current game?',
      size: 'sm',
      radius: 'md',
      withCloseButton: false,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => navigate('/'),
    });
  };

  return (
    <Container>
      <PlayerAvatars playerNames={playerNames} />
      <RoundCarousel betSize={betSize} playerNames={playerNames} />
      <Button fullWidth mb="xs">
        New Round
      </Button>
      <Button variant="subtle" fullWidth mb="xs" onClick={openModal}>
        End Game
      </Button>
    </Container>
  );
}

export default GameScreenPage;
