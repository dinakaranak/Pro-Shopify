import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Typography, 
    Paper, 
    Grid, 
    Card, 
    CardContent, 
    CardMedia, 
    CardActions, 
    Button,
    IconButton
} from '@mui/material';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import Api from '../../Services/Api';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await Api.get('/wishlist', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setWishlist(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
                setLoading(false);
                if (error.response?.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchWishlist();
    }, [navigate]);

    const handleRemoveFromWishlist = async (productId) => {
        try {
            await Api.delete(`/wishlist/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setWishlist(prev => prev.filter(item => item._id !== productId));
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            await Api.post('/cart', { productId, quantity: 1 }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Optionally show a success message
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    if (loading) {
        return <div>Loading wishlist...</div>;
    }

    return (
        <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
            <Typography variant="h4" gutterBottom>My Wishlist</Typography>
            
            {wishlist.length === 0 ? (
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h6">Your wishlist is empty</Typography>
                    <Button 
                        variant="contained" 
                        sx={{ mt: 2 }}
                        onClick={() => navigate('/')}
                    >
                        Continue Shopping
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {wishlist.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{ objectFit: 'contain', p: 1 }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="h3">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description.substring(0, 100)}...
                                    </Typography>
                                    <Typography variant="h6" sx={{ mt: 1 }}>
                                        ₹{product.price.toFixed(2)}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'space-between' }}>
                                    <IconButton 
                                        color="error"
                                        onClick={() => handleRemoveFromWishlist(product._id)}
                                    >
                                        <FaHeart />
                                    </IconButton>
                                    <Button 
                                        size="small"
                                        startIcon={<MdOutlineShoppingCart />}
                                        onClick={() => handleAddToCart(product._id)}
                                    >
                                        Add to Cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default WishlistPage;