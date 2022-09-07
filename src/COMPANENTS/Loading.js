import React from "react";

const Loading = (props) => {
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				style={{ width: "60px", height: "60px" }}
				className="spinner-border text-warning"
				role="status"
			>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
};

export default Loading;
