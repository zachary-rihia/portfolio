import HouseFrames from "./HouseFrames";
import Fireplace from "./Fireplace";
import Bookshelf from "./Bookshelf";

const House = ({ isFocused }) => {
	return (
		<>
			<HouseFrames />
			<Fireplace />
			<Bookshelf isFocused={isFocused} />
		</>
	);
};

export default House;

