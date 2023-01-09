import './Card.css'
import { useState } from "react";
import ABI from "./contractABI.json";
import { ethers } from "ethers";

function Card(props) {

    const [checked, setChecked] = useState(props.Done);

    const toggle = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0xf40bdFe001Ac15A7c33F075741AD9947A96974b7", ABI, signer);

        const toggleContract = await contract.toggleTask(props.id);
        const receipt = await toggleContract.wait();
        if (receipt.confirmations > 0) {
            setChecked(!checked);
        }

    }
    

    return (
        <div className = "ToDoItem">
            <p>{props.Name}</p>
            
            <input onClick={toggle} type="checkbox" checked={checked} />
        </div>
    );
}

export default Card;