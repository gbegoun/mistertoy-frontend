import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { toyService } from "../services/toy.service";
import { updateToy } from '../store/actions/toy.action.js';
import { useEffect, useState } from "react";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export function ToyDetails() {

    const { toyId } = useParams();
    const location = useLocation();
    const [toy, setToy] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        toyService.get(toyId)
            .then(toy => setToy(toy))
            .catch(err => console.log('Cannot load toy'));
    }, [toyId, isEditMode]);

    const handleChange = (ev) => {
        setIsChanged(true);
        const { name, value } = ev.target;
        switch (name) {
            case 'tags':
                const labels = value.split(',').map(label => label.trim());
                setToy({ ...toy, labels });
                break;
            default:
                setToy({ ...toy, [name]: value });
        }
    };

    const onEditClicked = () => {
        console.log('isEditMode:', isEditMode);
        setIsEditMode(!isEditMode);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (isEditMode) {
            if (!toy.name || !toy.price) {
                showErrorMsg('Name and Price are required');
                return;
            }
            updateToy(toy)
                .then(() => {
                    showSuccessMsg('Toy updated');
                    setIsChanged(false);
                    setIsEditMode(false);
                })
                .catch(err => console.log('Cannot updated toy'));
            
        }
    };

    if (!toyId && !toy) {
        setIsEditMode(true);
        setToy(toyService.getEmptyToy());
    }

    if (!toy) return <div>Loading...</div>;
    return (
        <section className="toy-details">
            <form onSubmit={handleSubmit}>
                <button type="button" onClick={onEditClicked} className="edit-btn">{isEditMode ? "Back" : "Cacnel"}</button>
                <h1>
                    <input
                        type="text"
                        name="name"
                        value={toy.name}
                        onChange={handleChange}
                        readOnly={!isEditMode}
                        required
                    />
                </h1>
                <p>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={toy.price}
                        onChange={handleChange}
                        readOnly={!isEditMode}
                        required
                    />
                </p>
                <img src={toy.img} alt={toy.name} />
                <h5>
                    <input
                        type="text"
                        name="tags"
                        value={toy.labels.map(label => label).join(", ")}
                        onChange={handleChange}
                        readOnly={!isEditMode}
                    />
                </h5>
                {!isEditMode
                    ? <div>
                        <Link to={`/toy/${toy.prevToyId}`} state={location.state}>Previous</Link>
                        <span style={{ margin: '0 10px' }}></span>
                        <Link to={`/toy/${toy.nextToyId}`} state={location.state}>Next</Link>
                    </div>
                    : <button type="submit" disabled={!isChanged}>Save</button>}
            </form>
        </section>
    );
}