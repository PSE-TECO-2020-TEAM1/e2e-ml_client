import { Button, Heading, majorScale, Pane, TextInput } from 'evergreen-ui';
import { ETV } from 'lib/utils';
import { Link } from 'raviger';
import React from 'react';

export type RecordingConfigurationPageViewProps = {
    href: string,
    duration: number | '',
    countdown: number | '',
    onDuration: (n: number) => void,
    onCountdown: (n: number) => void,
} 

const RecordingConfigurationPageView = ({ href, countdown, duration, onDuration, onCountdown }: RecordingConfigurationPageViewProps) =>
    <Pane padding={majorScale(2)}>
        <Pane display="grid" gridTemplateColumns="auto auto" gap={majorScale(2)} alignItems="baseline">
            <Heading gridColumn="span 2" size={500} >Configure Recording Parameters:</Heading>
            <Heading size={400}>Countdown: </Heading>
            <TextInput value={countdown} onChange={(e: ETV<string>) => onCountdown(parseFloat(e.target.value))} type="number" min="0"></TextInput>
            <Heading size={400}>Duration: </Heading>
            <TextInput value={duration} onChange={(e: ETV<string>) => onDuration(parseFloat(e.target.value))} type="number" min="0" ></TextInput>
            <Pane gridColumn={2} display="flex" justifyContent="flex-end">
                <Button appearance="primary" href={href} is={Link}>Record</Button>
            </Pane>
        </Pane>
    </Pane>;

export default RecordingConfigurationPageView;