import React, { Component } from 'react';
import './index.scss';
import Animation from '../../components/animation';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimate: true
    }
    this.updateStatus = this.updateStatus.bind(this);
  }
  updateStatus(status) {
    this.setState({
      isAnimate: status,
    })
  }
  render() {
    const {
      isAnimate
    } = this.state
    return (
      <div className="home">
        <button type="button" onClick={() => this.updateStatus(!isAnimate)} className="btn btn-primary">{`${isAnimate ? 'FadeIn' : 'FadeOut'}`}</button>
        <Animation
          active={isAnimate}
          duration={1000}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
        >
          <div>
            <h2>FADE ANIMATION</h2>
          </div>
        </Animation>
      </div>
    );
  }
}

export default HomeScreen;