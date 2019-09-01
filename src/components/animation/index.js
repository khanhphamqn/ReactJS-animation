import React from 'react';
import './index.scss';

class Animation extends React.Component {
  static defaultProps = {
    active: false,
    duration: 300,
  }

  state = {
    isActive: false
  }

  isActive = (isActive) => {
    this.setState({
      isActive: isActive
    });
  }

  componentDidMount() {
    if (this.props.active) {
      this.isActive(this.props.active);
    }
  }

  componentDidUpdate(prevProps){
    if (!prevProps.active && this.props.open) {
      this.isActive(this.props.active);
    }
  }

  animationEnd = event => {
    const {
      onAnimationEnd,
      active
    } = this.props;

    if (!active) {
      this.setState({ isActive: active });
    }
    if (event.target === this.el) {
      onAnimationEnd && onAnimationEnd();
    }
  }

  render() {
    const {
      active,
      duration,
      animationIn,
      animationOut,
      children
    } = this.props;

    const style = {
      animationDuration: duration + 'ms',
      WebkitAnimationDuration: duration + 'ms'
    };
    return (
      <div
        className={'animated' + (active ? ` ${animationIn}` : ` ${animationOut}`)}
        style={style}
        onAnimationEnd={this.animationEnd}
        tabIndex="-1"
        ref={el => { this.el = el; }}>
        {children}
      </div>
    );
  }
}

export default Animation;
