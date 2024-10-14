import { useMemo } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Group,
  Indicator,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { Sparkline } from '@mantine/charts';
import { IconTableExport } from '@tabler/icons-react';

import { useAppSelector } from '../redux/store';
import { selectAllRoundsFromGameId } from '../redux/round.selector';
import { formatNumber, getColor } from '../utils/helpers';
import { selectGameById } from '../redux/game.selector';

import Empty from './shared/Empty';

interface Props {
  gameId: string;
}

function Leaderboard(props: Props) {
  const { gameId } = props;
  const rounds = useAppSelector((s) => selectAllRoundsFromGameId(s, gameId));
  const { playerNames, name: gameName } = useAppSelector((s) =>
    selectGameById(s, gameId),
  );
  const playerBalanceHistory = useMemo(
    () =>
      [...rounds].reverse().reduce<{
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

  const exportCSV = () => {
    const headers = ['#', ...playerNames];
    const rows = [...rounds]
      .reverse()
      .map((round, i) => [
        `#${i + 1}`,
        ...playerNames.map((player) => formatNumber(round.stats[player])),
      ]);
    const total = [
      'Total',
      ...playerNames.map((player) => {
        const history = playerBalanceHistory[player];
        return formatNumber(history[history.length - 1]);
      }),
    ];
    const table = [headers, ...rows, total];
    const blobData = [table.map((r) => r.join(',')).join('\n')];
    const blob = new Blob(blobData, { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${gameName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const dataList = useMemo(
    () =>
      Object.keys(playerBalanceHistory).map((name) => {
        const history = playerBalanceHistory[name];
        return {
          name,
          stat: history[history.length - 1],
        };
      }),
    [playerBalanceHistory],
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
      </Group>
      <Box p="xs" w="100%">
        {list.map((x, i) => (
          <Card key={x.name} shadow="sm" mb="xs">
            <Stack mb="sm" w="100%">
              <Group gap="sm">
                <Text>{`#${i + 1}`}</Text>
                <Avatar size={40} name={x.name} color="initials" radius={40} />
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
                data={playerBalanceHistory[x.name]}
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

        <Button
          fullWidth
          variant="light"
          leftSection={<IconTableExport size={14} />}
          onClick={exportCSV}
        >
          Xuất CSV
        </Button>
      </Box>
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
