import React from 'react';
import {Grid} from 'react-bootstrap';
import LoginDlg from 'user/components/login-dlg';
import Toolbar from 'app/components/toolbar';
import Footer from 'app/components/footer';
import NotificationBar from 'app/components/notification-bar';

const MainLayout = React.createClass({
    render() {
        return (
            <div>
                <Toolbar/>
                <Grid fluid>
                    <NotificationBar/>
                    <LoginDlg/>
                    {this.props.children}
                    <Footer/>
                </Grid>
            </div>
        );
    }
});

export default MainLayout;
