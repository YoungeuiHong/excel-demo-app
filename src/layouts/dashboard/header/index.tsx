import React from 'react';
import PropTypes from 'prop-types';
// @mui
import {styled} from '@mui/material/styles';
import {Box, Stack, AppBar, Toolbar, IconButton} from '@mui/material';
// utils
import {bgBlur} from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

//@ts-ignore
const StyledRoot = styled(AppBar)(({theme}) => ({
    ...bgBlur({color: theme.palette.background.default}),
    boxShadow: 'none',
    [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    },
}));

const StyledToolbar = styled(Toolbar)(({theme}) => ({
    minHeight: HEADER_MOBILE,
    [theme.breakpoints.up('lg')]: {
        minHeight: HEADER_DESKTOP,
        padding: theme.spacing(0, 5),
    },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
    onOpenNav: PropTypes.func,
};

export default function Header({onOpenNav}) {
    return (
        <StyledRoot>
            <StyledToolbar>
                <Box sx={{flexGrow: 1}}/>
            </StyledToolbar>
        </StyledRoot>
    );
//@ts-ignore
}