import { Link } from "react-router-dom";
import styled from "styled-components";

const ModalEnd = ({finalResult, text}) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-white text-black m-8">
            <div className="flex flex-col">
                <div className="flex gap-2">
                        {finalResult?.map((item, index) => {
                    return (
                    <Item key={index} bg={item}> </Item>
                    )
                    })}
                </div>
                <p> {text} </p>
                <button onClick={() => window.location.reload()} className="py-2 px-6">
                    <Link to='/play'> Rejouer </Link>
                </button>
            </div>
            
        </div>
    );
};

export default ModalEnd;

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
