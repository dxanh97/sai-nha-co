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

import { getColor, getSum } from '../../utils/helpers';

interface Props {
  gameId: string;
}

function Leaderboard(props: Props) {
  const { gameId } = props;
  const rounds = useAppSelector((s) => selectAllRoundsFromGameId(s, gameId));
  const playerHistory = useMemo(
    () =>
      rounds.reduce<{
        [playerName: string]: number[];
      }>((acc, cur) => {
        const playerNames = Object.keys(cur.stats);
        const result = { ...acc };
        playerNames.forEach((name) => {
          const history = result[name] ?? [0];
          result[name] = [...history, getSum(history) + cur.stats[name]];
        });
        return result;
      }, {}),
    [rounds],
  );

  const dataList = useMemo(
    () =>
      Object.keys(playerHistory).map((name) => ({
        name,
        stat: getSum(playerHistory[name]),
      })),
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

  return (
    <ScrollArea>
      <Group justify="space-around" py="xl">
        {top3.map((x, i) => (
          <Box pt={i !== 1 ? '80px' : 0} ta="center">
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
              {x.stat ?? 0}
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
                      {x.stat}
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
  );
}

export default Leaderboard;
