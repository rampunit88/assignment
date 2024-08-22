import React from 'react'
import styled from 'styled-components'

type TitleProps = {
    title: string;
    size?: number;
    style?: React.CSSProperties;
}

const ContainerStyle = styled.div``;
const H3Style = styled.h3<{size?:number}>`
    font-size:${props => props.size?props.size+'px':'12px'};
`;

function Title(props:TitleProps) {
  return (
    <ContainerStyle>
      <H3Style size={props.size}>{props.title}</H3Style>
    </ContainerStyle>
  )
}

export default Title
