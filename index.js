import React, { Component } from 'react';
import Movies from './movies';

import { render } from 'react-dom';

class App extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    
    try {
      const res = await fetch(
        'https://api.themoviedb.org/3/discover/movie?api_key=2f59754079cb51126497ed7754eef01f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
      );

      const movies = await res.json();
      this.setState({
        movies: movies.results,
      });
    } catch (e) {
      console.log(e);
    }
   
  }

  render() {
    return (
      <div className="App">
        {this.state.movies.map((movie) => (
          <Movies key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}
class MovieInfo extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <div>
        <AdditionalInfo id={id} />
        <Router>
          <Route path="/" exact component={Index} />
          <Route path="/movieInfo/:id" exact component={MovieInfo} />
          <Route path="/users/" component={Users} />
        </Router>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
