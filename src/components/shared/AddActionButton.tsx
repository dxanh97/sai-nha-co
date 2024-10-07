import { MouseEventHandler } from 'react';
import { ActionIcon, Text, useComputedColorScheme } from '@mantine/core';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function AddActionButton(props: Props) {
  const { onClick } = props;
  const computedColorScheme = useComputedColorScheme('light');

  return (
    <ActionIcon
      variant={computedColorScheme === 'dark' ? 'white' : 'light'}
      size="xl"
      radius="xl"
      pos="fixed"
      bottom={20}
      right={20}
      onClick={onClick}
    >
      <Text fz="xl" lh={0}>
        ➕
      </Text>
    </ActionIcon>
  );
}

export default AddActionButton;
