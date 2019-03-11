import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  //Render : componentWillMount() -> render() -> componentDidMount()

  //Update: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpadte()

  state={  }

  componentDidMount(){
    this._getMovies();
  }

  _renderMovies = ()=>{
    const movies = this.state.movies.map(movie=>{
      return <Movie 
              title={movie.title_english} 
              poster={movie.medium_cover_image} 
              key={movie.id}
              genres = {movie.genres}
              synopsis = {movie.synopsis}
              />
    })
    return movies;
  }

  // function들을 세분화시켜줘
  //asynchronous : 이전 작업이 끝나야 그 다음작업이 시작하는것이 아니야 순서와 상관없이 진행됨
   _getMovies = async() =>{
    const movies = await this._callApi()
    //await는 기다리라는 의미 this._callApi가 끝날때까지 기다려 라는 의미 이게 성공적아든 아니든 
    //call api 작업이 완료되고 return 하기를 await하다 
    //그리고 밑에 setState는 위에 callApi가 끝나기 전까지 movies에 return 되기 전까지 작동하지 않아
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(response => response.json())
    //밑에 then은 response를 json으로 바꾸고 그러고 then
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render() {
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
