import Loading from 'components/Loading';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import { Link } from 'raviger';
import React, { useCallback } from 'react';

type DeleteButtonProps = {
    id: string,
    onSampleDelete: (id: string) => void | Promise<void>,
};

const DeleteButton = ({ id, onSampleDelete }: DeleteButtonProps) =>
    <button onClick={useCallback(() => onSampleDelete(id), [id, onSampleDelete])} >DEL</button>;

export type SampleListProps = {
    collectDataHref: string,
    onSampleDelete: (id: string) => void | Promise<void>,
    samplesPH: PromisePack<{
        id: string,
        href: string
    }[]>
};

const SampleList = ({ collectDataHref, onSampleDelete, samplesPH }: SampleListProps) => <>
    <Link href={collectDataHref}>Collect Data</Link>
    <ul>
        <Promised promise={samplesPH} pending={<Loading />}>{samples =>
            samples.map(({ id, href }, i) => <li key={id}>
                <Link href={href}>Sample {i}</Link>
                <DeleteButton id={id} onSampleDelete={onSampleDelete}/>
            </li>)
        }
        </Promised>
    </ul>
</>;

export default SampleList;