import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

import config from "../../config.js";
import Statistics from "../../components/Statistics.jsx";

import "./News.css";
import "../../pagination.css";

const News = ({ itemsPerPage }) => {
  const apiURL = config.apiURL;
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL + "/news");
        console.log(response.data.news);
        setNews(
          response.data.news.map((news) => {
            return {
              ...news,
              satire_title: Math.round(news.satire_title * 100),
              satire_content: Math.round(news.satire_content * 100),
            };
          })
        );
      } catch (err) {
        console.log(err);
        if (err.response) {
          if (err.response.status === 403) {
            setError("Error " + err.response.status + " " + err.response.data);
          }
          setError("Error " + err.response.status + " " + err.response.data);
        } else {
          setError("Unknown error.");
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (news.length === 0) return;
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(news.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(news.length / itemsPerPage));
  }, [news, itemOffset, itemsPerPage]);

  const NewsItems = ({ currentItems }) => {
    return (
      <div className="all-news-container">
        {currentItems &&
          currentItems.map((news) => (
            <div className="news-container" key={news.title}>
              <div className="news-header">
                <h4>Procent de satiră</h4>
                <div className="news-predictions">
                  <Statistics text="Titlu" percent={news.satire_title} />
                  <Statistics
                    text="Titlu + conținut"
                    percent={news.satire_content}
                  />
                </div>
              </div>
              <div className="line" />
              <div className="news-body">
                <h3>{news.title}</h3>
                <p>{news.content}</p>
              </div>
              <div className="line" />
              <div className="news-footer">
                <a href={news.link} target="_blank">
                  {news.source}
                </a>
                <p>{news.date}</p>
              </div>
            </div>
          ))}
      </div>
    );
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % news.length;
    setItemOffset(newOffset);
  };

  return (
    <main className="news-main">
      <h2>
        Cele mai recente știri în care modelul nostru a identificat satiră
      </h2>
      {error && <p className="error">{error}</p>}
      <NewsItems currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </main>
  );
};

export default News;
