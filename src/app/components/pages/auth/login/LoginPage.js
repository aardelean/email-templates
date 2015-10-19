import * as React from 'react';
import ComponentBase from './../../../ComponentBase';
import { Link } from 'react-router';
import { TextFieldData } from './../../../../utils/FormFieldData/index';
import { RequiredStringValidator, EmailValidator, formValidator } from './../../../../utils/Validators/index';

import { loginAction } from './../../../../actions/index';

class LoginPage extends ComponentBase {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: new TextFieldData({
        validators: [ new RequiredStringValidator(), new EmailValidator() ]
      }),
      password: new TextFieldData({
        validators: [ new RequiredStringValidator() ]
      })
    };
  }

  onFormSubmit(e) {
    console.log('submit');
    const user = this.state;
    const validatorResponse = formValidator.validate(user);
    const formData = validatorResponse.formData;
    const isValid = validatorResponse.isValid;

    this.setState(formData);

    if (isValid) {
      loginAction
        .execute({
          email: user.email.value,
          password: user.password.value
        })
        .then(() => {
          this.setState({
            password: this.state.password.reset(),
            email: this.state.email.reset()
          });

          this.props.history.pushState(null, '/app');
        })
        .catch((error) => {
          this.setState({
            password: this.state.password.setError(error.message)
          });
        });
    }

    e.preventDefault();
  }

  handleEmailChange(e) {
    const value = e.target.value;
    this.setState({
      email: this.state.email.setValue(value)
    });
  }

  handlePasswordChange(e) {
    const value = e.target.value;
    this.setState({
      password: this.state.password.setValue(value)
    });
  }

  render() {
    return (
      <div className='LoginPage'>
        <div>
            <form noValidate className='LoginPage-content' onSubmit={this.onFormSubmit.bind(this)}>
              <span className='LoginPage-title'>Login</span>

              <div>
                <input
                  value={this.state.email.value}
                  errorText={this.state.email.error}
                  onChange={this.handleEmailChange.bind(this)}
                  type='email'
                  hintText='Your email'
                  floatingLabelText='Your email' />
              </div>

              <div>
                <input
                  value={this.state.password.value}
                  errorText={this.state.password.error}
                  onChange={this.handlePasswordChange.bind(this)}
                  type='password'
                  hintText='Your password'
                  floatingLabelText='Your password' />
              </div>

              <div className='LoginPage-loginButtonContainer'>
                <button
                  type='submit'
                  label='Login' />
              </div>

              <div>
                <Link className='LoginPage-signUpLink' to={`/auth/signup`}>Create a new account</Link>
                <Link className='LoginPage-resetPasswordLink' to={`/auth/resetpassword`}>I forgot my password</Link>
                <div className='clearfix'/>
              </div>
            </form>
        </div>
      </div>
    );
  }
}

LoginPage.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default LoginPage;
