import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import RegisterAndLogin from '../Shared/layouts/RegisterAndLogin';
import 'react-datepicker/dist/react-datepicker.css';
import { userActions } from '../../actions/user';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = data => {
    if (data) {
      dispatch(userActions.login(data.email, data.password));
    }
  };
  return (
    <RegisterAndLogin title="Login">
      <section className=" margin-auto">
        <form action="/" method="post" onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="form-group">
                <label className="mb-1">
                  Email
                  <label className="star">*</label>
                </label>
                <input
                  className="form-control"
                  placeholder="example@domain.com"
                  {...register('email', {
                    required: true,
                    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  })}
                />
                {errors?.email && errors?.email.type === 'required' && <p className="error">This field is required</p>}
                {errors?.email && errors?.email.type === 'pattern' && <p className="error">Please enter a valid email</p>}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="mb-1">
                  Password
                  <label className="star">*</label>
                </label>
                <input className="form-control" placeholder="Password" type="password" maxLength="16" {...register('password', { required: true })} />
                {errors?.password && errors?.password.type === 'required' && <p className="error">This field is required</p>}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary mt-0 mx-0 ">
              <i className="ic icon-angle-left-b" /> Login
            </button>
          </div>
          <hr />
          <div className="mt-2 d-flex justify-content-center ">
            do not you have an account?
            <a className="mx-2" href="/register">
              Create one
            </a>
          </div>
        </form>
      </section>
    </RegisterAndLogin>
  );
}
