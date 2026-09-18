import axios from 'axios';

const testAI = async () => {
  try {
    // 1. Log in to get token
    console.log('Logging in...');
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'alex@nuzio.ai',
      password: 'NuzioDev2026!'
    });
    const token = loginRes.data.data.token;
    console.log('Login successful. Token:', token.substring(0, 10) + '...');

    // 2. Request Briefing
    console.log('Requesting Briefing...');
    const briefRes = await axios.post(
      'http://localhost:5000/api/ai/briefing',
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('Briefing response:', briefRes.data.success ? 'SUCCESS' : 'FAIL');
    
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else {
      console.error('Request Error:', error.message);
    }
  }
};

testAI();
