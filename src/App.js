import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./PAGES/Home";
import AddBook from "./PAGES/AddBook";
import EditBook from "./PAGES/EditBook";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/add-book" element={<AddBook />} />
				<Route path="/edit-book/:bookId" element={<EditBook />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
