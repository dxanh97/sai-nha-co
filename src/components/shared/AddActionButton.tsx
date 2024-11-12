import { MouseEventHandler } from 'react';
import { ActionIcon, useMantineTheme } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function AddActionButton(props: Props) {
  const { onClick } = props;
  const { width } = useViewportSize();

  const theme = useMantineTheme();
  const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const right = isMd
    ? 20
    : `calc((${width}px - ${theme.breakpoints.md}) / 2 + 20px)`;

  return (
    <ActionIcon
      size="xl"
      radius="xl"
      pos="fixed"
      bottom={20}
      right={right}
      onClick={onClick}
    >
      <IconPlus />
    </ActionIcon>
  );
}

export default AddActionButton;
