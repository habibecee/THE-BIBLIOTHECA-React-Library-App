import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const AddBookForm = (props) => {
	const [categories, setCategories] = useState(null);
	const [bookName, setBookName] = useState("");
	const [authorName, setAuthorName] = useState("");
	const [isbn, setIsbn] = useState("");
	const [category, setCategory] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("http://localhost:3004/categories")
			.then((res) => {
				console.log(res);
				setCategories(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (bookName === "" || authorName === "" || category === "") {
			alert("Kitap,Yazar ve Kategori alanı boş bırakılamaz");
			return;
		}

		const newBook = {
			id: new Date().getTime(),
			name: bookName,
			author: authorName,
			isbn: isbn,
			categoryId: category,
		};

		axios
			.post("http://localhost:3004/books", newBook)
			.then((res) => {
				alert("Kitap Başarıyla Kaydedildi");
				setBookName("");
				setAuthorName("");
				setIsbn("");
				setCategory("");
				navigate("/");
			})
			.catch((err) => console.log(err));
	};

	if (categories === null) {
		return <Loading />;
	}

	return (
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
						<button type="submit" className="btnEdit btn btn-success p-1 w-50">
							{" "}
							SAVE NEW BOOK{" "}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddBookForm;
