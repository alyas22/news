import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../../../APIs/news';
import isoDateConverter from '../../../helper/isoDateConverter';
import { Modal } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { newsActions } from '../../../actions/news';
import '../_style.scss';

export default function News() {
  const [newsData, setNewsData] = useState(null);
  const [newsDetailsData, setNewsDetailsData] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = localStorage.getItem('user');
  const parseUser = JSON.parse(user);
  const news = useSelector(state => state.saveNews);

  function handleDetailsShow(breakpoint) {
    if (breakpoint) {
      setShow(true);
      setNewsDetailsData(breakpoint);
    }
  }

  function handleDeleteNews(news) {
    if (news) {
      dispatch(newsActions.delete(news));
    }
  }
  useEffect(() => {
    dispatch(newsActions.getMyNews());
    setNewsData(news.news);
  }, []);

  return (
    <>
      {newsData?.map((news, index) => (
        <div className="card m-5" key={index}>
          <div className="card-header">
            <div>
              {news.title}{' '}
              {parseUser && (
                <a className="add-news" onClick={() => handleDeleteNews(news)}>
                  Remove
                </a>
              )}
            </div>
          </div>
          <div className="card-body">
            <p className="card-text">{news.description}</p>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-primary" onClick={() => handleDetailsShow(news)}>
                Details
              </button>
            </div>
          </div>
        </div>
      ))}

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Artical Details</Modal.Title>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setShow(false)} />
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-end artical-published-date">{isoDateConverter(new Date(newsDetailsData?.publishedAt))}</div>
          <b>{newsDetailsData?.title} </b>
          <br />
          <br />
          {newsDetailsData?.content}{' '}
          <a href={newsDetailsData?.url} target="_blank" rel="noreferrer">
            see the full artical
          </a>
          <br />
          <div className="d-flex justify-content-end">{newsDetailsData?.author}</div>
        </Modal.Body>
      </Modal>
    </>
  );
}
