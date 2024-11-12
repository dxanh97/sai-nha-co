import { MouseEventHandler } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function AddActionButton(props: Props) {
  const { onClick } = props;

  return (
    <ActionIcon
      size="xl"
      radius="xl"
      pos="fixed"
      bottom={20}
      right={20}
      onClick={onClick}
    >
      <IconPlus />
    </ActionIcon>
  );
}

export default AddActionButton;
