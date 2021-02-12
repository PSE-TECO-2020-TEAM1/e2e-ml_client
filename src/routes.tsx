import React from 'react';

import WorkspacesListPageView from 'components/WorkspacesListPageView';
import LoginPageView from 'components/LoginPageView';
import SignupPageView from 'components/SignupPageView';

import useLoginPage from 'containers/useLoginPage';
import useWorkspacesListPage from 'containers/useWorkspacesListPage';
import WorkspacePageView from 'components/WorkspacePageView';
import useWorkspacePage from 'containers/useWorkspacePage';
import WorkspaceCollectDataPageView from 'components/WorkspaceCollectDataPageView';
import useWorkspaceCollectDataPage from 'containers/useWorkspaceCollectDataPage';
import WorkspaceLabelsPageView from 'components/WorkspaceLabelsPageView';
import useWorkspaceLabelsPage from 'containers/useWorkspaceLabelsPage';

type QueryParams = { [k: string]: any; }

const WorkspacesListPage = () => <WorkspacesListPageView {...useWorkspacesListPage()} />;
const LoginPage = () => <LoginPageView {...useLoginPage()} />;
const SignupPage = () => <SignupPageView />;
const WorkspacePage = ({ workspaceId }: QueryParams) => <WorkspacePageView {...useWorkspacePage(workspaceId)} />;
const WorkspaceCollectDataPage = ({ workspaceId }: QueryParams) => <WorkspaceCollectDataPageView {...useWorkspaceCollectDataPage(workspaceId)} />;
const WorkspaceLabelsPage = ({ workspaceId }: QueryParams) => <WorkspaceLabelsPageView {...useWorkspaceLabelsPage(workspaceId)} />;
// const WorkspacesListPageView = React.lazy(() => import('./containers/WorkspacesListPageView'));
// const LoginPageView = React.lazy(() => import('./containers/LoginPageView'));
// const SignupPageView = React.lazy(() => import('./containers/SignupPageView'));

const routing = {
    '/': () => <WorkspacesListPage />,
    '/login': () => <LoginPage />,
    '/signup': () => <SignupPage />,
    '/w/:workspaceId': ({ workspaceId } : QueryParams) => <WorkspacePage workspaceId={workspaceId} />,
    '/w/:workspaceId/collect': ({ workspaceId } : QueryParams) => <WorkspaceCollectDataPage workspaceId={workspaceId} />,
    '/w/:workspaceId/labels': ({ workspaceId } : QueryParams) => <WorkspaceLabelsPage workspaceId={workspaceId} />,
    
    '/w/:workspaceId/model': ({ workspaceId } : QueryParams) => <div>/w/{workspaceId}/model</div>,
    '/w/:workspaceId/model/:modelId': ({ workspaceId, modelId } : QueryParams) => <div>/w/{workspaceId}/model/{modelId}</div>,
    '/w/:workspaceId/model/:modelId/classify': ({ workspaceId, modelId } : QueryParams) => <div>/w/{workspaceId}/model/{modelId}/classify</div>,
    '/w/:workspaceId/sample/:sampleId': ({ workspaceId, sampleId } : QueryParams) => <div>/w/{workspaceId}/sample/{sampleId}</div>
};
export default routing;

export const workspacesListRoute = '/';
export const rootRoute = workspacesListRoute;
export const loginRoute = '/login';
export const signupRoute = '/signup';
export const workspaceRoute = (workspaceId: string) => `/w/${workspaceId}`;
export const sampleRoute = (workspaceId: string, sampleId: string) => `/w/${workspaceId}/sample/${sampleId}`;
export const collectRoute = (workspaceId: string) => `/w/${workspaceId}/collect`;
export const modelsRoute = (workspaceId: string) => `/w/${workspaceId}/model`;
export const labelsRoute = (workspaceId: string) => `/w/${workspaceId}/labels`;

export const createCollectionLink = (submissionId: string) => `/collect/${submissionId}`;
