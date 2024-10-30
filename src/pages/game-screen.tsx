import { useEffect } from 'react';
import { Box, Tabs } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';

import { selectGameById } from '../redux/game.selector';
import { useAppSelector } from '../redux/store';

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

  const { name: gameName } = game ?? {};

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
    </Box>
  ) : null;
}

export default GameScreenPage;
