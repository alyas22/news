import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNews } from '../../../APIs/news';
import isoDateConverter from '../../../helper/isoDateConverter';
import { Modal } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { newsActions } from '../../../actions/news';
import { useForm, Controller } from 'react-hook-form';

import '../_style.scss';

export default function searchNews(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { onSubmitData } = props;
  const onSubmit = data => {
    if (data) {
      onSubmitData(data.searchNews);
    }
  };
  return (
    <form action="/" method="post" onSubmit={handleSubmit(onSubmit)}>
      <div className="row col-md-12  d-flex justify-content-end mb-3">
        <div className="col-md-4 ">
          <div className="form-group">
            <input className="form-control" placeholder="Search" {...register('searchNews')} />
          </div>
        </div>
        <div className="col-md-4 ">
          <button type="submit" className="btn btn-primary mt-0 mx-0 ">
            <i className="ic icon-angle-left-b" /> Search
          </button>
        </div>
      </div>

      <hr />
    </form>
  );
}
