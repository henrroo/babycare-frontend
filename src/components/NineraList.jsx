import { useState } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Button, Snackbar,ListItemAvatar, Avatar } from '@mui/material';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';

const NineraList = ({ disponibilidades, onReserva }) => {
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: '' });

    const handleReserva = async (idDisponibilidad) => {
        setLoading(true);
        try {
            await axios.post('/api/reservas', { idDisponibilidad });
            onReserva();
            setNotification({ open: true, message: 'Reserva exitosa' });
        } catch (error) {
            console.error('Error al reservar:', error);
            setNotification({ open: true, message: 'Error al realizar la reserva' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <List>
                {disponibilidades.map((disponibilidad) => (
                    <ListItem key={disponibilidad.id} className="ninera-list-item">
                        <ListItemAvatar className="ninera-avatar">
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${ disponibilidad.ninera.nombre } ${ disponibilidad.ninera.apellido }`}
                            secondary={`${ disponibilidad.fecha } ${ disponibilidad.horaInicio } - ${ disponibilidad.horaFin }`}
                        />  
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleReserva(disponibilidad.id)}
                            disabled={loading}
                        >
                            {loading ? 'Reservando...' : 'Reservar'}
                        </Button>
                    </ListItem>
                ))}
            </List>
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={() => setNotification({ ...notification, open: false })}
                message={notification.message}
            />
        </>
    );
};

NineraList.propTypes = {
    disponibilidades: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            fecha: PropTypes.string.isRequired,
            horaInicio: PropTypes.string.isRequired,
            horaFin: PropTypes.string.isRequired,
            ninera: PropTypes.shape({
                id: PropTypes.number.isRequired,
                nombre: PropTypes.string.isRequired,
                apellido: PropTypes.string.isRequired,
            }).isRequired,
        })
    ).isRequired,
    onReserva: PropTypes.func.isRequired
};

export default NineraList;