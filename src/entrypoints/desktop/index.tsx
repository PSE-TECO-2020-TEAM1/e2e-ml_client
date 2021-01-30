import React from 'react';
import { useRoutes, Link } from 'raviger';
import { Button } from 'evergreen-ui';

import WorkspacesListPage from 'containers/WorkspacesListPage';
import LoginPage from 'containers/LoginPage';
import SignupPage from 'containers/SignupPage';
import FourOhFourPage from 'containers/404';

import useAuth from 'lib/hooks/Auth';

const routes = {
    '/': () => <WorkspacesListPage />,
    '/login': () => <LoginPage />,
    '/signup': () => <SignupPage />,
    '/w/:workspaceId': ({ workspaceId } : { [k: string]: string }) => <div>/w/{workspaceId}</div>,
    '/w/:workspaceId/collect': ({ workspaceId } : { [k: string]: string }) => <div>/w/{workspaceId}/collect</div>,
    '/w/:workspaceId/labels': ({ workspaceId } : { [k: string]: string }) => <div>/w/{workspaceId}/labels</div>,
    '/w/:workspaceId/model': ({ workspaceId } : { [k: string]: string }) => <div>/w/{workspaceId}/model</div>,
    '/w/:workspaceId/model/:modelId': ({ workspaceId, modelId } : { [k: string]: string }) => <div>/w/{workspaceId}/model/{modelId}</div>,
    '/w/:workspaceId/model/:modelId/classify': ({ workspaceId, modelId } : { [k: string]: string }) => <div>/w/{workspaceId}/model/{modelId}/classify</div>,
    '/w/:workspaceId/sample/:sampleId': ({ workspaceId, sampleId } : { [k: string]: string }) => <div>/w/{workspaceId}/sample/{sampleId}</div>
};

const App = () => {
    const route = useRoutes(routes);
    useAuth('/login');
  
    return (
        <div>
            <div>
                <Link href="/"><Button>workspaces</Button></Link>
                <Link href="/login"><Button>login</Button></Link>
                <Link href="/signup"><Button>signup</Button></Link>
                <Link href="/w/yoooo/model/looo444/classify"><Button>yooo loooo</Button></Link>
                <Link href="/keky"><Button>kekkk</Button></Link>
            </div>
            {route || <FourOhFourPage />}
        </div>
    );
};

export default App;
