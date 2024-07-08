import React, { useState } from 'react';
import { 
  Typography, 
  Button, 
  TextField, 
  InputAdornment, 
  Snackbar 
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

function LoginScreen({ handleUnlock, isFading }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      handleUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className={`screensaver ${isFading ? 'fade-out' : ''}`}>
      <div className="screensaver-content">
        <Typography variant="h3" className="welcome-text">
          Iniciar Sesión
        </Typography>
        <form className="login-form" onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="unlock-button"
            sx={{ 
              backgroundColor: '#e05862', 
              '&:hover': { backgroundColor: '#c04752' },
              marginTop: 2
            }}
          >
            Ingresar
          </Button>
        </form>
      </div>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
        message="Credenciales inválidas"
      />
    </div>
  );
}

export default LoginScreen;