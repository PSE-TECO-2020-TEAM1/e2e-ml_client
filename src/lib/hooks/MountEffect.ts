import { useEffect } from 'react';

// eslint-disable-next-line react-hooks/exhaustive-deps
const useMountEffect = (fn: React.EffectCallback) => useEffect(fn, []);
export default useMountEffect;
