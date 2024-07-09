// @ts-nocheck
import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, TextField } from '@mui/material';
import { useAppSelector } from '../redux/store';
import { selectRequest } from '../redux/request/request.selectors';
import { RequestType } from '../types/types';
import { selectAuth } from '../redux/auth/auth.selectors';
import { GetAllRequestsApi } from '../services/requestService';
import { useDispatch } from 'react-redux';
import { addRequest, setRequests } from '../redux/request/request.slice';
import formatDate from '../services/dateService'
import SelectCategories from '../forms_and_inputes/SelectCategories';
import axios from '../utils/axios';
import { PostApi } from '../services/requestService';
type formProps = {
    handleCloseForm: (event) => void,
}
const AddRequestForm = ({ handleCloseForm }: formProps) => {
    const user = useAppSelector(selectAuth).user
    const [category, setCategory] = React.useState('')
    const dispatch = useDispatch()
    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(event.target.value);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            let currentDate = new Date();
            currentDate.setMonth(currentDate.getMonth() + 1);
            let MoreOneMonth = currentDate.toISOString();
            const newRequest: RequestType = {
                id: 0,
                category: category,
                userId: user?.id,
                date: MoreOneMonth
            }
            console.log(JSON.stringify(newRequest))
            console.log(newRequest.date)
            debugger
            const request = await PostApi(newRequest)
            debugger
            console.log(JSON.stringify(request))
            dispatch(addRequest(request))
        }
        catch (e) {
            console.log("error add request:" + e)
        }
    }

    return (
        <Box sx={{ marginTop: '40px', padding: '10px', alignItems: 'center' }}>
            <form onSubmit={handleSubmit} style={{ alignItems: 'center' }}>
                <SelectCategories onChange={handleCategoryChange} />
                <Grid container spacing={3} sx={{ marginTop: '20px', alignItems: 'center' }}>
                    <Grid item md={6} sx={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Button size='medium' type="submit" variant="contained">שלח</Button>
                    </Grid>
                    <Grid item md={6} sx={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Button size='medium' type="button" variant="outlined" onClick={handleCloseForm}>ביטול</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>)
}

const BasicCard = ({ request }: { request: RequestType }) => {

    return (
        <Grid item xs={12}>
            <Card sx={{ width: '30%', marginRight: 'auto', marginLeft: 'auto' }}>
                <CardContent>
                    <Typography variant="h6" component="h2">
                        <strong>{`תאריך סופי לקבלת עדכונים: ${formatDate(request.date)}`}</strong>
                    </Typography>
                    <Typography color="textSecondary">
                        <strong>{`קטגוריה: ${request.category}`}</strong>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};
type RequestProps = {
    requests: RequestType[]
}
const RequestsList = ({ requests }: RequestProps) => {
    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            {requests.map((request, index) => (
                <BasicCard key={index} request={request} />
            ))}
        </Grid>
    );
};

const AllRequests = function () {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const dispatch = useDispatch()
    const requests: RequestType[] = useAppSelector(selectRequest).requests
    const [userRequests, setUserRequests] = React.useState<RequestType[]>([]);
    const user = useAppSelector(selectAuth).user;
    React.useEffect(() => {
        getAllRequests();
    }, [])

    React.useEffect(() => {
        const afterFilterRequests = requests.filter(request => {
            return request.userId === user?.id
        })
        setUserRequests(afterFilterRequests);
    }, [requests])

    const getAllRequests = async () => {
        try {
            const data: RequestType[] = await GetAllRequestsApi();
            dispatch(setRequests(data));
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    }
    const handleOpenForm = () => {
        setIsFormOpen(true)
    };
    const handleCloseForm = () => {
        setIsFormOpen(false)
    }
    return (
        <Box sx={{ height: '60vh', marginTop: '40px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'inherit' }}>
                <div style={{ textAlign: 'center' }}>
                    {userRequests.length > 0 && (
                        <>
                            <Typography variant="h4" align="center" gutterBottom>
                                רשימת הבקשות
                            </Typography>
                            <Typography variant="h6" align="center" gutterBottom>
                                {"לא מצאת עדיין את האבדה שלך? באפשרותך לבקש לקבל למייל עדכון מידי בעת הוספת אבדה/מציאה לקטגוריה שתבחר/י"}
                            </Typography>
                            <Typography variant="h6" align="center" gutterBottom>
                                {"העדכונים למייל יישלחו עד חודש מתאריך הוספת הבקשה"}
                            </Typography>
                            <RequestsList requests={userRequests} />
                        </>
                    )}
                    {userRequests.length === 0 && (
                        <h1>אין לך בקשות</h1>
                    )}
                    {!isFormOpen && (<Button variant="contained" color="primary" sx={{ marginTop: '30px' }} onClick={handleOpenForm}>
                        {"הוסף בקשה חדשה"}
                    </Button>)}

                </div>
            </Box>
            {isFormOpen && (
                <Box sx={{ height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ width: '20%', flexDirection: 'column', alignItems: 'center' }}>
                        <AddRequestForm handleCloseForm={handleCloseForm} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default AllRequests;
