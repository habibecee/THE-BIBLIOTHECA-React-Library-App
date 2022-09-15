import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const BooksList = (props) => {
	const [books, setBooks] = useState(null);
	const [categories, setCategories] = useState(null);
	const [didUpdate, setDidUpdate] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [willDeleteBook, setWillDeleteBook] = useState(null);

	useEffect(() => {
		axios
			.get("http://localhost:3004/books")
			.then((resBook) => {
				console.log(resBook);
				setBooks(resBook.data);
				axios
					.get("http://localhost:3004/categories")
					.then((resCat) => {
						setTimeout(() => {
							setCategories(resCat.data);
						}, 200);
					})
					.catch((err) => console.log("categories err", err));
			})
			.catch((err) => console.log("books err", err));
	}, [didUpdate]);

	const deleteBook = (id) => {
		console.log(id);
		axios
			.delete(`http://localhost:3004/books/${id}`)
			.then((res) => {
				console.log(res);
				setDidUpdate(!didUpdate);
				setShowModal(false);
			})
			.catch((err) => console.log(err));
	};

	if (books === null || categories === null) {
		return <Loading />;
	}
	return (
		<div className="container-xl my-5 ">
			<div className="Page-text">
				<h1> BOOKS LIST </h1>
			</div>
			<div className="my-4 d-flex justify-content-end">
				<Link to="/add-book" className="btnEdit btn btn-primary ">
					{" "}
					Add New Book{" "}
				</Link>
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
					</tr>
				</thead>
				<tbody className="tbody text-start">
					{books.map((book) => {
						const category = categories.find(
							(cat) => cat.id === book.categoryId
						);
						return (
							<tr key={book.id}>
								<td> # </td>
								<td> {book?.name} </td>
								<td> {book?.author} </td>
								<td> {category?.name} </td>
								<td className="text-center">
									{" "}
									{book?.isbn === "" ? "-" : book?.isbn}{" "}
								</td>
								<td>
									<div className="btn-group" role="group">
										<Link
											to={`edit-book/${book.id}`}
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
					title={"DELETE BOOK"}
					explain={"Are you sure you want to delete this book? "}
					warning={
						"(If you accept, the book will be removed from the list. This action can't be undone!) "
					}
					shouldDo={() => deleteBook(willDeleteBook)}
					setShowModal={setShowModal}
				/>
			)}
		</div>
	);
};

export default BooksList;
