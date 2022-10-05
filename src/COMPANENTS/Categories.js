import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";

const Categories = (props) => {
	useEffect(() => {
		document.title = "Library - Categories List";
	}, []);
	const { categoriesState, booksState } = useSelector((state) => state);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [willDeleteCategory, setWillDeleteCategory] = useState("");
	const [willDeletedCategoryName, setWillDeletedCategoryName] = useState("");
	const dispatch = useDispatch();

	const deleteCategory = (id) => {
		axios
			.delete(`http://localhost:3004/categories/${id}`)
			.then((res) => {
				console.log(res.data);
				//kullanıcıya güncel veriyi göstermek için dispatch ile gğncel veri ekrana aktarılır
				dispatch({
					type: "DELETE_CATEGORY",
					payload: id,
				});
				const bookHasCategory = booksState.books.filter(
					(item) => item.categoryId == id
				);
				console.log("bookHasCategory", bookHasCategory);
				bookHasCategory.map((item) =>
					dispatch({ type: "DELETE_BOOK", payload: item.id })
				);
			})
			.catch((err) => console.log("deleteCategoryError", err));
	};

	if (categoriesState.success === false) {
		return <Loading />;
	}

	return (
		<div className="container-xl my-5 ">
			<div className="Page-text">
				<h1> CATEGORIES LIST </h1>
			</div>
			<div className="my-4 d-flex justify-content-end">
				<Link to="/add-category" className="btnEdit btn btn-primary ">
					{" "}
					Add New Category{" "}
				</Link>
			</div>
			<table className="table">
				<thead className="thead text-start">
					<tr className="table-dark">
						<th scope="col"></th>
						<th scope="col">CATEGORY NAME</th>
						<th scope="col">ACTION</th>
					</tr>
				</thead>
				<tbody className="tbody text-start">
					{categoriesState.categories?.map((category) => {
						return (
							<tr key={category.id}>
								<td> # </td>
								<td> {category?.name} </td>

								<td>
									<div className="btn-group" role="group">
										<Link
											to={`/edit-category/${category.id}`}
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
												setShowDeleteModal(true);
												// willDeleteCategory(category.id);
												setWillDeleteCategory(category.id);
												setWillDeletedCategoryName(category.name);
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
			{showDeleteModal === true && (
				<Modal
					title={willDeletedCategoryName}
					explain={`Are you sure you want to delete category of ${willDeletedCategoryName}?`}
					warning={
						"(If you accept, this category will be removed from the category list. This action can't be undone!)"
					}
					onConfirm={() => deleteCategory(willDeleteCategory)}
					onCancel={() => setShowDeleteModal(false)}
				/>
			)}
		</div>
	);
};

export default Categories;
