import React from 'react';

interface ILocationProps {
    id:string;
    title:string;
    subtitle:string;
    temperature?:number;
    description?:string;
    temp_min?:number;
    temp_max?:number;
    match?:boolean;
    matchIsVisible?:boolean;
    closeIsVisible?:boolean;
    content?:boolean;
    lat:string;
    lng:string;
}

interface ILocationContextValues {
    location: ILocationProps[],
    setLocation: React.Dispatch<React.SetStateAction<ILocationProps[]>>,
}

export { 
    ILocationContextValues, 
    ILocationProps
};

