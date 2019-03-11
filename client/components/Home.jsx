import React from 'react';

// private route
// what a user sees when they go to "/" and are logged in
// this month's match is...

const Home = props => {
    console.log(props.currentMatch)
    // const current = props.currentMatch;
    // const past = props.pastMatches;
    // const history = [];
    // for(let i = 0; i < data.length; i++){
    //     history.push(<Match user={data[i]} />);
    // }

    return (
        <div>
            <h1>Welcome, {props.userInfo.fullname}</h1>
            {/* {current} */}
            <h3>Past Matches</h3>
            {/* {past} */}
            <button onClick={props.userLogout}>Log Out</button>
        </div>
    );
}

export default Home;