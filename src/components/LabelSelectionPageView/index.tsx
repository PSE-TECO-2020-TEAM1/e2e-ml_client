import { Promised, PromisePack } from 'lib/hooks/Promise';
import { Link } from 'raviger';
import React from 'react';

export type LabelSelectionPageViewProps = {
    labelsPH: PromisePack<{
        label: string,
        href: string
    }[]>
} 

const LabelSelectionPageView = ({ labelsPH }: LabelSelectionPageViewProps) => <>
    <header>Choose an action to record:</header>
    <nav>
        <Promised promise={labelsPH} pending={'loading...'}>{labels =>
            labels.map(({ label, href }) =>
                <Link href={href} key={label} ><button>{label}</button></Link>)
        }</Promised>
    </nav>
</>;

export default LabelSelectionPageView;