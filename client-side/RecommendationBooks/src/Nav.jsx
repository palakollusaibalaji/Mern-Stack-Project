import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import debounce from "lodash/debounce";

function Nav() {
  const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(() => localStorage.getItem("token-user"));
  const navigate = useNavigate();
  const query = "book";
  const API_KEY = import.meta.env.VITE_BOOKS_API_KEY;

  const fetchAllBooks = async () => {
    let startIndex = 0;
    let allBooks = [];
    try {
      while (true) {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}&maxResults=40&startIndex=${startIndex}`
        );
        const result = await response.json();

        if (result.items) {
          allBooks = [...allBooks, ...result.items];
          startIndex += 40;
        }

        if (allBooks.length >= result.totalItems || !result.items) break;
      }
      setData(allBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleChange = debounce((value) => {
    if (!value) {
      setSearchFilter([]);
      return;
    }
    const res = data.filter((book) =>
      book.volumeInfo.imageLinks?.thumbnail &&
      book.volumeInfo.authors &&
      book.volumeInfo.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchFilter(res);
  }, 300);

  useEffect(() => {
    fetchAllBooks();

    const handleStorageChange = () => {
      const tokenUser = localStorage.getItem("token-user");
      setUser(tokenUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      handleChange.cancel();
    };
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token-user");
    setUser(null);
    navigate('/');
  };

  return (
    <div>
      <section>
        <nav>
          <div className="Header">
            <h1 className="Books">Books</h1>
          </div>
          <div className="section1">
            <NavLink to="/" className="Homenavlink">
              <h3 className="home">Home</h3>
            </NavLink>
            <NavLink to="/MyBooks" className="myBooks">
              <h3 className="mybooks">MyBooks</h3>
            </NavLink>
            <div className="search-input">
              <div className="search">
                <input
                  type="text"
                  value={searchTerm}
                  name="text"
                  id="text"
                  placeholder="Search for books..."
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleChange(e.target.value);
                  }}
                />
              </div>
              <div>
                <div className={`search-index-columns ${searchFilter.length > 0 ? "visible" : "hidden"}`}>
                  {searchFilter.map((search) => {
                    const { volumeInfo } = search;
                    return (
                      <div className="searchbar-options"  
                         key={search.id || `${volumeInfo.title}-${Math.random()}`}>
                        <a
                          href={volumeInfo.previewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="linkToRead"
                        >
                          {volumeInfo.imageLinks?.thumbnail ? (
                            <img
                              src={volumeInfo.imageLinks.thumbnail}
                              alt={volumeInfo.title}
                              className="volumeinfo-thumbnail"
                            />
                          ) : (
                            <p>No photo available</p>
                          )}
                          <div>
                            <p className="volumeinfo-author">{volumeInfo.authors.join(', ')}</p>
                            <p className="volumeinfo-title">{volumeInfo.title}</p>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {user ? (
              <button onClick={handleLogOut} className="Signupnavlink">
                <h3 className="Signup-redirect">Logout</h3>
              </button>
            ) : (
              <NavLink to="/signup" className="Signupnavlink">
                <h3 className="Signup-redirect">Signup</h3>
              </NavLink>
            )}
          </div>
        </nav>
      </section>
    </div>
  );
}

export default Nav;
