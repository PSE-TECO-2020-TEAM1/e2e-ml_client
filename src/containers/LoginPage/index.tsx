import { TextInputField, Text } from 'evergreen-ui';
import React, { Fragment, useState } from 'react';

const LoginPage = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    return (
        <Fragment>
            <Text color="muted" size={300}>
        Please enter your credentials.
            </Text>
            <TextInputField
                label="Username"
        
            />
        </Fragment>
    );
};

export default LoginPage;
