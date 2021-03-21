import React from 'react';
import { Heading, TextInput, Button, majorScale, Pane } from 'evergreen-ui';
import { ETV } from 'lib/utils';

export type LoginPageViewProps = {
    user: string,
    onUser: (s: string) => void,
    pass: string,
    onPass: (s: string) => void,
    onButton: () => void,
};

const LoginPageView = ({ user, onUser, pass, onPass, onButton }: LoginPageViewProps) => 
    <form onSubmit={e => {e.preventDefault(); onButton();}}>
        <Pane display="flex" flexDirection="column" gap={majorScale(2)} alignItems="center">
            <Heading size={500} >Please enter your credentials</Heading>
            <TextInput name="username" placeholder="Username" value={user} onChange={(e: ETV<string>) => onUser(e.target.value)} />
            <TextInput name="password" placeholder="Password" type="password" value={pass} onChange={(e: ETV<string>) => onPass(e.target.value)} />
            <Button type="submit">Log In</Button>
        </Pane>
    </form>;

export default LoginPageView;
