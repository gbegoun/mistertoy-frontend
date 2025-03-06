export function ToyPreview({ toy, onRemoveToy }) {
    return (
        <div className="toy-preview">
            <h2>{toy.name}</h2>
            <img src={toy.img} alt="" />
            <p>Price: {toy.price}</p>
            <input type="button" value="Remove" onClick={() => onRemoveToy(toy._id)} />
        </div>
    )
}