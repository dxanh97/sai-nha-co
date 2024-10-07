import { TagsInput } from '@mantine/core';

interface Props {
  playerNames: string[];
  onChange: (playerNames: string[]) => void;
}

function AddPlayerInput(props: Props) {
  const { playerNames, onChange } = props;

  return (
    <TagsInput
      label="Nhấn 'Enter/Nhập' để thêm người chơi"
      placeholder="Tên người chơi"
      value={playerNames}
      onChange={onChange}
    />
  );
}

export default AddPlayerInput;
