import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const TimeSelector = ({ startTime, endTime, setStartTime, setEndTime }) => {
    return (
        <div>
            <TextField
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                label="Hora de inicio"
            />
            <TextField
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                label="Hora de fin"
            />
        </div>
    );
};

TimeSelector.propTypes = {
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    setStartTime: PropTypes.func.isRequired,
    setEndTime: PropTypes.func.isRequired
};

export default TimeSelector;