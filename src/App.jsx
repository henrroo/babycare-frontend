import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';
import Calendar from './components/Calendar';
import TimeSelector from './components/TimeSelector';
import NineraList from './components/NineraList';
import './App.css';

function App() {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [nineras, setNineras] = useState([]);

  useEffect(() => {
    setNineras([]);
    fetchNineras();
  }, [selectedDate, startTime, endTime]);

  const fetchNineras = async () => {
    try {
      const response = await axios.get('/api/disponibilidad', {
        params: {
          fecha: selectedDate.toISOString().split('T')[0],
          horaInicio: startTime,
          horaFin: endTime
        }
      });
      setNineras(response.data.map(d => d.ninera));
    } catch (error) {
      console.error('Error fetching niñeras:', error);
    }
  };

  return (
    <div className='app'>
      <Container>
        <Typography variant="h4">BabyCare</Typography>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <TimeSelector
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
        />
        <Button className='button' variant="contained" color="primary" onClick={fetchNineras}>
          Buscar Niñeras Disponibles
        </Button>
        <NineraList nineras={nineras} />
      </Container>
    </div>
  );
}

export default App;