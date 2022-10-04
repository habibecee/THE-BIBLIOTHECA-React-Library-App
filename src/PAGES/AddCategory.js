import React, { useEffect } from "react";
import Header from "../COMPANENTS/Header";
import AddCategoryForm from "../COMPANENTS/AddCategoryForm";

const AddCategory = (props) => {
	useEffect(() => {
		document.title = "Library - Add Category";
	}, []);
	return (
		<>
			<Header />
			<div className="Page-text">
				<h1> ADD NEW CATEGORY </h1>
			</div>
			<AddCategoryForm />
		</>
	);
};

export default AddCategory;
