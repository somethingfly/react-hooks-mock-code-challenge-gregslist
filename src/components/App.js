import React, { useEffect, useState } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then((r) => r.json())
      .then((listings) => setListings(listings));
  }, []);

  function onDeleteListing(deletedListing) {
    const updatedListings = listings.filter((listing) => listing.id !== deletedListing.id);
    setListings(updatedListings);
  }

  function onSearch(searchTerm) {
    setSearchTerm(searchTerm);
  }

  const listingsToDisplay = listings.filter((listing) => {
    if (searchTerm === "") return true;
    return (listing.description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0);
  });


  return (
    <div className="app">
      <Header onSearch={onSearch} />
      <ListingsContainer
        listings={listingsToDisplay}
        onDeleteListing={onDeleteListing}
      />
    </div>
  );
}

export default App;
