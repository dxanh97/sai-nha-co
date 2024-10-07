import { Button, Text } from '@mantine/core';

interface Props {
  emoji: string;
  onClick: () => void;
}

function EmojiButton(props: Props) {
  const { emoji, onClick } = props;

  return (
    <Button variant="transparent" p={0} onClick={onClick}>
      <Text>{emoji}</Text>
    </Button>
  );
}

export default EmojiButton;
