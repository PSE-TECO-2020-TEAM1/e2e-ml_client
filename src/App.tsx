import React from 'react';
import { useRoutes } from 'raviger';

import FourOhFourPage from 'components/404';

import routing, { loginRoute } from 'routes';
import { AuthProvider } from 'lib/hooks/Auth';
import { HeaderProvider } from 'lib/hooks/Header';


const App = () => {
    const route = useRoutes(routing);

    return (
        <AuthProvider value={loginRoute} >
            <HeaderProvider>
                {route || <FourOhFourPage />}
            </HeaderProvider>
        </AuthProvider>
    );
};

export default App;
