import React, { createContext, useState, useReducer, useEffect } from 'react';
import { bookReducer } from '../reducers/bookReducer';

export const BookContext = createContext();

const BookContextProvider = (props) => {
  // const [books, setBooks] = useState([
  //   { title: "name of the wind", author: "patrick rothfuss", id: 1 },
  //   { title: "name of the wind", author: "patrick rothfuss", id: 2 },
  // ]);

  const [books, dispatch] = useReducer(bookReducer, [], () => {
    const localData = localStorage.getItem("books");
    return localData ? JSON.parse(localData) : []
  });

  // const addBook = (title, author) => {
  //   setBooks([...books, { title, author, id: uuid() }]);
  // };
  // const removeBook = (id) => {
  //   setBooks(books.filter(book => book.id !== id));
  // }

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books])

  return (
    // <BookContext.Provider value={{ books, addBook, removeBook }}>
    <BookContext.Provider value={{ books, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
}

export default BookContextProvider;
