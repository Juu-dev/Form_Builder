import { useContext } from "react";
import DropComponentUI from "./dropComponentUI";
import { ObjectTotalNode } from "../form_builder_Provider/idItemProvider";

function Preview() {
  const TotalNode = useContext(ObjectTotalNode);

  return (
    <>
      <div>
        <h1>Day la Preview</h1>
      </div>
      <div>
        <DropComponentUI nodes={TotalNode.node} preview={true} />
      </div>
    </>
  );
}

export default Preview;
