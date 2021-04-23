import { Heading, Label, Link, majorScale, Pane, Paragraph } from 'evergreen-ui';
import React from 'react';

export const AppleError = ({ error }: { error: Error }) => <Pane display="flex" flexDirection="column" gap={majorScale(2)} maxWidth={majorScale(120)}>
    <Heading size={400}>An error was encountered during sensor setup:</Heading>
    <Label>{error.message}</Label>
    <Paragraph>This is a common problem, caused by different device vendors and their implementation of the Sensors API. Currently, the application therefore doesn't work with Apple devices and the Firefox browser. For more information, see this issue: <Link href="https://github.com/PSE-TECO-2020-TEAM1/client/issues/5#issuecomment-817308653">#5</Link></Paragraph>
</Pane>;