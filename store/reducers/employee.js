import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	employeeList: [],
	selectedEmployee: undefined,
	isModalOpen: false,
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		case t.MODAL_OPEN:
			return {
				...state,
				isModalOpen: action.payload,
			};
		case t.EMPLOYEE_FETCH_SUCCEEDED:
			return {
				...state,
				employeeList: action.payload,
			};
		case t.EMPLOYEE_ADD_SUCCEEDED:
			return {
				...state,
				employeeList: [action.payload, ...state.employeeList],
			};
		case t.EMPLOYEE_UPDATE_SUCCEEDED:
			const updatedEmployee = state.employeeList.map((employee) => {
				if (employee._id === action.payload._id) {
					return {
						...employee,
						fname: action.payload.fname,
						lname: action.payload.lname,
						email: action.payload.email,
						address: action.payload.address,
						phone: action.payload.phone,
					};
				}
				return employee;
			});

			return { ...state, employeeList: updatedEmployee };
		case t.EMPLOYEE_DELETE_SUCCEEDED:
			const newEmployeeList = state.employeeList.filter(
				(employee) => employee._id !== action.payload
			);
			return {
				...state,
				employeeList: newEmployeeList,
			};

			// ADDING THIS
		case t.EMPLOYEE_DELETE_ALL_SUCCEEDED:
			const EmptyEmployeeList = state.employeeList.filter(
				(employee) => employee._id !== action.payload
			);
			return {
				...state,
				employeeList: EmptyEmployeeList,
			};
			
		case t.EMPLOYEE_SELECTED:
			const selectedEmployee = state.employeeList.find(
				(employee) => employee._id === action.payload
			);
			return {
				...state,
				selectedEmployee,
			};
		default:
			return state;
	}
};

export default mainReducer;
