import React from 'react';

import WorkspacesListPageView from 'components/WorkspacesListPageView';
import LoginPageView from 'components/LoginPageView';
import SignupPageView from 'components/SignupPageView';

import useLoginPage from 'containers/useLoginPage';
import useSignupPage from 'containers/useSignupPage';
import useWorkspacesListPage from 'containers/useWorkspacesListPage';
import WorkspacePageView from 'components/WorkspacePageView';
import useWorkspacePage from 'containers/useWorkspacePage';
import WorkspaceCollectDataPageView from 'components/WorkspaceCollectDataPageView';
import useWorkspaceCollectDataPage from 'containers/useWorkspaceCollectDataPage';
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
import { BASE_URL } from 'config';
import PredictionPageView from 'components/PredictionPageView';
import usePredictionPage from 'containers/usePredictionPage';
import ModelOptions from 'components/ModelOptions';
import useModelOptions from 'containers/useModelOptions';

type QueryParams = { [k: string]: any; }

const WorkspacesListPage = () => <WorkspacesListPageView {...useWorkspacesListPage()} />;
const LoginPage = () => <LoginPageView {...useLoginPage()} />;
const SignupPage = () => <SignupPageView {...useSignupPage()} />;
const WorkspacePage = ({ workspaceId }: QueryParams) => <WorkspacePageView {...useWorkspacePage(workspaceId)} />;
const WorkspaceCollectDataPage = ({ workspaceId }: QueryParams) => <WorkspaceCollectDataPageView {...useWorkspaceCollectDataPage(workspaceId)} />;
const WorkspaceModelOptionsPage = ({ workspaceId }: QueryParams) => <ModelOptions {...useModelOptions(workspaceId)} />;
const WorkspaceModelDetailsPage = ({ workspaceId, modelId }: QueryParams) => <WorkspaceModelDetailsPageView {...useWorkspaceModelDetailsPage(workspaceId, modelId)} />;
const WorkspaceModelClassifyPage = ({ workspaceId, modelId }: QueryParams) => <WorkspaceModelClassifyPageView {...useWorkspaceModelClassifyPage(workspaceId, modelId)} />;
const WorkspaceSampleDetailsPage = ({ workspaceId, sampleId }: QueryParams) => <WorkspaceSampleDetailsPageView {...useWorkspaceSampleDetailsPage(workspaceId, sampleId)} />;

const LabelSelectionPage = ({ submissionId }: QueryParams) => <LabelSelectionPageView {...useLabelSelectionPage(submissionId)} />;
const RecordingConfigurationPage = ({ submissionId }: QueryParams) => <RecordingConfigurationPageView {...useRecordingConfigurationPage(submissionId)} />;
const RecordingPage = ({ submissionId }: QueryParams) => <RecordingPageView {...useRecordingPage(submissionId)} />;
const PredictionPage = ({ predictionId }: QueryParams) => <PredictionPageView {...usePredictionPage(predictionId)} />;

const routing = {
    '/dashboard': () => <WorkspacesListPage />,
    '/login': () => <LoginPage />,
    '/': () => <LoginPage />, // can put a real landing page on this route
    '/signup': () => <SignupPage />,
    '/w/:workspaceId': ({ workspaceId } : QueryParams) => <WorkspacePage workspaceId={workspaceId} />,
    '/w/:workspaceId/collect': ({ workspaceId } : QueryParams) => <WorkspaceCollectDataPage workspaceId={workspaceId} />,
    '/w/:workspaceId/create': ({ workspaceId } : QueryParams) => <WorkspaceModelOptionsPage workspaceId={workspaceId} />,
    '/w/:workspaceId/model/:modelId': ({ workspaceId, modelId } : QueryParams) => <WorkspaceModelDetailsPage workspaceId={workspaceId} modelId={modelId} />,
    '/w/:workspaceId/model/:modelId/classify': ({ workspaceId, modelId } : QueryParams) => <WorkspaceModelClassifyPage workspaceId={workspaceId} modelId={modelId} />,

    '/w/:workspaceId/sample/:sampleId': ({ workspaceId, sampleId } : QueryParams) =>  <WorkspaceSampleDetailsPage workspaceId={workspaceId} sampleId={sampleId} />,
    
    '/collect/:submissionId': ({ submissionId }: QueryParams) => <LabelSelectionPage submissionId={submissionId} />,
    '/collect/:submissionId/configure': ({ submissionId }: QueryParams) => <RecordingConfigurationPage submissionId={submissionId} />,
    '/collect/:submissionId/record': ({ submissionId }: QueryParams) => <RecordingPage submissionId={submissionId} />,
    '/classify/:predictionId': ({ predictionId }: QueryParams) => <PredictionPage predictionId={predictionId} />,
};
export default routing;

export const workspacesListRoute = '/dashboard';
export const rootRoute = '/';
export const loginRoute = '/login';
export const signupRoute = '/signup';
export const workspaceRoute = (workspaceId: string) => `/w/${workspaceId}`;
export const sampleRoute = (workspaceId: string, sampleId: string) => `/w/${workspaceId}/sample/${sampleId}`;
export const collectRoute = (workspaceId: string) => `/w/${workspaceId}/collect`;
export const modelDetailsRoute = (workspaceId: string, modelId: string) => `/w/${workspaceId}/model/${modelId}`;
export const classifyRoute = (workspaceId: string, modelId: string) => `/w/${workspaceId}/model/${modelId}/classify`;
export const modelOptions = (workspaceId: string) => `/w/${workspaceId}/create`;

export const createClassificationLink = (predictionId: string) => `${BASE_URL}/classify/${predictionId}`;
export const createCollectionLink = (submissionId: string) => `${BASE_URL}/collect/${submissionId}`;
export const labelQueryParam = 'label';
export const durationQueryParam = 'duration';
export const countdownQueryParam = 'countdown';

export const recordingConfigurationRoute = (submissionId: string, label: string) => `/collect/${submissionId}/configure?${labelQueryParam}=${label}`;
export const recordingRoute = (submissionId: string, label: string, countdown: number, duration: number) => 
    `/collect/${submissionId}/record?label=${label}&countdown=${countdown}&duration=${duration}`;
