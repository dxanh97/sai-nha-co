import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Group,
  Text,
  Title,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';

interface Props {
  betSize: number;
  playerNames: string[];
}

function RoundCarousel(props: Props) {
  const { betSize, playerNames } = props;

  return (
    <Carousel loop slideGap="sm" my="lg">
      {playerNames.map((n) => (
        <Carousel.Slide key={n}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group gap="sm">
              <Avatar size={40} radius={40} name={n} color="initials" />
              <Box>
                <Text fz="sm" fw={500}>
                  {n}
                </Text>
                <Text fz="xs" c="dimmed">
                  {`Total: ${100}`}
                </Text>
              </Box>
            </Group>

            <Center py="lg">
              <Button variant="transparent">{`-${betSize}`}</Button>
              <Title size={50} m="lg">
                0
              </Title>
              <Button variant="transparent">{`+${betSize}`}</Button>
            </Center>

            <Button variant="light" fullWidth mb="xs">
              Jackpot
            </Button>
            <Button variant="light" fullWidth mb="xs">
              Take pot (50)
            </Button>
          </Card>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default RoundCarousel;
