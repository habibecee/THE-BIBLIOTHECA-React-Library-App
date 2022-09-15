import React from "react";

const Modal = (props) => {
	const { setShowModal, shouldDo, title, explain, warning } = props;

	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100vw",
				height: "120vh",
				backgroundColor: "rgba(0,0,0,0.3",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				style={{
					width: "50%",
					padding: "20px",
					backgroundColor: "#fff",
					borderRadius: "5px",
				}}
			>
				<h4
					className="text-center mt-0"
					style={{ color: "red", fontSize: "14px", fontWeight: "bold" }}
				>
					{" "}
					{title}{" "}
				</h4>
				<h5 className="text-center" style={{ fontWeight: "bold" }}>
					{" "}
					{explain}{" "}
				</h5>
				<p style={{ fontSize: "13px", color: "grayText" }}> {warning} </p>
				<div className="d-flex justify-content-center">
					<button
						onClick={() => setShowModal(false)}
						className="btn btn-sm btn-outline-danger mx-3"
					>
						{" "}
						Close{" "}
					</button>
					<button onClick={shouldDo} className="btn btn-sm btn-outline-primary">
						{" "}
						Okay{" "}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
