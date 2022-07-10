import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: null,
            speciesName: null,
            roundedGRank: null
        }
    }

    componentDidMount() {
        // Hardcoded UID
        const dummyuid = 'ELEMENT_GLOBAL.2.154701';
        this.setState( { uid: dummyuid } );
        // GET request with fetch, convert to async function
        fetch(`https://explorer.natureserve.org//api/data/taxon/${dummyuid}`)
            .then(response => response.json())
            .then(data => this.setState( { speciesName: data.primaryCommonName, 
                                           roundedGRank: data.roundedGRank }))
    }


    render() {
        const { speciesName } = this.state;
        const { roundedGRank } = this.state;
        const { uid } = this.state;
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
}
