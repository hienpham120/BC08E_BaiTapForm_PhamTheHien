import React, { Component } from "react";
import { connect } from "react-redux";

class SearchForm extends Component {
  handleSearchInput = (event) => {
    const action = {
      type: "TU_KHOA_TIM_KIEM",
      tuKhoaTimKiem: event.target.value,
    };
    this.props.dispatch(action);
  };
  handleSeacrhSubmit = (event) => {
    event.preventDefault();
    const action = {
      type: "TIM_KIEM_SINH_VIEN",
      tuKhoaTimKiem: this.props.tuKhoaTimKiem,
    };
    this.props.dispatch(action);
  };
  render() {
    return (
      <div className="container h-100 mt-5">
        <div className="d-flex justify-content-center h-100">
          <form
            className="search-form searchbar"
            onClick={this.handleSeacrhSubmit}
          >
            <input
              className="search_input"
              type="text"
              name="seacrh"
              placeholder="Search..."
              value={this.props.tuKhoaTimKiem}
              onChange={this.handleSearchInput}
            />
            <a href="#" className="search_icon">
              <i className="fas fa-search" />
            </a>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tuKhoaTimKiem: state.BaiTapFormReducer.tuKhoaTimKiem,
  };
};

export default connect(mapStateToProps)(SearchForm);
