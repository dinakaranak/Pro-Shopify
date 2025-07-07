import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
  Alert,
  Skeleton,
  Stack,
  IconButton,
  Badge
} from '@mui/material';
import {
  ArrowBack,
  LocalShipping,
  CheckCircle,
  ShoppingBag,
  Receipt,
  Chat,
  Download,
  Home,
  Phone,
  CalendarToday,
  Payment,
  Info,
  Rowing
} from '@mui/icons-material';
import Api from '../../Services/Api';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await Api.get(`/orders/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else if (err.response?.status === 404) {
          setError('Order not found.');
        } else {
          setError('Failed to load order details. Please try again.');
        }
      }
    };

    fetchOrderDetails();
  }, [id, navigate]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'shipped':
        return 'info';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') {
      return '$0.00';
    }
    return `$${amount.toFixed(2)}`;
  };

  const getFirstProductImage = (product) => {
    if (product?.images?.length > 0) {
      return product.images[0];
    }
    return null;
  };

  if (loading) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
        <Skeleton variant="rectangular" width={120} height={40} sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton variant="rectangular" height={150} sx={{ mt: 2, borderRadius: '8px' }} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
              <Skeleton variant="text" width="70%" height={40} />
              <Skeleton variant="rectangular" height={300} sx={{ mt: 2, borderRadius: '8px' }} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto', textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/orders')}
          variant="outlined"
        >
          Back to Orders
        </Button>
      </Box>
    );
  }

  if (!order) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto', textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No order details available.
        </Typography>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/orders')}
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Back to Orders
        </Button>
      </Box>
    );
  }

  return (
    <>
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/orders')}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Back to Orders
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Order Details
        </Typography>
        <Chip
          label={order.status || 'N/A'}
          color={getStatusColor(order.status)}
          size="medium"
          icon={order.status === 'delivered' ? <CheckCircle /> : <LocalShipping />}
          sx={{ 
            px: 2,
            py: 1,
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'capitalize'
          }}
        />
      </Box>
       <Stack direction="row" spacing={1} sx={{mb: 2, ml: 108}}>
        <Button 
          variant="contained" 
          fullWidth 
          startIcon={<Chat />}
          sx={{ textTransform: 'none' }}
        >
          Chat with us
        </Button>
        <Button 
          variant="outlined" 
          fullWidth 
          startIcon={<Download />}
          sx={{ textTransform: 'none' }}
        >
          Invoice
        </Button>
      </Stack>

    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
  {/* Left Column - Order Items */}
  <Box sx={{ flex: 2 }}>
    <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: '12px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
        <ShoppingBag sx={{ mr: 1, color: '#d10024' }} />
        Order Items
      </Typography>
      
      <List>
        {order.items.length > 0 ? (
          order.items.map((item, index) => {
            const firstImage = getFirstProductImage(item.productId);
            return (
              <React.Fragment key={item.productId?._id || index}>
                <ListItem sx={{ py: 2, px: 0 }}>
                  <ListItemAvatar>
                    <Badge
                      badgeContent={item.quantity || 0}
                      color="primary"
                      overlap="rectangular"
                      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                      <Avatar
                        variant="rounded"
                        src={firstImage}
                        sx={{ 
                          width: 80, 
                          height: 80,
                          mr: 2,
                          bgcolor: 'grey.100',
                          borderRadius: '8px'
                        }}
                      >
                        {!firstImage && <ShoppingBag />}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight={600}>
                        {item.productId?.name || 'Unknown Product'}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {item.productId?.description || 'No description available'}
                      </Typography>
                    }
                    sx={{ mr: 2 }}
                  />
                  <Typography variant="body1" fontWeight={600} color="#d10024">
                    ₹{item.productId?.discountPrice * item.quantity}
                  </Typography>
                </ListItem>
                {index < order.items.length - 1 && (
                  <Divider 
                    component="li" 
                    sx={{ 
                      mx: 0,
                      borderColor: 'divider',
                      borderBottomWidth: '1px'
                    }} 
                  />
                )}
              </React.Fragment>
            );
          })
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            No items found for this order.
          </Typography>
        )}
      </List>
    </Paper>

    {/* Delivery Updates Section */}
    <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: '12px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center' }}>
        <LocalShipping sx={{ mr: 1, color: '#d10024' }} />
        Delivery Updates
      </Typography>
      
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ 
            width: 24, 
            height: 24, 
            borderRadius: '50%', 
            bgcolor: 'success.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
            flexShrink: 0
          }}>
            <CheckCircle sx={{ color: 'white', fontSize: '16px' }} />
          </Box>
          <Box>
            <Typography variant="body1" fontWeight={500}>Order Confirmed</Typography>
             <Typography variant="body2" color="text.secondary">
            {new Date(order.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ 
            width: 24, 
            height: 24, 
            borderRadius: '50%', 
            bgcolor: 'success.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
            flexShrink: 0
          }}>
            <CheckCircle sx={{ color: 'white', fontSize: '16px' }} />
          </Box>
          <Box>
            <Typography variant="body1" fontWeight={500}>Delivered</Typography>
            <Typography variant="body2" color="text.secondary">Jun 01, 2023</Typography>
          </Box>
        </Box>
      </Stack>
      
      <Button 
        variant="text" 
        endIcon={<Info />}
        sx={{ mt: 2, color: 'primary.main' }}
      >
        See All Updates
      </Button>
    </Paper>
  </Box>

  {/* Right Column - Order Summary */}
  <Box sx={{ flex: 1 }}>
    <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: '12px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center' }}>
        <Receipt sx={{ mr: 1, color: '#d10024' }} />
        Order Summary
      </Typography>

      <Stack spacing={5} sx={{ mb: 3 }} direction='row' >
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>Order ID</Typography>
          <Typography variant="body1" fontWeight={500}>#{id.substring(18, 24).toUpperCase()}</Typography>
        </Box>
        
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>Order Date</Typography>
          <Typography variant="body1" fontWeight={500}>
            {new Date(order.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>Payment Method</Typography>
          <Typography variant="body1" fontWeight={500}>
            {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod || 'N/A'}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Price Details</Typography>
       {/* {order.items.length > 0 ? (
          order.items.map((item, index) => {
              return ( */}
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">List Price</Typography>
          <Typography variant="body2">{order.total}</Typography>
        </Box>
        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Selling Price</Typography>
          <Typography variant="body2">₹546</Typography>
        </Box> */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Handling Fee</Typography>
          <Typography variant="body2" color="success.main">Free</Typography>
        </Box>
        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Payment Handling Fee</Typography>
          <Typography variant="body2">₹5</Typography>
        </Box> */}
      </Stack>
              {/* );
       })
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            No items found for this order.
          </Typography>
        )} */}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body1" fontWeight={600}>Total Amount</Typography>
        <Typography variant="body1" fontWeight={600}>{order.total}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">Payment Status</Typography>
        <Chip 
          label="Paid" 
          size="small" 
          color="success" 
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
      </Box>
    </Paper>

    {/* Delivery Address Section */}
         {order.shippingAddress && ( 
  <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: '12px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)' }}>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
      <Home sx={{ mr: 1, color: 'primary.main' }} />
      Delivery Address
    </Typography>

    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" fontWeight={500}>{order.shippingAddress.fullName}</Typography>
      <Typography variant="body2" color="text.secondary">{order.shippingAddress.street}</Typography>
      <Typography variant="body2" color="text.secondary">
        {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
      </Typography>
      <Typography variant="body2" color="text.secondary">{order.shippingAddress.country}</Typography>
    </Box>

    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Phone sx={{ fontSize: '16px', color: 'text.secondary' }} />
      <Typography variant="body2">{order.shippingAddress.phone}</Typography>
      {order.shippingAddress.alternatePhone && ( 
        <Typography variant="body2">, {order.shippingAddress.alternatePhone}</Typography>
      )}
    </Stack>
  </Paper>
)}

  </Box>
</Box>
    </Box>
    </>
  );
};

export default OrderDetails;