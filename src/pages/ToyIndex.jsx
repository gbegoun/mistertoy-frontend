import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { loadToys, removeToy, setFilterBy } from '../store/actions/toy.action.js';
import { ToyList } from '../cmps/ToyList.jsx';
import { ToyFilter } from '../cmps/ToyFilter.jsx';
import { Modal } from '../cmps/Modal.jsx';

export function ToyIndex() {

    const location = useLocation();
    const navigate = useNavigate();

    const toys = useSelector(state => state.toyModule.toys) || [];
    const isLoading = useSelector(state => state.toyModule.isLoading);

    const searchParmas = new URLSearchParams(location.search);
    const filterBy = {
        name: searchParmas.get('name') || '',
        minPrice: searchParmas.get('minPrice') || '',
        maxPrice: searchParmas.get('maxPrice') || '',
        labels: searchParmas.getAll('labels') || []
    };

    const isModal = location.state && location.state.modal === true;
    const { toyId } = useParams();

    useEffect(() => {
        loadToys(filterBy)
            .catch(err => showErrorMsg('Cannot load toys'));
    }, [location.search]);

    const closeModal = () => {
        navigate(`/toy`, { state: { modal: false } });
    };

    const onRemoveToy = (toyId) => {
        removeToy(toyId)
            .then(() => showSuccessMsg('Toy removed'))
            .catch(err => showErrorMsg('Cannot remove toy'));
    };

    const onSetFilterBy = (filterBy) => {
        const searchParams = new URLSearchParams();
        if (filterBy.name) searchParams.set('name', filterBy.name);
        if (filterBy.minPrice) searchParams.set('minPrice', filterBy.minPrice);
        if (filterBy.maxPrice) searchParams.set('maxPrice', filterBy.maxPrice);
        if (filterBy.labels) filterBy.labels.forEach(label => searchParams.append('labels', label));
        navigate({ search: searchParams.toString() });
    };


    if (!isModal && toyId) return <Outlet />;
    return (
        <section className="toy-index">
            <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} labels={[...new Set(toys.flatMap(toy => toy.labels))]} />
            {isLoading ? (<div>Loading...</div>) :
                <>
                    <Link to="/toy/edit" state={{ modal: true }}>Add Toy</Link>
                    <ToyList toys={toys} onRemoveToy={onRemoveToy} />
                    {isModal && (
                        <Modal onClose={closeModal}>
                            <Outlet />
                        </Modal>
                    )}
                </>}
        </section>
    );
}