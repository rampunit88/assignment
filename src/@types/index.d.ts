/* 1st Screen */
type ContextData = {
    store:ProviderDetailItem;
    screen:number;
    setScreen:(data:any) => void;
    setStore:(data:any) => void;
}
/* 3rd Screen */
type ProviderDetailItem = {
    title:string;
    logo:string;
    description:string;
    name:string;
    email:string;
    url:string;
    swaggerUrl:string;
}
interface ProviderDetail{
    data:ProviderDetailItem;
}
title, logo, description, name