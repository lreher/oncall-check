import React, { useState, useEffect } from 'react';


const updateStatus = async (name, setStatus) => {
    const response = await fetch('/set', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            name
        }),
    });

    const responseText = await response.text();
    setStatus(responseText);
};

const Name = ({ name, initialStatus}) => {
    const [status, setStatus] = useState(initialStatus);

    useEffect(() => {
       setStatus(initialStatus)
      }, [initialStatus]);
    
    return (
        <div class='name'>
            <p>{name}</p>
            <span class={`dot_${status}`} id={name} onClick={() => updateStatus(name, setStatus)}></span>
        </div>
    );
}
    
export default Name;
    