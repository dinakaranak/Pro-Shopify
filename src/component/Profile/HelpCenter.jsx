import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Box, 
  TextField, 
  Button,
  Grid,
  Paper,
  Avatar,
  Divider,
  Chip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  ExpandMore, 
  Send, 
  Phone, 
  Email, 
  LiveHelp, 
  CheckCircle,
  ShoppingCart,
  Payment,
  LocalShipping,
  AssignmentReturn
} from '@mui/icons-material';

const HelpCenter = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      console.log('Contact form submitted:', contactForm);
      setSubmitSuccess(true);
      setContactForm({
        name: '',
        email: '',
        message: ''
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000);
  };

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'To place an order, simply browse our products, add items to your cart, and proceed to checkout. You\'ll need to provide shipping information and payment details to complete your purchase.',
      icon: <ShoppingCart color="error" />
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely.',
      icon: <Payment color="error" />
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order has shipped, you\'ll receive a tracking number via email. You can use this number on our website or the carrier\'s website to track your package.',
      icon: <LocalShipping color="error" />
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be unused and in their original packaging. Please contact our customer service to initiate a return.',
      icon: <AssignmentReturn color="error" />
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can reach our customer support team 24/7 through the contact form below, by email at support@example.com, or by phone at +1 (800) 123-4567.',
      icon: <LiveHelp color="error" />
    }
  ];

  const popularTopics = [
    { title: 'Order Status', icon: <LocalShipping /> },
    { title: 'Shipping Info', icon: <LocalShipping /> },
    { title: 'Returns & Exchanges', icon: <AssignmentReturn /> },
    { title: 'Payment Options', icon: <Payment /> }
  ];

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ 
          bgcolor: theme.palette.primary.main, 
          color: 'white', 
          p: 4, 
          borderRadius: 2,
          mb: 4,
          textAlign: 'center',
          backgroundImage: 'linear-gradient(135deg, #d10024 0%, #b10024 100%)'
        }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            How can we help you?
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            We're here to help with any questions or issues you might have.
          </Typography>
          <TextField
            placeholder="Search help articles..."
            variant="outlined"
            fullWidth
            sx={{ 
              maxWidth: '600px',
              mx: 'auto',
              bgcolor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1
              }
            }}
            InputProps={{
              startAdornment: (
                <Box sx={{ color: theme.palette.text.secondary, mr: 1 }}>
                  <LiveHelp />
                </Box>
              )
            }}
          />
        </Box>

        {/* Popular Topics */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
          Popular Topics
        </Typography>
        <Grid container spacing={2} sx={{ mb: 6 }}>
          {popularTopics.map((topic, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[6]
                  }
                }}
              >
                <Avatar sx={{ bgcolor: '#d10024', mb: 2 }}>
                  {topic.icon}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                  {topic.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* FAQ Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
            Frequently Asked Questions
          </Typography>
          
          {faqs.map((faq, index) => (
            <Accordion 
              key={index} 
              expanded={expanded === `panel${index}`} 
              onChange={handleAccordionChange(`panel${index}`)}
              sx={{ 
                mb: 1,
                '&:before': {
                  display: 'none'
                }
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMore />}
                sx={{
                  bgcolor: expanded === `panel${index}` ? theme.palette.action.selected : 'inherit',
                  '&:hover': {
                    bgcolor: theme.palette.action.hover
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  {faq.icon}
                </Box>
                <Typography sx={{ fontWeight: 'medium' }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Contact Form Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
            Contact Our Support Team
          </Typography>
          
          <Grid container spacing={10} sx={{ display: 'flex', flexDirection: 'row' }}>
  <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
    <Paper elevation={2} sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          flex: 1
        }}
      >
        <TextField
          required
          fullWidth
          label="Your Name"
          name="name"
          value={contactForm.name}
          onChange={handleContactChange}
          variant="outlined"
        />
        
        <TextField
          required
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={contactForm.email}
          onChange={handleContactChange}
          variant="outlined"
        />
        
        <TextField
          required
          fullWidth
          label="Your Message"
          name="message"
          value={contactForm.message}
          onChange={handleContactChange}
          multiline
          rows={4}
          variant="outlined"
        />
        
        <Box sx={{ mt: 'auto' }}>
          <Button
            type="submit"
            variant="contained"
            color="error"
            size="large"
            endIcon={<Send />}
            sx={{ 
              px: 4,
              mb: 2
            }}
          >
            Send Message
          </Button>

          {submitSuccess && (
            <Chip
              icon={<CheckCircle />}
              label="Message sent successfully!"
              color="success"
              variant="outlined"
            />
          )}
        </Box>
      </Box>
    </Paper>
  </Grid>
  
  <Grid item xs={12} md={6}  sx={{ display: 'flex' }}>
    <Paper elevation={2} sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
        Other Ways to Reach Us
      </Typography>
      
      <Box sx={{ mb: 4, flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Phone color="error" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1">Phone Support</Typography>
            <Typography variant="body1">+1 (800) 123-4567</Typography>
            <Typography variant="caption" color="text.secondary">
              Available 24/7
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Email color="error" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1">Email Us</Typography>
            <Typography variant="body1">support@example.com</Typography>
            <Typography variant="caption" color="text.secondary">
              Typically respond within 24 hours
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LiveHelp color="error" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1">Live Chat</Typography>
            <Typography variant="body1">Click the chat icon</Typography>
            <Typography variant="caption" color="text.secondary">
              Available Mon-Fri, 9am-5pm EST
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <Typography variant="body2" color="text.secondary">
        Our customer service team is committed to providing you with the best support experience.
      </Typography>
    </Paper>
  </Grid>
</Grid>
        </Box>

        {/* Helpful Resources */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
            Helpful Resources
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="outlined" color="error" size="large">
                Shipping Information
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="error" size="large">
                Return Policy
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="error" size="large">
                Size Guide
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="error" size="large">
                Product Care
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default HelpCenter;