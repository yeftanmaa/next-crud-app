import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG } from "@/icons";
import {
	deleteEmployee,
	fetchEmployees,
	setModalOpen,
	setSelectedEmployee,
} from "@/store";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export function Table() {
	const state = useSelector((state) => state.employee);
	const dispatch = useDispatch();
	const toast = useToast();

	// // Function to show dialogue of data already deleted
	const dataDeletedDialogue = () => {
		return toast({
			title: "Data Deleted!",
			status: "error",
			duration: 2000,
			isClosable: true,
			position: "top",
		});
	}

	useEffect(() => {
		dispatch(fetchEmployees());
	}, [dispatch]);

	return (
		// THIS TABLE READ DATA FROM DATABASE!!
		<table className="table">
			<thead className="table__head">
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Address</th>
					<th>Phone</th>
					<th>Actions</th>
				</tr>
			</thead>

			<tbody className="table__body">
				{/* The parameter must same as field name on MongoDB */}
				{state.employeeList.map(({ _id, fname, lname, email, address, phone}) => (
					<tr key={_id}>
						<td>{fname}</td>
						<td>{lname}</td>
						<td>{email}</td>
						<td>{address}</td>
						<td>{phone}</td>
						<td>
							<button
								className="btn btn__compact btn__edit"
								onClick={() => {
									dispatch(setSelectedEmployee(_id));
									dispatch(setModalOpen(true));
								}}
							>
								<PencilSVG />
							</button>
							
							<button
								className="btn btn__compact btn__delete"
								onClick={() => {
									let confirmAction = confirm("Are you sure want to delete this data?");
									if (confirmAction) {
										dispatch(deleteEmployee(_id));
										dataDeletedDialogue();
									}
								}}
							>
								<TrashSVG />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}