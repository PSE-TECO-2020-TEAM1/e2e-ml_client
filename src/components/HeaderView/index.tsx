import { Link } from 'raviger';
import React from 'react';
import styles from './index.module.scss';
const { container, bread, usernameC, signupC, loginC, seperator, float } = styles;

type Crumb = { name: string, href: string } | string;

export type HeaderViewProps = {
    crumbs?: Crumb[]
    username?: string,
    logout?: () => void,
    login?: string,
    signup?: string
}

const HeaderView = ({ crumbs, username, logout, login, signup }: HeaderViewProps) => <header className={container}>
    <div className={bread}>
        {crumbs ? crumbs.map((crumb, i) => <div key={typeof crumb === 'string' ? crumb : crumb.name}>
            {i !== 0 ? <span className={seperator}>/</span> : null}
            <span>{typeof crumb === 'string' ? crumb : <Link href={crumb.href}>{crumb.name}</Link>}</span>
        </div>) : null}
    </div>
    <div className={float}/>
    <div className={usernameC}>{username || null}</div>
    <div>{logout ? <button onClick={logout}>Log out</button> : null}</div>
    <div className={loginC}>{login ? <Link href={login}>Log in</Link> : null}</div>
    <div className={signupC}>{signup ? <Link href={signup}>Sign up</Link> : null}</div>
</header>;

export default HeaderView;