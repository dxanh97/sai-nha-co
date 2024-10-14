import { useEffect } from 'react';
import { Box, Tabs } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';

import { selectGameById } from '../redux/game.selector';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { createRound } from '../redux/round.slice';

import AddRoundButton from '../components/AddRoundButton';
import RoundsList from '../components/RoundsList';
import Leaderboard from '../components/Leaderboard';
import TopNav from '../components/shared/TopNav';
import SortPlayerOrder from '../components/SortPlayerOrder';

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
      <TopNav title={gameName}>
        <SortPlayerOrder gameId={game.id} />
      </TopNav>

      <Tabs
        variant="pills"
        radius="xl"
        defaultValue="1"
        mt="sm"
        keepMounted={false}
      >
        <Tabs.List grow>
          <Tabs.Tab value="1">Danh Sách Ván</Tabs.Tab>
          <Tabs.Tab value="2">Bảng Xếp Hạng</Tabs.Tab>
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
    </Box>
  ) : null;
}

export default GameScreenPage;
