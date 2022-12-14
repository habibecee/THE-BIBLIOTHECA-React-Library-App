import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Home from "./PAGES/Home";
import AddBook from "./PAGES/AddBook";
import EditBook from "./PAGES/EditBook";
import CategoriesList from "./PAGES/CategoriesList";
import AddCategory from "./PAGES/AddCategory";
import EditCategory from "./PAGES/EditCategory";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		// CATEGORIES
		dispatch({ type: "FETCH_CATEGORIES_START" });
		axios
			.get("http://localhost:3004/categories")
			.then((res) => {
				dispatch({
					type: "FETCH_CATEGORIES_SUCCESS",
					payload: res.data,
				});
			})
			.catch((err) =>
				dispatch({
					type: "FETCH_CATEGORIES_FAIL",
					payload: "HATA: Kategoriler Çekilemedi!",
				})
			);

		// BOOKS
		dispatch({ type: "FETCH_BOOKS_START" });
		axios
			.get("http://localhost:3004/books")
			.then((res) => {
				dispatch({
					type: "FETCH_BOOKS_SUCCESS",
					payload: res.data,
				});
			})
			.catch((err) =>
				dispatch({
					type: "FETCH_BOOKS_FAIL",
					payload: "HATA: Kitaplar Çekilemedi!",
				})
			);
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/add-book" element={<AddBook />} />
				<Route path="/edit-book/:bookId" element={<EditBook />} />
				<Route path="/categories" element={<CategoriesList />} />
				<Route path="/add-category" element={<AddCategory />} />
				<Route path="/edit-category/:categoryId" element={<EditCategory />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
