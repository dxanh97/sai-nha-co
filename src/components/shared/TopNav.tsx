import { PropsWithChildren } from 'react';
import { Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  isHome?: boolean;
}

function TopNav(props: PropsWithChildren<Props>) {
  const { title, isHome = false, children } = props;

  return (
    <Group justify="space-between" align="center">
      <Group>
        {isHome ? (
          <Text fz="30px">📒</Text>
        ) : (
          <Link to="/">
            <Text fz="30px">🔙</Text>
          </Link>
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
