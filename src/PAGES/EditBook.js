import React, { useEffect, useState } from "react";
import Header from "../COMPANENTS/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../COMPANENTS/Loading";
import Modal from "../COMPANENTS/Modal";

const EditBook = (props) => {
	const params = useParams();
	const navigate = useNavigate();
	console.log("params", params);

	const [bookName, setBookName] = useState("");
	const [authorName, setAuthorName] = useState("");
	const [isbn, setIsbn] = useState("");
	const [category, setCategory] = useState("");
	const [categories, setCategories] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		axios
			.get(`http://localhost:3004/books/${params.bookId}`)
			.then((res) => {
				console.log(res.data);
				setBookName(res.data.name);
				setAuthorName(res.data.author);
				setIsbn(res.data.isbn);
				setCategory(res.data.categoryId);
				axios
					.get("http://localhost:3004/categories")
					.then((res) => {
						setCategories(res.data);
					})
					.catch((err) => console.log("categories error", err));
			})
			.catch((err) => console.log(err));
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		setShowModal(true);
	};

	const editBook = () => {
		if (bookName === "" || authorName === "" || category === "") {
			alert("Kitap adı, Yazar adı ve Kategori boş bırakılamaz!!!");
			return;
		}
		const updatedBook = {
			id: params.bookId,
			name: bookName,
			author: authorName,
			isbn: isbn,
			categoryId: category,
		};
		console.log("updatedBook", updatedBook);

		axios
			.put(`http://localhost:3004/books/${params.bookId}`, updatedBook)

			.then((res) => {
				console.log(res);
				setShowModal(false);
				navigate("/");
			})
			.catch((err) => console.log("edit error", err));
	};

	if (categories === null) {
		return <Loading />;
	}

	return (
		<div>
			<Header />
			<div className="Page-text">
				<h1> EDIT BOOK </h1>
			</div>
			<div className="container my-5">
				<form onSubmit={handleSubmit}>
					<div className="row my-5">
						<div className="col">
							<input
								type="text"
								className="form-control"
								placeholder="Book Name"
								value={bookName}
								onChange={(event) => setBookName(event.target.value)}
							/>
						</div>
						<div className="col">
							<input
								type="text"
								className="form-control"
								placeholder="Author Name"
								value={authorName}
								onChange={(event) => setAuthorName(event.target.value)}
							/>
						</div>
					</div>
					<div className="row my-5">
						<div className="col">
							<input
								type="text"
								className="form-control"
								placeholder="ISBN No"
								value={isbn}
								onChange={(event) => setIsbn(event.target.value)}
							/>
						</div>
						<div className="col">
							<select
								className="form-select"
								value={category}
								onChange={(event) => setCategory(event.target.value)}
							>
								<option value={""} selected>
									{" "}
									Select Category{" "}
								</option>
								{categories.map((cat) => {
									return (
										<option key={cat.id} value={cat.id}>
											{" "}
											{cat.name}{" "}
										</option>
									);
								})}
							</select>
						</div>
						<div className="mt-5 d-flex justify-content-center">
							<button
								onClick={() => {
									setShowModal(true);
								}}
								type="submit"
								style={{
									backgroundColor: "darkorchid",
									color: "white",
								}}
								className="btnEdit btn shadow-lg p-1 w-25"
							>
								{" "}
								EDIT BOOK{" "}
							</button>
							<button
								onClick={() => navigate("/")}
								type="button"
								style={{
									color: "white",
								}}
								className="btnCancel btn btn-danger shadow-lg p-1 w-25 ms-5"
							>
								{" "}
								CANCEL EDIT{" "}
							</button>
						</div>
					</div>
				</form>
			</div>
			{showModal === true && (
				<Modal
					title={`Edit ${bookName}`}
					explain={`Do you want to edit ${bookName} on your list?`}
					warning="(If you accept, the book will be edited on your list. This action can't be undone!) "
					onCancel={() => setShowModal(false)}
					onConfirm={() => editBook()}
				/>
			)}
		</div>
	);
};

export default EditBook;
