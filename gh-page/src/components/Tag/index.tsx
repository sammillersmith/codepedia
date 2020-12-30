import { Box } from '@codecademy/gamut';
import React from 'react';

export type TagProps = {
    subtle?: boolean;
};

export const Tag: React.FC<TagProps> = ({ children, subtle }) => {
    return (
        <Box
            borderColor='navy'
            borderWidth='1px'
            borderStyle='solid'
            backgroundColor={subtle ? 'paleYellow' : 'yellow'}
            padding={4}
            marginX={4}
        >
            {children}
        </Box>
    );
};
