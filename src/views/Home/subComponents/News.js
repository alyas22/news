import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNews } from '../../../APIs/news';
import isoDateConverter from '../../../helper/isoDateConverter';
import { Modal } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { newsActions } from '../../../actions/news';
import { useForm, Controller } from 'react-hook-form';
import SearchNews from './searchNews';
import '../_style.scss';

export default function News() {
  const [newsData, setNewsData] = useState(null);
  const [newsDetailsData, setNewsDetailsData] = useState(null);
  const [show, setShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalResults, setTotalResults] = useState(null);
  const [pageSize] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState('food');
  const dispatch = useDispatch();
  const user = localStorage.getItem('user');
  const parseUser = JSON.parse(user);
  function handleDetailsShow(breakpoint) {
    if (breakpoint) {
      setShow(true);
      setNewsDetailsData(breakpoint);
    }
  }

  function getNewsData(pageSize, pageNumber, searchKeyword) {
    getNews(pageSize, pageNumber, searchKeyword)
      .then(res => {
        setNewsData(res.data.articles);
        setTotalResults(res.data.totalResults);
      })
      .catch(e => {
        alert(e);
      });
  }
  function handlePageChange(pageNum) {
    setPageNumber(pageNum);
    getNewsData(pageSize, pageNum, searchKeyword);
  }
  function handleAddNews(news) {
    if (news) {
      dispatch(newsActions.save({ userid: parseUser.id, ...news }));
    }
  }
  function onSearchSubmit(searchKeyword) {
    setPageNumber(1);
    setSearchKeyword(searchKeyword);
    getNewsData(pageSize, pageNumber, searchKeyword);
  }

  useEffect(() => {
    getNewsData(pageSize, pageNumber, searchKeyword);
  }, []);

  return (
    <>
      <SearchNews searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} onSubmitData={onSearchSubmit} />
      <div className="row col-md-12   mx-5">
        <h3>Results for: {searchKeyword}</h3>
      </div>
      {newsData?.map((news, index) => (
        <div className="card m-5" key={index}>
          <div className="card-header">
            <div>
              {news.title}{' '}
              {parseUser && (
                <a className="add-news" onClick={() => handleAddNews(news)}>
                  Add to my list
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
      <div>
        <Pagination
          className="d-flex justify-content-center"
          activePage={pageNumber}
          itemsCountPerPage={pageSize}
          totalItemsCount={totalResults}
          pageRangeDisplayed={10}
          onChange={handlePageChange}
        />
      </div>

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
