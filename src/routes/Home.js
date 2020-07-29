import React from 'react';
import axios from 'axios';
import Movie from '../Components/Movie';
import './Home.css'

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log("construct");
  }

  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    this.setState({ movies, isLoading: false });
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.getMovies();
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  state = {
    isLoading: true,
    movies: [],
  };

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            "Loading..."
          </div>
        ) : (
            <div className="movies">
              {movies.map((movie) => {
                console.log(movie);
                return <Movie
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  year={movie.year}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres} />;
              })
              }</div>
          )}
      </section>
    );
  }
}

export default Home;
