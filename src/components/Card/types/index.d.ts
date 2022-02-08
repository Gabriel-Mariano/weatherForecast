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
    matchIsVisible?:boolean;
    closeButtonIsVisible?:boolean;
    content?:boolean;
    lat:string;
    lng:string;
}

export { ICardProps };