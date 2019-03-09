import React from 'react';

// private route
// what a user sees when they go to "/" and are logged in
// this month's match is...

const Home = props => {
    const data = props.pastMatches;
    const history = [];
    for(let i = 0; i < data.length; i++){
        history.push(<Match user={data[i]} />);
    }

    return (
        <div>
            <h1>MATCH</h1>
            <MatchProfile user={props.userInfo} />
            <h3>Past Matches</h3>
            {history}
        </div>
    );
}

export default Home;