import { useEffect } from 'react'
import { Link, useLocation, useNavigate,Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadToys, removeToy, setFilterBy } from '../store/actions/toy.action.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'

export function ToyIndex() {

    const location = useLocation();
    const navigate = useNavigate();

    const isModal = location.state && location.state.modal===true

    const toys = useSelector(state => state.toyModule.toys) || [];
    const isLoading = useSelector(state => state.toyModule.isLoading);

    const searchParmas = new URLSearchParams(location.search);
    const filterBy = {
        name: searchParmas.get('name') || '',
        maxPrice: searchParmas.get('maxPrice') || ''
    };

    useEffect(() => {
        loadToys(filterBy)
            .catch(err => showErrorMsg('Cannot load toys'));
    }, [location.search]);

    const closeModal = () => {
        navigate(`/book`, { state: { modal: false }})
    };

    const onRemoveToy = (toyId) => {
        removeToy(toyId)
            .then(() => showSuccessMsg('Toy removed'))
            .catch(err => showErrorMsg('Cannot remove toy'));
    };

    const onSetFilterBy = (filterBy) => {
        const searchParams = new URLSearchParams();
        if (filterBy.name) searchParams.set('name', filterBy.name);
        if (filterBy.maxPrice) searchParams.set('maxPrice', filterBy.maxPrice);
        navigate({ search: searchParams.toString() });
    };

    if (isLoading) return <div>Loading...</div>;
    return (
        <section className="toy-index">
            <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <Link to="/toy/edit" >Add Toy</Link>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
            {/* {isModal && (
                <div className="overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <Outlet />
                    </div>
                </div>
            )} */}
        </section>
    );

}