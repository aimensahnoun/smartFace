import React from "react";
import "./ImageSearch.css";

function ImageSearch({ onInputChange, onButtonClick }) {
  return (
    <div>
      <p className="f3">
        {"This magical app will detect faces, give it a try!"}
      </p>
      <div className="center">
        <div className="center pa4 br3 shadow-5  form">
          <input
            onChange={onInputChange}
            className="f4 pa2 w-70 center "
            type="text"
            placeholder="Search"
          />
          <button
            onClick={onButtonClick}
            className="pointer w-30 grow f4 link ph3 pv2 dib white bg-light-pink "
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageSearch;
