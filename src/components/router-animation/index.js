import React, { Component, Fragment, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './index.scss';
import { withRouter } from 'react-router-dom';

let forceAnimation;

class RouterAnimation extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      firstChild: cloneElement(props.children.props.children),
      secondChild: null,
      isFirstRender: true,
      path: this.props.location.pathname
    }
    this.filterChildren = this.filterChildren.bind(this);
  }
  filterChildren(path) {
    return this.props.children.props.children.find(c => c.props.path === path) || null;
  }
  static getDerivedStateFromProps(props, state) {
    const {
      location
    } = props;
    if (state.isFirstRender) {
      return {
        ...state,
        isFirstRender: false
      }
    }
    if (location.pathname === state.path) return state;
    if (!state.secondChild) {
      return {
        ...state,
        secondChild: cloneElement(props.children.props.children),
        path: location.pathname
      }
    }
    else {
      return {
        firstChild: state.secondChild,
        secondChild: cloneElement(props.children.props.children),
        path: location.pathname
      }
    }
  }
  componentDidUpdate(prevProps) {
    const {
      location
    } = this.props;
    if (location.pathname === prevProps.location.pathname) return;
    this.doTransition();
  }
  doTransition() {
    return new Promise((transitionDone, transitionFailed) => {
      this.forceUpdate(() => {
        const prevChildDom = ReactDOM.findDOMNode(this.refs.firstChild);
        const newChildDom = ReactDOM.findDOMNode(this.refs.secondChild);
        const view = ReactDOM.findDOMNode(this.refs.view);
        let timeout = 500;
        const start = () => {
          view.classList.add('hidden');
          if (newChildDom) {
            newChildDom.classList.add('item');
            newChildDom.classList.add('item-appear');
            forceAnimation = newChildDom.offsetTop;
            newChildDom.classList.add('item-appear-active');
          }
          if (prevChildDom) {
            prevChildDom.classList.add('item');
            prevChildDom.classList.add('item-leave');
            forceAnimation = prevChildDom.offsetTop;
            prevChildDom.classList.add('item-leave-active');
          }
          return Promise.resolve();
        };

        const waitForTransition = () => new Promise(resolve => {
          setTimeout(() => {
            this.setState({
              firstChild: null
            });
            view.classList.remove('hidden');
            if(forceAnimation){
              this.forceUpdate(resolve);
            }
          }, timeout);
        });

        const end = () => {
          if (newChildDom && newChildDom.classList.contains('transition-item')) {
            newChildDom.classList.remove('transition-appear');
            newChildDom.classList.remove('transition-item');
            newChildDom.classList.remove('transition-appear-active');
          }
          if (prevChildDom && prevChildDom.classList.contains('transition-item')) {
            prevChildDom.classList.remove('transition-leave');
            prevChildDom.classList.remove('transition-item');
            prevChildDom.classList.remove('transition-leave-active');
          }
          return Promise.resolve();
        };

        Promise.resolve()
          .then(start)
          .then(waitForTransition)
          .then(end)
          .then(transitionDone)
          .catch(transitionFailed);

      });
    });
  }
  render() {
    console.log(this.props)
    return (
      <Fragment>
        <div ref={'view'} className='view'>
          {Children.map(this.state.firstChild, element => {
            return cloneElement(element, { ref: 'firstChild' })
          })}
          {Children.map(this.state.secondChild, element => {
            return cloneElement(element, { ref: 'secondChild' })
          })}
        </div>
      </Fragment>
    );
  }
}
export default withRouter(RouterAnimation);