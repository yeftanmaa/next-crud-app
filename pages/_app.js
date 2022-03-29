import { wrapper } from "@/store";
import { ChakraProvider } from "@chakra-ui/provider";

import "@/styles/main.scss";

function App({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<	Component {...pageProps} />
		</ChakraProvider>
	);
}

export default wrapper.withRedux(App);
