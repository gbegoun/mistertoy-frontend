export function ToyPreview({ toy, onRemoveToy }) {

    const handleButtonClick = (event) => {
        event.preventDefault();
        onRemoveToy(toy._id);
    };

    return (
        <div className="toy-preview">
            <h2>{toy.name}</h2>
            <img src={`${toy.imgUrl}?random=${Math.random()}`} alt="" />
            <p>Price: {toy.price}</p>
            <button onClick={handleButtonClick} >Remove</button>
        </div>
    )
}