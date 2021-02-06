import React from 'react';
import { useRoutes, Link } from 'raviger';

import FourOhFourPage from 'containers/404';
import { Button } from '@material-ui/core';

import routing, { loginRoute } from 'routes';
import { AuthProvider } from 'lib/hooks/Auth';

const App = () => {
    const route = useRoutes(routing);

    return (
        <AuthProvider value={loginRoute} >
            <div>
                <Link href="/"><Button>workspaces</Button></Link>
                <Link href="/login"><Button>login</Button></Link>
                <Link href="/signup"><Button>signup</Button></Link>
                <Link href="/w/test/model/desd/classify"><Button>test test</Button></Link>
                <Link href="/ktest"><Button>testk</Button></Link>
            </div>
            {route || <FourOhFourPage />}
        </AuthProvider>
    );
};

export default App;
