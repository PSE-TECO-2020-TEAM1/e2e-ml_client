import { Link } from 'raviger';
import React from 'react';

export type RecordingConfigurationPageViewProps = {
    href: string,
    duration: number,
    countdown: number,
    onDuration: (n: number) => void,
    onCountdown: (n: number) => void,
} 

const RecordingConfigurationPageView = ({ href, countdown, duration, onDuration, onCountdown }: RecordingConfigurationPageViewProps) => <>
    <header>Configure Recording Parameters:</header>
    <ul>
        <li><em>Countdown: </em><input value={countdown} onChange={e => onCountdown(parseFloat(e.target.value))} type="number" min="0" ></input></li>
        <li><em>Duration: </em><input value={duration} onChange={e => onDuration(parseFloat(e.target.value))} type="number" min="0" ></input></li>
    </ul>
    <Link href={href} ><button>Record</button></Link>
</>;

export default RecordingConfigurationPageView;