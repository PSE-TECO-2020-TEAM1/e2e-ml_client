import React from 'react';
import { useRoutes, Link } from 'raviger';

import FourOhFourPage from 'components/404';

import routing, { loginRoute } from 'routes';
import { AuthProvider } from 'lib/hooks/Auth';

const App = () => {
    const route = useRoutes(routing);

    return (
        <AuthProvider value={loginRoute} >
            <div>
                <Link href="/"><button>/</button></Link>
                <Link href="/login"><button>login</button></Link>
                <Link href="/signup"><button>signup</button></Link>
                <Link href="/mobile"><button>mobile</button></Link>
            </div>
            {route || <FourOhFourPage />}
        </AuthProvider>
    );
};

export default App;
