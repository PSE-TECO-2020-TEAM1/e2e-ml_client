import React from 'react';

import WorkspacesListPageView from 'components/WorkspacesListPageView';
import LoginPageView from 'components/LoginPageView';
import SignupPageView from 'components/SignupPageView';

import useLoginPage from 'containers/useLoginPage';
import useWorkspacesListPage from 'containers/useWorkspacesListPage';

const WorkspacesListPage = () => <WorkspacesListPageView {...useWorkspacesListPage()} />;
const LoginPage = () => <LoginPageView {...useLoginPage()} />;
const SignupPage = () => <SignupPageView />;
// const WorkspacesListPageView = React.lazy(() => import('./containers/WorkspacesListPageView'));
// const LoginPageView = React.lazy(() => import('./containers/LoginPageView'));
// const SignupPageView = React.lazy(() => import('./containers/SignupPageView'));

const routing = {
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
export default routing;

export const workspacesListRoute = '/';
export const rootRoute = workspacesListRoute;
export const loginRoute = '/login';
export const signupRoute = '/signup';
export const workspaceRoute = (workspaceId: string) => `/w/${workspaceId}`;
