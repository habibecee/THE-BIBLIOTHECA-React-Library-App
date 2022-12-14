import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";

const BooksList = (props) => {
	const { categoriesState, booksState } = useSelector((state) => state);
	const dispatch = useDispatch();
	console.log("categoriesState", categoriesState);
	console.log("booksState", booksState);

	const [filterBooks, setFilterBooks] = useState(null);
	// const [categories, setCategories] = useState(null);
	const [didUpdate, setDidUpdate] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [willDeleteBook, setWillDeleteBook] = useState(null);
	const [willDeletedBookName, setWillDeletedBookName] = useState("");
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		const filtered = booksState.books.filter((item) =>
			item.name.toLowerCase().includes(searchText)
		);
		console.log("filtered", filtered);

		setFilterBooks(filtered);
	}, [booksState, searchText]);

	const deleteBook = (id) => {
		console.log(id);
		axios
			.delete(`http://localhost:3004/books/${id}`)
			.then((res) => {
				console.log(res);
				dispatch({
					type: "DELETE_BOOK",
					payload: id,
				});

				setDidUpdate(!didUpdate);
				setShowModal(false);
			})
			.catch((err) => console.log(err));
	};

	if (
		booksState.success === false ||
		categoriesState.success === false ||
		filterBooks == null
	) {
		return <Loading />;
	}
	return (
		<div className="container-xl my-5 ">
			<div className="Page-text">
				<h1> BOOKS LIST </h1>
			</div>
			<div className="d-flex align-items-center justify-content-between">
				<form className="d-flex justify-content-start w-50" role="search">
					<input
						className="form-control me-0 bg-dark"
						style={{ color: "white" }}
						type="search"
						placeholder="Search In Books List"
						aria-label="Search"
						value={searchText}
						onChange={(event) => setSearchText(event.target.value)}
					/>
					<button className="btn btn-outline-secondary" type="submit">
						<i className="fa-solid fa-magnifying-glass"></i>
					</button>
				</form>
				<div className="my-4 d-flex justify-content-end">
					<Link to="/add-book" className="btnEdit btn btn-secondary ">
						{" "}
						Add New Book{" "}
					</Link>
				</div>
			</div>
			<table className="table ">
				<thead className="thead text-start">
					<tr className="table-dark">
						<th scope="col"></th>
						<th scope="col">BOOK NAME</th>
						<th scope="col">AUTHOR</th>
						<th scope="col">CATEGORY</th>
						<th className="text-center" scope="col">
							ISBN
						</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody className="tbody text-start">
					{filterBooks.map((book) => {
						const category = categoriesState.categories?.find(
							(cat) => cat.id == book?.categoryId
						);
						return (
							<tr key={book?.id}>
								<td> # </td>
								<td> {book?.name} </td>
								<td> {book?.author} </td>
								<td> {category?.name} </td>
								<td className="text-center">
									{" "}
									{book?.isbn === "" ? "-" : book?.isbn}{" "}
								</td>
								<td>
									<div
										className="btn-group d-flex align-items-center justify-content-end"
										role="group"
									>
										<Link
											to={`/edit-book/${book?.id}`}
											className="btn btn-outline-secondary btn-sm me-2"
											type="button"
										>
											{" "}
											<i className="fa-solid fa-pen-to-square"></i>
										</Link>

										<button
											className="btn btn-outline-danger btn-sm"
											type="button"
											onClick={() => {
												setShowModal(true);
												// deleteBook(book.id)
												setWillDeleteBook(book.id);
												setWillDeletedBookName(book.name);
											}}
										>
											{" "}
											<i className="fa-regular fa-trash-can"></i>
										</button>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{showModal === true && (
				<Modal
					title={willDeletedBookName}
					explain={`Are you sure you want to delete ${willDeletedBookName}?`}
					warning={
						"(If you accept, the book will be removed from the list. This action can't be undone!) "
					}
					onConfirm={() => deleteBook(willDeleteBook)}
					onCancel={() => setShowModal(false)}
				/>
			)}
		</div>
	);
};

export default BooksList;
