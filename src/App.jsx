import NineraCalendar from './components/NineraCalendar';
import NineraList from './components/NineraList';
import SolicitudForm from './components/SolicitudForm';

const App = () => {
  return (
    <div className="App">
      <NineraList />
      <SolicitudForm />
      <NineraCalendar />
    </div>
  );
};

export default App;