import React from 'react';
import ReactLoader from 'react-loader';

const Loader = React.createClass({
    propTypes: {
        isLoaded: React.PropTypes.bool.isRequired
    },

    render() {
        const {isLoaded, children} = this.props;
        return (
            <ReactLoader
                loaded={isLoaded}
                color='#FF9587'
                lines={8}
                length={0}
                width={8}
                radius={8}
                speed={2}>
                {children}
            </ReactLoader>
        );
    }
});

export default Loader;
