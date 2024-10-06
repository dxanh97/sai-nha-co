import {
  Avatar,
  Box,
  Card,
  Flex,
  Group,
  Indicator,
  ScrollArea,
  Text,
} from '@mantine/core';

import { useAppSelector } from '../../redux/store';
import { selectAllRoundsFromGameId } from '../../redux/round.selector';
import { selectGameById } from '../../redux/game.selector';

interface Props {
  gameId: string;
}

function RoundsList(props: Props) {
  const { gameId } = props;
  const game = useAppSelector((s) => selectGameById(s, gameId));
  const rounds = useAppSelector((s) => selectAllRoundsFromGameId(s, gameId));

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <ScrollArea>
      {rounds.length === 0 && (
        <Box ta="center" py="150px">
          <Text fz="100px">🃏</Text>
          <Text fz="h3" fw={500}>
            Empty
          </Text>
          <Text>No round yet</Text>
        </Box>
      )}
      {rounds.map((round, i) => {
        const { id, stats, timestamp } = round;
        return (
          <Box key={id} mt="md">
            <Card shadow="sm" p="xs" pb={0} radius="md" withBorder>
              <ScrollArea>
                <Flex gap="xs" my="xs">
                  {game.playerNames.map((playerName) => {
                    let color = '';
                    const stat = stats[playerName];
                    if (stat > 0) color = 'green';
                    if (stat < 0) color = 'red';
                    return (
                      <Indicator
                        key={playerName}
                        inline
                        color={color}
                        label={stat}
                        size={16}
                      >
                        <Avatar name={playerName} color="initials" />
                      </Indicator>
                    );
                  })}
                </Flex>
              </ScrollArea>
              <Group justify="space-between">
                <Text c="dimmed">{`#${rounds.length - i}`}</Text>
                <Text c="dimmed">{formatDate(timestamp)}</Text>
              </Group>
            </Card>
          </Box>
        );
      })}
    </ScrollArea>
  );
}

export default RoundsList;
