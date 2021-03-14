import React from 'react';
import QRCode from 'qrcode.react';
import { ClipboardIcon, Heading, IconButton, Link, majorScale, Pane, Tooltip } from 'evergreen-ui';

export type QRViewProps = {
    desc: string,
    href: string
}

const QRView = ({ desc, href } : QRViewProps) => <Pane display="flex" flexDirection="column" alignItems="center" gap={majorScale(2)}>
    <Heading size={600}>{desc}</Heading>
    <QRCode value={href} size={400} />
    <Pane display="flex" alignItems="center" gap={majorScale(2)}>
        <Link href={href}>{href}</Link>
        <Tooltip
            content="copy to clipboard"
        >
            <IconButton icon={ClipboardIcon} onClick={() => navigator.clipboard.writeText(href)} />
        </Tooltip>
    </Pane>
</Pane>;

export default QRView;