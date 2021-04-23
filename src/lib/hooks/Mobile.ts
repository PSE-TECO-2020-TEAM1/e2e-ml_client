import { useMedia } from 'react-media';

export const useMobile = () => !useMedia({ queries: { small: '(min-width:641px)' } }).small;