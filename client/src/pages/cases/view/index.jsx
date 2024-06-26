import React, { useState } from "react";
import InputParent from "../../../components/Input/Parent";
import FormRow from "../../../components/Form/Row";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/Button/ActionButton";
import { useLazyGetSearchDataQuery } from "../../../api/search"; // Change to useLazyGetSearchDataQuery for manual triggering
import { toast } from "react-toastify";

const fields = [
	{ name: "first_name", label: "First Name" },
	{ name: "middle_name", label: "Middle Name" },
	{ name: "last_name", label: "Last Name" },
	{ name: "father_name", label: "Father Name" },
	{ name: "dob", label: "DOB" },
	{ name: "login_date", label: "Login Date" },
	{ name: "residence_address", label: "Residence Address" },
	{ name: "residence_area", label: "Residence Area" },
	{ name: "company_name", label: "Company Name" },
	{ name: "office_address", label: "Office Address" },
	{ name: "compnay_area_name", label: "Company Area" }, // Typo in backend "compnay_area_name"
	{ name: "email_id", label: "Email ID" },
	{ name: "aadhar_number", label: "Aadhar Number" },
	{ name: "pan_number", label: "Pan Number" },
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
];

const ViewCases = () => {
	const [formData, setFormData] = useState({});
	const [selectedFields, setSelectedFields] = useState([]);
	const [triggerSearch, { data, error, isLoading }] =
		useLazyGetSearchDataQuery(); // Use lazy query
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleFieldSelection = (e) => {
		const value = e.target.value;
		setSelectedFields(
			selectedFields.includes(value)
				? selectedFields.filter((field) => field !== value)
				: [...selectedFields, value]
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const fieldNames = Object.keys(formData).filter((key) => formData[key]);
		const searchTerms = fieldNames.map((key) => formData[key]);

		if (fieldNames.length === 0) {
			toast.error("Please fill in at least one search field.");
			return;
		}

		try {
			await triggerSearch({
				field_name: fieldNames,
				search_term: searchTerms,
			}).unwrap();
		} catch (error) {
			toast.error("Error occurred while searching.");
		}
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading data.</div>;

	const records = data?.data || [];

	return (
		<div className="flex flex-col gap-6">
			<h3 className="text-xl font-bold text-gray-800">Search</h3>
			<div className="flex flex-wrap gap-2 mb-4">
				{fields.map((field) => (
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
			<form
				method="POST"
				className="flex flex-col gap-4"
				onSubmit={handleSubmit}>
				<div className="grid w-full grid-cols-3 gap-4">
					{selectedFields.map((field) => (
						<InputParent>
							<label className="text-sm">
								{fields.find((f) => f.name === field).label}
							</label>
							<input
								type="text"
								name={field}
								value={formData[field] || ""}
								onChange={handleChange}
								className="p-2 border border-gray-300 w-[100%]"
								placeholder={fields.find((f) => f.name === field).label}
							/>
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
					<div className="max-w-[1200px] overflow-auto">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase border-b border-gray-500 bg-gray-50">
								<tr>
									<th scope="col" className="px-6 py-3">
										ID
									</th>
									<th scope="col" className="px-6 py-3">
										First Name
									</th>
									<th scope="col" className="px-6 py-3">
										Middle Name
									</th>
									<th scope="col" className="px-6 py-3">
										Last Name
									</th>
									<th scope="col" className="px-6 py-3">
										Father Name
									</th>
									<th scope="col" className="px-6 py-3">
										DOB
									</th>
									<th scope="col" className="px-6 py-3">
										Login Date
									</th>
									<th scope="col" className="px-6 py-3">
										Residence Address
									</th>
									<th scope="col" className="px-6 py-3">
										Residence Area
									</th>
									<th scope="col" className="px-6 py-3">
										Company Name
									</th>
									<th scope="col" className="px-6 py-3">
										Office Address
									</th>
									<th scope="col" className="px-6 py-3">
										Company Area
									</th>
									<th scope="col" className="px-6 py-3">
										Email ID
									</th>
									<th scope="col" className="px-6 py-3">
										Aadhar Number
									</th>
									<th scope="col" className="px-6 py-3">
										Pan Number
									</th>
									<th scope="col" className="px-6 py-3">
										Passport Number
									</th>
									<th scope="col" className="px-6 py-3">
										Election ID Number
									</th>
									<th scope="col" className="px-6 py-3">
										Vehicle Number
									</th>
									<th scope="col" className="px-6 py-3">
										DL Number
									</th>
									<th scope="col" className="px-6 py-3">
										Remarks
									</th>
									<th scope="col" className="px-6 py-3">
										Client Name
									</th>
									<th scope="col" className="px-6 py-3">
										Product Name
									</th>
									<th scope="col" className="px-6 py-3">
										Residence City
									</th>
									<th scope="col" className="px-6 py-3">
										Residence State
									</th>
									<th scope="col" className="px-6 py-3">
										Residence Pincode
									</th>
									<th scope="col" className="px-6 py-3">
										Company City
									</th>
									<th scope="col" className="px-6 py-3">
										Company Pincode
									</th>
									<th scope="col" className="px-6 py-3">
										Company State
									</th>
									<th scope="col" className="px-6 py-3">
										Status
									</th>
								</tr>
							</thead>
							<tbody>
								{records.map((record) => (
									<tr key={record.id} className="bg-white">
										<td className="px-6 py-4">{record.id}</td>
										<td className="px-6 py-4">{record.first_name}</td>
										<td className="px-6 py-4">{record.middle_name}</td>
										<td className="px-6 py-4">{record.last_name}</td>
										<td className="px-6 py-4">{record.father_name}</td>
										<td className="px-6 py-4">{record.dob}</td>
										<td className="px-6 py-4">{record.login_date}</td>
										<td className="px-6 py-4">{record.residence_address}</td>
										<td className="px-6 py-4">{record.residence_area}</td>
										<td className="px-6 py-4">{record.company_name}</td>
										<td className="px-6 py-4">{record.office_address}</td>
										<td className="px-6 py-4">{record.compnay_area_name}</td>
										<td className="px-6 py-4">{record.email_id}</td>
										<td className="px-6 py-4">{record.aadhar_number}</td>
										<td className="px-6 py-4">{record.pan_number}</td>
										<td className="px-6 py-4">{record.passport_number}</td>
										<td className="px-6 py-4">{record.election_id_number}</td>
										<td className="px-6 py-4">{record.vehicle_number}</td>
										<td className="px-6 py-4">{record.dl_number}</td>
										<td className="px-6 py-4">
											<div className="w-48 overflow-y-auto max-h-32">
												{record.remarks}
											</div>
										</td>
										<td className="px-6 py-4">{record.client_name}</td>
										<td className="px-6 py-4">{record.product_name}</td>
										<td className="px-6 py-4">{record.residence_city_name}</td>
										<td className="px-6 py-4">{record.residence_state_name}</td>
										<td className="px-6 py-4">{record.residence_pincode}</td>
										<td className="px-6 py-4">{record.company_city_name}</td>
										<td className="px-6 py-4">{record.company_pincode}</td>
										<td className="px-6 py-4">{record.company_state_name}</td>
										<td className="px-6 py-4">{record.status_name}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
};

export default ViewCases;
