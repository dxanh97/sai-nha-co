import { useMemo } from 'react';
import {
  Avatar,
  Box,
  Card,
  Group,
  Indicator,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { Sparkline } from '@mantine/charts';

import { useAppSelector } from '../../redux/store';
import { selectAllRoundsFromGameId } from '../../redux/round.selector';
import { formatNumber, getColor } from '../../utils/helpers';
import { selectGameById } from '../../redux/game.selector';

import Empty from '../shared/Empty';

interface Props {
  gameId: string;
}

function Leaderboard(props: Props) {
  const { gameId } = props;
  const rounds = useAppSelector((s) => selectAllRoundsFromGameId(s, gameId));
  const game = useAppSelector((s) => selectGameById(s, gameId));
  const { playerNames } = game;
  const playerHistory = useMemo(
    () =>
      [...rounds.reverse()].reduce<{
        [playerName: string]: number[];
      }>(
        (acc, cur) =>
          playerNames.reduce((result, name) => {
            const history = acc[name] ?? [0];
            return {
              ...result,
              [name]: [
                ...history,
                history[history.length - 1] + (cur.stats[name] ?? 0),
              ],
            };
          }, {}),
        {},
      ),
    [rounds, playerNames],
  );

  const dataList = useMemo(
    () =>
      Object.keys(playerHistory).map((name) => {
        const history = playerHistory[name];
        return {
          name,
          stat: history[history.length - 1],
        };
      }),
    [playerHistory],
  );

  const list = useMemo(
    () => [...dataList].sort((a, b) => b.stat - a.stat),
    [dataList],
  );

  const top3 = [
    {
      medal: '🥈',
      name: list[1]?.name,
      stat: list[1]?.stat,
    },
    {
      medal: '🥇',
      name: list[0]?.name,
      stat: list[0]?.stat,
    },
    {
      medal: '🥉',
      name: list[2]?.name,
      stat: list[2]?.stat,
    },
  ];

  return rounds.length >= 3 ? (
    <ScrollArea>
      <Group justify="space-around" pt="xl">
        {top3.map((x, i) => (
          <Box key={x.medal} pt={i !== 1 ? '80px' : 0} ta="center">
            <Indicator
              inline
              label={<Text fz={i !== 1 ? '40px' : '50px'}>{x.medal}</Text>}
              size={0}
            >
              <Avatar name={x.name} color="initials" size="lg">
                {x.name ? null : '👤'}
              </Avatar>
            </Indicator>
            <Text fz={i !== 1 ? '20px' : '28px'} fw={800} c={getColor(x.stat)}>
              {formatNumber(x.stat ?? 0)}
            </Text>
          </Box>
        ))}
        <Box p="xs" w="100%">
          {list.map((x, i) => (
            <Card key={x.name} shadow="sm" mb="xs">
              <Stack mb="sm" w="100%">
                <Group gap="sm">
                  <Text>{`#${i + 1}`}</Text>
                  <Avatar
                    size={40}
                    name={x.name}
                    color="initials"
                    radius={40}
                  />
                  <Group justify="space-between" flex={1}>
                    <Text fz="lg" fw={500}>
                      {x.name}
                    </Text>
                    <Text fz="lg" fw={800} c={getColor(x.stat)}>
                      {formatNumber(x.stat)}
                    </Text>
                  </Group>
                </Group>
                <Sparkline
                  w="100%"
                  h={50}
                  data={playerHistory[x.name]}
                  curveType="natural"
                  trendColors={{
                    positive: 'green',
                    negative: 'red',
                    neutral: 'gray.5',
                  }}
                  fillOpacity={0.2}
                  strokeWidth={5}
                />
              </Stack>
            </Card>
          ))}
        </Box>
      </Group>
    </ScrollArea>
  ) : (
    <Empty
      subTitle={
        <>
          Thêm <b>{3 - rounds.length}</b> ván nữa đê
        </>
      }
    />
  );
}

export default Leaderboard;
