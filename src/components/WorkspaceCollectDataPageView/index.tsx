import Loading from 'components/Loading';
import QRView from 'components/QRView';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import React from 'react';

export type WorkspaceCollectDataPageViewProps = {
    collectLinkPH: PromisePack<string>
}

const WorkspaceCollectDataPageView = ({ collectLinkPH } : WorkspaceCollectDataPageViewProps) =>
    <Promised promise={collectLinkPH} pending={<Loading/>}>{link =>
        <QRView
            desc="Scan the QR Code or use the link to start collecting data"
            href={link}
        />
    }</Promised>;

export default WorkspaceCollectDataPageView;