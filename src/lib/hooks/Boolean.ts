import { useCallback, useState } from 'react';

const useBoolean = (initial: boolean = false): [value: boolean, set:() => void, clear: () => void, toggle: () => void] => {
    const [value, setValue] = useState(initial);
    return [
        value,
        useCallback(() => setValue(true), []),
        useCallback(() => setValue(false), []),
        useCallback(() => setValue((value: boolean) => !value), [])
    ];
};
  
export default useBoolean;