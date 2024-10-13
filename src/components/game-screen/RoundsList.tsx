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
import { deleteRound, updateRound } from '../../redux/round.slice';
import { formatNumber, getColor } from '../../utils/helpers';

import Empty from '../shared/Empty';
import EmojiButton from '../shared/EmojiButton';
import EditRoundButton from './EditRoundButton';

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

  const onUpdateRound = (roundId: string, statsMap: Map<string, number>) => {
    dispatch(
      updateRound({
        id: roundId,
        stats: Object.fromEntries(statsMap.entries()),
      }),
    );
  };

  const onDeleteRound = (roundId: string) => {
    modals.openConfirmModal({
      title: 'Xoá ván này?',
      size: 'sm',
      radius: 'md',
      withCloseButton: false,
      centered: true,
      labels: { confirm: 'Oke', cancel: 'Thoi' },
      onConfirm: () => dispatch(deleteRound(roundId)),
    });
  };

  return (
    <ScrollArea>
      {rounds.length === 0 && <Empty emoji="🃏" subTitle="Chưa có ván nào" />}

      {rounds.map((round, i) => {
        const { id, stats, timestamp } = round;
        return (
          <Box key={id} mt="md">
            <Card shadow="sm" p="xs" py={0} radius="md" withBorder>
              <Group justify="space-between">
                <Text c="dimmed">
                  {`#${rounds.length - i} - ${formatDate(timestamp)}`}
                </Text>
                <Group>
                  <EditRoundButton
                    roundId={round.id}
                    onSave={(statsMap) => onUpdateRound(round.id, statsMap)}
                  />
                  <EmojiButton emoji="🗑️" onClick={() => onDeleteRound(id)} />
                </Group>
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
