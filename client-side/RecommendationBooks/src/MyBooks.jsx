import React, { useEffect, useState } from 'react';

function MyBooks() {
  
    const [save,setSave] = useState([])
    const [saveId,setSaveId] = useState([])

  useEffect(() => {
     const setSavedBooks = JSON.parse(localStorage.getItem("saved")) || [];
     const bookIds = JSON.parse(localStorage.getItem("savedids")) || [];
     setSave(setSavedBooks);
     setSaveId(bookIds);
  },[])
 
    const removeBook = (id) => {

        const updatedBooks = save.filter((book) => book.id !== id);
        const updatedIds = saveId.filter((saveId) => saveId !== id);
        
        localStorage.setItem("saved", JSON.stringify(updatedBooks));
        localStorage.setItem("savedids", JSON.stringify(updatedIds));
  
        setSave(updatedBooks);
        setSaveId(updatedIds);
      
    }


    return (
        <div className='mybooks-div'>
        {save.length ===0 ?(
            <p>No Books Saved</p>
        ):(
            <div className='books-MyBooks'>
            {save.map((book, index) => (
                 <a href={book.Link}
                 target="_blank"
                 rel="noopener noreferrer"
                 className='linkToRead'>
              <div className='artcleMap'key={book.id || index}>
                  <article>
                    <div className='crossMark'>
                    <i class="ri-close-line" onClick={() => removeBook(book.id)} ></i>
                    </div>
                  {book.img?(
                    <div className='thumbnail-div'>
                       <img className='thumbnail'
                      src={book.img}
                      alt={book.title || "Book cover"}
                    />
                    </div>
                  ) : (
                    <div className='thumbnail-div'>
                      <p>No Image Available</p>
                    </div> 
                  )}
                  <div className='book-title'>
                  <h3 className='title'>{book.title}</h3>
                  </div>
                  <div className='book-author'>
                  <p className='author'>{book.author|| "Unknown Author"}</p>
                  </div>
                  <div className='book-savebutton'> 
                  <button className='SaveBooks'>Read</button>
                  </div>       
                </article>
              </div>
              </a>
              ))
            }
            </div>
        )}  
        </div>
    );
}

export default MyBooks;