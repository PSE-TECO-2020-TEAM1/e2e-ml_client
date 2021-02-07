import React from 'react';

import WorkspacesListPageView from 'components/WorkspacesListPageView';
import LoginPageView from 'components/LoginPageView';
import SignupPageView from 'components/SignupPageView';

import useLoginPage from 'containers/useLoginPage';
import useWorkspacesListPage from 'containers/useWorkspacesListPage';
import WorkspacePageView from 'components/WorkspacePageView';
import useWorkspacePage from 'containers/useWorkspacePage';

type WithWorkspace = { workspaceId: string };
type WithModel = { modelId: string };
type WithSample = { sampleId: string };

const WorkspacesListPage = () => <WorkspacesListPageView {...useWorkspacesListPage()} />;
const LoginPage = () => <LoginPageView {...useLoginPage()} />;
const SignupPage = () => <SignupPageView />;
const WorkspacePage = ({ workspaceId }: WithWorkspace) => <WorkspacePageView {...useWorkspacePage(workspaceId)} />;
// const WorkspacesListPageView = React.lazy(() => import('./containers/WorkspacesListPageView'));
// const LoginPageView = React.lazy(() => import('./containers/LoginPageView'));
// const SignupPageView = React.lazy(() => import('./containers/SignupPageView'));

const routing = {
    '/': () => <WorkspacesListPage />,
    '/login': () => <LoginPage />,
    '/signup': () => <SignupPage />,
    '/w/:workspaceId': ({ workspaceId } : WithWorkspace) => <WorkspacePage workspaceId={workspaceId} />,
    '/w/:workspaceId/collect': ({ workspaceId } : WithWorkspace) => <div>/w/{workspaceId}/collect</div>,
    '/w/:workspaceId/labels': ({ workspaceId } : WithWorkspace) => <div>/w/{workspaceId}/labels</div>,
    '/w/:workspaceId/model': ({ workspaceId } : WithWorkspace) => <div>/w/{workspaceId}/model</div>,
    '/w/:workspaceId/model/:modelId': ({ workspaceId, modelId } : WithWorkspace & WithModel) => <div>/w/{workspaceId}/model/{modelId}</div>,
    '/w/:workspaceId/model/:modelId/classify': ({ workspaceId, modelId } : WithWorkspace & WithModel) => <div>/w/{workspaceId}/model/{modelId}/classify</div>,
    '/w/:workspaceId/sample/:sampleId': ({ workspaceId, sampleId } : WithWorkspace & WithSample) => <div>/w/{workspaceId}/sample/{sampleId}</div>
};
export default routing;

export const workspacesListRoute = '/';
export const rootRoute = workspacesListRoute;
export const loginRoute = '/login';
export const signupRoute = '/signup';
export const workspaceRoute = (workspaceId: string) => `/w/${workspaceId}`;
export const collectRoute = (workspaceId: string) => `/w/${workspaceId}/collect`;
export const modelsRoute = (workspaceId: string) => `/w/${workspaceId}/model`;
export const labelsRoute = (workspaceId: string) => `/w/${workspaceId}/label`;
