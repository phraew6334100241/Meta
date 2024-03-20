import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // เพิ่มตัวแปรสถานะการล๊อกอิน

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Perform authentication logic here, e.g., sending a request to your server
      // You can replace this with your actual authentication logic
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
       if (response.ok) {
        const data = await response.json();
        // Store the authentication token in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        localStorage.setItem('name', data.name);
        // Store the user's role in local storage
        localStorage.setItem('userRole', data.role);
         if (data.role === 'admin') {
          navigate('/AdminPage/index');
          alert('Login success as admin!');
        } if (data.role === 'member') {
          navigate('/');
          alert('Login success as member!');
        }
         if(!username||!password){
          alert('username or password failed!');
          }

          else if(!response.ok){
            alert('Login failed!');
          }
      }

  
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login.');
    }
  };

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (!token) {
      // If the user has a token, update the isLoggedIn state
      setIsLoggedIn(false);
    }
  }, []);

  // ถ้า isLoggedIn เป็นจริง (true), ให้ทำการนำทางไปยังหน้าหลักของผู้ใช้ที่ล๊อกอิน
  if (isLoggedIn) {
    navigate('/');
     // หรือหน้าที่คุณต้องการให้ผู้ใช้มาตรฐานหลังจากล๊อกอิน
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href="register" variant="body2">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Button variant="contained" sx={{ mt: 1, mb: 2 }} href="/">ย้อนกลับ</Button>
    </Container>
  );
}

export default Login;
