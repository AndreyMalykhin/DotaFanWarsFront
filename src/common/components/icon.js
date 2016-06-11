import React from 'react';

const Icon = React.createClass({
    propTypes: {
        glyph: React.PropTypes.string.isRequired,
        className: React.PropTypes.string,
        width: React.PropTypes.number,
        height: React.PropTypes.number
    },

    render() {
        const {glyph, width, height, className} = this.props;
        return (
            <svg className={className} width={width} height={height}>
                <use xlinkHref={glyph}/>
            </svg>
        );
    }
});

export default Icon;
