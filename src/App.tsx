import React from 'react';
import { useRoutes } from 'raviger';

import FourOhFourPage from 'components/404';

import routing, { loginRoute } from 'routes';
import { AuthProvider } from 'lib/hooks/Auth';
import HeaderView from 'components/HeaderView';
import useHeaderView from 'containers/useHeaderView';
import { HeaderProvider, useHeaderDispatcher } from 'lib/hooks/Header';

const Header = () => <HeaderView {...useHeaderView()}/>;

const App = () => {
    const route = useRoutes(routing);

    return (
        <AuthProvider value={loginRoute} >
            <HeaderProvider value={useHeaderDispatcher()} >
                <Header />
                {route || <FourOhFourPage />}
            </HeaderProvider>
        </AuthProvider>
    );
};

export default App;
