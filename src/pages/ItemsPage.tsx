import * as React from 'react';
import CustomizedTables from '../components/Table'
import { Button, Grid, ThemeProvider, styled } from '@mui/material';
import { GetAllItemsApi } from '../services/itemService';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/store';
import { selectItem } from '../redux/item/item.selectors'
import { ItemType } from '../types/types';
import { setItems } from '../redux/item/item.slice';
import { GetAllUsersApi } from '../services/userService';
import { UserDetailsType, UserType } from '../types/user.types';
import { setUsers } from '../redux/user/user.slice'
import { selectUser } from '../redux/user/user.selectors';
import SearchIcon from '@mui/icons-material/Search';
import SelectCategories from '../forms_and_inputes/SelectCategories';
import LocationSelect from '../forms_and_inputes/SelectLocation';
import AreaSelect from '../forms_and_inputes/SelectArea';
import { CacheProvider } from '@emotion/react';
import { cacheRtl, theme as rtlTheme } from '../styles/rtlTheme';
type TableProps = {
    type: string
}

export default function ItemsTable({ type }: TableProps) {
    const [category, setCategory] = React.useState('')
    const [location, setLocation] = React.useState('')
    const [area, setArea] = React.useState('')
    const items: ItemType[] = useAppSelector(selectItem).items;
    const users: UserDetailsType[] = useAppSelector(selectUser).users;
    const loosings = items.filter(los => los.status === 1)
    const findings = items.filter(fnd => fnd.status === 2)
    const [loosingsState, setLoosingsState] = React.useState<ItemType[]>([]);
    const [findingsState, setFindingsState] = React.useState<ItemType[]>([]);
    const dispatch = useDispatch();

    React.useEffect(() => {
        getAllItems();
        getAllUsers();
    }, []);

    React.useEffect(() => {
        const loosings = items.filter(los => los.status === 1);
        const findings = items.filter(fnd => fnd.status === 2);
        setLoosingsState(loosings);
        setFindingsState(findings);
    }, [items]);

    const getAllItems = async () => {
        try {
            const data: ItemType[] = await GetAllItemsApi();
            dispatch(setItems(data));
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    }
    const getAllUsers = async () => {
        try {
            const data: UserDetailsType[] = await GetAllUsersApi();
            dispatch(setUsers(data));
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setCategory(event.target.value);
            console.log(category)
        }
        catch (error) {
            console.log('setLocation error: ' + event)
        }
    };
    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debugger
        setLocation(event.target.value);
    };
    const handleAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArea(event.target.value);
    };
    const StyledDiv = styled('div')({
        borderRadius: 16,
        backgroundColor: '#f0f0f0',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginTop: '50px',
        minWidth: '700px'
    });
    const handleFilterClick = () => {
        const items = type === 'loosings' ? loosings : findings
        const afterFilter = items.filter(item => category !== '' && item.category === category || location !== '' && item.location === location || area !== '' && item.area === area);
        if (type === 'loosings')
            setLoosingsState(afterFilter)
        else
            setFindingsState(afterFilter)
    }
    return (
        <ThemeProvider theme={rtlTheme}>
            <CacheProvider value={cacheRtl}>
                <Grid container justifyContent="center" style={{ marginTop: '15px' }}>
                    <Grid item xs={12} sm={10} md={8}>
                        <StyledDiv style={{ marginBottom: '20px', width: '100%' }}>
                            <Grid container spacing={2} justifyContent="center" sm={12}>
                                <Grid item xs={12} sm={3}>
                                    <SelectCategories onChange={handleCategoryChange} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <LocationSelect onChange={handleLocationChange} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <AreaSelect onChange={handleAreaChange} />
                                </Grid>
                                <Grid item xs={12} sm={3} >
                                    <Button variant="contained" startIcon={<SearchIcon />} sx={{ marginTop: '8px', marginRight: '15px' }} onClick={handleFilterClick}>
                                        חיפוש
                                    </Button>
                                </Grid>
                            </Grid>
                        </StyledDiv>
                        <CustomizedTables allItems={type === 'loosings' ? loosingsState : findingsState} users={users} />
                    </Grid>
                </Grid>
            </CacheProvider>
        </ThemeProvider>


    );
}


