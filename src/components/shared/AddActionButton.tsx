import { MouseEventHandler } from 'react';
import { ActionIcon, Box, useComputedColorScheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function AddActionButton(props: Props) {
  const { onClick } = props;
  const computedColorScheme = useComputedColorScheme('light');
  const { height } = useViewportSize();

  return (
    <Box pos="absolute" top={height - 60} right={60} style={{ zIndex: 300 }}>
      <ActionIcon
        variant={computedColorScheme === 'dark' ? 'white' : 'light'}
        size="xl"
        radius="xl"
        pos="fixed"
        onClick={onClick}
      >
        <IconPlus />
      </ActionIcon>
    </Box>
  );
}

export default AddActionButton;
