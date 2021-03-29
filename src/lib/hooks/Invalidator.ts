import { DYNAMIC_UPDATE_INTERVAL } from 'config';
import { useEffect } from 'react';
import { useBoolean } from '.';

const useInvalidator = (interval: number = DYNAMIC_UPDATE_INTERVAL): [boolean, () => void] => {
    const [validity, , , flip] = useBoolean();

    useEffect(() => {
        const int = setInterval(flip, interval);
        return () => {
            clearInterval(int);
        };
    }, [flip]);

    return [validity, flip];
};
  
export default useInvalidator;