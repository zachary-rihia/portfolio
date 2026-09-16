import HouseFrames from "./HouseFrames";
import Fireplace from "./Fireplace";
import Bookshelf from "./BookShelf/Bookshelf";
import Chair from "./Chair";
import Table from "./Table";

const House = ({ isFocused }) => {
  return (
    <>
      <group>
        <HouseFrames />
        <Chair />
        <Fireplace />
        <Table />
        <Bookshelf isFocused={isFocused} />
      </group>
    </>
  );
};

export default House;
