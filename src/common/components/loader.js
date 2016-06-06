import React from 'react';
import ReactLoader from 'react-loader';

const Loader = React.createClass({
    propTypes: {
        isLoaded: React.PropTypes.bool.isRequired
    },

    render() {
        const {isLoaded, children} = this.props;
        return <ReactLoader loaded={isLoaded}>{children}</ReactLoader>;
    }
});

export default Loader;
