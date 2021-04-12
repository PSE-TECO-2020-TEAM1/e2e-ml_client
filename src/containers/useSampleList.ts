import { SampleListProps } from 'components/SampleList';
import { useAPI, useInvalidator, usePromise } from 'lib/hooks';
import { goldenAngleColor, string2NumberHash } from 'lib/utils';
import { useState } from 'react';
import { collectRoute, sampleRoute } from 'routes';

export enum Order {
    ASC,
    DESC,
    ORIG
}

const useSampleList = (workspaceId: string): SampleListProps => {
    const collectDataHref = collectRoute(workspaceId);
    const api = useAPI();

    const [validity, flip] = useInvalidator();
    const [order, setOrder] = useState(Order.ORIG);

    const samplesPH = usePromise(async () => {
        const items = (await api.getSamples(workspaceId))
            .map(({ id, label }) => {
                return ({
                    id,
                    href: sampleRoute(workspaceId, id),
                    label,
                    color: goldenAngleColor(string2NumberHash(label))
                });
            });

        switch (order) {
        case Order.ASC:
            return items.slice().sort((a, b) => a.label.localeCompare(b.label));
        case Order.DESC:
            return items.slice().sort((a, b) => b.label.localeCompare(a.label));
        case Order.ORIG:
        default:
            return items;
        }
    }, [workspaceId, validity, order]);

    const onSampleDelete = async (id: string) => {
        await api.deleteSample(workspaceId, id);
        flip();
    };

    return { collectDataHref, samplesPH, onSampleDelete, setOrder, order };
};

export default useSampleList;