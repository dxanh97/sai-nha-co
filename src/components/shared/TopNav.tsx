import { PropsWithChildren } from 'react';
import { Button, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconArrowLeft, IconPlayCardStar } from '@tabler/icons-react';

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
          <IconPlayCardStar size={30} />
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
