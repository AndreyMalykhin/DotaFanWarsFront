import styles from 'user/styles/user-form.scss';
import React from 'react';
import {
    Row,
    Col,
    FormGroup,
    Image,
    Button,
    ControlLabel,
    FormControl,
    HelpBlock
} from 'react-bootstrap';
import {FormattedMessage, injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import Loader from 'common/components/loader';
import Immutable from 'immutable';
import {PENDING} from 'common/utils/request-status';
import {getCountries} from 'common/actions/country-actions';
import {getUser, saveUser, setUserPhoto} from 'user/actions/user-actions';
import {setUserCountry, setUserNickname, fillUserForm} from
    'user/actions/user-form-actions';

const UserForm = React.createClass({
    propTypes: {
        onSave: React.PropTypes.func.isRequired,
        onBack: React.PropTypes.func.isRequired,
        onPhotoChange: React.PropTypes.func.isRequired,
        onNicknameChange: React.PropTypes.func.isRequired,
        onCountryChange: React.PropTypes.func.isRequired,
        onLoad: React.PropTypes.func.isRequired,
        errors: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        isDisabled: React.PropTypes.bool.isRequired,
        isLoading: React.PropTypes.bool.isRequired,
        rating: React.PropTypes.number,
        nickname: React.PropTypes.string,
        countries: React.PropTypes.instanceOf(Immutable.List),
        countryId: React.PropTypes.string,
        photoUrl: React.PropTypes.string,
        intl: React.PropTypes.any
    },

    render() {
        const {
            intl,
            errors,
            rating,
            photoUrl,
            nickname,
            countryId,
            countries,
            isDisabled,
            isLoading,
            onSave,
            onBack,
            onPhotoChange,
            onNicknameChange,
            onCountryChange
        } = this.props;
        const nicknameError = errors.get('nickname');
        const countryError = errors.get('country');
        const photoError = errors.get('photoFile');
        return (
            <Row>
                <Col xs={12} sm={6} smOffset={3}>
                    <Loader isLoaded={!isLoading}/>
                    <form onSubmit={onSave}>
                        <FormGroup className={styles.ratingWrapper}>
                            <ControlLabel>
                                <FormattedMessage id='userForm.rating'/>:&nbsp;
                            </ControlLabel>
                            {rating}
                        </FormGroup>
                        <FormGroup
                            validationState={photoError && 'error'}
                            className={styles.photoWrapper}>
                            <Image
                                className={styles.photoImg}
                                src={photoUrl}
                                rounded
                                responsive/>
                            <div>
                                <Button
                                    disabled={isDisabled}
                                    onClick={this._onPhotoClick}>
                                    <FormattedMessage id='userForm.changePhoto'/>
                                </Button>
                                {this._renderError(photoError)}
                                <input
                                    className='hidden'
                                    type='file'
                                    accept='image/*'
                                    ref='photoInput'
                                    onChange={onPhotoChange}/>
                            </div>
                        </FormGroup>
                        <FormGroup validationState={nicknameError && 'error'}>
                            <ControlLabel>
                                <FormattedMessage id='userForm.nickname'/>
                            </ControlLabel>
                            <FormControl
                                disabled={isDisabled}
                                type='text'
                                value={nickname}
                                onChange={onNicknameChange}/>
                            {this._renderError(nicknameError)}
                        </FormGroup>
                        <FormGroup validationState={countryError && 'error'}>
                            <ControlLabel>
                                <FormattedMessage id='userForm.country'/>
                            </ControlLabel>
                            <FormControl
                                disabled={isDisabled}
                                componentClass='select'
                                value={countryId || ''}
                                onChange={onCountryChange}>
                                <option value=''>
                                    {intl.formatMessage({id: 'common.select'})}
                                </option>
                                {countries && countries.map((country) => (
                                    <option
                                        value={country.get('id')}
                                        key={country.get('id')}>
                                        {country.get('name')}
                                    </option>
                                ))}
                            </FormControl>
                            {this._renderError(countryError)}
                        </FormGroup>
                        <FormGroup className={styles.actions}>
                            <Button
                                disabled={isDisabled}
                                type='submit'>
                                <FormattedMessage id='common.save'/>
                            </Button>
                            <Button
                                disabled={isDisabled}
                                onClick={onBack}>
                                <FormattedMessage id='common.back'/>
                            </Button>
                        </FormGroup>
                    </form>
                </Col>
            </Row>
        );
    },

    componentDidMount() {
        this.props.onLoad();
    },

    _renderError(error) {
        if (!error) {
            return null;
        }

        return <HelpBlock>{error}</HelpBlock>;
    },

    _onPhotoClick(event) {
        event.preventDefault();
        this.refs.photoInput.click();
    }
});

function mapStateToProps(state) {
    const {userForm, user, countries} = state;
    const isLoading =
        user.get('saveRequestStatus') == PENDING
        || user.get('setPhotoRequestStatus') == PENDING
        || user.get('getRequestStatus') == PENDING
        || countries.get('getRequestStatus') == PENDING;
    return {
        errors: userForm.get('errors'),
        nickname: userForm.get('nickname'),
        countryId: userForm.get('country'),
        photoUrl: user.get('photoUrl'),
        rating: user.get('rating'),
        countries: countries.get('items'),
        isDisabled: isLoading,
        isLoading: isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onLoad() {
            dispatch(getCountries());
            dispatch(getUser()).then(() => {
                dispatch(fillUserForm());
            });
        },
        onBack() {
            dispatch(goBack());
        },
        onSave(event) {
            event.preventDefault();
            dispatch(saveUser());
        },
        onPhotoChange(event) {
            dispatch(setUserPhoto(event.target.files[0]));
        },
        onNicknameChange(event) {
            dispatch(setUserNickname(event.target.value));
        },
        onCountryChange(event) {
            dispatch(setUserCountry(event.target.value));
        }
    };
}

export default injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(UserForm));
