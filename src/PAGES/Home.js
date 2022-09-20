import React, { useEffect } from "react";
import Header from "../COMPANENTS/Header";
import BooksList from "../COMPANENTS/BooksList";

const Home = (props) => {
	document.title = "Library - Home";
	return (
		<div>
			<Header />
			<BooksList />
		</div>
	);
};

export default Home;
