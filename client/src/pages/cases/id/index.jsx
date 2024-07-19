import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRecordByIdQuery } from "../../../api/search";
import { toast } from "react-toastify";

const ViewCaseDetails = () => {
	const { id } = useParams();
	const { data, error, isLoading } = useGetRecordByIdQuery(id);
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1); // This will navigate back to the previous page
	};

	if (isLoading) return <div>Loading...</div>;

	if (error) {
		toast.error("Error occurred while fetching the record.");
		return <div>Error occurred while fetching the record.</div>;
	}

	const record = data?.data;

	if (!record) {
		return <div>No record found.</div>;
	}

	const displayFields = [
		{ label: "Client Name", value: record.client_name },
		{ label: "Product Name", value: record.product_name },
		{ label: "First Name", value: record.first_name },
		{ label: "Middle Name", value: record.middle_name },
		{ label: "Last Name", value: record.last_name },
		{ label: "Father Name", value: record.father_name },
		{ label: "DOB", value: record.dob },
		{ label: "Login Date", value: record.login_date },
		{ label: "Residence Address", value: record.residence_address },
		{ label: "Residence Area", value: record.residence_area },
		{ label: "Company Name", value: record.company_name },
		{ label: "Office Address", value: record.office_address },
		{ label: "Company Area Name", value: record.compnay_area_name },
		{ label: "Email ID", value: record.email_id },
		{ label: "Aadhar Number", value: record.aadhar_number },
		{ label: "PAN Number", value: record.pan_number },
		{ label: "Passport Number", value: record.passport_number },
		{ label: "Election ID Number", value: record.election_id_number },
		{ label: "Vehicle Number", value: record.vehicle_number },
		{ label: "DL Number", value: record.dl_number },
		{ label: "Residence City Name", value: record.residence_city_name },
		{ label: "Residence State Name", value: record.residence_state_name },
		{ label: "Residence Pincode", value: record.residence_pincode },
		{ label: "Company City Name", value: record.company_city_name },
		{ label: "Company Pincode", value: record.company_pincode },
		{ label: "Company State Name", value: record.company_state_name },
		{ label: "Status Name", value: record.status_name },
		{ label: "Phone Number", value: record.mobile1 },
	];

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<h3 className="text-xl font-bold text-gray-800">Case Details</h3>
				<button
					onClick={handleBack}
					className="px-4 py-2 text-white bg-blue-500 rounded">
					Back
				</button>
			</div>
			<div className="grid grid-cols-2 gap-4">
				{displayFields
					.filter((field) => field.value)
					.map((field, index) => (
						<div key={index} className="flex flex-col">
							<span className="font-bold text-gray-700">{field.label}</span>
							<span className="text-gray-600">
								{field.label === "DOB" || field.label === "Login Date"
									? formatDate(field.value)
									: field.value}
							</span>
						</div>
					))}
			</div>
			{record.remarks && (
				<div className="flex flex-col mt-4">
					<span className="font-bold text-gray-700">Remarks</span>
					<span className="text-gray-600">{record.remarks}</span>
				</div>
			)}
		</div>
	);
};

export default ViewCaseDetails;
