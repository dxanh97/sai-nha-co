import { Button } from '@mantine/core';
import { Text } from 'recharts';

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
