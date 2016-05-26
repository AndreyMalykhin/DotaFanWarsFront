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
import Loader from 'react-loader';
import Immutable from 'immutable';
import {PENDING} from 'common/utils/request-status';
import {getCountries} from 'app/actions/country-actions';
import {getUser, saveUser, setUserPhoto} from 'user/actions/user-actions';
import {setUserCountry, setUserNickname, fillUserForm} from
    'user/actions/user-form-actions';

const UserForm = React.createClass({
    render() {
        const {
            intl,
            errors,
            rating,
            photoUrl,
            nickname,
            countryId,
            countries,
            setUserPhotoRequestStatus,
            saveUserRequestStatus,
            getUserRequestStatus,
            getCountriesRequestStatus,
            onSave,
            onCancel,
            onPhotoChange,
            onNicknameChange,
            onCountryChange
        } = this.props;
        const nicknameError = errors.get('nickname');
        const countryError = errors.get('countryId');
        const isRequestPending = saveUserRequestStatus == PENDING
            || setUserPhotoRequestStatus == PENDING
            || getUserRequestStatus == PENDING
            || getCountriesRequestStatus == PENDING;
        const isDisabled = isRequestPending;
        let form;

        if (getUserRequestStatus != PENDING) {
            form =
                <form onSubmit={onSave}>
                    <FormGroup>
                        <FormControl.Static>
                            <FormattedMessage id='userForm.rating'/>&nbsp;
                            {rating}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup>
                        <Image src={photoUrl} rounded/>
                        <div>
                            <Button
                                disabled={isDisabled}
                                onClick={this._onPhotoClick}>
                                <FormattedMessage id='userForm.changePhoto'/>
                            </Button>
                            {this._renderError(errors.get('photoFile'))}
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
                            {countries && countries.map((country) =>
                                <option
                                    value={country.get('id')}
                                    key={country.get('id')}>
                                    {country.get('name')}
                                </option>
                            )}
                        </FormControl>
                        {this._renderError(countryError)}
                    </FormGroup>
                    <FormGroup>
                        <Button
                            disabled={isDisabled}
                            type='submit'>
                            <FormattedMessage id='common.save'/>
                        </Button>
                        <Button
                            disabled={isDisabled}
                            onClick={onCancel}>
                            <FormattedMessage id='common.cancel'/>
                        </Button>
                    </FormGroup>
                </form>;
        }

        return (
            <Row>
                <Col xs={12}>
                    <Loader loaded={!isRequestPending}/>
                    {form}
                </Col>
            </Row>
        );
    },

    componentDidMount() {
        this.props.onLoad();
    },

    propTypes: {
        onSave: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        onPhotoChange: React.PropTypes.func.isRequired,
        onNicknameChange: React.PropTypes.func.isRequired,
        onCountryChange: React.PropTypes.func.isRequired,
        onLoad: React.PropTypes.func.isRequired,
        errors: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        rating: React.PropTypes.number,
        nickname: React.PropTypes.string,
        countries: React.PropTypes.instanceOf(Immutable.List),
        saveUserRequestStatus: React.PropTypes.string,
        getUserRequestStatus: React.PropTypes.string,
        getCountriesRequestStatus: React.PropTypes.string,
        setUserPhotoRequestStatus: React.PropTypes.string,
        countryId: React.PropTypes.string,
        photoUrl: React.PropTypes.string
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

function mapStateToProps(state, ownProps) {
    return {
        errors: state.userForm.get('errors'),
        nickname: state.userForm.get('nickname'),
        countryId: state.userForm.get('countryId'),
        photoUrl: state.user.get('photoUrl'),
        rating: state.user.get('rating'),
        saveUserRequestStatus: state.user.get('saveRequestStatus'),
        getUserRequestStatus: state.user.get('getRequestStatus'),
        setUserPhotoRequestStatus: state.user.get('setPhotoRequestStatus'),
        countries: state.countries.get('items'),
        getCountriesRequestStatus: state.countries.get('getRequestStatus')
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onLoad() {
            dispatch(getCountries());
            dispatch(getUser()).then(() => {
                dispatch(fillUserForm());
            });
        },
        onCancel() {
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
