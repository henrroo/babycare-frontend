import { List, ListItem, ListItemText } from "@mui/material";
import PropTypes from "prop-types";

const NineraList = ({ nineras }) => {
    return (
        <List>
            {nineras.map((ninera) => (
                <ListItem key={ninera.id}>
                    <ListItemText
                        primary={`${ ninera.nombre } ${ ninera.apellido }`}
                        secondary={ninera.email}
                    />
                </ListItem>
            ))}
        </List>
    );
};

NineraList.propTypes = {
    nineras: PropTypes.array.isRequired
};

export default NineraList;