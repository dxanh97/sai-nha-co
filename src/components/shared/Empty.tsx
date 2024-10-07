import { Box, Text } from '@mantine/core';

interface Props {
  emoji: string;
  title?: string;
  subTitle?: React.ReactNode;
}

function Empty(props: Props) {
  const { emoji, title = 'Trống quắc', subTitle } = props;

  return (
    <Box ta="center" py="150px">
      <Text fz="100px">{emoji}</Text>
      <Text fz="h3" fw={500}>
        {title}
      </Text>
      <Text>{subTitle}</Text>
    </Box>
  );
}

export default Empty;
