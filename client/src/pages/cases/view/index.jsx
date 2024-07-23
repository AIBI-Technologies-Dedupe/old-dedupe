import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputParent from "../../../components/Input/Parent";
import ActionButton from "../../../components/Button/ActionButton";
import { useLazyGetSearchDataQuery } from "../../../api/search";
import { toast } from "react-toastify";

const checkboxFields = [
	{ name: "first_name", label: "First Name" },
	{ name: "dob", label: "DOB" },
	{ name: "mobile1", label: "Phone Number" },
	{ name: "pan_number", label: "Pan Number" },
	{ name: "middle_name", label: "Middle Name" },
	{ name: "last_name", label: "Last Name" },
	{ name: "father_name", label: "Father Name" },
	{ name: "login_date", label: "Login Date" },
	{ name: "residence_address", label: "Residence Address" },
	{ name: "residence_area", label: "Residence Area" },
	{ name: "company_name", label: "Company Name" },
	{ name: "office_address", label: "Office Address" },
	{ name: "compnay_area_name", label: "Company Area" }, // Typo in backend "compnay_area_name"
	{ name: "email_id", label: "Email ID" },
	{ name: "aadhar_number", label: "Aadhar Number" },
	{ name: "passport_number", label: "Passport Number" },
	{ name: "election_id_number", label: "Election ID Number" },
	{ name: "vehicle_number", label: "Vehicle Number" },
	{ name: "dl_number", label: "DL Number" },
	{ name: "remarks", label: "Remarks" },
	{ name: "client_name", label: "Client Name" },
	{ name: "product_name", label: "Product Name" },
	{ name: "residence_city_name", label: "Residence City" },
	{ name: "residence_state_name", label: "Residence State" },
	{ name: "residence_pincode", label: "Residence Pincode" },
	{ name: "company_city_name", label: "Company City" },
	{ name: "company_pincode", label: "Company Pincode" },
	{ name: "company_state_name", label: "Company State" },
	{ name: "status_name", label: "Status" },
].sort((a, b) => a.label.localeCompare(b.label));

const ViewCases = () => {
	const [formData, setFormData] = useState({});
	const [selectedFields, setSelectedFields] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 10;
	const [triggerSearch, { isLoading }] = useLazyGetSearchDataQuery();
	const [records, setRecords] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleFieldSelection = (e) => {
		const { value } = e.target;
		setSelectedFields((prevState) => {
			const newFields = prevState.includes(value)
				? prevState.filter((field) => field !== value)
				: [...prevState, value];

			const newFormData = { ...formData };
			if (!newFields.includes(value)) {
				delete newFormData[value];
			}
			setFormData(newFormData);
			return newFields;
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setRecords([]); // Clear previous records
		const fieldNames = Object.keys(formData).filter((key) => formData[key]);

		if (fieldNames.length === 0) {
			toast.error("Please fill in at least one search field.");
			return;
		}

		try {
			const response = await triggerSearch({
				field_name: fieldNames,
				search_term: fieldNames.map((key) => formData[key]),
				limit: rowsPerPage,
				page: currentPage,
			}).unwrap();
			setRecords(response.data || []);
			setTotalPages(response.totalPages || 1);
		} catch (error) {
			if (error.status === 404) toast.error("No Records Found");
			else {
				toast.error("Error occurred while searching.");
			}
		}
	};

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
		handleSubmit(new Event("submit"));
	};

	const handleNavigate = (id) => {
		navigate(`/cases/view/${id}`);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	if (isLoading) return <div>Loading...</div>;

	const limitedFields = [
		"client_name",
		"product_name",
		"first_name",
		"status_name",
		"dob",
		"mobile1",
		"pan_number",
	];

	return (
		<div className="flex flex-col gap-6">
			<h3 className="text-xl font-bold text-gray-800">Search</h3>
			<div className="grid grid-cols-6 gap-2">
				{checkboxFields.map((field) => (
					<div key={field.name} className="flex items-center gap-2">
						<input
							type="checkbox"
							value={field.name}
							onChange={handleFieldSelection}
							checked={selectedFields.includes(field.name)}
						/>
						<label>{field.label}</label>
					</div>
				))}
			</div>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<div className="grid w-full grid-cols-3 gap-4">
					{selectedFields.map((field) => (
						<InputParent key={field}>
							<label className="text-sm">
								{checkboxFields.find((f) => f.name === field).label}
							</label>
							{field === "dob" ? (
								<input
									type="date"
									name={field}
									value={formData[field] || ""}
									onChange={handleInputChange}
									className="w-full p-2 border border-gray-300"
									placeholder={field.label}
								/>
							) : (
								<input
									type="text"
									name={field}
									value={formData[field] || ""}
									onChange={handleInputChange}
									className="w-full p-2 border border-gray-300"
									placeholder={field.label}
								/>
							)}
						</InputParent>
					))}
				</div>
				<ActionButton type="submit" disabled={isLoading}>
					{isLoading ? "Submitting..." : "Search"}
				</ActionButton>
			</form>
			{records.length > 0 && (
				<div className="">
					<h3 className="text-xl font-bold text-gray-800">Results</h3>
					<div className="overflow-x-auto">
						<table className="min-w-full text-sm text-left text-gray-500">
							<thead className="bg-gray-50">
								<tr>
									<th scope="col" className="px-6 py-3">
										No.
									</th>
									<th scope="col" className="px-6 py-3">
										Client
									</th>
									<th scope="col" className="px-6 py-3">
										Product
									</th>
									<th scope="col" className="px-6 py-3">
										First Name
									</th>
									<th scope="col" className="px-6 py-3">
										Status
									</th>
									<th scope="col" className="px-6 py-3">
										Phone Number
									</th>
									<th scope="col" className="px-6 py-3">
										PAN Number
									</th>
									<th scope="col" className="px-6 py-3">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{records.map((record, index) => (
									<tr key={index} className="bg-white border-b">
										<td className="px-6 py-4">{index + 1}</td>
										<td className="px-6 py-4">{record.client_name}</td>
										<td className="px-6 py-4">{record.product_name}</td>
										<td className="px-6 py-4">{record.first_name}</td>
										<td className="px-6 py-4">{record.status_name}</td>
										<td className="px-6 py-4">{record.mobile1}</td>
										<td className="px-6 py-4">{record.pan_number}</td>
										<td className="px-6 py-4">
											<button
												className="px-4 py-2 text-white bg-blue-500 rounded"
												onClick={() => handleNavigate(record.id)}>
												View Case
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="flex justify-between mt-4">
						<button
							className="px-4 py-2 bg-gray-300"
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}>
							Previous
						</button>
						<span>
							Page {currentPage} of {totalPages}
						</span>
						<button
							className="px-4 py-2 bg-gray-300"
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ViewCases;
