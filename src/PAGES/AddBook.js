import React from "react";
import Header from "../COMPANENTS/Header";
import AddBookForm from "../COMPANENTS/AddBookForm";

const AddBook = (props) => {
	return (
		<div>
			<Header />
			<div className="Page-text">
				<h1> ADD NEW BOOK </h1>
			</div>
			<AddBookForm />
		</div>
	);
};

export default AddBook;
