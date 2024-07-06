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

  return (
    <div className="app">
      <Container>
        <Typography variant="h4">BabyCare</Typography>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <TimeSelector
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
        />
        <Button variant="contained" color="primary" onClick={fetchNiñeras}>
          Buscar Niñeras Disponibles
        </Button>
        <NiñeraList disponibilidades={disponibilidades} onReserva={handleReserva} />
      </Container>
    </div>

  );
}

export default App;