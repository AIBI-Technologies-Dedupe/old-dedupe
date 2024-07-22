import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUploadFileMutation } from "../../../api/data";
import FormRow from "../../../components/Form/Row";
import InputParent from "../../../components/Input/Parent";
import ActionButton from "../../../components/Button/ActionButton";
import { ClipLoader } from "react-spinners";

const AddCases = () => {
	const [file, setFile] = useState(null);
	const [uploadFile, { isLoading }] = useUploadFileMutation();
	const navigate = useNavigate();

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) {
			toast.error("Please select a file.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		try {
			await uploadFile(formData).unwrap();
			toast.success("File uploaded successfully!");
			navigate("/");
		} catch (error) {
			if (error.data.error) {
				toast.error(error.data.error);
			} else {
				toast.error("Error occurred while uploading the file.");
			}
		}
	};

	return (
		<div className="flex flex-col gap-6">
			{isLoading ? (
				<div className="flex items-center justify-center h-full">
					<ClipLoader size={50} color={"#123abc"} loading={isLoading} />
				</div>
			) : (
				<>
					<h3 className="text-xl font-bold text-gray-800">Import File</h3>
					<form
						method="POST"
						className="flex flex-col gap-4"
						onSubmit={handleSubmit}>
						<FormRow>
							<InputParent>
								<label className="text-sm">File</label>
								<input
									type="file"
									accept=".xlsx"
									className="p-2 border border-gray-300 w-[100%]"
									onChange={handleFileChange}
									required
								/>
							</InputParent>
						</FormRow>
						<ActionButton type="submit" disabled={isLoading}>
							{isLoading ? "Importing..." : "Import"}
						</ActionButton>
					</form>
				</>
			)}
		</div>
	);
};

export default AddCases;
