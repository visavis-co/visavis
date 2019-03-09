import React, { Component } from 'react';
import * as actions from "../actions/actions";
import { connect } from 'react-redux';
// import other components
import Login from '../components/Login.jsx';

const mapStateToProps = (store) => ({
  isLoggedIn: store.user.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
  // after logged in, should render to show home page with current and past matches 
  logIn: () => {
    dispatch(actions.logIn());
  },
})

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { logIn, isLoggedIn, currentPage } = this.props;
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
          {/* private route => should check if user is authenticated before rendering */}
          <Route path="/login" component={login} />
          <Route path="/signup" component={signup} />
          <Route path="/match" component={matches} />
        </Switch>
      </Router>
    )
  }
}

{currentPage == 'loginPage' && 
<Login logIn={logIn} isLoggedIn={isLoggedIn}/>}
<Route path='/admin' render={props => (<Admin menu={this.props.menu} />)} />

export default connect(mapStateToProps, mapDispatchToProps)(App);