import { ReactNode } from 'react';
import styled from 'styled-components'

const Buttons = styled.div`
  background: #4AC088;
  color: white;
  border-radius: 3px;
  border-color: #4AC088;
  color: palevioletred; 
width:20%;
 
  padding: 0.25em 1em;
  cursor:pointer;
  display:flex;
  justify-content: center;
  span{
    color: white;
   
  }
`
interface ButtonProps {
    label: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    props:Object;

    
  }
function SharedButton({label,onClick,props}:ButtonProps){
    return(
       <Buttons
       onClick={onClick}

       >
        <span>
       {label}
        </span>
       
       </Buttons>
    );
}
export default SharedButton;