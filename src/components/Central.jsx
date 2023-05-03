import Banner from "./Banner";
import Result from "./Result";
import { ITEMS } from "../data/Items";
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useStore } from "../slice/ResultSlice";
import ModalEnd from "./ModalEnd";



const Central = () => {
    const [state, setState] = useState({ [uuidv4()]: [] });
    const [finalResult, setFinalResult] = useState([])
    const [end, setEnd] = useState(false)
    const items = ITEMS.map(value => value.content);
    const union = [{key: '1', content:'_'}, {key: '2', content:'_'}, {key: '3', content:'_'}, {key: '4', content:'_'}]
    const data = useStore(state => state.responseData)
    const updateData = useStore(state => state.updateData)
    const played = useStore(state => state.played)
    const updatePlayed = useStore(state => state.updatePlayed)

    console.log(finalResult);

      if (finalResult.length < 4) {
        let finalResultTest = []
        while (finalResultTest.length < 4) {
          const color = items[Math.floor(Math.random()*items.length)]
          finalResultTest.push(color)
        }
        setFinalResult(finalResultTest)
      }

    useEffect(() => {
      if (played.length > 0) {
        handleVerification() 
      }
    }, [played])
    

    if (Object.values(state)[0].length > 4) {
      Object.values(state)[0].splice(4)
    }

    const handleClick = async() => {
      await updatePlayed(Object.values(state)[0])
      setState({ [uuidv4()]: [] })    
    }

    const handleVerification = async() => {
      await played
      const playedValid = played.slice(0, 4).map(value => value.content);
      await updateData(playedValid, finalResult, played.length / 4)
      await EndOfGame()  
    }

    const EndOfGame = async() => {
      const test = data.find(el => el.color_1 === 'black' && el.color_2 === 'black' && el.color_3 === 'black' && el.color_4 === 'black')
      if (test) {
          setEnd(true)
      }
  }
  
    const onDragEnd = (result) => {
      const { source, destination } = result;
  
      // dropped outside the list
      if (!destination) {
        
        Object.values(state)[0].splice(source.index, 1)
        return;
      }

      if (source.droppableId && source.droppableId !== null) {
        switch (source.droppableId) {
          case destination.droppableId:
            setState((prev) => ({
              ...prev,
              [destination.droppableId]: reorder(
                prev[source.droppableId],
                source.index,
                destination.index
              ),
            }));
            break;
          case 'ITEMS':
            setState((prev) => ({
              ...prev,
              [destination.droppableId]: copy(
                ITEMS,
                prev[destination.droppableId],
                source,
                destination
              ),
            }));
            break;
          default:
            setState((prev) => ({
              ...prev,
              [source.droppableId]: prev[source.droppableId].filter(
                (_, index) => index !== source.index
              ),
              [destination.droppableId]: move(
                prev[source.droppableId],
                prev[destination.droppableId],
                source,
                destination
              )[destination.droppableId],
            }));
            break;
        }
      }
  
    };
  
    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
  
      return result;
    };
  
    /**
     * Moves an item from one list to another list.
     */
    const copy = (source, destination, droppableSource, droppableDestination) => {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const item = sourceClone[droppableSource.index];
  
      destClone.splice(droppableDestination.index, 0, { ...item, id: uuidv4() });
      return destClone;
    };
  
    const move = (
      source,
      destination,
      droppableSource,
      droppableDestination
    ) => {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const [removed] = sourceClone.splice(droppableSource.index, 1);
  
      destClone.splice(droppableDestination.index, 0, removed);
  
      const result = {};
      result[droppableSource.droppableId] = sourceClone;
      result[droppableDestination.droppableId] = destClone;
  
      return result;
    }

    


return (
  <div className="h-[90vh]">
  <DragDropContext onDragEnd={onDragEnd}>
  <Banner/>
  <Content>
      <Result/>
      <div className='flex flex-col justify-end w-[800px]'>
        {Object.keys(state).map((list, i) => {
            console.log('==> list', state[list]);
            return (
                <Droppable key={list} droppableId={list} direction='horizontal'>
                    {(provided, snapshot) => (
                        <Container
                            ref={provided.innerRef}
                            isDraggingOver={
                                snapshot.isDraggingOver
                            }>
                            {state[list].map(
                                      (item, index) => (
                                          <Draggable
                                              key={item.id}
                                              draggableId={item.id}
                                              index={index}>
                                              {(
                                                  provided,
                                                  snapshot
                                              ) => (
                                                
                                                  <Item
                                                      ref={
                                                          provided.innerRef
                                                      }
                                                      {...provided.draggableProps}
                                                      isDragging={
                                                          snapshot.isDragging
                                                      }
                                                      bg={item.content}
                                                    >
                                                      <Handle
                                                          {...provided.dragHandleProps}>
                                                          
                                                      </Handle>
                                                  </Item>
                                              )}
                                          </Draggable>
                                      )
                                  )
                                  }
                            {provided.placeholder}
                            {state[list].length < 4 && union.slice(0, 4 - state[list].length).map(el => <span key={el.key} className='text-black m-[1em]'> {el.content} </span>)}
                            {state[list].length === 4 && <button className='absolute right-4 top-4 border-2 border-white text-white px-3 py-1 rounded-lg' onClick={() => handleClick()}> Valider </button>}
                        </Container>
                    )}
                </Droppable>
            );
        })}
        <Grid>
        {played?.map(item => {
          return (
          <Item key={item.id} bg={item.content}> </Item>
          )
        })}
        </Grid>
    </div>
  </Content>
  
</DragDropContext>
{(end || played.length/4 > 9)  && <ModalEnd finalResult={finalResult} text={end ? 'Vous avez gagné' : 'Vous avez perdu'}/>}
</div>
);
};

export default Central;

const Content = styled.div`
margin-right: 100px;
display: flex;
`;

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-template-rows: 1fr;
grid-column-gap: 5px;
grid-row-gap: 5px;
margin: 0rem 0.5rem;
position: relative;
background: #ccc;
`

const Item = styled.div`
display: flex;
user-select: none;
padding: 0.5rem;
margin: 1em;
line-height: 1.5;
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${props => props.bg};
border: 1px ${props => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
`;


const Handle = styled.div`
display: flex;
align-items: center;
align-content: center;
user-select: none;
margin: -0.5rem 0.5rem -0.5rem -0.5rem;
padding: 0.5rem;
line-height: 1.5;
border-radius: 3px 0 0 3px;
background: transparent;
`;

const List = styled.div`
border: 1px
    ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ccc')};
background: #fff;
padding: 0.5rem 0.5rem 0;
border-radius: 3px 3px 0px 0px;
`;


const Container = styled(List)`
margin: 0rem 0.5rem;
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-template-rows: 1fr;
grid-column-gap: 5px;
grid-row-gap: 5px;
background: #ccc;
position: relative;
border-radius: 0px 0px 3px 3px;
`;


