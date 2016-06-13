import styles from 'match/styles/projectile.scss';
import ProjectileIcon from 'match/images/projectile.svg';
import React from 'react';
import {Overlay} from 'react-bootstrap';
import Icon from 'common/components/icon';

const Projectile = React.createClass({
    propTypes: {
        onGetTargetNode: React.PropTypes.func.isRequired,
        targetId: React.PropTypes.string.isRequired
    },

    render() {
        return (
            <Overlay
                target={this._onGetTargetNode}
                show
                placement='top'>
                <span className={styles.wrapper}>
                    <Icon
                        className={styles.img}
                        glyph={ProjectileIcon}
                        width={128}
                        height={128}/>
                </span>
            </Overlay>
        );
    },

    _onGetTargetNode() {
        const {onGetTargetNode, targetId} = this.props;
        return onGetTargetNode(targetId);
    }
});

export default Projectile;
