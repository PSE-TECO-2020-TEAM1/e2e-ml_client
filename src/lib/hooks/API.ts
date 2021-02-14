import React, { useContext } from 'react';
import API from 'lib/API';

const APIContext = React.createContext<API | undefined>(undefined);
export const APIProvider = APIContext.Provider;

const useAPI = (): API => {
    const api = useContext(APIContext);
    if (api === undefined) throw new Error('useAPI called without an APIProvider');
    return api;
};

export default useAPI;