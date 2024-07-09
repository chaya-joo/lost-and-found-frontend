import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormControlLabel, RadioGroup, Radio, Typography, Checkbox } from '@mui/material'
import SelectCategories from './SelectCategories'
import AreaSelect from './SelectArea';
import { ItemType } from '../types/types';
import Grid from '@mui/material/Grid';
import LocationSelect from './SelectLocation';
import { useAppSelector } from '../redux/store';
import { selectAuth } from '../redux/auth/auth.selectors';
import { AddItem } from '../services/itemService';
import { useDispatch } from "react-redux";
import { addItem } from '../redux/item/item.slice';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

export default function AddItemForm() {
    const auth = useAppSelector(selectAuth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [itemName, setItemName] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [status, setStatus] = React.useState(0);
    const [location, setLocation] = React.useState('');
    const [area, setArea] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [isChecked, setIsChecked] = React.useState(false);

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    };

    const handleAreanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArea(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const newItem: ItemType = {
                id: 0,
                name: itemName,
                category: category,
                status: status,
                location: location,
                area: area,
                date: new Date(Date.now()).toISOString(),
                userId: auth.user?.id,
                description: description
            }
            console.log(newItem)
            const item: ItemType = await AddItem(newItem)
            debugger
            dispatch(addItem(item))
            debugger
            console.log(item)
            navigate('/home')
        }
        catch (error) {
            console.log("add-iten error:", error)
        }

    }

    return (
        <form onSubmit={handleSubmit} dir='rtl'>
            <Typography component="h2" variant="h5" sx={{ textAlign: 'center' }}>
                דיווח על אבדה/מציאה
            </Typography>
            <Grid container justifyContent="center" style={{ marginTop: '15px' }}>
                <TextField
                    label="שם"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    fullWidth
                    sx={{ marginTop: '20px' }}
                />
                <Grid item xs={12} marginTop={'15px'}>
                    <FormControl fullWidth>
                        <SelectCategories onChange={handleCategoryChange} />
                    </FormControl>
                </Grid>
                <FormControl fullWidth>
                    <RadioGroup
                        aria-label="סטטוס"
                        id="status"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(parseInt(e.target.value))}
                        sx={{ marginTop: '20px' }}
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={2}>
                                <FormControlLabel value={1} control={<Radio />} label="אבדה" />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel value={2} control={<Radio />} label="מציאה" />
                            </Grid>
                        </Grid>
                    </RadioGroup>
                </FormControl >
                <Grid container spacing={1} marginTop={"15px"}>
                    <Grid item xs={12}>
                        <LocationSelect onChange={handleLocationChange} />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "15px" }}>
                        <AreaSelect onChange={handleAreanChange} />
                    </Grid>
                </Grid>
                <TextField
                    label="תיאור"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ marginTop: '20px' }}
                />
                <Grid item xs={12}>
                    <FormControlLabel required control={<Checkbox />} onChange={(e) => { setIsChecked((e.target as HTMLInputElement).checked); }} label="אני מסכים לתנאי השימוש באתר" />
                </Grid>
                <Grid container justifyContent="flex-end" style={{ marginTop: '20px' }}>
                    <Button type="submit" variant="contained" startIcon={<SendIcon />} color="primary">שלח דיווח</Button>
                </Grid>
            </Grid>
        </form >

    );
}
