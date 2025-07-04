import React, { useState } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box, TextField, Button } from '@mui/material';
import { ExpandMore, Send } from '@mui/icons-material';
import Header from '../Header';
import Footer from '../Footer';
import Navigation from '../Navigation';

const HelpCenter = () => {
  const [expanded, setExpanded] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

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
    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for your message! We will get back to you soon.');
    setContactForm({
      name: '',
      email: '',
      message: ''
    });
  };

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'To place an order, simply browse our products, add items to your cart, and proceed to checkout. You\'ll need to provide shipping information and payment details to complete your purchase.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order has shipped, you\'ll receive a tracking number via email. You can use this number on our website or the carrier\'s website to track your package.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be unused and in their original packaging. Please contact our customer service to initiate a return.'
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can reach our customer support team 24/7 through the contact form below, by email at support@example.com, or by phone at +1 (800) 123-4567.'
    }
  ];

  return (
    <>
      <Header />
      <Navigation />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
          Help Center
        </Typography>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
            Frequently Asked Questions
          </Typography>
          
          {faqs.map((faq, index) => (
            <Accordion 
              key={index} 
              expanded={expanded === `panel${index}`} 
              onChange={handleAccordionChange(`panel${index}`)}
              sx={{ mb: 1 }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ fontWeight: 'medium' }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
            Contact Us
          </Typography>
          
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: '600px',
              mx: 'auto'
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
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<Send />}
              sx={{ alignSelf: 'flex-start', px: 4 }}
            >
              Send Message
            </Button>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Need immediate assistance?
          </Typography>
          <Typography variant="body1" gutterBottom>
            Call us at <strong>+1 (800) 123-4567</strong>
          </Typography>
          <Typography variant="body1">
            Email us at <strong>support@example.com</strong>
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default HelpCenter;