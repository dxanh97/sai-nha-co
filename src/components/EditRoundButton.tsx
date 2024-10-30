import { useMap } from '@mantine/hooks';
import { ActionIcon } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

import { selectRoundById } from '../redux/round.selector';
import { useAppSelector } from '../redux/store';
import { selectGameById } from '../redux/game.selector';

import RoundLogCarousel from './RoundLogCarousel';

interface Props {
  roundId: string;
  onSave: (result: Map<string, number>) => void;
}

function EditRoundButton(props: Props) {
  const { roundId, onSave } = props;
  const { gameId, stats } = useAppSelector((s) => selectRoundById(s, roundId));
  const { playerNames, betSize } = useAppSelector((s) =>
    selectGameById(s, gameId),
  );
  const statsMap = useMap(playerNames.map((x) => [x, stats[x] ?? 0]));

  return (
    <RoundLogCarousel
      betSize={betSize}
      statsMap={statsMap}
      onSave={onSave}
      renderTrigger={(open) => (
        <ActionIcon variant="subtle" onClick={open}>
          <IconEdit />
        </ActionIcon>
      )}
    />
  );
}

export default EditRoundButton;
