import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Categories = (props) => {
	useEffect(() => {
		document.title = "Library - Categories List";
	}, []);
	const { categoriesState } = useSelector((state) => state);

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
			<table className="table ">
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
											to={`edit-category/${category.id}`}
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
												// setShowModal(true);
												// // deleteBook(book.id)
												// setWillDeleteBook(book.id);
												// setWillDeletedBookName(book.name);
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
			{/* {showModal === true && (
				<Modal
					title={willDeletedBookName}
					explain={`Are you sure you want to delete ${willDeletedBookName}?`}
					warning={
						"(If you accept, the book will be removed from the list. This action can't be undone!) "
					}
					onConfirm={() => deleteBook(willDeleteBook)}
					onCancel={() => setShowModal(false)}
				/>
			)} */}
		</div>
	);
};

export default Categories;
