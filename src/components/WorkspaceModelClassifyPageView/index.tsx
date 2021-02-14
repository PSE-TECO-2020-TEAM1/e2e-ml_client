import Loading from 'components/Loading';
import QRView from 'components/QRView';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import React from 'react';

export type WorkspaceModelClassifyPageViewProps = {
    classifyLinkPH: PromisePack<string>
}

const WorkspaceModelClassifyPageView = ({ classifyLinkPH } : WorkspaceModelClassifyPageViewProps) =>
    <Promised promise={classifyLinkPH} pending={<Loading/>}>{link =>
        <QRView
            desc="Scan the QR Code or use the link to start classifying actions"
            href={link}
        />
    }</Promised>;

export default WorkspaceModelClassifyPageView;