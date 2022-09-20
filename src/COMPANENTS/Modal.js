import React from "react";

const Modal = (props) => {
	const { onCancel, onConfirm, title, explain, warning } = props;

	return (
		<button
			onClick={onCancel}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "200vh",
				backgroundColor: "rgba(0,0,0,0.3",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				cursor: "default",
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
				<h2
					className="text-center mt-0"
					style={{
						color: "purple",
						fontSize: "20px",
						fontWeight: "bold",
						textDecorationLine: "underline",
					}}
				>
					{" "}
					{title}{" "}
				</h2>
				<h5 className="text-center" style={{ fontWeight: "bold" }}>
					{" "}
					{explain}{" "}
				</h5>
				<p
					style={{ fontSize: "13px", color: "grayText" }}
					className="text-center"
				>
					{" "}
					{warning}{" "}
				</p>
				<div className="d-flex justify-content-center">
					<button
						onClick={onCancel}
						className="btn btn-sm btn-outline-danger mx-3"
					>
						{" "}
						Close{" "}
					</button>
					<button
						onClick={onConfirm}
						className="btn btn-sm btn-outline-primary"
					>
						{" "}
						Accept{" "}
					</button>
				</div>
			</div>
		</button>
	);
};

export default Modal;
