import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function SampleMsg(){
    const [msg, setMsg] = useState('');
    
    useEffect(() => {
        async function fetchData(){
            const response = await axios.get("/api");
            setMsg(response.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            {msg && <span data-testid="messageText">{msg}</span>}
        </div>
    );
}