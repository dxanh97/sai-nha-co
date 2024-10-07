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
import { modals } from '@mantine/modals';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectAllRoundsFromGameId } from '../../redux/round.selector';
import { selectGameById } from '../../redux/game.selector';
import { deleteRound } from '../../redux/round.slice';
import { formatNumber, getColor } from '../../utils/helpers';

import Empty from '../shared/Empty';

interface Props {
  gameId: string;
}

function RoundsList(props: Props) {
  const { gameId } = props;
  const dispatch = useAppDispatch();
  const game = useAppSelector((s) => selectGameById(s, gameId));
  const rounds = useAppSelector((s) => selectAllRoundsFromGameId(s, gameId));

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const onDeleteRound = (roundId: string) => {
    modals.openConfirmModal({
      title: 'Delete this round?',
      size: 'sm',
      radius: 'md',
      withCloseButton: false,
      centered: true,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => dispatch(deleteRound(roundId)),
    });
  };

  return (
    <ScrollArea>
      {rounds.length === 0 && <Empty emoji="🃏" subTitle="No round yet" />}

      {rounds.map((round, i) => {
        const { id, stats, timestamp } = round;
        return (
          <Box key={id} mt="md">
            <Card shadow="sm" p="xs" pb={0} radius="md" withBorder>
              <Group justify="space-between">
                <Text c="dimmed">
                  {`#${rounds.length - i} - ${formatDate(timestamp)}`}
                </Text>
                <Text c="dimmed" onClick={() => onDeleteRound(id)}>
                  🗑️
                </Text>
              </Group>
              <ScrollArea>
                <Flex gap="xs" my="xs">
                  {game.playerNames.map((playerName) => {
                    const stat = stats[playerName];
                    return (
                      <Indicator
                        key={playerName}
                        inline
                        color={getColor(stat)}
                        label={formatNumber(stat ?? 0)}
                        size={16}
                      >
                        <Avatar name={playerName} color="initials" />
                      </Indicator>
                    );
                  })}
                </Flex>
              </ScrollArea>
            </Card>
          </Box>
        );
      })}
    </ScrollArea>
  );
}

export default RoundsList;
