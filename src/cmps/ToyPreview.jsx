export function ToyPreview({ toy, onRemoveToy }) {
    return (
        <div className="toy-preview">
            <h2>{toy.name}</h2>
            <img src={`${toy.imgUrl}?random=${Math.random()}`} alt="" />
            <p>Price: {toy.price}</p>
            <button onClick={() => onRemoveToy(toy._id)} >Remove</button>
        </div>
    )
}