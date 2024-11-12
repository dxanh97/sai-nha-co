import {
  ActionIcon,
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
import { useElementSize } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectAllRoundsFromGameId } from '../redux/round.selector';
import { selectGameById } from '../redux/game.selector';
import { createRound, deleteRound, updateRound } from '../redux/round.slice';
import { formatNumber, getColor } from '../utils/helpers';

import Empty from './shared/Empty';
import EditRoundButton from './EditRoundButton';
import AddRoundButton from './AddRoundButton';

interface Props {
  gameId: string;
}

function RoundsList(props: Props) {
  const { gameId } = props;
  const dispatch = useAppDispatch();
  const { betSize, playerNames } = useAppSelector((s) =>
    selectGameById(s, gameId),
  );
  const rounds = useAppSelector((s) => selectAllRoundsFromGameId(s, gameId));

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const onSaveRound = (statsMap: Map<string, number>) => {
    dispatch(
      createRound({
        gameId,
        stats: Object.fromEntries(statsMap.entries()),
      }),
    );
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

  const { ref, width } = useElementSize();

  return (
    <ScrollArea ref={ref} pos="unset">
      {rounds.length === 0 && <Empty subTitle="Chưa có ván nào" />}

      {rounds.map((round, i) => {
        const { id, stats, timestamp } = round;
        return (
          <Box key={id} mt="md">
            <Card shadow="sm" p="xs" pt="xs" pb={0} radius="md" withBorder>
              <Group justify="space-between">
                <Text fw={800}>
                  {`#${rounds.length - i} - ${formatDate(timestamp)}`}
                </Text>
                <Group gap="xs">
                  <EditRoundButton
                    roundId={round.id}
                    onSave={(statsMap) => onUpdateRound(round.id, statsMap)}
                  />
                  <ActionIcon
                    variant="subtle"
                    onClick={() => onDeleteRound(id)}
                  >
                    <IconTrash />
                  </ActionIcon>
                </Group>
              </Group>
              <ScrollArea
                w={width - 22} // NOTE: padding 10px, border 1px => 22px
                scrollbarSize={5}
              >
                <Flex gap="xs" my="xs">
                  {playerNames.map((playerName) => {
                    const stat = stats[playerName] ?? 0;
                    return (
                      <Indicator
                        key={playerName}
                        inline
                        color={getColor(stat)}
                        label={formatNumber(stat)}
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

      <AddRoundButton
        betSize={betSize}
        playerNames={playerNames}
        onSave={onSaveRound}
      />
    </ScrollArea>
  );
}

export default RoundsList;
