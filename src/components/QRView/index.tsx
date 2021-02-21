import React from 'react';
import QRCode from 'qrcode.react';
import Wrapper from 'components/Wrapper';
import styles from './index.module.scss';
const { main, qr, descst, link } = styles;

export type QRViewProps = {
    desc: string,
    href: string
}

const QRView = ({ desc, href } : QRViewProps) => <Wrapper className={main}>
    <span className={descst}>{desc}</span>
    <QRCode className={qr} value={href} size={400} />
    <div className={link}>
        <a href={href}>{href}</a>
        <button onClick={() => navigator.clipboard.writeText(href)}>copy to clipboard</button>
    </div>
</Wrapper>;

export default QRView;