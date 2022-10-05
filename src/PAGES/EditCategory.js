import React, { useEffect, useState } from "react";
import Header from "../COMPANENTS/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../COMPANENTS/Loading";
import Modal from "../COMPANENTS/Modal";
import { useDispatch } from "react-redux";

const EditCategory = (props) => {
	const navigate = useNavigate();
	const params = useParams();
	console.log(params.categoryId);
	const dispatch = useDispatch();
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
		setShowModal(true);
	};

	const editCategory = () => {
		if (newCategoryName === "") {
			alert("Kategori ismi boş bırakılamaz");
		}

		const hasCategory = allCategories.find(
			(item) => item.name.toLowerCase() === newCategoryName.toLowerCase()
		);
		console.log("hasCategory", hasCategory);

		if (hasCategory !== undefined) {
			alert("Kategori Zaten Mevcut!");
		}

		const editedCategory = {
			...category,
			name: newCategoryName,
		};
		axios
			.put(`http://localhost:3004/categories/${category.id}`, editedCategory)
			.then((res) => {
				console.log("editedCategoryRes", res);
				dispatch({ type: "EDIT_CATEGORY", payload: editedCategory });
				setShowModal(false);
				navigate("/categories");
			})
			.catch((err) => console.log("editedCategory ERR", err));
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
			{showModal === true && (
				<Modal
					title={`CATEGORY: "${category.name}"`}
					explain={`Do you want to edit this category to "${newCategoryName}" on the category list?`}
					warning="(If you accept, the book will be edited on your list. This action can't be undone!) "
					onCancel={() => setShowModal(false)}
					onConfirm={() => editCategory()}
				/>
			)}
		</div>
	);
};

export default EditCategory;
