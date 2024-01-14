import React, { useEffect, useState } from "react";

const InfiniteScroll = () => {
  const [pageData, setPageData] = useState([]);

  const fetchData = async () => {
    let data = await fetch(
      `https://jsonplaceholder.typicode.com/posts?page=1&_limit=30`
    );
    let json = await data.json();
    setPageData((prevPageData) => [...prevPageData, ...json]);
  };

  const handleScroll = () => {
    let innerHeight = window.innerHeight;
    let scrollPos = window.scrollY;
    let totalDomHeight = document.documentElement.scrollHeight;
    if (innerHeight + scrollPos + 10 > totalDomHeight) {
      setTimeout(() => {
        fetchData();
      }, 500);
    }
  };

  useEffect(() => {
    fetchData();

    // u can add this anywhere it is gonna capture the scroll event
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {pageData.map((item) => (
        <div className="title" id={item.id}>
          {item.title}
        </div>
      ))}
      <div>Loading</div>
    </div>
  );
};

export default InfiniteScroll;
