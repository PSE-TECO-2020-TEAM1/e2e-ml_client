import { navigate, usePath } from 'raviger';
import useAPI from './API';

const useAuth = (route: string) => {
    const api = useAPI();
    const path = usePath();
    if (api.isAuthenticated()) return;
    if (path.startsWith(route)) return;
    navigate(`${route}?ref=${path}`);
};

export default useAuth;