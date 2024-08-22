import React from 'react'
import styled from 'styled-components'

type ButtonProps = {
  title: string;
  onClick?: () => void
}

const ButtonStyle = styled.button<{ bgcolor?: string,color?: string }>`
    background-color:${props => props.bgcolor?props.bgcolor:'#049dd2'} ;
    color:${props => props.color?props.color:'#FFF'};
    padding: 7px;
    border:.5px solid #049dd2;
    border-radius:5px;
    cursor:pointer;
`;

function Button({ title,onClick }: Readonly<ButtonProps>) {
  return (
    <ButtonStyle onClick={onClick}>{title}</ButtonStyle>
  )
}

export default Button
