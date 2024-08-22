import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import Title from './Title';
import { DataContext } from '../App';

const ContainerStyle = styled.div`
    width:100%;
`;
const MainBoxStyle = styled.div<{ open: boolean }>`
    background-color: ${props => props.open ? '#131924' : '#3f5f7a'};
    margin:5px 10px;
    padding:0 10px;
    border-radius:5px;
    cursor:pointer;
`;
const ContainerHeadStyle = styled.div<{ open: boolean }>`
    display:flex;
    justify-content: space-between;
    align-items:center;
`;
const TitleStyle = styled.div`
    width:95%;
    align-items:left;
`;

const ContainerContentStyle = styled.div`
    display:flex;
    align-items:center;
    gap:5px;
    padding-bottom:10px;
    cursor:pointer;
`;
const LogoStyle = styled.img`
 width:25px;
 border-radius:5px;
`
const TitleTextStyle = styled.div`
 font-size: 12px; 
`
type NavItemProps = {
    title: string;
    setInfo:(str:any) => void;
}
const IconSize = 18;
function NavItem(props: NavItemProps) {
    const { title,setInfo } = props;    
    const [data, setData] = useState({ title: '', logo: '' });
    const [details, setDetails] = useState({});
    const [open, setOpen] = useState(false);

    const closeHandler = () => {
        setOpen(false);
        setData({ title: '', logo: '' });
    }
    const clickHandler = async (provider: string) => {
        try {
            const response = await fetch(`https://api.apis.guru/v2/${provider}.json`);
            if (!response.ok) {
                // make the promise be rejected if we didn't get a 2xx response
                throw new Error("Not 2xx response", { cause: response });
            } else {
                // got the desired response
                const result = await response.json();
                const { apis } = result;
                const dynamicKey = Object.keys(apis)[0];
                const { info: { title, description, 'x-logo': logo,contact:{name,email,url} },swaggerUrl } = apis[dynamicKey];
                setData({ title, logo: logo.url });
                setDetails({ title, description,name,email,url, logo: logo.url,swaggerUrl });
                setOpen(true);
            }
        } catch (error: Error | any) {
            console.log({ error: error.message })
        }
    }
    const detailClickHandler = () => {
        setInfo(details)
    }
    return (
        <ContainerStyle>
            <MainBoxStyle open={open}>
                <ContainerHeadStyle onClick={() => open ? closeHandler() : clickHandler(title)} open={open}>
                    <Title title={title} size={IconSize} />
                    {open ? <FaAngleUp size={IconSize} /> : <FaAngleDown size={IconSize} />}
                </ContainerHeadStyle>
                {data.title && data.logo ? (
                    <ContainerContentStyle onClick={() => detailClickHandler()}>
                        <LogoStyle src={data.logo} alt='' />
                        <TitleTextStyle>
                            {data.title}
                        </TitleTextStyle>
                    </ContainerContentStyle>
                ) : null}
            </MainBoxStyle>
        </ContainerStyle>
    )
}

export default React.memo(NavItem)
