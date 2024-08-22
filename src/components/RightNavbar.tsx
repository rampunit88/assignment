import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import NavItem from './NavItem';
import Title from './Title';
import { DataContext } from '../App';
import ProviderDetail from './ProviderDetail';
import ErrorBoundary from './ErrorBoundary';

const ContainerStyle = styled.div`
    position:absolute;
    right:0;
    top:0;
    width:400px;
    height:100%;
    border-left:2px solid dodgerblue;
    background-color:#3f5f7a;
    z-index:2;
`
function RightNavbar() {
  const {setStore, setScreen} = useContext<ContextData>(DataContext);
  const [data, setData] = useState([]);
  const [providerInfo, setProviderInfo] = useState<ProviderDetail | any>({});
  const [clieckedItem, setClickedItem] = useState('');
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://api.apis.guru/v2/providers.json");
        if (!response.ok) {
          // make the promise be rejected if we didn't get a 2xx response
          throw new Error("Not 2xx response", { cause: response });
        } else {
          // got the desired response
          const result = await response.json();
          setData(result.data);
        }
      } catch (error: Error | any) {
        console.log({ error: error.message })
      }
    })()

  }, [])

  const providerHandler = async (obj: any) => {
    setShowDetail(true);
    setProviderInfo(obj);
    setStore(obj); 
    setScreen(3);
  }
  if (showDetail) {
    return (
      <ErrorBoundary>
        <ProviderDetail data={providerInfo} />
      </ErrorBoundary>
    )
  }
  return (
    <ContainerStyle>
      <Title title={'Select Provider'} />
      {data && data.map((item, i) => (
        <ErrorBoundary key={i}>
          <NavItem key={i} title={item} setInfo={providerHandler} />
        </ErrorBoundary>
      ))}

    </ContainerStyle>
  )
}


export default RightNavbar
