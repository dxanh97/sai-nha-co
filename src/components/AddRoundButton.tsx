import { useEffect } from 'react';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Group,
  Modal,
  Text,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useDisclosure, useMap } from '@mantine/hooks';

import { formatNumber, getColor, getSum } from '../utils/helpers';

import AddActionButton from './shared/AddActionButton';

interface Props {
  betSize: number;
  playerNames: string[];
  onSave: (result: Map<string, number>) => void;
}

function AddRoundButton(props: Props) {
  const { betSize, playerNames, onSave } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const statsMap = useMap(playerNames.map((x) => [x, 0]));
  useEffect(() => {
    if (!opened) {
      statsMap.clear();
    }
  }, [opened, statsMap]);

  const balance = getSum(Array.from(statsMap.values()));

  const jackpotAmount = (playerNames.length - 1) * betSize;
  const onJackpot = (winner: string) => {
    statsMap.set(winner, jackpotAmount);
    playerNames
      .filter((x) => x !== winner)
      .forEach((x) => statsMap.set(x, -betSize));
  };

  const onLoseAll = (loser: string) => {
    statsMap.set(loser, -jackpotAmount);
    playerNames
      .filter((x) => x !== loser)
      .forEach((x) => statsMap.set(x, betSize));
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Ván mới" centered>
        <Carousel loop slideGap="sm" slideSize="70%" withControls={false}>
          {playerNames.map((x) => {
            const stat = statsMap.get(x) ?? 0;
            const remaining = 0 - (balance - stat);

            const setStat = (amount: number) => {
              statsMap.set(x, amount);
            };

            return (
              <Carousel.Slide key={x}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group gap="sm">
                    <Avatar size={40} radius={40} name={x} color="initials" />
                    <Box>
                      <Text fz="md" fw={500}>
                        {x}
                      </Text>
                    </Box>
                  </Group>

                  <Center py="lg">
                    <ActionIcon
                      variant="light"
                      radius="xl"
                      p="md"
                      color="red"
                      onClick={() => setStat(stat - betSize)}
                    >
                      {`-${betSize}`}
                    </ActionIcon>
                    <Text
                      fz={50}
                      m="lg"
                      miw="100px"
                      ta="center"
                      c={getColor(stat)}
                    >
                      {formatNumber(stat)}
                    </Text>
                    <ActionIcon
                      variant="light"
                      radius="xl"
                      p="md"
                      color="green"
                      onClick={() => setStat(stat + betSize)}
                    >
                      {`+${betSize}`}
                    </ActionIcon>
                  </Center>

                  <Button
                    variant="light"
                    fullWidth
                    mt="xs"
                    onClick={() => setStat(remaining)}
                    disabled={remaining === 0 || remaining === stat}
                  >
                    {!(remaining === 0 || remaining === stat) && (
                      <>
                        <Text>Lấy phần dư&nbsp;</Text>
                        <Text c={getColor(remaining)} fw={500}>
                          ({formatNumber(remaining)})
                        </Text>
                      </>
                    )}
                  </Button>
                  <Button
                    variant="light"
                    fullWidth
                    mt="xs"
                    onClick={() => onJackpot(x)}
                  >
                    <Text>Lụm hết&nbsp;</Text>
                    <Text c={getColor(jackpotAmount)} fw={500}>
                      ({formatNumber(jackpotAmount)})
                    </Text>
                  </Button>
                  <Button
                    variant="light"
                    fullWidth
                    mt="xs"
                    onClick={() => onLoseAll(x)}
                  >
                    <Text>Xui&nbsp;</Text>
                    <Text c={getColor(-jackpotAmount)} fw={500}>
                      ({formatNumber(-jackpotAmount)})
                    </Text>
                  </Button>
                </Card>
              </Carousel.Slide>
            );
          })}
        </Carousel>
        <Button
          fullWidth
          mt="md"
          disabled={
            balance !== 0 || Array.from(statsMap.values()).every((x) => x === 0)
          }
          onClick={() => {
            onSave(statsMap);
            close();
          }}
        >
          Lưu
        </Button>
      </Modal>

      <AddActionButton onClick={open} />
    </>
  );
}

export default AddRoundButton;
