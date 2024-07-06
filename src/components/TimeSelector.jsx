import { TextField } from '@mui/material';

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

export default TimeSelector;