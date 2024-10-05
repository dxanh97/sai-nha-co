import { Button, Container } from '@mantine/core';
import { useParams } from 'react-router-dom';

import { selectGameById } from '../redux/game.selector';
import { useAppSelector } from '../redux/store';
import PlayerAvatars from '../components/game-screen/PlayerAvatars';
import RoundCarousel from '../components/game-screen/RoundCarousel';

function GameScreenPage() {
  const { gameId = '' } = useParams();
  const game = useAppSelector((s) => selectGameById(s, gameId));
  console.log(game);

  const { betSize, playerNames } = game;

  return (
    <Container>
      <PlayerAvatars playerNames={playerNames} />
      <RoundCarousel betSize={betSize} playerNames={playerNames} />
      <Button fullWidth mb="xs">
        New Round
      </Button>
      <Button fullWidth mb="xs">
        End Game
      </Button>
    </Container>
  );
}

export default GameScreenPage;
