import { debounce } from "../services/util.service.js"
import { useState, useRef, useEffect } from 'react';

export function ToyFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

    onSetFilterBy = useRef(debounce(onSetFilterBy)).current;

    useEffect(() => {
        onSetFilterBy(filterByToEdit);
    }, [filterByToEdit]);

    function handleChange(ev) {
        let { value, name: field, type } = ev.target;
        value = type === 'number' ? +value : value;
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By name"
                    value={filterByToEdit.name}
                    onChange={handleChange}
                />


                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />
            </form>
        </section>
    )
}

