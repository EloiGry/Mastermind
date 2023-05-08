import styled from "styled-components";
import { Link } from "react-router-dom";

const ModalEnd = ({finalResult, text}) => {

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black text-white m-8 rounded-xl bg-opacity-30 backdrop-filter backdrop-blur-lg flex justify-center items-center">
            <div className="flex flex-col items-center justify-center gap-4">
                <p> La réponse était : </p>
                <div className="flex gap-2">
                        {finalResult?.map((item, index) => {
                    return (
                    <Item key={index} bg={item}> </Item>
                    )
                    })}
                </div>
                <p className="font-bold"> {text} ! </p>
                <Link to="/" className="py-2 px-6 border-2 w-32 rounded-lg hover:text-blue hover:border-blue duration-300">
                    Acceuil
                </Link>
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
