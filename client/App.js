import React, { useEffect, useState } from 'react';
import Name from './Name';

const getStatus = async (setStatuses) => {
    const response = await fetch(`/get`, {
        method: "GET",
    });
    const responseJSON = await response.json();
    setStatuses(responseJSON)
};

const App = () => {
    const [statuses, setStatuses] = useState({});

    useEffect(() => {
        getStatus(setStatuses);
    }, []);

    return (
        <div className='my app'>
            <h1>On-call Check</h1>

            <Name 
                name='Lucas' 
                initialStatus={statuses['Lucas']}>    
            </Name>
            <Name 
                name='Jason' 
                initialStatus={statuses['Jason']}>    
            </Name>
            <Name 
                name='Josh' 
                initialStatus={statuses['Josh']}>    
            </Name>
        </div>
    );
}

export default App;
