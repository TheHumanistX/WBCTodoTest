import './Cat.css'

function Cat(props) {
    return (
        <div>
            <img className="Kitten" src={"https://placekitten.com/" + props.id + "/300"} />
            <p>Name: {props.name}</p>
        </div>
        );
}

export default Cat;