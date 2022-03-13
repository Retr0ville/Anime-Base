import React from "react";
import RadioInput from "./RadioInput";

class SearchForm extends React.Component {
  state = { currSearchTerm: "nekomata1037", currCategory: "all"};
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.currSearchTerm, this.state.currCategory);
  };
  watchStatus = [
    {
      id: "all",
      value: "all",
      label: "All",
    },
    {
      id: "completed",
      value: "completed",
      label: "Completed",
    },
    {
      id: "watching",
      value: "watching",
      label: "Watching",
    }
  ];
  watchStatus2 = [
    {
      id: "onHold",
      value: "onhold",
      label: "On Hold",
    },
    {
      id: "dropped",
      value: "dropped",
      label: "Dropped",
    },
    {
      id: "ptw",
      value: "ptw",
      label: "Plan to Watch",
    }
  ];

  render() {
    return (
      <div className="ui fluid search" style={{ marginBlock: "20px" }}>
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="ui input search-area" style={{ display: "flex" }}>
            <label className="ui label label-field" htmlFor="animeUser">
              MAL username
            </label>
            <input
              className="ui inputfield"
              id="animeUser"
              type="text/html"
              placeholder="Sophia"
              value={this.state.currSearchTerm}
              onChange={(e) =>
                this.setState({ currSearchTerm: e.target.value })
              }
            />

            <button className="ui submit button green">Get History</button>
          </div>
          <br />
          <div className="radios">
            <div className="set1">
              {this.watchStatus.map((stats) => (
                <RadioInput
                  key={stats.id}
                  id={stats.id}
                  value={stats.value}
                  label={stats.label}
                  onChange={(e) => {
                    this.setState({currCategory: e.target.value });
                    if (this.state.currSearchTerm !== "") {
                      this.props.onSubmit(
                        this.state.currSearchTerm,
                        e.target.value
                      );
                    }
                  }}
                />
              ))}
            </div>
            <div className="set2">
              {this.watchStatus2.map((stats) => (
                <RadioInput
                  key={stats.id}
                  id={stats.id}
                  value={stats.value}
                  label={stats.label}
                  onChange={(e) => {
                    this.setState({currCategory: e.target.value });
                    if (this.state.currSearchTerm !== "") {
                      this.props.onSubmit(
                        this.state.currSearchTerm,
                        e.target.value
                      );
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default SearchForm;
