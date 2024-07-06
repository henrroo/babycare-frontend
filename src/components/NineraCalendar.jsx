import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../api';

const NineraCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [disponibles, setDisponibles] = useState([]);
    const [selectedNinera, setSelectedNinera] = useState(null);

    useEffect(() => {
        fetchNinerasDisponibles(date);
    }, [date]);

    const fetchNinerasDisponibles = async (selectedDate) => {
        const fechaHora = selectedDate.toISOString();
        const duracionHoras = 1; // Por ejemplo, 1 hora de duración

        try {
            const response = await api.get(`/nineras/disponibles/${ fechaHora }/${ duracionHoras }`);
            setDisponibles(response.data);
        } catch (error) {
            console.error("Error fetching available nannies:", error);
        }
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleNineraSelect = (ninera) => {
        setSelectedNinera(ninera);
    };

    const handleReserva = async () => {
        if (!selectedNinera) {
            alert('Por favor, selecciona una niñera.');
            return;
        }

        const solicitud = {
            cliente: 'Cliente Ejemplo',
            fechaHora: date.toISOString(),
            duracionHoras: 1,
            ninera: selectedNinera
        };

        try {
            await api.post('/solicitudes', solicitud);
            alert('Reserva creada exitosamente');
            fetchNinerasDisponibles(date); // Actualizar disponibilidad
        } catch (error) {
            console.error("Error creating reservation:", error);
        }
    };

    return (
        <div>
            <h2>Selecciona una Fecha y Hora</h2>
            <Calendar
                onChange={handleDateChange}
                value={date}
                showTimeSelect
            />
            <h3>Niñeras Disponibles</h3>
            <ul>
                {disponibles.map(ninera => (
                    <li
                        key={ninera.id}
                        onClick={() => handleNineraSelect(ninera)}
                        style={{ cursor: 'pointer', background: selectedNinera?.id === ninera.id ? 'lightgrey' : 'white' }}
                    >
                        {ninera.nombre}
                    </li>
                ))}
            </ul>
            <button onClick={handleReserva}>Reservar Niñera</button>
        </div>
    );
};

export default NineraCalendar;
