import React from "react";

interface ICardProps {
    id:string;
    title:string;
    subtitle:string;
    temperature?:number;
    description?:string;
    media?:number;
    temp_min?:number;
    temp_max?:number;
    match?:boolean;
    content?:boolean;
    lat:string;
    lng:string;
    location:[],
    setLocation:React.Dispatch<React.SetStateAction<ICardProps[]>>;
}

export { ICardProps };