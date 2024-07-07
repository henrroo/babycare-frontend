import { useState } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Button, Snackbar, ListItemAvatar, Avatar, Typography } from '@mui/material';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';

const NineraList = ({ disponibilidades, onReserva }) => {
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: '' });
    const [hiddenAlert, setHiddenAlert] = useState(true);
    const [isFading, setIsFading] = useState(false);

    const handleCloseAlert = () => {
        setIsFading(true);
        setTimeout(() => {
            setHiddenAlert(true);
            setIsFading(false);
        }, 500);
    };

    const handleReserva = async (idDisponibilidad) => {
        console.log('Reservando:', idDisponibilidad);
        setLoading(true);
        try {
            await axios.post('/api/reservas', { idDisponibilidad });
            setHiddenAlert(false);
            onReserva();
        } catch (error) {
            console.error('Error al reservar:', error);
            setNotification({ open: true, message: 'Error al realizar la reserva' });
        } finally {
            setLoading(false);
        }
    };

    const handleSnackbarClose = () => {
        setNotification({ ...notification, open: false });
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
                            sx={{ backgroundColor: '#e05862', '&:hover': { backgroundColor: '#c04752' } }}
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
                onClose={handleSnackbarClose}
                message={notification.message}
            />
            {!hiddenAlert && (
                <div className={`screensaver ${ isFading ? 'fade-out' : '' }`}>
                    <div className="screensaver-content">
                        <Typography variant="h3" className="welcome-text">
                            Reserva exitosa!
                        </Typography>
                        <Button
                            variant="contained"
                            className="unlock-button"
                            onClick={handleCloseAlert}
                            sx={{ backgroundColor: '#e05862', '&:hover': { backgroundColor: '#c04752' } }}
                        >
                            Aceptar
                        </Button>
                    </div>
                </div>
            )}
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