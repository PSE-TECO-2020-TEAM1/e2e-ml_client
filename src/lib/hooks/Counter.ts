import { useCallback, useState } from 'react';

const useCounter = (initial: number = 1): [count: number, increment:() => void] => {
    const [value, setValue] = useState(initial);
    return [
        value,
        useCallback(() => setValue(v => v + 1), []),
    ];
};
  
export default useCounter;