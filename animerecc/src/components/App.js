import React from "react";
// import axios from "axios";
import ReactPaginate from "react-paginate";
import RecCard from "./RecCard";
import SearchForm from "./SearchForm";
import HeaderWithChild from "./HeaderWithChild";
import "../styles/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      offset: 0,
      data: [],
      perPage: 12,
      currentPage: 0,
      animeResult: [],
      message: [],
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  config = {
    method: "GET",
    headers: {
      'X-MAL-CLIENT-ID':'179f13498c7d3aca2057368324e732c3',
    },
    // mode: 'no-cors',
  }
  onSearchSubmit = async (user, category) => {
    this.setState({ loading: true });
    const stats =  category === 'all' ? '' : `status=${category}`
    try {
      //  deprecated JIKAN
      // const response = await axios.get(
      //   `https://api.jikan.moe/v3/user/${user}/animelist/${category}`
      // );
      const response = await fetch( `https://rtrvl-cors.herokuapp.com/https://api.myanimelist.net/v2/users/${user}/animelist?limit=1000&fields=list_status,id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users&${stats}`, this.config)
      const res = await response.json()
      this.setState({
        animeResult: res.data,
        message: (
          <div
            className="ui label"
            style={{
              backgroundColor: "green",
              color: "beige",
              marginBottom: "5px",
            }}
          >
            {" "}
            Greeting's {user}, You requested {res.data.length} items
          </div>
        ),
      });

      console.log(this.state);
      this.setState({ currentPage: 1, offset: 0 });
    } catch (err) {
      if (err.error === "not_found") {
        this.setState({
          message: (
            <div
              className="ui label"
              style={{
                backgroundColor: "green",
                color: "beige",
                marginBottom: "50px",
              }}
            >
              {" "}
              {user} is not a MyAnimeList.com user
              {/* Hi {user || 'user'}, JikanApi is deprecated, I'm currently working on a new Implmentation 🫡✨ */}
            </div>
          ),
        });
      } else {
        this.setState({
          message: (
            <div
              className="ui label"
              style={{
                backgroundColor: "green",
                color: "beige",
                marginBottom: "50px",
              }}
            >
              {" "}
              {err.message}
            </div>
          ),
        });
      }
      this.setState({ animeResult: [] });
    }
    this.pageList();
    this.setState({ loading: false });
  };
  loads = [
    "Hunting",
    "Lets go",
    "Roaming",
    "Fetching your data",
    "Acquiring leaves",
    "Reading Orbs",
    "Generating intelligence",
    "Generating data",
    "Obtaining books",
    "Using the force",
    "1, 2, 3",
  ];
  pageList = () => {
    const data = this.state.animeResult;
    const animeSlice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    const postAnimeSlice = animeSlice.map(({list_status, node}) => (
      <RecCard
        key={node.id}
        animeUrl={`https://myanimelist.net/anime/${node.id}`}
        imgUrl={node.main_picture.large}
        animeTitle={node.title}
        vidUrl={`https://myanimelist.net/anime/${node.id}/${node.title.replace(/ /g, '_')}/video`}
        fromDate={node.start_date}
        toDate={node.end_date}
        totalEpis={node.num_episodes}
        seenEpis={list_status.num_episodes_watched}
        rating={node.rating}
        score={list_status.score}
      />
    ));
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      postAnimeSlice,
    });
  };
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.pageList();
      }
    );
  };

  componentDidMount() {
    this.pageList();
  }
  render() {
    return (
      <div className="ui main container">
        <h1 className="malbase">
          <img className="folder-icon" src="/img/ani.png" alt="folder-icon" />
          <span>Malbase</span>
        </h1>
        <HeaderWithChild>
            <SearchForm onSubmit={this.onSearchSubmit} />
            <div className="message top">{this.state.message}
            {this.state.animeResult.length > 0 && (
          <div className="top-paginate">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"~"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages"}
              activeClassName={"active"}
              breakClassName={"break-me"}
            />
          </div>
        )}
        </div>
        </HeaderWithChild>
        <div className="message bot">{this.state.message}</div>
        {this.state.animeResult.length > 0 && (
          <div className="top-paginate bot">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"~"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages"}
              activeClassName={"active"}
              breakClassName={"break-me"}
            />
          </div>
        )}
        {this.state.loading && (
          <div class="ui active dimmer">
            <div class="ui large text loader">
              {this.loads[Math.floor(Math.random() * this.loads.length)]}
            </div>
          </div>
        )}
        <div className="ui fluid container" style={{ paddingTop: "20px" }}>
          <div className="ui cards-wrapper">
            {this.state.animeResult.length > 0 ? (
              <div className="ui cards">
                {/* <div className="message">{this.state.message}</div> */}
                {this.state.postAnimeSlice}
              </div>
            ) : (
              <>
                {/* <div className="message bot">{this.state.message}</div> */}
                <div className="walker">
                  <img src="img/cooldood.gif" alt="walking-man" />
                </div>
              </>
            )}
          </div>
        </div>
        {this.state.animeResult.length > 0 && (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"~"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages"}
            activeClassName={"active"}
            breakClassName={"break-me"}
          />
        )}
      </div>
    );
  }
}
export default App;
