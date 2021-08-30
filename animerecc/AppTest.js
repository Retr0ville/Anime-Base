import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate'
import RecCard from './RecCard';
import SearchForm from './SearchForm'

class App extends React.Component{
constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0,
            animeResult:[]
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    
onSearchSubmit = async (term, category) =>{
  const response = await axios.get(`https://api.jikan.moe/v3/user/${term}/animelist/${category}`);
  this.setState({animeResult:response.data.anime})
  
console.log(this.state);
};
pageList = () => {
const data = this.state.animeResult;
  const animeSlice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
  const postAnimeSlice = animeSlice.map((anime) => {
            return(
            <RecCard 
            key = {anime.mal_id}
            animeUrl = {anime.url}
            imgUrl = {anime.image_url}
            animeTitle = {anime.title}
            vidUrl = {anime.video_url}
            fromDate = {anime.start_date}
            toDate = {anime.end_date}
            totalEpis = {anime.total_episodes}
            seenEpis = {anime.watched_episodes}
            rating = {anime.rating}
            score = {anime.score}

            />);
            }
            );
  this.setState({
    pageCount: Math.ceil(data.length / this.state.perPage), 
    postAnimeSlice
  });
}
handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.pageList()
        });

    };

    componentDidMount() {
        this.pageList()
    }
render(){
  return ( 
    <div style= {{backgroundColor:'black'}}>
      <SearchForm onSubmit={this.onSearchSubmit}/>
      <div className ='ui container' style={{paddingTop:'20px'}}>
      <div className = 'ui label'  style= {{backgroundColor:'green',color:'beige', marginBottom:'5px'}}> found {this.state.animeResult.length} items</div>
        <div className='ui cards'>

                {this.state.postAnimeSlice}
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
          </div>
      </div>
    );
  }
}
export default App;