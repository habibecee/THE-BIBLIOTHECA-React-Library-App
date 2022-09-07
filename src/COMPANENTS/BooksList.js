import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const BooksList = (props) => {
	const [books, setBooks] = useState(null);
	const [categories, setCategories] = useState(null);
	const [didUpdate, setDidUpdate] = useState(false);

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
			})
			.catch((err) => console.log(err));
	};

	if (books === null || categories === null) {
		return <Loading />;
	}
	return (
		<div className="container-xl my-5 ">
			<div className="my-4 d-flex justify-content-end">
				<Link to="/add-book" className="btn btn-primary ">
					{" "}
					Kitap Ekle{" "}
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
							<tr>
								<td> # </td>
								<td> {book.name} </td>
								<td> {book.author} </td>
								<td> {category.name} </td>
								<td className="text-center">
									{" "}
									{book.isbn === "" ? "-" : book.isbn}{" "}
								</td>
								<td>
									<div className="btn-group" role="group">
										<button
											className="btn btn-outline-primary btn-sm me-2"
											type="button"
										>
											{" "}
											<i className="fa-solid fa-pen-to-square"></i>
										</button>

										<button
											className="btn btn-outline-danger btn-sm"
											type="button"
											onClick={() => deleteBook(book.id)}
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
		</div>
	);
};

export default BooksList;
