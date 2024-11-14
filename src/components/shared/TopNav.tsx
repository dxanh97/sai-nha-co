import { PropsWithChildren } from 'react';
import { Avatar, Button, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

interface Props {
  title: string;
  isHome?: boolean;
}

function TopNav(props: PropsWithChildren<Props>) {
  const { title, isHome = false, children } = props;

  return (
    <Group justify="space-between" gap="xs">
      <Group>
        {isHome ? (
          <Avatar radius="md" src="icons/icon.png" alt="it's me" />
        ) : (
          <Button variant="transparent" p={0} component={Link} to="/">
            <IconArrowLeft />
          </Button>
        )}
        <Text size="xl" fw={800}>
          {title}
        </Text>
      </Group>
      {children}
    </Group>
  );
}

export default TopNav;
