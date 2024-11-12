import { useState } from 'react';
import { Button, Input, NumberInput, Stack, TagsInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { createGame } from '../redux/game.slice';
import { selectAllGames, selectLatestGame } from '../redux/game.selector';

import TopNav from '../components/shared/TopNav';

const MIN_PLAYER = 3;

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

  const isShortOnPeople = playerNames.length < MIN_PLAYER;

  return (
    <Stack>
      <TopNav title="Game Mới" />

      <Input.Wrapper label="Tên game">
        <Input
          size="md"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
      </Input.Wrapper>
      <TagsInput
        size="md"
        label="Nhấn 'Enter/Nhập' để thêm người chơi"
        placeholder="Tên người chơi"
        value={[...playerNames]}
        onChange={setPlayerNames}
      />
      <Input.Wrapper label="Mức bẹt">
        <NumberInput
          size="md"
          inputMode="numeric"
          value={betSize}
          min={1}
          onChange={(e) => setBetSize(parseInt(`${e}`, 10))}
        />
      </Input.Wrapper>
      <Button
        variant="light"
        fullWidth
        disabled={isShortOnPeople || !gameName || betSize < 1}
        onClick={onStartGame}
      >
        {isShortOnPeople
          ? `(Thêm ${MIN_PLAYER - playerNames.length} người nữa mới đủ)`
          : 'Zô'}
      </Button>
    </Stack>
  );
}

export default NewGamePage;
