import { Label, ListBox, Select } from "@heroui/react";
import React from "react";

const SelectPets = () => {
  return (
    <Select className="w-[256px]" placeholder="Select one">
      <Label>Pet Type</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="cat" textValue="Cat">
            Cat
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="dog" textValue="Dog">
            Dog
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="bird" textValue="Bird">
            Bird
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default SelectPets;
