import React, { Component } from 'react';
import './index.scss';
import Animation from '../../components/animation';

class SlideScreen extends Component {
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
      <div className="slide">
        <button type="button" onClick={() => this.updateStatus(!isAnimate)} className="btn btn-primary">{`${isAnimate ? 'FlipIn' : 'FlipOut'}`}</button>
        <Animation
          active={isAnimate}
          duration={1000}
          animationIn={'flipInX'}
          animationOut={'flipOutX'}
        >
          <div>
            <h2>FLIP ANIMATION</h2>
          </div>
        </Animation>
      </div>
    );
  }
}

export default SlideScreen;