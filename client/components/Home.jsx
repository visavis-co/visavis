import React from 'react';

// private route
// what a user sees when they go to "/" and are logged in
// this month's match is...

const Home = props => {
    // const data = props.home.pastMatches;
    // const history = [];
    // for(let i = 0; i < data.length; i++){
    //     history.push(<Match user={data[i]} />);
    // }

    return (
        <div>
            <h1>Welcome, {props.userInfo.fullname}</h1>
            {/* <MatchProfile user={props.home.userInfo} /> */}
            <h3>Past Matches</h3>
            {/* {history} */}
            <button>Log Out</button>
            {/* <button onClick={props.userLogout(props.userInfo.id)}>Log Out</button> */}
        </div>
    );
}

export default Home;