import React from 'react';

interface IWeatherProps {
    id:string;
    title:string;
    subtitle:string;
    temperature?:number;
    description?:string;
    temp_min?:number;
    temp_max?:number;
    match?:boolean;
    matchIsVisible?:boolean;
    closeButtonIsVisible?:boolean;
    content?:boolean;
    lat:string;
    lng:string;
}

interface IWeatherContextValues {
    weatherData: IWeatherProps[],
    setWeatherData: React.Dispatch<React.SetStateAction<IWeatherProps[]>>,
}

export { 
    IWeatherContextValues, 
    IWeatherProps
};

