import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ItemType } from '../types/types';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { UserDetailsType, UserType } from '../types/user.types';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import formatDate from '../services/dateService'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        width: '30%',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

type ItemAccordionProps = {
    item: ItemType,
    user: UserDetailsType | undefined
}


const ItemAccordion: React.FC<ItemAccordionProps> = ({ item, user }) => {
    const status = item.status === 1 ? 'אבדה' : 'מציאה';
    const userStatus = item.status === 1 ? 'מוצא' : 'מאבד'
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                פרטים נוספים
            </AccordionSummary>
            <AccordionDetails>
                <Typography sx={{ textAlign: 'start' }}>
                    <strong style={{ display: 'flex', alignItems: 'center' }}><ApartmentIcon style={{ height: '1em', marginLeft: '5px' }} />{`עיר/איזור ה${status}:`}</strong> {item.area}<br />
                    <strong style={{ display: 'flex', alignItems: 'center' }}><LocationOnOutlinedIcon style={{ height: '1em', marginLeft: '5px' }} />{`מקום ה${status}:`}</strong> {item.location}<br />
                    <strong style={{ display: 'flex', alignItems: 'center' }}><DescriptionIcon sx={{ height: '1em', marginLeft: '5px' }} />{`תיאור: `}</strong> {item.description}<br />
                    <strong style={{ display: 'flex', alignItems: 'center' }}><PhoneEnabledIcon style={{ height: '1em', marginLeft: '5px' }} />{`טלפון ${userStatus}:`}</strong> {user?.phone}<br />
                    <strong style={{ display: 'flex', alignItems: 'center' }}><AlternateEmailIcon style={{ height: '1em', marginLeft: '5px' }} />{`דוא"ל ${userStatus}:`}</strong> {user?.email}<br />
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};

type TableProps = {
    allItems: ItemType[],
    users: UserDetailsType[]
}
export default function CustomizedTables({ allItems: AllItems, users }: TableProps) {
    const getUserById = (id: number | undefined) => {
        const user = users.filter(user => user.id === id)[0]
        debugger
        return user
    }
    return (
        <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">שם</StyledTableCell>
                        <StyledTableCell align="right">קטגוריה</StyledTableCell>
                        <StyledTableCell align="right">עיר/אזור</StyledTableCell>
                        <StyledTableCell align="right">מקום</StyledTableCell>
                        <StyledTableCell align="right">סטטוס</StyledTableCell>
                        <StyledTableCell align="right">תאריך</StyledTableCell>
                        <StyledTableCell align="right">תיאור</StyledTableCell>
                        <StyledTableCell align="center">פרטים נוספים</StyledTableCell>
                    </TableRow>
                </TableHead>
                {AllItems.length === 0 && (
                    <TableBody>
                        <StyledTableRow>
                            <TableCell colSpan={8} align="center">
                                <Box sx={{ width: '900px', padding: '20px' }}>
                                    לא נמצאו פריטים.
                                </Box>
                            </TableCell>
                        </StyledTableRow>
                    </TableBody>
                )}
                {AllItems.length > 0 && (
                    <TableBody>
                        {AllItems.map((item) => (
                            <StyledTableRow key={item.name}>
                                <TableCell align="right">{item.name}</TableCell>
                                <TableCell align="right">{item.category}</TableCell>
                                <TableCell align="right">{item.area}</TableCell>
                                <TableCell align="right">{item.location}</TableCell>
                                <TableCell align="right">{item.status === 1 ? 'אבדה' : 'מציאה'}</TableCell>
                                <TableCell align="right">{formatDate(item.date)}</TableCell>
                                <TableCell align="right">{item.description}</TableCell>
                                <TableCell align="right">
                                    <ItemAccordion item={item} user={getUserById(item.userId)} />
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                )}
            </Table>
        </TableContainer>

    );
}

