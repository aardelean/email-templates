import {expect} from 'chai';
import {reducer} from './../reducer';
import * as actions from './../actions';

describe('Auth Reducer tests', () => {
  let currentState = reducer();

  it('SHOULD set the initial state to have an empty user',
    () => expect(reducer().user).to.be.undefined);

  describe('WHEN updating user API access token', () => {
    let updateUser = {
      type: actions.REFRESH_API_ACCESS_TOKEN_USER
    }
    beforeEach(() => {
      currentState = reducer(currentState, updateUser);
    });

    it('SHOULD have the update in progress flag set to true',
      () => expect(currentState.isRefreshingAPIAccessToken).to.equal(true));

    it('SHOULD have the error to nothing',
      () => expect(currentState.refreshAPIAccessTokenError).to.equal(''));
  });

   describe('WHEN the user API access token has an error', () => {
    const updateUser = {
      type: actions.REFRESH_API_ACCESS_TOKEN_USER_FAIL,
      error: 'update did not work'
    };

    beforeEach(() => {
      currentState = reducer(currentState, updateUser);
    });

    it('SHOULD have the update in progress flag set to false',
      () => expect(currentState.isRefreshingAPIAccessToken).to.equal(false));

    it('SHOULD have the error set to the correct message',
      () => expect(currentState.refreshAPIAccessTokenError).to.equal(updateUser.error));
  });

  describe('WHEN updating user', () => {
    const updateUser = {
      type: actions.UPDATE_CURRENT_USER
    };

    beforeEach(() => {
      currentState = reducer(currentState, updateUser);
    });

    it('SHOULD have the update in progress flag set to true',
      () => expect(currentState.isUpdatingUser).to.equal(true));

    it('SHOULD have the error flag set to false',
      () => expect(currentState.updateUserError).to.equal(''));

  });


  describe('WHEN updating user returns error', () => {
    const updateUser = {
      type: actions.UPDATE_CURRENT_USER_FAIL,
      error: 'update did not work'
    };

    beforeEach(() => {
      currentState = reducer(currentState, updateUser);
    });

    it('SHOULD have the update in progress flag set to false',
      () => expect(currentState.isUpdatingUser).to.equal(false));

    it('SHOULD have the error set to the correct message',
      () => expect(currentState.updateUserError).to.equal(updateUser.error));
  });

  describe('WHEN changing user password with success', () => {
    const changePassword = {type: actions.CHANGE_USER_PASSWORD_SUCCESS};
    beforeEach(() => {currentState = reducer(currentState, changePassword)});
    it('SHOULD have isChangingPassword false',
      () => expect(currentState.isChangingPassword).to.equal(false));
  });

  describe('WHEN changing user password with and fails', () => {
    const changePassword = {
      type: actions.CHANGE_USER_PASSWORD_FAIL,
      error: 'error'
    };
    beforeEach(() => {currentState = reducer(currentState, changePassword)});
    it('SHOULD have changePasswordError to have the correct value',
      () => expect(currentState.changePasswordError).to.equal(changePassword.error));
  });

  describe('WHEN updating the user details is succesfull', () => {
    const updateUser = {
      type: actions.UPDATE_CURRENT_USER_SUCCESS,
      result: {
        email: 'liviu@ignat.email',
        password: 'blabla',
        firstName: 'Bill',
        lastName: 'Gates',
        companyName: 'micromoale'
      }
    };

    beforeEach(() => {
      currentState = reducer(currentState, updateUser);
    });

    it('SHOULD have the update in progress flag set to false',
      () => expect(currentState.isUpdatingUser).to.equal(false));

    it('SHOULD have the error set nothing',
      () => expect(currentState.updateUserError).to.equal(''));

    it('SHOULD correct first name',
      () => expect(currentState.user.firstName).to.equal(updateUser.result.firstName));

    it('SHOULD correct last name',
      () => expect(currentState.user.lastName).to.equal(updateUser.result.lastName));

    it('SHOULD correct company name',
      () => expect(currentState.user.companyName).to.equal(updateUser.result.companyName));

    it('SHOULD correct email',
      () => expect(currentState.user.email).to.equal(updateUser.result.email));

    it('SHOULD correct company password',
      () => expect(currentState.user.password).to.equal(updateUser.result.password));

    describe('WHEN updating the user API access token is succesfull', () => {
      const updateUserApiToken = {
        type: actions.REFRESH_API_ACCESS_TOKEN_USER_SUCCESS,
        result: {
          apiAccessToken: 'crappyToken'
        }
      };

      beforeEach(() => currentState = reducer(currentState, updateUserApiToken));

      it('SHOULD update the token correctly',
        () => expect(currentState.user.apiAccessToken).to.equal(updateUserApiToken.result.apiAccessToken));

      it('SHOULD have the update in progress flag set to false',
        () => expect(currentState.isRefreshingAPIAccessToken).to.equal(false));

      it('SHOULD have the error set to nothing',
        () => expect(currentState.refreshAPIAccessTokenError).to.equal(''));

      it('SHOULD maintain all other fields', () => {
        expect(currentState.user.firstName).to.equal(updateUser.result.firstName);
        expect(currentState.user.companyName).to.equal(updateUser.result.companyName);
        expect(currentState.user.lastName).to.equal(updateUser.result.lastName);
      });
    });
  });


  describe('WHEN signing up', () => {
    const signUp = {
      type: actions.SIGN_UP,
    };
    beforeEach(() => {
      currentState = reducer(currentState, signUp);
    });

    it('SHOULD have signing up flag true', () => {
      expect(currentState.signingUp).to.equal(true);
    });

    it('SHOULD set error to empty', () => {
      expect(currentState.signUpError).to.equal('');
    });
  });

  describe('WHEN sign up failed', () => {
    const signUp = {
      type: actions.SIGN_UP_FAIL,
      error: 'it did not work'
    };

    beforeEach(() => {
      currentState = reducer(currentState, signUp);
    });

    it('SHOULD set the error message', () => {
      expect(currentState.signUpError).to.equal(signUp.error);
    });

    it('SHOULD have signing up flag false', () => {
      expect(currentState.signingUp).to.equal(false);
    });
  });

  describe('WHEN sign up is successfull', () => {
    const signUp = {
      type: actions.SIGN_UP_SUCCESS,
      result: {
        email: 'liviu@ignat.email',
        password: 'blabla'
      }
    };
    beforeEach(() => {
      currentState = reducer(currentState, signUp);
    });

    it('SHOULD return the new user',
      () => expect(currentState.user).to.not.be.undefined);

    it('SHOULD set error to empty', () => {
      expect(currentState.signUpError).to.equal('');
    });

    it('SHOULD have signingUp flag set to false', () => {
      expect(currentState.signingUp).to.equal(false);
    });

    it('SHOULD have the same email', () => {
      expect(currentState.user.email).to.equal(signUp.result.email);
    });
  });
});
