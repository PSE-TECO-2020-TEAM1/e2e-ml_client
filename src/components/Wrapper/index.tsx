import React from 'react';
import styles from './index.module.scss';
const { wrapper, small, medium, big } = styles;

const Size = {
    small,
    medium,
    big
} as const;

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: keyof typeof Size
}

const Wrapper = ({ children, size = 'big', className, ...rest }: WrapperProps) => {
    return <div className={`${className} ${wrapper} ${Size[size]}`} {...rest}>{children}</div>;
};

export default Wrapper;