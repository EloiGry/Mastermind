import styled from "styled-components";
import { useStore } from "../slice/ResultSlice"

const Result = () => {
    const responseData = useStore(state => state.responseData)
    console.log(responseData);
    return (
        <div className="flex flex-col justify-center items-center w-[150px] bg-[#ccc]">
           {responseData?.map(el => {
            return (
                <Grid key={el.id}>
                    <Item bg={el.color_1}/>
                    <Item bg={el.color_2}/>
                    <Item bg={el.color_3}/>
                    <Item bg={el.color_4}/>
                </Grid>
            )
           })} 
        </div>
    );
};

export default Result;

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-template-rows: repeat(2, 1fr);
grid-column-gap: 5px;
grid-row-gap: 5px;
margin: 10px 0px;`

const Item = styled.span`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.bg};
    border: 1px solid black;
`;