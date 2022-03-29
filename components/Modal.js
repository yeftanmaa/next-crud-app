import { useEffect } from "react";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cx from "clsx";

import { CheckSVG, CloseSVG } from "@/icons";
import {
	addEmployee,
	setModalOpen,
	setSelectedEmployee,
	updateEmployee,
} from "@/store";
import { toast, useToast } from "@chakra-ui/react";

export function Modal() {
	const { register, handleSubmit, errors, reset, setValue } = useForm();
	const state = useSelector((state) => state.employee);
	const dispatch = useDispatch();
	const toast = useToast();

	// Function to closeModal
	const closeModal = () => {
		reset();
		dispatch(setModalOpen(false));
		dispatch(setSelectedEmployee(undefined));
	};

	// Function to show dialogue of data being updated
	const dataUpdatedDialogue = () => {
		return toast({
			title: "Data updated!",
			status: "info",
			duration: 2000,
			isClosable: true,
			position: "top",
		});
	}

	// Function to show dialogue if data register is success
	const dataRegisteredDialogue = () => {
		return toast ({
			title: "Register Succeed!",
			status: "success",
			duration: 2000,
			isClosable: true,
			position: "top",
		});
	}

	// Function of submit button
	const onSubmitHandler = (data) => {
		if (data) {
			closeModal();
		}
		if (state.selectedEmployee) {
			dispatch(
				updateEmployee({
					_id: state.selectedEmployee._id,
					...data,
				})
			);

			dataUpdatedDialogue();

		} else {
			dispatch(addEmployee(data));
			dataRegisteredDialogue();
		}
	};

	useEffect(() => {
		if (state.selectedEmployee) {
			setValue("fname", state.selectedEmployee.fname);
			setValue("lname", state.selectedEmployee.lname);
			setValue("email", state.selectedEmployee.email);
			setValue("address", state.selectedEmployee.address);
			setValue("phone", state.selectedEmployee.phone);
		}
	}, [state.selectedEmployee, setValue]);

	return state.isModalOpen
		? ReactDOM.createPortal(
				<div className="modal">
					<div className="modal__content">
						<header className="header modal__header">
							<h1 className="header__h2">
								
								{/* Checking is employee ID already registered or not */}
								{/* If already registered, then edit existing data. Otherwise, add new data */}

								{state.selectedEmployee ? (
									<>
										<span>Edit</span> Users
									</>
								) : (
									<>
										<span>Add</span> Users
									</>
								)}
							</h1>

							{/* Button to close form */}
							<button
								className="btn btn__compact btn__close"
								onClick={closeModal}
							>
								<CloseSVG />
							</button>
						</header>

						<form
							className="form modal__form"
							onSubmit={handleSubmit(onSubmitHandler)}
							noValidate
						>
							{/* FIRST NAME INPUT */}
							<div className="form__element">
								<label
									htmlFor="nameInput"
									className={cx("label", errors.fname && "label--error")}
								>
									{errors.fname ? (
										"First Name is required!"
									) : (
										<>
											First Name&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="text"
									id="nameInput"
									name="fname"
									placeholder="ex: David"
									className={cx("input", errors.fname && "input--error")}
									ref={register({ required: true })}
								/>
							</div>
							
							{/* LAST NAME INPUT */}
							<div className="form__element">
								<label
									htmlFor="ageInput"
									className={cx("label", errors.lname && "label--error")}
								>
									{errors.lname ? (
										"Last Name is required!"
									) : (
										<>
											Last Name&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="text"
									id="nameInput"
									name="lname"
									placeholder="ex: Gregory"
									className={cx("input", errors.lname && "input--error")}
									ref={register({ required: true })}
								/>
							</div>
							
							{/* EMAIL INPUT */}
							<div className="form__element">
								<label
									htmlFor="emailInput"
									className={cx("label", errors.email && "label--error")}
								>
									{errors.email ? (
										`${errors.email.message}`
									) : (
										<>
											Email&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="email"
									id="emailInput"
									name="email"
									placeholder="ex: goroskydavid@gmail.com"
									className={cx("input", errors.email && "input--error")}
									ref={register({
										required: "Email is required!",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
											message: "Invalid email address!",
										},
									})}
								/>
							</div>

							{/* ADDRESS INPUT */}
							<div className="form__element">
								<label
									htmlFor="addressArea"
									className={cx("label", errors.address && "label--error")}
								>
									{errors.address ? (
										"Address is required!"
									) : (
										<>
											Address&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<textarea
									type="text"
									id="addressArea"
									name="address"
									placeholder="ex: 8429 Washington, NY 14150"
									className={cx("area", errors.address && "input--error")}
									ref={register({ required: true })}
								/>
							</div>

							{/* PHONE NUMBER INPUT */}
							<div className="form__element">
								<label
									htmlFor="phoneNumber"
									className={cx("label", errors.phone && "label--error")}
								>
									{errors.phone ? (
										`${errors.phone.message}`
									) : (
										<>
											Phone&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="number"
									id="phoneNumber"
									name="phone"
									placeholder="ex: 0571928129"
									className={cx("input", errors.phone && "input--error")}
									ref={register({
										required: "Phone is required!",
										minLength: {
											value: 11,
											message: "Minimum of 11 digits",
										},
										maxLength: {
											value: 12,
											message: "Maximum of 12 digits",
										},
									})}
								/>
							</div>
							
							{/* CANCEL AND SUBMIT BUTTON */}
							<div className="form__action">
								<button
									className="btn btn__icon btn__cancel"
									type="button"
									onClick={closeModal}
								>
									<CloseSVG /> Cancel
								</button>
								<button className="btn btn__primary btn__icon" type="submit">
									<CheckSVG /> {state.selectedEmployee ? "Update" : "Submit"}
								</button>
							</div>
						</form>
					</div>
				</div>,
				document.body
		  )
		: null;
}
