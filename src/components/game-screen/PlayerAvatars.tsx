import { Avatar, Tooltip } from '@mantine/core';

interface Props {
  playerNames: string[];
}

function PlayerAvatars(props: Props) {
  const { playerNames } = props;
  const displayedPlayers = playerNames.slice(0, 3);
  const hiddenPlayers = playerNames.slice(3);
  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        {displayedPlayers.map((n) => (
          <Tooltip key={n} label={n} withArrow>
            <Avatar name={n} color="initials" radius="xl" />
          </Tooltip>
        ))}
        {hiddenPlayers.length > 1 && (
          <Tooltip
            withArrow
            label={hiddenPlayers.map((n) => (
              <div key={n}>{n}</div>
            ))}
          >
            <Avatar radius="xl">{`+${playerNames.slice(3).length}`}</Avatar>
          </Tooltip>
        )}
      </Avatar.Group>
    </Tooltip.Group>
  );
}

export default PlayerAvatars;
