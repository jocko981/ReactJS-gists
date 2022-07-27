import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
// style
import "./App.css";
// hooks
import { useFetch } from "./hooks/useFetch";

function App() {
  const [currPage, setCurrPage] = useState(1)
  const [pressedId, setPressedId] = useState("")
  const { data, isPending, error, max_pages } = useFetch(currPage)

  useEffect(() => {
    if (!isPending) {
      const listElement = document.getElementById("overflow-list")
      listElement.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }, [data, isPending])

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    setCurrPage(selectedPage)
  };

  const handleRowClick = (id) => {
    if (id === pressedId) {
      setPressedId("")
    } else {
      setPressedId(id)
    }
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Gists</h1>
      </header>

      <section>
        <ul className="list" id="overflow-list">
          {error && <div className="centered-content">{error}</div>}
          {isPending && <div className="centered-content">Loading...</div>}
          {data && data.map(item => (
            <li
              className={pressedId === item.id ? "pressed" : ""}
              onClick={() => handleRowClick(item.id)}
              key={item.id}
            >
              <figure>
                <div className="avatar-box">
                  <img
                    className="avatar-img"
                    src={item.owner.avatar_url}
                    alt="user avatar"
                  />
                </div>
                <p className="title">{Object.keys(item.files)[0]}</p>
              </figure>
            </li>
          ))}
        </ul>
        <footer className="pagination-container">
          <ReactPaginate
            containerClassName={"pagination"}
            previousLabel="&#8249;"
            nextLabel="&#8250;"
            breakLabel={"..."}
            pageCount={max_pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            activeClassName={"active"}
            forcePage={currPage - 1}
          />
        </footer>
      </section>
    </div>
  );
}

export default App;
