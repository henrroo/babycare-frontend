import { useState, useEffect } from 'react';
import api from '../api';

const NineraList = () => {
    const [nineras, setNineras] = useState([]);

    useEffect(() => {
        const fetchNineras = async () => {
            try {
                const response = await api.get('/nineras');
                setNineras(response.data);
            } catch (error) {
                console.error("Error fetching nineras:", error);
            }
        };
        fetchNineras();
    }, []);

    return (
        <div>
            <h1>Lista de Niñeras</h1>
            <ul>
                {nineras.map(ninera => (
                    <li key={ninera.id}>
                        {ninera.nombre} - Disponible: {ninera.disponible ? 'Sí' : 'No'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NineraList;
