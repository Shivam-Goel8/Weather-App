import axios from "axios";
import React, { useEffect, useState } from "react";

function NewsBody() {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "b952b826447e409bb3fd4c7be78df496"; // Replace with your API Key

  // Function to fetch news
  const SearchNews = async () => {
    setLoading(true);
    setError("");

    try {
      let url = query.trim()
        ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
        : `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

      console.log("Fetching news from:", url); // Debugging

      const response = await axios.get(url);
      console.log("API Response:", response.data); // Debugging

      if (response.data.articles.length > 0) {
        setNews(response.data.articles);
      } else {
        setError("No news found. Try a different keyword.");
        setNews([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to fetch news. Please try again later.");
    }

    setLoading(false);
  };

  // Fetch news on first load
  useEffect(() => {
    SearchNews();
  }, []);

  // Handle search when clicking the button or pressing Enter
  const handleSearch = () => {
    if (query.trim() !== "") {
      SearchNews();
    }
  };

  return (
    <div className="container mt-4">
      {/* Search Input */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search News..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn btn-primary ms-2" onClick={handleSearch}>
          Search
        </button>
      </div>

      <h2 className="text-center">Today's News</h2>

      {/* Error Message */}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Loading State */}
      {loading && <p className="text-center">Loading...</p>}

      {/* News Cards */}
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {news.map((elm, index) => (
          <div className="card" style={{ width: "18rem" }} key={index}>
            <img
              src={elm.urlToImage || "https://via.placeholder.com/300"}
              className="card-img-top"
              alt="News"
            />
            <div className="card-body">
              <h5 className="card-title">{elm.title}</h5>
              <p className="card-text">{elm.description || "No description available."}</p>
              <a
                href={elm.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsBody;
