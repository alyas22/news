/* eslint-disable complexity */
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import RegisterAndLogin from '../Shared/layouts/RegisterAndLogin';
import { getNews } from '../../APIs/news';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { userActions } from '../../actions/user';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = data => {
    if (data) {
      dispatch(userActions.registerUser(data));
    }
  };
  return (
    <RegisterAndLogin title="Register">
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
                  {...register('email', { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ })}
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
            <div className="col-md-12">
              <div className="form-group">
                <label className="mb-1">
                  National ID
                  <label className="star">*</label>
                </label>
                <input className="form-control" placeholder="National ID" maxLength="10" {...register('nationalid', { required: true })} />
                {errors?.nationalid && errors?.nationalid.type === 'required' && <p className="error">This field is required</p>}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="mb-1">
                  Name
                  <label className="star">*</label>
                </label>
                <input className="form-control" placeholder="Name" {...register('name', { required: true })} />
                {errors?.name && errors?.name.type === 'required' && <p className="error">This field is required</p>}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="mb-1">
                  Phone Number
                  <label className="star">*</label>
                </label>
                <input
                  className="form-control"
                  placeholder="+966xxxxxxxxx"
                  {...register('phone', { required: true, pattern: /^(\+9665)(?:\d{8})$/ })}
                />
                {errors?.phone && errors?.phone.type === 'required' && <p className="error">This field is required</p>}
                {errors?.phone && errors?.phone.type === 'pattern' && <p className="error">Please enter a valid phone number</p>}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="mb-1">
                  Date of birth
                  <label className="star">*</label>
                </label>
                <Controller
                  control={control}
                  name="dateInput"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                      className="form-control"
                      placeholderText="dd/mm/yyyy"
                      onChange={date => field.onChange(date)}
                      selected={field.value}
                    />
                  )}
                />
                {errors?.dateInput && errors?.dateInput.type === 'required' && <p className="error">This field is required</p>}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary mt-0 mx-0 ">
              <i className="ic icon-angle-left-b" /> Register
            </button>
          </div>
          <hr />
          <div className="mt-2 d-flex justify-content-center ">
            <a className="mx-2" href="/login">
              Already have an account?
            </a>
          </div>
        </form>
      </section>
    </RegisterAndLogin>
  );
}
