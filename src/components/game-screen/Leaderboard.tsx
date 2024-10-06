import { Avatar, Box, Group, Indicator, Text } from '@mantine/core';

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
            <Text fz={i !== 1 ? '20px' : '28px'} c={getColor(x.stat)}>
              {x.stat}
            </Text>
          </Box>
        ))}
        <Box p="xs" w="100%">
          {list.map((x, i) => (
            <Group key={x.name} gap="sm" mb="sm" w="100%">
              <Text>{`#${i + 1}`}</Text>
              <Avatar size={40} name={x.name} color="initials" radius={40} />
              <Box ta="left">
                <Text fz="sm" fw={500}>
                  {x.name}
                </Text>
                <Text fz="xs" c={getColor(x.stat)}>
                  {x.stat}
                </Text>
              </Box>
            </Group>
          ))}
        </Box>
      </Group>
    </Box>
  );
}

export default Leaderboard;
