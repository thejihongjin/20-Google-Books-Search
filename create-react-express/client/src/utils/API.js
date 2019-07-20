import axios from "axios";

export default {
    searchBooks: query => {
        return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query);
  },
    saveBook: bookData => {
      return axios.post("/api/books", bookData);
    },
    getBooks: () => {
      return axios.get("/api/books/");
    },
    deleteBook: id => {
      return axios.delete("/api/books/" + id);
    }
}