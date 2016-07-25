import React from 'react';
import ReactDOM from 'react-dom';


const ValueChangeAnimator = React.createClass({
    propTypes: {
        children: React.PropTypes.node.isRequired,
        className: React.PropTypes.string.isRequired,
        onCompare: React.PropTypes.func.isRequired,
        value: React.PropTypes.any,
        timeout: React.PropTypes.number
    },

    _timeoutId: null,

    render() {
        return React.cloneElement(
            React.Children.only(this.props.children), {ref: 'child'});
    },

    getDefaultProps() {
        return {
            timeout: 1000,
            onCompare(oldValue, newValue) {
                return oldValue === newValue;
            }
        };
    },

    componentDidUpdate(prevProps) {
        const {value, timeout, onCompare} = this.props;

        if (this._timeoutId || onCompare(prevProps.value, value)) {
            return;
        }

        this._toggleAnimation(true);
        this._timeoutId = setTimeout(() => {
            this._toggleAnimation(false);
            this._timeoutId = null;
        }, timeout);
    },

    componentWillUnmount() {
        clearTimeout(this._timeoutId);
        this._timeoutId = null;
        this._toggleAnimation(false);
    },

    _toggleAnimation(add) {
        const {className} = this.props;
        const classList =
            ReactDOM.findDOMNode(this.refs.child).classList;
        add ? classList.add(className) : classList.remove(className);
    }
});

export default ValueChangeAnimator;
