import React from 'react';
import { useRoutes, Link } from 'raviger';
import { Button } from 'evergreen-ui';

import FourOhFourPage from 'containers/404';

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
                <Link href="/w/yoooo/model/looo444/classify"><Button>yooo loooo</Button></Link>
                <Link href="/keky"><Button>kekkk</Button></Link>
            </div>
            {route || <FourOhFourPage />}
        </AuthProvider>
    );
};

export default App;
