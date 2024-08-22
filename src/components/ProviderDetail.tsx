import React, { useContext } from 'react'
import styled from 'styled-components'
import Title from './Title';
import style from './style.module.css';
import Button from './Button';
import { DataContext } from '../App';

const ContainerStyle = styled.div`
    width: 60%;
    height: 95vh;
    margin: 46px 0px;
`;
const HeaderStyle = styled.div`
 display:flex;
 justify-content:flex-start;;
 align-items:center;
 margin: 10px 100px ;
 gap:10px;
`

const SectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: start;
`
const IconSize = 18;
function ProviderDetail(props: ProviderDetail) {
  const { title, logo, description, name, email, url, swaggerUrl } = props.data;
  const {setStore, setScreen} = useContext<ContextData>(DataContext);
  return (
    <ContainerStyle>
      <HeaderStyle>
        <img src={logo} alt='' className={style.logo} />
        <Title title={title} size={IconSize} />
      </HeaderStyle>
      <SectionStyle className={style.section}>
        <div className={style.sectionDes}>
          <h3 className={style.sectionTitle}>Description</h3>
          {description}
        </div>
      </SectionStyle>
      <SectionStyle className={style.section}>
        <div className={style.sectionDes}>
            <h3 className={style.sectionTitle}>Swagger</h3>
            {swaggerUrl}
        </div>
      </SectionStyle>
      <SectionStyle className={style.section}>
        <div className={style.sectionDes}>
          <h3 className={style.sectionTitle}>Contact</h3>
          <div className={style.contact}>
            <div className={style.contactItem}>
              <label htmlFor="email" className={style.contactlabel}>Email</label> {email}
            </div>
            <div className={style.contactItem}>
              <label htmlFor="name"  className={style.contactlabel}>Name</label> {name}
            </div>
            <div className={style.contactItem}>
              <label htmlFor="url" className={style.contactlabel}>Url</label> {url}
            </div>
          </div>
        </div>
      </SectionStyle>
      <div>
        <Button title='Explore more APIs' onClick={() => {
          setStore({});
          setScreen(1);
        }}/>
      </div>
    </ContainerStyle>
  )
}

export default ProviderDetail
