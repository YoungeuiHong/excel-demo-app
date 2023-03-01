import {Helmet} from 'react-helmet-async';
// @mui
import {styled} from '@mui/material/styles';
import {
    Link,
    Container,
    Typography,
    Stack,
    Card,
    CardActionArea,
    CardMedia,
    CardContent
} from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({theme}) => ({
    width: '100%',
    maxWidth: 450,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({theme}) => ({
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function HomePage() {
    const mdUp = useResponsive('up', 'md');

    return (
        <>
            <Helmet>
                <title> Welcome </title>
            </Helmet>

            <StyledRoot>
                <Logo
                    sx={{
                        position: 'fixed',
                        top: {xs: 16, sm: 24, md: 40},
                        left: {xs: 16, sm: 24, md: 40},
                    }}
                />

                {mdUp && (
                    <StyledSection>
                        <Typography variant="h3" sx={{px: 5, mt: 10, mb: 5}}>
                            Export and Import Excel
                        </Typography>
                        <img src="/assets/illustrations/illustration_login.png" alt="login"/>
                    </StyledSection>
                )}

                <Container>
                    <StyledContent>
                        <Stack
                            direction={"row"}
                            spacing={3}
                        >
                            <Link
                                href={"/excel-export"}
                                underline={"none"}
                            >
                                <Card sx={{maxWidth: 500}}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image="/assets/images/excel/excel.svg"
                                            alt="excel-export"
                                            style={{padding: 80}}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Export
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Define Excel header, enter body data, and export the file
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                            <Link
                                href={"/excel-import"}
                                underline={"none"}
                            >
                                <Card sx={{maxWidth: 500}}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image="/assets/images/excel/excel.svg"
                                            alt="excel-export"
                                            style={{padding: 80}}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Import
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Convert Excel data to JSON or DTO.
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Stack>
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    )
        ;
}
