import React from 'react';
import { Heading, Pane, TextInput, Button, majorScale } from 'evergreen-ui';
import { ETV } from 'lib/utils';

export type SignupPageViewProps = {
    user: string,
    email: string,
    pass: string,
    onUser: (s: string) => void,
    onPass: (s: string) => void,
    onEmail: (s: string) => void,
    onButton: () => void
};

const SignupPageView = ({ user, onUser, pass, onPass, email, onEmail, onButton }: SignupPageViewProps) =>
    <Pane display="flex" flexDirection="column" gap={majorScale(2)} alignItems="center">
        <Heading size={500} >Please enter the following information to sign up</Heading>
        <TextInput name="username" placeholder="Username" value={user} onChange={(e: ETV<string>) => onUser(e.target.value)} />
        <TextInput name="password" placeholder="Password" type="password" value={pass} onChange={(e: ETV<string>) => onPass(e.target.value)} />
        <TextInput name="email" placeholder="Email" value={email} onChange={(e: ETV<string>) => onEmail(e.target.value)} />
        <Button onClick={onButton}>Sign Up</Button>
    </Pane>;

export default SignupPageView;
