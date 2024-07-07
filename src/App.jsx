import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';
import Calendar from './components/Calendar';
import TimeSelector from './components/TimeSelector';
import NiñeraList from './components/NineraList';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [disponibilidades, setNiñeras] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const fetchNiñeras = async () => {
    try {
      const response = await axios.get('/api/disponibilidad', {
        params: {
          fecha: selectedDate.toISOString().split('T')[0],
          horaInicio: startTime,
          horaFin: endTime
        }
      });
      setNiñeras(response.data);
    } catch (error) {
      console.error('Error fetching niñeras:', error);
    }
  };

  useEffect(() => {
    fetchNiñeras();
  }, [selectedDate, startTime, endTime]);

  const handleReserva = () => {
    fetchNiñeras();
  };
  const handleUnlock = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsUnlocked(true);
    }, 500); // Este tiempo debe coincidir con la duración de la transición en CSS
  };


  return (
    <div className='app'>
      {!isUnlocked && (
        <div className={`screensaver ${ isFading ? 'fade-out' : '' }`}>
          <div className="screensaver-content">
            <Typography variant="h3" className="welcome-text">
              Bienvenido a BabyCare
            </Typography>
            <Button
              variant="contained"
              className="unlock-button"
              onClick={handleUnlock}
              sx={{ backgroundColor: '#e05862', '&:hover': { backgroundColor: '#c04752' } }}
            >
              Ingresar
            </Button>
          </div>
        </div>
      )}
      <div className="content" style={{ filter: isUnlocked ? 'none' : 'blur(5px)' }}>
        <Container>
          <div className="logo-container">
            <img src="src\babycare-imagepng.png" alt="BabyCare Logo" className="logo-image" />
          </div>
          <div className="calendar-container">
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>
          <TimeSelector
            startTime={startTime}
            endTime={endTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
          />
          <Button className='search-button' variant="contained" color="primary" onClick={fetchNiñeras} sx={{ backgroundColor: '#e05862', '&:hover': { backgroundColor: '#c04752', }, }}>
            Buscar Niñeras Disponibles
          </Button>
          <div className="ninera-list">
            <NiñeraList disponibilidades={disponibilidades} onReserva={handleReserva} />
          </div>
        </Container>
      </div>
    </div>

  );
}

export default App;