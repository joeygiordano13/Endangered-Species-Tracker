import React, { useState, useEffect } from 'react';

function App() {
    const [ uid, setUid] = useState('');
    const [ speciesName, setSpeciesName ] = useState('');
    const [ roundedGRank, setRoundedGRank ] = useState('');

    const parseData = (data) => {
        setUid(data.elementGlobalId);
        setSpeciesName(data.primaryCommonName);
        setRoundedGRank(data.roundedGRank);
    }

    useEffect(() => {
        // Hardcoded UID
        const dummyuid = '154701';
        // Async function to get info from natureserve api
        const fetchData = async () => {
            const res = await fetch(`https://explorer.natureserve.org//api/data/taxon/ELEMENT_GLOBAL.2.${dummyuid}`)
            .then(response => response.json())
            .then(data => parseData(data));
            return res;
        }
        fetchData().catch(console.error)
    }, []);

    // Colors for GRank: Red -> Blue -> Green
    const palette = ['red', 'purple', 'blue', 'teal', 'green'];
        
    // TODO: error handle for extinct species (add new color?)
    // Replace this code once request is fixed
    let color = 'white';
    if (roundedGRank != null) {
        const num = roundedGRank.slice(1);
        color = palette[num-1];
    }

    return (
        <div className='text-center'>
            <h2>Species Tracker:</h2>
            <div>UID: {uid}</div>
            <div>Name: {speciesName}</div>
            <div>G rank: {roundedGRank}</div>
            <div style={{color: color}}>{roundedGRank}</div>
        </div>
    );
}

export default App;