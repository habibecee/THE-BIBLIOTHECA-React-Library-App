import React, { useEffect, useState } from "react";
import Header from "../COMPANENTS/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../COMPANENTS/Loading";
import Modal from "../COMPANENTS/Modal";
import { useSelector, useDispatch } from "react-redux";

const EditCategory = (props) => {
	const navigate = useNavigate();
	const params = useParams();
	console.log(params.categoryId);
	const [allCategories, setAllCategories] = useState(null);
	const [category, setCategory] = useState(null);
	const [newCategoryName, setNewCategoryName] = useState("");
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		axios
			.get(`http://localhost:3004/categories`)
			.then((res) => {
				console.log(res.data);
				setAllCategories(res.data);
				const myCategory = res.data.find(
					(item) => item.id == params.categoryId
				);
				setCategory(myCategory);
				setNewCategoryName(myCategory.name);
			})
			.catch((err) => console.log("getError", err));
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (newCategoryName === "") {
			alert("Kategori ismi boş bırakılamaz");
		}
	};

	if (allCategories === null) {
		return <Loading />;
	}

	return (
		<div>
			<Header />
			<div className="Page-text">
				<h1> EDIT CATEGORY </h1>
			</div>
			<div className="container my-5">
				<form onSubmit={handleSubmit}>
					<div className="row my-5">
						<div className="col">
							<input
								type="text"
								className="form-control"
								placeholder="Category Name"
								value={newCategoryName}
								onChange={(event) => setNewCategoryName(event.target.value)}
							/>
						</div>
					</div>
					<div className="row my-5">
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
								EDIT CATEGORY
							</button>
							<button
								onClick={() => navigate("/categories")}
								type="button"
								style={{
									color: "white",
								}}
								className="btnCancel btn btn-danger shadow-lg p-1 w-25 ms-5"
							>
								CANCEL EDIT
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditCategory;
