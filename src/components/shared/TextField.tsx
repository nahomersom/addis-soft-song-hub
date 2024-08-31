import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
interface TextProps {
    label: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value:string;
    props:Object;
  }
  const TextInput = styled.input`
   width:100%;
   border:1px solid #ddd;
   padding:12px 10px;
   border-radius:5px;
   margin:10px 0px;
  `
const Wrapper = styled.div`
label{
    display:block;
    font-size:20px;
}
`  
 function TextField({label, onChange, value,props}:TextProps){
    return (
     <Wrapper>
          <label>{label}</label>
          
       <TextInput
       {...props}
       onChange={onChange}
       value={value}
       />
       
     </Wrapper>
    );
}
export default TextField;