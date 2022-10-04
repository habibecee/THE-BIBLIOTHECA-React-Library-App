import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Loading from "./Loading";
import Categories from "./Categories";

const AddCategoryForm = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [categoryName, setCategoryName] = useState("");
	const { categoriesState } = useSelector((state) => state);
	console.log(categoriesState);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (categoryName === "") {
			alert("Kategori İsmi Boş Bırakılamaz!");
			return;
		}
		const hasCategory = categoriesState.categories.find(
			(item) =>
				item.name.toLowerCase().trim() === categoryName.toLowerCase().trim()
		);
		if (hasCategory !== undefined) {
			alert("Kategori zaten mevcut!");
			return;
		}

		const newCategory = {
			id: new Date().getTime(),
			name: categoryName[0].toUpperCase() + categoryName.substring(1),
		};
		axios
			.post(" http://localhost:3004/categories", newCategory)
			.then((res) => {
				console.log(res.data);
				dispatch({ type: "ADD_CATEGORY", payload: newCategory });
				navigate("/categories");
			})
			.catch((err) => console.log("category err", err));
	};

	if (categoriesState.success !== true) {
		return <Loading />;
	}

	return (
		<div className="container my-5">
			<form
				onSubmit={handleSubmit}
				className="d-flex justify-content-center align-items-center row"
				style={{ width: "800px", marginLeft: "150px", marginTop: "100px" }}
			>
				<div className="col">
					<span className="text-center"> NEW CATEGORY NAME: </span>
				</div>
				<div className="col" style={{ minWidth: "350px" }}>
					<div className="">
						<input
							type="text"
							className="form-control"
							placeholder="New Category Name"
							value={categoryName}
							onChange={(event) => setCategoryName(event.target.value)}
						/>
					</div>
				</div>

				<div className="col ">
					<button
						type="submit"
						className="btnEdit btn btn-success"
						style={{ padding: "7px" }}
					>
						{" "}
						SAVE NEW CATEGORY{" "}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddCategoryForm;
