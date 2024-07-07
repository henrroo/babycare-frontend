import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';

const Calendar = ({ selectedDate, setSelectedDate }) => {
    return (<
        DatePicker selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        inline
        monthsShown={1}
        fixedHeight
        />
    );
};

Calendar.propTypes = {
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    setSelectedDate: PropTypes.func.isRequired
};

export default Calendar;