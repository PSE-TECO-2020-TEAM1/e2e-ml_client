import React from 'react';
import QRCode from 'qrcode.react';
import { ClipboardIcon, Heading, IconButton, Link, majorScale, Pane, Tooltip } from 'evergreen-ui';
import { NestedHeading } from 'components/NestedHeading';

export type QRViewProps = {
    desc: string,
    href: string
}

const QRView = ({ desc, href } : QRViewProps) => <Pane display="grid" alignItems="start" justifyItems="center" gap={majorScale(2)}>
    <NestedHeading size={600}>{desc}</NestedHeading>
    <QRCode value={href} size={400} renderAs="svg" style={{ maxWidth: '100%' }} />
    <Pane display="flex" alignItems="center" gap={majorScale(2)}>
        <Link href={href} wordBreak="break-all">{href}</Link>
        <Tooltip
            content="copy to clipboard"
        >
            <IconButton icon={ClipboardIcon} onClick={() => navigator.clipboard.writeText(href)} />
        </Tooltip>
    </Pane>
</Pane>;

export default QRView;