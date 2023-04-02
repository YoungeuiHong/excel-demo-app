import React from 'react';
import PropTypes from 'prop-types';
import {forwardRef} from 'react';
// @mui
import {Box} from '@mui/material';

// ----------------------------------------------------------------------

// @ts-ignore
const SvgColor = forwardRef(({src, sx, ...other}, ref) => (
    <Box
        component="span"
        className="svg-color"
        ref={ref}
        sx={{
            width: 24,
            height: 24,
            display: 'inline-block',
            bgcolor: 'currentColor',
            mask: `url(${src}) no-repeat center / contain`,
            WebkitMask: `url(${src}) no-repeat center / contain`,
            ...sx,
        }}
        {...other}
    />
));

SvgColor.propTypes = {
    //@ts-ignore
    src: PropTypes.string,
    sx: PropTypes.object,
};

export default SvgColor;