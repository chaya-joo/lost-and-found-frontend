import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../redux/store';
import { selectAuth } from '../redux/auth/auth.selectors';
import { Avatar, IconButton, Grid, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EnhancedTableProps from '../components/PersonalTable';
import { DeleteApi, GetAllItemsApi } from '../services/itemService';
import { setItems } from '../redux/item/item.slice';
import { useDispatch } from 'react-redux';
import { ItemType } from '../types/types';
import { selectItem } from '../redux/item/item.selectors';



const OutlinedCard = () => {
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const items: ItemType[] = useAppSelector(selectItem).items;
  const [userItems, setUserItems] = React.useState<ItemType[]>([]);
  const user = useAppSelector(selectAuth).user;
  debugger
  const getAllItems = async () => {
    try {
      const data: ItemType[] = await GetAllItemsApi();
      dispatch(setItems(data));
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }
  useEffect(() => {
    getAllItems();
  }, [])

  useEffect(() => {
    const afterFilterItems = items.filter(item => {
      return item.userId === user?.id
    })

    debugger

    setUserItems(afterFilterItems);
  }, [items])

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setShowTable(!showTable);
  };

  const handleDeleteItems = (itemsIdToDelete: number[]) => {
    // const updatedItems = userItems.filter(item => !itemsToDelete.some(deletedItem => deletedItem.id === item.id));
    items.map(async (item) => {
      if (itemsIdToDelete.includes(item.id)) {
        await DeleteApi(item.id)
        return null;
      }
      return item;
    })
    const afterFilterItems = items.filter(item => item !== null)
    dispatch(setItems(afterFilterItems))
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <Grid container spacing={0} justifyContent="center">
        <Grid item md={showTable ? 4 : 6}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <Card variant="outlined" sx={{ width: '300px', height: '400px' }}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex'
                  }}
                >
                  <Grid container spacing={22} sx={{ width: '500px' }}>
                    <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 32, height: 32, textAlign: 'center', textTransform: 'capitalize' }}>
                        {user?.name.charAt(0)}
                      </Avatar>
                    </Grid>
                    <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                      <Tooltip title="לפריטים שלי">
                        <IconButton
                          aria-expanded={expanded}
                          aria-label="show more"
                          onClick={handleExpandClick}
                        >
                          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Box>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  פרטי משתמש
                </Typography>
                <Typography variant="h5" component="div">
                  {`שם: ${user?.name}`}
                </Typography>
                <Typography variant="body2">
                  {`דוא"ל: ${user?.email}`}
                </Typography>
                {
                  <Typography variant="body2" sx={{ marginTop: '10px' }}>
                    {`טלפון: ${user?.phone}`}
                  </Typography>
                }
              </CardContent>
              <CardActions>
                <Button size="large">עריכה</Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        {showTable && (
          <Grid item xs={12} md={6}
            sx={{
              // backgroundColor: 'bisque', 
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}>
            <EnhancedTableProps allItems={userItems} handleDeleteClick={handleDeleteItems} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default OutlinedCard;
