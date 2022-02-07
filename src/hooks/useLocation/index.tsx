import React, { createContext, useContext, useState } from 'react';

import { ILocationContextValues, ILocationProps } from './index.d';

const LocationContext = createContext<ILocationContextValues>({} as ILocationContextValues);

const LocationProvider: React.FC = ({ children }) => {
    const [location, setLocation] = useState<ILocationProps[]>([]);

    return (
        <LocationContext.Provider
            value={{
                location,
                setLocation,
            }}
        >
            {children}
        </LocationContext.Provider>
    )
};

const useLocation = (): ILocationContextValues => useContext(LocationContext);

export { 
    LocationProvider,
    useLocation
};

export default LocationContext;