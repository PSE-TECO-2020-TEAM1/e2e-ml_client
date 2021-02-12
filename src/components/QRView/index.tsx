import React from 'react';
import QRCode from 'qrcode.react';

export type QRViewProps = {
    desc: string,
    href: string
}

const QRView = ({ desc, href } : QRViewProps) => <>
    <span>{desc}</span>
    <QRCode value={href} />
    <a href={href}>{href}</a>
    <button onClick={() => navigator.clipboard.writeText(href)}>CPY</button>
</>;

export default QRView;