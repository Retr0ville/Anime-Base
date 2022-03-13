import React from "react";
import axios from "axios";
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

  onSearchSubmit = async (user, category) => {
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v3/user/${user}/animelist/${category}`
      );
      this.setState({
        animeResult: response.data.anime,
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
            Greeting's {user}, You requested {response.data.anime.length} items
          </div>
        ),
      });
      console.log(response);

      console.log(this.state);
      this.setState({ currentPage: 0, offset: 0 });
    } catch (err) {
      if (err.message === "Request failed with status code 400") {
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
    const postAnimeSlice = animeSlice.map((anime) => (
      <RecCard
        key={anime.mal_id}
        animeUrl={anime.url}
        imgUrl={anime.image_url}
        animeTitle={anime.title}
        vidUrl={anime.video_url}
        fromDate={anime.start_date}
        toDate={anime.end_date}
        totalEpis={anime.total_episodes}
        seenEpis={anime.watched_episodes}
        rating={anime.rating}
        score={anime.score}
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
    console.log("mounted");
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
          <>
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
          </>
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
