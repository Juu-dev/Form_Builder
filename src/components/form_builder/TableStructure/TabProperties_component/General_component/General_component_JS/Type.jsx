import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import { Form, Checkbox } from "semantic-ui-react";

import { updateGeneralPro } from "../../../../../../features/builder/GeneralProperties";

function Type(props) {
  const dispatch = useDispatch();

  const CheckOpen = useSelector((state) => state.checkModal.value);
  const GeneralPro = useSelector((state) => state.generalPro.value);
  const allGenPro = useSelector((state) => state.allGenPro.value);

  var GenPro = JSON.parse(JSON.stringify(GeneralPro));
  var orderBirth = CheckOpen.orderBirth;

  const [stateCheckbox, setStateCheckbox] = useState(
    allGenPro[orderBirth] ? allGenPro[orderBirth].Type || "Text" : "Text"
  );

  useEffect(() => {
    if (props.keyId) {
      let tempObj = { Type: stateCheckbox };

      GenPro = { ...GenPro, ...tempObj };

      dispatch(updateGeneralPro({ ...GenPro }));
    }

    // dispatch(updateSave(false));
  }, [stateCheckbox]);

  return (
    <Form.Field>
      <label className="Ganeral_label">Type</label>
      <Form.Group className="WrapOption">
        <Form.Field>
          <Checkbox
            radio
            label="Text"
            name="checkboxRadioGroup"
            value="Text"
            checked={stateCheckbox === "Text"}
            onChange={(e) => setStateCheckbox("Text")}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label="Number"
            name="checkboxRadioGroup"
            value="Number"
            checked={stateCheckbox === "Number"}
            onChange={(e) => setStateCheckbox("Number")}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label="Password"
            name="checkboxRadioGroup"
            value="Password"
            checked={stateCheckbox === "Password"}
            onChange={(e) => setStateCheckbox("Password")}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label="File"
            name="checkboxRadioGroup"
            value="File"
            checked={stateCheckbox === "File"}
            onChange={(e) => setStateCheckbox("File")}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label="Date"
            name="checkboxRadioGroup"
            value="Date"
            checked={stateCheckbox === "Date"}
            onChange={(e) => setStateCheckbox("Date")}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label="Time"
            name="checkboxRadioGroup"
            value="Time"
            checked={stateCheckbox === "Time"}
            onChange={(e) => setStateCheckbox("Time")}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label="Date & Time"
            name="checkboxRadioGroup"
            value="Date & Time"
            checked={stateCheckbox === "Date & Time"}
            onChange={(e) => setStateCheckbox("Date & Time")}
          />
        </Form.Field>
      </Form.Group>
    </Form.Field>
  );
}

export default Type;
