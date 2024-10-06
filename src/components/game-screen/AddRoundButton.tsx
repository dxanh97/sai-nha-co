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

import { getColor } from '../../utils/helpers';

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

  const balance = Array.from(statsMap.values()).reduce((sum, x) => sum + x, 0);

  const jackpotAmount = (playerNames.length - 1) * betSize;
  const onJackpot = (winner: string) => {
    statsMap.set(winner, jackpotAmount);
    playerNames
      .filter((x) => x !== winner)
      .forEach((x) => statsMap.set(x, -betSize));
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="New round" centered>
        <Carousel loop slideGap="sm">
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
                      {stat}
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
                    onClick={() => {
                      onJackpot(x);
                    }}
                  >
                    {`Jackpot (${jackpotAmount})`}
                  </Button>
                  <Button
                    variant="light"
                    fullWidth
                    mt="xs"
                    onClick={() => setStat(remaining)}
                    disabled={remaining === 0 || remaining === stat}
                  >
                    {`Take remaining (${remaining})`}
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
          Save
        </Button>
      </Modal>

      <ActionIcon
        variant="light"
        size="xl"
        radius="xl"
        pos="fixed"
        bottom={20}
        right={20}
        onClick={open}
      >
        <Text fz="xl" lh={0}>
          ➕
        </Text>
      </ActionIcon>
    </>
  );
}

export default AddRoundButton;
