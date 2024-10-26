import { useState } from 'react';
import { Button, Input, NumberInput, Stack, TagsInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { createGame } from '../redux/game.slice';
import { selectAllGames, selectLatestGame } from '../redux/game.selector';

import TopNav from '../components/shared/TopNav';

function NewGamePage() {
  const lastGame = useAppSelector(selectLatestGame);

  const allGames = useAppSelector(selectAllGames);
  const [playerNames, setPlayerNames] = useState<string[]>(
    lastGame?.playerNames ?? [],
  );
  const [betSize, setBetSize] = useState(lastGame?.betSize ?? 5);
  const [gameName, setGameName] = useState(`Game #${allGames.length + 1}`);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onStartGame = () => {
    const id = nanoid();
    dispatch(
      createGame({
        id,
        betSize,
        name: gameName,
        playerNames,
      }),
    );
    navigate(`/game/${id}`);
  };

  return (
    <Stack>
      <TopNav title="Game Mới" />

      <Input.Wrapper label="Tên game">
        <Input value={gameName} onChange={(e) => setGameName(e.target.value)} />
      </Input.Wrapper>
      <TagsInput
        label="Nhấn 'Enter/Nhập' để thêm người chơi"
        placeholder="Tên người chơi"
        value={[...playerNames]}
        onChange={setPlayerNames}
      />
      <Input.Wrapper label="Mức bẹt">
        <NumberInput
          inputMode="numeric"
          value={betSize}
          min={1}
          onChange={(e) => setBetSize(parseInt(`${e}`, 10))}
        />
      </Input.Wrapper>
      <Button
        variant="light"
        fullWidth
        disabled={playerNames.length < 3 || !gameName || betSize < 1}
        onClick={onStartGame}
      >
        Zô
      </Button>
    </Stack>
  );
}

export default NewGamePage;
