/* eslint-disable react/jsx-props-no-spreading */
import { Avatar, Box, Button, Card, Group, Modal, Text } from '@mantine/core';
import { useDisclosure, useListState } from '@mantine/hooks';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectGameById } from '../../redux/game.selector';
import { updateGamePlayerNames } from '../../redux/game.slice';

import PlayerAvatars from '../shared/PlayerAvatars';

interface Props {
  gameId: string;
}

function EditablePlayerOrder(props: Props) {
  const { gameId } = props;
  const game = useAppSelector((s) => selectGameById(s, gameId));
  const dispatch = useAppDispatch();

  const [opened, { open, close }] = useDisclosure(false);
  const [state, handlers] = useListState(game.playerNames);

  const handleUpdateOrder = () => {
    dispatch(updateGamePlayerNames({ id: gameId, playerNames: state }));
    close();
  };

  return (
    <>
      <Box onClick={open}>
        <PlayerAvatars playerNames={game.playerNames} />
      </Box>
      <Modal opened={opened} onClose={close} title="Sắp xếp vị trí" fullScreen>
        <DragDropContext
          onDragEnd={({ destination, source }) =>
            handlers.reorder({
              from: source.index,
              to: destination?.index || 0,
            })
          }
        >
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {state.map((item, index) => (
                  <Draggable key={item} index={index} draggableId={item}>
                    {(draggableProvided) => (
                      <Card
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        ref={draggableProvided.innerRef}
                        mb="sm"
                        p="xs"
                        shadow="sm"
                        withBorder
                      >
                        <Group>
                          <Avatar name={item} color="initials" />
                          <Text fw={800}>{item}</Text>
                        </Group>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
        <Button variant="light" fullWidth onClick={handleUpdateOrder}>
          Lưu
        </Button>
      </Modal>
    </>
  );
}

export default EditablePlayerOrder;
