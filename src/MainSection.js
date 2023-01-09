import './MainSection.css'
import Cat from './Cat.js'
import { useState , useEffect} from "react";
import { ethers } from "ethers";
import ABI from "./contractABI.json";
import Card from "./Card.js";


function MainSection() {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [chainName, setChainName] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");

    const change = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0xf40bdFe001Ac15A7c33F075741AD9947A96974b7", ABI, signer);

        const createTask = await contract.createTask(input);
    }

    const getData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0xf40bdFe001Ac15A7c33F075741AD9947A96974b7", ABI, signer);

        const total = await contract.totalTasks();
        

        setTasks([]);
        for (let i = 0; i < total; i++) {
            const currentTask = await contract.taskList(i);
            setTasks(prevTasks => [...prevTasks, currentTask]);
        }

        
    }
    useEffect(() => {
        console.log(tasks);
    })

    const getWalletAddress = async () => {

        if (window.ethereum && window.ethereum.isMetaMask) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts");
            const currentAddress = await provider.getSigner().getAddress();
           
            setCurrentAccount(currentAddress);

            const chain = await provider.getNetwork();
            setChainName(chain.name);            
        }
                
    }

    function chainChanged(){
        window.location.reload();
    }

    
    useEffect(() => {
        window.ethereum.on('chainChanged', chainChanged);

        return () => window.ethereum.removeListener('chainChanged', chainChanged);
    }, []);

    useEffect(() => {
        window.ethereum.on('accountsChanged', getWalletAddress);

        return () => window.ethereum.removeListener('accountsChanged', getWalletAddress);
    }, []);
    

    useEffect(() => {
        getWalletAddress();
        getData();
    }, []);
    return (
        <div className="MainSection">
            <div className="Content">
                <button onClick={getWalletAddress}>Connect</button>
                <p>{currentAccount}</p>
                <p>Chain Name: {chainName}</p>
                <input value={input} onInput={e => setInput(e.target.value)} />
                <button onClick={change}>Add Task</button>

                

                {tasks.map((item) => (
                    <Card Name={item.taskName} id={item.Id} Done={item.completedYet} />
                    ))}
            </div>
            <div className="Sidebar">
                <Cat name="Bob" id = "300" />
                <Cat name="Alice" id = "301" />
                <Cat name="Theodore" id = "302" />
                <Cat id="400" />
            </div>
        </div>    
        
    );
}

export default MainSection;