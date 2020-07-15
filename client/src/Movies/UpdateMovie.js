import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";


const updateMovie = props => {
    console.log ("The props: ", props);

  const initMovie = {
    title: title,
    director: director,
    metascore: metascore,
    stars: stars
  };

  const [movie, setMovie] = useState(initMovie);
  const { push } = useHistory();
  const { id } = useParams();

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;

    setMovie({
      ...movie,
      [e.target.name]: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log(res);
        // props.setMovie(res.data)
      })
      .catch(err => console.log("Axios PUT error: ", err))
  }


  return (
    <div>
        <h2>Edit Movie</h2>
        <form onSubmit = {handleSubmit}>
        <input 
          type = "text"
          name = "title"
          onChange = {changeHandler}
          placeholder = "Title"
          value = {movie.title}  
        />
        <button className="update">Update</button>
        </form>
    </div>
  )
}

export default updateMovie;
