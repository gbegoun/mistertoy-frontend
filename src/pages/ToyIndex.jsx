import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'

export function ToyIndex() {

    const defaultFilter = null

    const [toys, setToys] = useState(null)
    const [filterBy, setFilterBy] = useState(defaultFilter)

    useEffect(() => {
        // setSearchParams(filterBy)
        // toyService.query(filterBy)
        toyService.query()
            .then(toys => {
                setToys(toys)
            })
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load toys')
            })

    }, [])

    if (!toys) return <div>Loading...</div>
    return (
        <section className="toy-index">
            {/* <ToyFilter filterBy={filterBy} onSetFilterBy={setFilterBy} /> */}
            <Link to="/toy/edit" >Add Toy</Link>
            <ToyList toys={toys} />
            {/* onRemoveToy={onRemoveToy} */}
        </section>
    )

}