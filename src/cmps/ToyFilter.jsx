import { debounce } from "../services/util.service.js"
import { toyService} from "../services/toy.service.js";
import { useState, useRef, useEffect } from 'react';
import { TextField, Slider, Typography, Box, Select, MenuItem } from '@mui/material';

export function ToyFilter({ filterBy, onSetFilterBy, labels }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
    onSetFilterBy = useRef(debounce(onSetFilterBy)).current;

    useEffect(() => {
        onSetFilterBy(filterByToEdit);
    }, [filterByToEdit]);

    function handleChange(event, newValue) {
        const { name, type } = event.target;
        console.log(event.target);
        if (type === "text") {
            setFilterByToEdit(prev => ({
                ...prev,
                [name]: event.target.value
            }));
        }
        switch (name) {
            case "labels":
            setFilterByToEdit(prev => ({
                ...prev,
                labels: event.target.value
            }));
            break;

            case "priceRange":
            setFilterByToEdit(prev => ({
                ...prev,
                minPrice: newValue[0],
                maxPrice: newValue[1]
            }));

            default:
            break;
        }
    }

    return (
        <section className="toy-filter">
            <h2>Toys Filter</h2>
            <div className="filter-actions">
                <Box width={200}>
                    <Typography gutterBottom>
                        Name:
                    </Typography>
                    <TextField
                        className="filter-input"
                        name="name"
                        value={filterByToEdit.name}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                    />
                </Box>
                <Box width={200}>
                    <Typography gutterBottom>
                        Max price:
                    </Typography>
                    <Slider
                        name="priceRange"
                        value={[filterByToEdit.minPrice || 0, filterByToEdit.maxPrice || 1000]}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={1000}
                    />
                </Box>

                <Box width={200}>
                    <Typography gutterBottom>
                        Tags:
                    </Typography>
                    <Select sx={{width:200}}
                        multiple
                        name="labels"
                        value={filterByToEdit.labels || []}
                        onChange={handleChange}

                    >
                        {labels.map((label) => (
                            <MenuItem key={label} value={label}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
        </div>
        </section >
    )
}

