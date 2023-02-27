import React, { useState } from "react";

// Note deliverable states: 'I can "favorite" and "unfavorite"
// a listing on the frontend by clicking the star icon. This feature doesn't need backend persistence.'
// No mention if this favorite needs to stay between renders of the component.
// Since "favorite" has no functionality, no clue what would be needed.
// Doing easiest: keeping state on the component itself.

function ListingCard({ listing, onDeleteListing }) {
  const [favorite, setFavorite] = useState(false);

  function deleteListing() {
    fetch(`http://localhost:6001/listings/${listing.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteListing(listing));
  }

  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img
          src={listing.image ? listing.image : "https://via.placeholder.com/300x300"}
          alt={listing.description ? listing.description : "description"}
        />
      </div>
      <div className="details" onClick={() => setFavorite(!favorite)}>
        {favorite ? (
          <button className="emoji-button favorite active">★</button>
        ) : (
          <button className="emoji-button favorite">☆</button>
        )}
        <strong>{listing.description ? listing.description : "description"}</strong>
        <span> · {listing.location ? listing.location :"location"}</span>
        <button className="emoji-button delete" onClick={deleteListing}>🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;
