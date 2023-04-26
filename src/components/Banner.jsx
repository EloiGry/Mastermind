import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import { ITEMS } from '../data/Items';


const Banner = () => {
    return (
        <Droppable droppableId="ITEMS" isDropDisabled={true}>
          {(provided, snapshot) => (
              <Kiosk
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}>
                  {ITEMS.map((item, index) => (
                      <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}>
                          {(provided, snapshot) => (
                              <>
                                  <Item
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      isDragging={snapshot.isDragging}
                                      bg={item.content}>
                                  </Item>
                              </>
                          )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
              </Kiosk>
          )}
      </Droppable>
    );
};

export default Banner;

const Item = styled.div`
    user-select: none;
    padding: 0.5rem;
    margin: 1em;
    line-height: 1.5;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.bg};
    border: 1px ${props => (props.isDragging ? 'dashed #4099ff' : 'solid #ccc')};
`;



const Kiosk = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;