import { Heading, Pane, majorScale, Button } from 'evergreen-ui';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import { Link } from 'raviger';
import React from 'react';

export type LabelSelectionPageViewProps = {
    labelsPH: PromisePack<{
        label: string,
        href: string
    }[]>
} 

const LabelSelectionPageView = ({ labelsPH }: LabelSelectionPageViewProps) => 
    // flex gap doesn't work on mobile browsers yet... see caniuse.com, therefore marginTop
    <Pane display="flex" flexDirection="column" alignItems="center" padding={majorScale(2)}>
        <Heading size={500} marginBottom={majorScale(2)}>Choose an action to record:</Heading>
        <Pane display="grid" gap={majorScale(2)} gridTemplateColumns="repeat(2, minmax(0, 1fr))">
            <Promised promise={labelsPH} pending={'loading...'}>{labels =>
                labels.map(({ label, href }) =>
                    <Button is={Link} href={href} key={label} >{label}</Button>)
            }</Promised>
        </Pane>
    </Pane>;

export default LabelSelectionPageView;