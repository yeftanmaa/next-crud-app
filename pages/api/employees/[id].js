import Employee from "@/models/Employee";
import "@/utils/dbConnect";

export default async (req, res) => {
	const {
		query: { id },
		method,
	} = req;

	switch (method) {
		case "GET":
			try {
				const employee = await Employee.findById(id);

				return res.status(200).json({
					success: true,
					data: employee,
				});
			} catch (error) {
				return res.status(404).json({
					success: false,
				});
			}
		case "PUT":
			try {
				const employee = await Employee.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});

				return res.status(200).json({
					success: true,
					data: employee,
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		case "DELETE":
			try {
				await Employee.deleteOne({ _id: id });

				return res.status(200).json({
					success: true,
					data: { id },
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}

			// ADDING THIS
			case "DELETE ALL":
				try {
					await Employee.deleteMany({});
	
					return res.status(200).json({
						success: true,
						data: { },
					});
				} catch (error) {
					return res.status(400).json({
						success: false,
					});
				}
		default:
			// ADDING THIS
			res.setHeaders("Allow", ["GET", "PUT", "DELETE", "DELETE ALL"]); 
			return res
				.status(405)
				.json({ success: false })
				.end(`Method ${method} Not Allowed`);
	}
};
