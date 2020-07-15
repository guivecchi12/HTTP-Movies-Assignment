import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";


const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const UpdateMovie = props => {
    // console.log ("The props: ", props);
    const { id } = useParams();
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);

    let movies = props.movies;
    // console.log("MOVIES", movies);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                // console.log(res);
                setMovie(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);


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
        // console.log("PUT res: ",res);
        // movies.map(m => {
        //     if(m.id === res.data.id){
        //         movies[m.id] = res.data;
        //     }
        // })
        // console.log(movies);
        props.getMovieList();
        push(`/`)
      })
      .catch(err => console.log("Axios PUT error: ", err))
  }

    
  return (
    <div>
        <h1>Edit Movie</h1>
        <h3>Movie Title: {movie.title}</h3>
        <h3>Director: {movie.director}</h3>
        <h3>Metascore: {movie.metascore}</h3>
        {movie.stars.map(star => (
            <div key={star} className="movie-star">
                {star}
            </div>
        ))}

        <form onSubmit = {handleSubmit}>
            <input 
            type = "text"
            name = "title"
            onChange = {changeHandler}
            placeholder = "title"
            value = {movie.title}  
            />
            <input 
            type = "text"
            name = "director"
            onChange = {changeHandler}
            placeholder = "director"
            value = {movie.director}  
            />
            <input 
            type = "text"
            name = "metascore"
            onChange = {changeHandler}
            placeholder = "metascore"
            value = {movie.metascore}  
            />
            <input 
            type = "text"
            name = "stars"
            onChange = {changeHandler}
            placeholder = "stars"
            value = {movie.stars}  
            />
            <button className="update">Update</button>
        </form>
    </div>
  )
}

export default UpdateMovie;
