import {
  Avatar,
  Box,
  Card,
  Group,
  Indicator,
  Stack,
  Text,
} from '@mantine/core';
import { Sparkline } from '@mantine/charts';

import { getColor } from '../../utils/helpers';

const data = [
  { name: 'Thu Hien', stat: 100 },
  { name: 'Xanh', stat: -200 },
  { name: 'Dat', stat: -100 },
  { name: 'Xuan Hoang', stat: -200 },
  { name: 'Minh Hoang', stat: 150 },
  { name: 'Phat', stat: -150 },
];

function Leaderboard() {
  const list = [...data].sort((a, b) => b.stat - a.stat);

  const top3 = [
    {
      medal: '🥈',
      name: list[1].name,
      stat: list[1].stat,
    },
    {
      medal: '🥇',
      name: list[0].name,
      stat: list[0].stat,
    },
    {
      medal: '🥉',
      name: list[2].name,
      stat: list[2].stat,
    },
  ];
  const positiveTrend = [10, 20, 40, 20, 40, 10, 50, 5, 10];

  return (
    <Box>
      <Group justify="space-around">
        {top3.map((x, i) => (
          <Box pt={i !== 1 ? '80px' : 0}>
            <Indicator
              inline
              label={<Text fz={i !== 1 ? '40px' : '50px'}>{x.medal}</Text>}
              size={0}
            >
              <Avatar name={x.name} color="initials" size="lg" />
            </Indicator>
            <Text fz={i !== 1 ? '20px' : '28px'} fw={800} c={getColor(x.stat)}>
              {x.stat}
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
                  data={positiveTrend}
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
    </Box>
  );
}

export default Leaderboard;
