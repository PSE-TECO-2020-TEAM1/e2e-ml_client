import { Promised, PromisePack } from 'lib/hooks/Promise';
import { Link } from 'raviger';
import React from 'react';

type Crumb = { name: string, href: string } | string;

export type HeaderViewProps = {
    crumbs?: Crumb[]
    goBack?: () => void,
    username?: string,
    logout?: () => void,
    login?: string,
    signup?: string
}

const HeaderView = ({ crumbs, goBack, username, logout, login, signup }: HeaderViewProps) => <header>
    <div>{goBack ? <button onClick={goBack}>back</button> : null}</div>
    <div>
        {crumbs ? crumbs.map((crumb, i) => <div key={typeof crumb === 'string' ? crumb : crumb.name}>
            {i !== 0 ? <div>/</div> : null}
            <div>{typeof crumb === 'string' ? crumb : <Link href={crumb.href}>{crumb.name}</Link>}</div>
        </div>) : null}
    </div>
    <div>{username || null}</div>
    <div>{logout ? <button onClick={logout}>logout</button> : null}</div>
    <div>{login ? <Link href={login}>login</Link> : null}</div>
    <div>{signup ? <Link href={signup}>signup</Link> : null}</div>
</header>;

export default HeaderView;