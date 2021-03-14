import { Heading, Pane, Text, Button, useTheme, majorScale } from 'evergreen-ui';
import { Link } from 'raviger';
import React, { Fragment } from 'react';
import { headerPadding } from 'styling';

type Crumb = { name: string, href: string } | string;

export type HeaderViewProps = {
    crumbs?: Crumb[]
    username?: string,
    logout?: () => void,
    login?: string,
    signup?: string
}

const HeaderView = ({ crumbs, username, logout, login, signup }: HeaderViewProps) => {
    const theme = useTheme();

    return <Pane display="flex" padding={headerPadding} background={theme.palette.blue.light} position="relative" marginBottom={majorScale(6)} >
        <Heading size={700} flex="1" alignItems="center" display="flex">
            <span>
                {crumbs ? crumbs.map((crumb, i) => 
                    <Fragment key={typeof crumb === 'string' ? crumb : crumb.name}>
                        {i !== 0 ? ' / ' : null}
                        {typeof crumb === 'string' ? crumb : <Link href={crumb.href}>{crumb.name}</Link>}
                    </Fragment>
                ): null}
            </span>
        </Heading>
        <Pane display="flex">
            <Text>{username || null}</Text>
            {logout ? <Button onClick={logout}>Log out</Button> : null}
            {login ? <Button><Link href={login}>Log in</Link></Button> : null}
            {signup ? <Button><Link href={signup}>Sign up</Link></Button> : null}
        </Pane>
    </Pane>;
};

export default HeaderView;