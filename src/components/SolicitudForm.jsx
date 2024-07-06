import { useState } from 'react';
import api from '../api';

const SolicitudForm = () => {
    const [cliente, setCliente] = useState('');
    const [fechaHora, setFechaHora] = useState('');
    const [duracionHoras, setDuracionHoras] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const solicitud = { cliente, fechaHora, duracionHoras: parseInt(duracionHoras, 10) };
        try {
            await api.post('/solicitudes', solicitud);
            alert('Solicitud creada exitosamente');
        } catch (error) {
            console.error("Error creating solicitud:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Cliente:</label>
                <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} required />
            </div>
            <div>
                <label>Fecha y Hora:</label>
                <input type="datetime-local" value={fechaHora} onChange={(e) => setFechaHora(e.target.value)} required />
            </div>
            <div>
                <label>Duración (horas):</label>
                <input type="number" value={duracionHoras} onChange={(e) => setDuracionHoras(e.target.value)} required />
            </div>
            <button type="submit">Crear Solicitud</button>
        </form>
    );
};

export default SolicitudForm;