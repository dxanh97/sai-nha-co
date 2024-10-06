import { TagsInput } from '@mantine/core';

interface Props {
  playerNames: string[];
  onChange: (playerNames: string[]) => void;
}

function AddPlayerInput(props: Props) {
  const { playerNames, onChange } = props;

  return (
    <TagsInput
      label="Press Enter to add a player"
      placeholder="Player name"
      value={playerNames}
      onChange={onChange}
    />
  );
}

export default AddPlayerInput;
