import React, { Component, Fragment } from 'react';
import './App.scss';
import Footer from './components/footer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from './screens/home';
import SlideScreen from './screens/slide';
import SideBar from './components/nav';
import Animation from './components/animation';
import RouterAnimation from './components/router-animation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isShow: true
    }
    this.updateNav = this.updateNav.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
  }
  updateNav(status) {
    if (status) {
      this.setState({
        isOpen: status,
        isShow: status
      })
    }
    else {
      this.setState({
        isShow: status
      })
    }
  }
  onAnimationEnd() {
    const {
      isShow
    } = this.state;
    if (!isShow) {
      this.setState({
        isOpen: isShow
      })
    }
  }
  render() {
    const {
      isOpen,
      isShow
    } = this.state;
    return (
      <Router>
        <div className="App" >
          <div className="outlet">
            {isOpen && <Fragment>
              <Animation
                active={isShow}
                onAnimationEnd={this.onAnimationEnd}
                animationIn={'slideInLeft'}
                animationOut={'slideOutLeft'}
              >
                <SideBar />
              </Animation>
            </Fragment>}
            <div className="app-content">
              <button type="button" onClick={() => this.updateNav(!isOpen)} className="navbar-toggler">
                <svg className="navbar-toggler-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M288 44v40c0 8.837-7.163 16-16 16H16c-8.837 0-16-7.163-16-16V44c0-8.837 7.163-16 16-16h256c8.837 0 16 7.163 16 16zM0 172v40c0 8.837 7.163 16 16 16h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16zm16 312h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm256-200H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16h256c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16z"></path></svg>
                <span>Toggle Sidebar</span>
              </button>
              <Route
                render={({ location }) => (
                  <RouterAnimation>
                    <div>
                      <Switch location={location}>
                        <Route exact path="/" component={HomeScreen} />
                        <Route exact path="/slide" component={SlideScreen} />
                      </Switch>
                    </div>
                  </RouterAnimation>
                )}
              />
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    );

  }
}

export default App;
