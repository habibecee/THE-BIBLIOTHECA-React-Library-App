import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./PAGES/Home";
import AddBook from "./PAGES/AddBook";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/add-book" element={<AddBook />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
