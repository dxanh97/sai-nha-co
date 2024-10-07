import { PropsWithChildren } from 'react';
import { Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
}

function TopNav(props: PropsWithChildren<Props>) {
  const { title, children } = props;

  return (
    <Group justify="space-between" align="center">
      <Group>
        <Link to="/">
          <Text fz="30px">🔙</Text>
        </Link>
        <Text size="xl" fw={800}>
          {title}
        </Text>
      </Group>
      {children}
    </Group>
  );
}

export default TopNav;
