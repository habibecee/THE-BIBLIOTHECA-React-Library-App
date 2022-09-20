import React, { useEffect } from "react";
import Header from "../COMPANENTS/Header";
import { useSelector } from "react-redux";
import Categories from "../COMPANENTS/Categories";

const CategoriesList = (props) => {
	// const { categoriesState } = useSelector((state) => state);
	return (
		<div>
			<Header />
			<Categories />
		</div>
	);
};

export default CategoriesList;
