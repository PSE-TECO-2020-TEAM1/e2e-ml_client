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
import WorkspaceModelsPageView from 'components/WorkspaceModelsPageView';
import useWorkspaceModelsPage from 'containers/useWorkspaceModelsPage';
import WorkspaceModelDetailsPageView from 'components/WorkspaceModelDetailsPageView';
import useWorkspaceModelDetailsPage from 'containers/useWorkspaceModelDetailsPage';
import WorkspaceModelClassifyPageView from 'components/WorkspaceModelClassifyPageView';
import useWorkspaceModelClassifyPage from 'containers/useWorkspaceModelClassifyPage';
import LabelSelectionPageView from 'components/LabelSelectionPageView';
import useLabelSelectionPage from 'containers/useLabelSelectionPage';
import RecordingConfigurationPageView from 'components/RecordingConfigurationPageView';
import useRecordingConfigurationPage from 'containers/useRecordingConfigurationPage';
import RecordingPageView from 'components/RecordingPageView';
import useRecordingPage from 'containers/useRecordingPage';
import WorkspaceSampleDetailsPageView from 'components/WorkspaceSampleDetailsPageView';
import useWorkspaceSampleDetailsPage from 'containers/useWorkspaceSampleDetailsPage';

type QueryParams = { [k: string]: any; }

const WorkspacesListPage = () => <WorkspacesListPageView {...useWorkspacesListPage()} />;
const LoginPage = () => <LoginPageView {...useLoginPage()} />;
const SignupPage = () => <SignupPageView />;
const WorkspacePage = ({ workspaceId }: QueryParams) => <WorkspacePageView {...useWorkspacePage(workspaceId)} />;
const WorkspaceCollectDataPage = ({ workspaceId }: QueryParams) => <WorkspaceCollectDataPageView {...useWorkspaceCollectDataPage(workspaceId)} />;
const WorkspaceLabelsPage = ({ workspaceId }: QueryParams) => <WorkspaceLabelsPageView {...useWorkspaceLabelsPage(workspaceId)} />;
const WorkspaceModelsPage = ({ workspaceId }: QueryParams) => <WorkspaceModelsPageView {...useWorkspaceModelsPage(workspaceId)} />;
const WorkspaceModelDetailsPage = ({ workspaceId, modelId }: QueryParams) => <WorkspaceModelDetailsPageView {...useWorkspaceModelDetailsPage(workspaceId, modelId)} />;
const WorkspaceModelClassifyPage = ({ workspaceId, modelId }: QueryParams) => <WorkspaceModelClassifyPageView {...useWorkspaceModelClassifyPage(workspaceId, modelId)} />;
const WorkspaceSampleDetailsPage = ({ workspaceId, sampleId }: QueryParams) => <WorkspaceSampleDetailsPageView {...useWorkspaceSampleDetailsPage(workspaceId, sampleId)} />;

const LabelSelectionPage = ({ submissionId }: QueryParams) => <LabelSelectionPageView {...useLabelSelectionPage(submissionId)} />;
const RecordingConfigurationPage = ({ submissionId }: QueryParams) => <RecordingConfigurationPageView {...useRecordingConfigurationPage(submissionId)} />;
const RecordingPage = ({ submissionId }: QueryParams) => <RecordingPageView {...useRecordingPage(submissionId)} />;

const routing = {
    '/': () => <WorkspacesListPage />,
    '/login': () => <LoginPage />,
    '/signup': () => <SignupPage />,
    '/w/:workspaceId': ({ workspaceId } : QueryParams) => <WorkspacePage workspaceId={workspaceId} />,
    '/w/:workspaceId/collect': ({ workspaceId } : QueryParams) => <WorkspaceCollectDataPage workspaceId={workspaceId} />,
    '/w/:workspaceId/labels': ({ workspaceId } : QueryParams) => <WorkspaceLabelsPage workspaceId={workspaceId} />,
    '/w/:workspaceId/model': ({ workspaceId } : QueryParams) => <WorkspaceModelsPage workspaceId={workspaceId} />,
    '/w/:workspaceId/model/:modelId': ({ workspaceId, modelId } : QueryParams) => <WorkspaceModelDetailsPage workspaceId={workspaceId} modelId={modelId} />,
    '/w/:workspaceId/model/:modelId/classify': ({ workspaceId, modelId } : QueryParams) => <WorkspaceModelClassifyPage workspaceId={workspaceId} modelId={modelId} />,

    '/w/:workspaceId/sample/:sampleId': ({ workspaceId, sampleId } : QueryParams) =>  <WorkspaceSampleDetailsPage workspaceId={workspaceId} sampleId={sampleId} />,
    
    '/collect/:submissionId': ({ submissionId }: QueryParams) => <LabelSelectionPage submissionId={submissionId} />,
    '/collect/:submissionId/configure': ({ submissionId }: QueryParams) => <RecordingConfigurationPage submissionId={submissionId} />,
    '/collect/:submissionId/record': ({ submissionId }: QueryParams) => <RecordingPage submissionId={submissionId} />,
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
export const modelDetailsRoute = (workspaceId: string, modelId: string) => `/w/${workspaceId}/model/${modelId}`;
export const classifyRoute = (workspaceId: string, modelId: string) => `/w/${workspaceId}/model/${modelId}/classify`;

export const createCollectionLink = (submissionId: string) => `/collect/${submissionId}`;
export const createClassificationLink = (predictionId: string) => `/classify/${predictionId}`;

export const labelQueryParam = 'label';
export const durationQueryParam = 'duration';
export const countdownQueryParam = 'countdown';

export const recordingConfigurationRoute = (submissionId: string, label: string) => `/collect/${submissionId}/configure?${labelQueryParam}=${label}`;
export const recordingRoute = (submissionId: string, label: string, countdown: number, duration: number) => 
    `/collect/${submissionId}/record?label=${label}&countdown=${countdown}&duration=${duration}`;
