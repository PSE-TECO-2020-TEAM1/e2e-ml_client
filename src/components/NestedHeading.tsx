import React from 'react';
import { majorScale, Heading, HeadingProps } from 'evergreen-ui';
import { useMobile } from 'lib/hooks/Mobile';

export const NestedHeading = (props: HeadingProps) => {
    return <Heading {...props} {...(useMobile() ? { marginLeft: majorScale(2) } : {})} />;
};
