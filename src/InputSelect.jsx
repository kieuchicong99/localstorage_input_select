import React from "react";
import iconClose from "./assets/icon-close.png";
import iconDropDown from "./assets/icon-drop-down.png";
import iconDropUp from "./assets/icon-drop-up.png";
import "./index.css";
export default class InputSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localStorageData: [],
      recommendationsSearch: [],
      chooseValue: "",
      showRecommendationFlag: false,
      storeKey: props.storeKey,
    };
  }

  showRecommendation = async () => {
    this.setState({
      showRecommendationFlag: !this.state.showRecommendationFlag,
    });
    await this.getRecommendationSearch();
  };

  getRecommendationSearch = () => {
    let temp = localStorage.getItem(this.state.storeKey);
    if (temp === null) {
      this.setState({
        localStorageData: { data: [] },
        recommendationsSearch: [],
      });
    }
    if (typeof temp === "string") {
      this.setState({
        localStorageData: JSON.parse(temp),
        recommendationsSearch: JSON.parse(temp).data,
      });
    }
  };

  filterSearch = async (value) => {
    this.setState({ showRecommendationFlag: true });
    await this.getRecommendationSearch();
    let data = this.state.localStorageData.data;
    let result = data.filter((item) => item.includes(value));
    this.setState({ recommendationsSearch: result });
  };

  saveSearchToLocal = async (value) => {
    await this.getRecommendationSearch();
    let data = new Set(this.state.localStorageData.data);
    if (value !== null) {
      data.add(value);
    }
    data = Array.from(data);
    await localStorage.setItem(
      this.state.storeKey,
      JSON.stringify({ data: data })
    );
    await this.getRecommendationSearch();
  };

  clearRecommendationSearch = () => {
    this.setState({ recommendationsSearch: [] });
  };

  delRecommendationSearchItem = async (value) => {
    let data = new Set(this.state.localStorageData.data);
    data.delete(value);
    data = Array.from(data);
    localStorage.setItem(this.state.storeKey, JSON.stringify({ data: data }));
    await this.getRecommendationSearch();
    if (this.state.localStorageData.data.length === 0) {
      this.setState({ showRecommendationFlag: false });
    }
  };

  handlePress = (e) => {
    if (e.key === "Enter") {
      this.saveSearchToLocal(e.target.value);
      let temp = this.state.recommendationsSearch;
      temp = new Set(temp);
      if (e.target.value !== null) {
        temp.add(e.target.value);
      }
      temp = Array.from(temp);
      this.setState({ recommendationsSearch: temp });
      this.props.handleInput(this.state.chooseValue);
    }
  };

  changeValueInput = (event) => {
    this.setState({ chooseValue: event.target.value });
    this.filterSearch(event.target.value);
  };

  changeValueSelect = async (value) => {
    await this.setState({ chooseValue: value });
    this.props.handleInput(this.state.chooseValue);
  };

  render() {
    const placeholderName = this.props.placeholderName;
    return (
      <div className="font">
        <div className="box-search">
          <label>
            <input
              type="text"
              onChange={this.changeValueInput}
              onFocus={() => {
                this.getRecommendationSearch();
                this.setState({ showRecommendationFlag: true });
              }}
              onKeyDown={(e) => {
                this.handlePress(e);
              }}
              placeholder=" "
              autoComplete="off"
              style={{ width: "120px", boxSizing: "border-box" }}
              value={this.state.chooseValue}
              className="input font"
            />
            <span>{placeholderName}</span>
          </label>
          <img
            width="30px"
            height="30px"
            src={
              this.state.showRecommendationFlag === true
                ? iconDropDown
                : iconDropUp
            }
            onClick={this.showRecommendation}
            style={{ position: "absolute", right: "-5px", top: "5px" }}
          ></img>
        </div>

        <div
          style={{
            display:
              this.state.showRecommendationFlag &&
              this.state.recommendationsSearch.length > 0
                ? ""
                : "none",
          }}
          className="box-select"
        >
          {this.state.recommendationsSearch.map((item, index) => (
            <div className="row row-hover" key={index}>
              <div
                style={{ width: "80%" }}
                value={item}
                onClick={() => {
                  this.changeValueSelect(item);
                }}
                className="item-select-hover"
              >
                {item}
              </div>
              <div
                style={{
                  width: "20%",
                }}
                className="item-delete-hover flex-center-center"
              >
                <img
                  style={{ width: "14px", height: "14px" }}
                  src={iconClose}
                  onClick={() => {
                    this.delRecommendationSearchItem(item);
                  }}
                ></img>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
