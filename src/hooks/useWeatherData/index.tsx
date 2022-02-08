import React, { createContext, useContext, useState } from 'react';

import { IWeatherContextValues, IWeatherProps } from './index.d';

const WeatherDataContext = createContext<IWeatherContextValues>({} as IWeatherContextValues);

const WeatherDataProvider: React.FC = ({ children }) => {
    const [weatherData, setWeatherData] = useState<IWeatherProps[]>([]);

    return (
        <WeatherDataContext.Provider
            value={{
                weatherData,
                setWeatherData,
            }}
        >
            {children}
        </WeatherDataContext.Provider>
    )
};

const useWeatherData = (): IWeatherContextValues => useContext(WeatherDataContext);

export { 
    WeatherDataProvider,
    useWeatherData
};

export default WeatherDataContext;