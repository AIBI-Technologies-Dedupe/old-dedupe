import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
const login = () => {
	const [hidden, setHidden] = useState(true);
	const setHiddenPassword = () => {
		setHidden(!hidden);
	};

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const handleSubmit = async () => {
		if ((!password, !email)) {
			alert("Enter Both Values");
		} else {
			try {
				const { accessToken, user } = await login({ email, password }).unwrap();
				dispatch(setCredentials({ accessToken, user }));
				setEmail("");
				setPassword("");
				navigate("/");
			} catch (err) {
				if (!err.status) {
					alert("No Server Response");
				} else if (err.status === 400) {
					alert("Missing Username or Password");
				} else if (err.status === 401) {
					alert("Unauthorized");
				} else {
					alert(err.data?.message);
				}
			}
		}
	};

	return (
		<div className="flex flex-col h-screen md:flex-row">
			<div className=" sm:w-[100%] md:w-[40%] bg-gray-200 flex justify-center items-center">
				<div className="flex flex-col items-start gap-4 p-4">
					<div className="flex flex-col gap-1">
						<div className="flex items-center">
							<h1 className="text-4xl font-semibold text-center">
								<em>Dedupe</em>
							</h1>
						</div>
					</div>
					<h5 className="font-semibold text-gray-500">
						Copyright © 2024 AIBI Tech. All rights reserved.
					</h5>
				</div>
			</div>
			<div className="flex items-center justify-center flex-1 bg-white">
				<div className="w-[90%] md:w-[50%] flex flex-col gap-11">
					<p className="text-2xl font-bold text-gray-800">
						Login - Covert Management System
					</p>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-1">
							<label>Email</label>
							<input
								type="email"
								placeholder="johndoe@example.com"
								className="p-2 border border-gray-300 shadow-md"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label>Password</label>

							<input
								type={`${hidden ? "password" : "text"}`}
								placeholder=""
								className="p-2 border border-gray-300 shadow-md"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>
						<FaEye
							className={`text-blue-500 ${hidden ? "hidden" : ""}`}
							onClick={setHiddenPassword}
						/>
						<FaEyeSlash
							className={`text-blue-500 ${hidden ? "" : "hidden"}`}
							onClick={setHiddenPassword}
						/>
					</div>
					{isLoading ? (
						<button
							className="bg-blue-500 opacity-40 text-white font-bold p-2 w-[100%]"
							disabled>
							Login
						</button>
					) : (
						<button
							className="bg-blue-500 hover:bg-blue-400 transition-all duration-200 text-white font-bold p-2 w-[100%]"
							onClick={handleSubmit}>
							Login
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default login;
