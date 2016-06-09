import styles from 'app/styles/footer.scss';
import React from 'react';
import {Row, Col} from 'react-bootstrap';

const Footer = React.createClass({
    render() {
        return <div className={styles.wrapper}>&copy; 2016 Dota Fan Wars</div>;
    }
});

export default Footer;
