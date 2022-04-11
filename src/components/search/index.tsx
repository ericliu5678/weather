import * as React  from "react";
import "./search.css";
import {Suggestion} from "../../types";
import { toggleSlideMenu } from "../../api";

export type SearchProps = {
  suggestion:Suggestion[];
  handleSearchSuggestion: (location: any) => void;
  submitRequest:(location: any) => void;
}

export type SearchState = {
  search: string;
  suggestion: Suggestion[]
}
//class Search<Props extends SearchProps, State extends SearchState, SS=any> extends React.Component<Props, State, SS> {
class Search extends React.Component<SearchProps, SearchState> {
  state: SearchState = {
    search: "",
    suggestion: []
  }

  // This function will submit the search query from user
  handleSearch = (e: React.SyntheticEvent, location:any) => {
    this.props.submitRequest({ params: { query: location } });
    toggleSlideMenu();
    this.setState({ search: "", suggestion: [] });
    e.preventDefault();
  };

  // This function will retrive locations suggestions user
  handleSearchSuggestion = async (e:React.ChangeEvent<HTMLInputElement>) => {
    // Prevents React from resetting its properties:
    e.persist();
    if (e.target.value.length === 0) {
      this.setState({ suggestion: [] });
    }
    await this.props.handleSearchSuggestion({
      params: { query: this.state.search },
    });

    let body = document.getElementsByTagName("body")[0];

    body.className = "stop-scrolling";

    this.setState({ suggestion: this.props.suggestion });

    console.log(this.props.suggestion);
  };

  render() {
    return (
      <div className="hide" id="container">
        <i className="fa fa-times" onClick={toggleSlideMenu}></i>
        <form onSubmit={(e) => this.handleSearch(e, this.state.search)}>
          <i className="fa fa-search"></i>
          <input
            type="text"
            required
            value={this.state.search}
            placeholder="search location"
            onChange={async (e) => {
              await this.setState({ search: e.target.value });
              this.handleSearchSuggestion(e);
            }}
          />
          <button type="submit">Search</button>
        </form>

        {this.state.suggestion.map((item) => {
          return (
            <div
              className="search-suggestion"
              onClick={(e) => this.handleSearch(e, item.city)}
              key={item.woeid}
            >
              <li>{item.city}</li>

              <i className="fa-solid fa-angle-right"></i>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Search;
