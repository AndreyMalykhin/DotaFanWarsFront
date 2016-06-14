import styles from 'app/styles/lobby.scss';
import React from 'react';
import {Grid} from 'react-bootstrap';
import LoginDlg from 'user/components/login-dlg';
import Toolbar from 'app/components/toolbar';
import Footer from 'app/components/footer';
import NotificationBar from 'common/components/notification-bar';

const Lobby = React.createClass({
    render() {
        return (
            <div key='wrapper' className={styles.wrapper}>
                <Toolbar/>
                <Grid className={styles.body}>
                    <NotificationBar/>
                    <LoginDlg/>
                    {this.props.children}
                </Grid>
                <Footer/>
            </div>
        );
    }
});

export default Lobby;
