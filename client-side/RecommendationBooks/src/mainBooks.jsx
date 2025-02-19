import React,{useState,useEffect, useMemo,} from 'react';
import Footer from './footer';
import { useBook } from './Bookcontext';

function MainBooks() {
  const [books, setBooks] = useState([]);
  const [saved,setSaved] = useState(new Set());
  
  const bestQuotes = [{
    id:"1",
    author:"James Clear",
    bookpublish:"Atomic Habits",
    Quotes:"The Primary reason the Brain remember that past is to better predict what will work in the future "
  },{
    id:"2",
    author:"Napoleon Hill",
    bookpublish :"Think and Grow Rich",
    Quotes:"I am the Master of My Fate and I am Captain of My Soul Because he we will control our thoughts"
  },
  {
  id:"3",
  author:"Joseph Murphy",
  bookpublish:"The Power of Subconsicous Mind",
  Quotes:"Just keep your conscious mind busy with expectation of the best, and make sure the thoughts you habitually think are based on things that are lovely, true, just, and harmonious"
  }
]


   const{setSave} = useBook();

  const API_KEY =import.meta.env.VITE_BOOKS_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes?q="book"&maxResults=36&key=${API_KEY}`;

  const fetchUrl = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error("Fetch failed:", error);
     }
  };
 

  useEffect(() => {

    fetchUrl(url);
    
  }, []);

  const handleClick = (e,id,thumbnail,title_Book,author,link) => {
  e.preventDefault();
  setSave(pre => {
    const newSave = [
    ...pre,
    {
    id,
    img:thumbnail, 
    author,
    link,
    title:title_Book   
  }]

  localStorage.setItem("saved",JSON.stringify(newSave))
  
  return newSave;
})
    

 setSaved(
  (pre) => {
    const newSet = new Set(pre)
    newSet.add(id);
    localStorage.setItem("savedids",JSON.stringify(Array.from(newSet)))

    return newSet;
  }
 )
  }

  const bookLibrary = useMemo(() => {
       
    return books.map((book, index) => (
      <div className='artcleMap'key={book.id || index}>
          <article>
          {book.volumeInfo.imageLinks?.thumbnail ? (
            <div className='thumbnail-div'>
               <img className='thumbnail'
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title || "Book cover"}
            />
            </div>
          ) : (
            <div className='thumbnail-div'>
              <p>No Image Available</p>
            </div> 
          )}
          <div className='book-title'>
          <h3 className='title'>{book.volumeInfo.title}</h3>
          </div>
          <div className='book-author'>
          <p className='author'>{book.volumeInfo.authors?.join(", ") || "Unknown Author"}</p>
          </div>
          <div className='book-savebutton'>
            <a href={book.volumeInfo.previewLink} target='_blank'>
            <button className='SaveBooks'>Read</button>
            </a>  
          </div>
          <div className='book-savebutton'>
          <button className='SaveBooks' onClick={(e)=>handleClick(e,book.id,
            book.volumeInfo.imageLinks?.thumbnail,
            book.volumeInfo.title,
            book.volumeInfo.authors?.join(",")|| "Unknown Author",
            book.volumeInfo.previewLink,)}>{!saved.has(book.id)?"SaveButton":"Saved"}</button>
          </div>       
        </article>
      </div>
      ))
    
 

  },[books,saved])

    return (
      
        <div>
        <section>
        <main>
          <div className='books'>
          {bookLibrary}
          </div>

          <div className='Quotes'>
            <div className='div1'>
             {bestQuotes.map((quotes)  => {
               const{id,author,bookpublish,Quotes} = quotes
               return(
                <div key={id} className='book_map_quotes'>
                  <marquee direction="right">
                  <h3>{author}</h3>
                  </marquee>
                  <marquee direction="left">
                  <h4 className='bookpublish'>{bookpublish}</h4>
                  </marquee> 
                <pre>{Quotes}</pre>
                </div>
               )
             })}
            </div>
          </div>
        </main>
      </section>
      <Footer/>
        </div>
    );
}

export default MainBooks;