import { Button } from "@chakra-ui/react";
import next from "next";

export function Pagination() {

	const prevpage = () => {
		const itemperpage = 10;
		
	}

	const nextpage = () => {
		console.log('nextpage!');
	}

	return (
		<div className="pagination">
			<Button
			marginTop={5}
			marginRight={10}
			size={'lg'} width={90}
			height={35} fontSize={15}
			alignContent={'center'}
			disabled="true"
			title="Currently not working">Previous</Button>

			<Button marginTop={5}
			marginRight={10}
			size={'lg'}
			width={90}
			height={35}
			fontSize={15}
			alignContent={'center'}
			onClick={nextpage}
			disabled="true"
			title="Currently not working">Next</Button>
		</div>
	);
}