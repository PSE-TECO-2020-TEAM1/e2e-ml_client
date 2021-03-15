import React from 'react';
import { Promised, PromisePack } from 'lib/hooks/Promise';

import Loading from 'components/Loading';
import { Link } from 'raviger';
import WorkspaceCreation, { WorkspaceCreationProps } from 'components/WorkspaceCreation';
import { Pane, Dialog, Button, majorScale, Text } from 'evergreen-ui';
import { useBoolean } from 'lib/hooks';

export type WorkspaceListPageProps = {
    workspaceCreationProps: WorkspaceCreationProps,
    workspacesPH: PromisePack<{ text: string, href: string }[]>
}

const WorkspacesListPage = ({ workspacesPH, workspaceCreationProps }: WorkspaceListPageProps) => {
    const [isShown, setShown, clearShown] = useBoolean();
    return (
        <Pane display="flex" flexDirection="column" alignItems="center" position="relative" gap={majorScale(2)}>
            <Dialog
                isShown={isShown}
                title="Create a new workspace"
                onCloseComplete={clearShown}
                confirmLabel="Custom Label"
                hasFooter={false}
            >
                <WorkspaceCreation {...workspaceCreationProps} onClose={clearShown}/>
            </Dialog>
            <Promised promise={workspacesPH} pending={<Loading />} >{w =>
                w.length === 0
                    ? <Pane display="flex" justifyContent="center" alignItems="center" minHeight={majorScale(10)}>
                        <Text>No workspaces yet.</Text>
                    </Pane>
                    : <Pane display="grid" gap={majorScale(2)} gridTemplateColumns="1fr 1fr 1fr 1fr">
                        {w.map(({ text, href }) =>
                            <Button height={majorScale(7)} display="inline-block" minWidth={majorScale(20)} textAlign="center" appearance="minimal" is={Link} key={text} href={href}>{text}</Button>)}
                    </Pane>
            }</Promised>
            <Button marginTop={majorScale(2)} height={majorScale(7)} appearance="primary"
                onClick={setShown}
            >Create new workspace</Button>
        </Pane>
    );
};

export default WorkspacesListPage;
