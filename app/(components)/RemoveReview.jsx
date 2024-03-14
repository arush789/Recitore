"use client"
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'


const RemoveReview = ({ recipeId, reviewId }) => {
    const router = useRouter()
    const [hoverRemove, setHoverRemove] = useState(false);
    const [hoverCancel, setHoverCancel] = useState(false);

    const deleteReview = async () => {
        try {
            const res = await fetch(`https://recitore.vercel.app/api/Reviews/${reviewId}/${recipeId}`, {
                method: "DELETE"
            });
            if (res.ok) {
                router.refresh();
            }
            handleClose();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e) => {
        e.stopPropagation()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
            >
                <div className='bg-nav rounded-3xl p-2'>
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure?"}
                    </DialogTitle>
                    <DialogContent >
                        <DialogContentText id="alert-dialog-description">
                            This action cant be undone
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions >
                        <div className='lg:flex justify-between w-full hidden'>
                            <Button
                                onClick={handleClose}
                                onMouseEnter={() => setHoverCancel(true)}
                                onMouseLeave={() => setHoverCancel(false)}
                                className={`font-bold`}
                            >
                                {hoverCancel ? <MoodIcon /> : 'Cancel'}
                            </Button>
                            <Button
                                onClick={deleteReview}
                                onMouseEnter={() => setHoverRemove(true)}
                                onMouseLeave={() => setHoverRemove(false)}
                                autoFocus
                                className={`font-bold text-red-600 ${hoverRemove ? 'text-red-800' : ''}`}
                            >
                                {hoverRemove ? <SentimentVeryDissatisfiedIcon /> : 'Remove'}
                            </Button>
                        </div>
                        <div className='flex justify-between w-full lg:hidden'>
                            <Button
                                className={`font-bold`}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={deleteReview}
                                autoFocus
                                className={`font-bold text-red-600 ${hoverRemove ? 'text-red-800' : ''}`}
                            >
                                Remove
                            </Button>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
            <Button className='rounded-lg bg-red-500 p-2 w-24 text-nav hover:bg-red-700' onClick={handleClickOpen}>Remove</Button>
        </div>
    )
}

export default RemoveReview;
