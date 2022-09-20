import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
	return (
		<nav className="navbar navbar-dark navbar-expand-lg bg-dark ">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand me-5">
					THE BIBLIOTHECA
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto ms-5 mb-2 mb-lg-0">
						<li className="nav-item ms-5">
							<Link className="nav-link active" aria-current="page" to="/">
								Books List
							</Link>
						</li>
						<li className="nav-item ms-5">
							<Link
								className="nav-link active"
								aria-current="page"
								to="/categories"
							>
								Categories List
							</Link>
						</li>
					</ul>
					<form className="d-flex" role="search">
						<input
							className="form-control me-0 bg-dark"
							type="search"
							placeholder="Search On Site"
							aria-label="Search"
						/>
						<button className="btn btn-outline-secondary" type="submit">
							<i className="fa-solid fa-magnifying-glass"></i>
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
};

export default Header;
