import { useMap } from '@mantine/hooks';

import RoundLogCarousel from './RoundLogCarousel';
import AddActionButton from './shared/AddActionButton';

interface Props {
  betSize: number;
  playerNames: string[];
  onSave: (result: Map<string, number>) => void;
}

function AddRoundButton(props: Props) {
  const { betSize, playerNames, onSave } = props;
  const statsMap = useMap(playerNames.map((x) => [x, 0]));

  const handleOnSave = (result: Map<string, number>) => {
    onSave(result);
    statsMap.forEach((_, key) => statsMap.set(key, 0));
  };

  return (
    <RoundLogCarousel
      betSize={betSize}
      statsMap={statsMap}
      onSave={handleOnSave}
      renderTrigger={(open) => <AddActionButton onClick={open} />}
    />
  );
}

export default AddRoundButton;
