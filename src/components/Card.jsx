import React from "react";

const Card = ({ image, title, overview, onClick }) => {
  return (
    <div className="flex flex-row flex-wrap">
      <div className="card w-60 bg-white shadow-xl mx-0 my-0">
        <figure>
          <img onClick={onClick} src={image} alt="Movies" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-black w-50 h-8">{title}</h2>
          <p className="text-black">{overview}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch Now!</button>
            <button className="btn btn-xs sm:btn-sm md:btn-md ">
              Add to Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
