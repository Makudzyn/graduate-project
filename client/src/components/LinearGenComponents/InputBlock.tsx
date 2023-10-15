import {useState } from "react";
import { Listbox } from "@headlessui/react";
import CloseIcon from "../../assets/close.svg?react";

// const options = Array.from({ length: 15 }, (_, index) => index + 1);
const optionsData = {
  "1": ["3"],
  "2": ["1 7 H"],
  "3": ["1 13 F"],
  "4": ["1 23 F", "3 37 D", "5 07"],
  "5": ["1 45 E", "3 75 G", "5 67 H"],
  "6": [
    "1 103 F",
    "3 1278",
    "5 147 H",
    "7 111 A",
    "9 015",
    "11 155 E",
    "21 007",
  ],
  "7": [
    "1 211 E",
    "3 217 E",
    "5 235 E",
    "7 367 H",
    "9 277 E",
    "11 325 G",
    "13 203 F",
    "19 313 H",
    "21 345 G",
  ],
  "8": [
    "1 435 E",
    "3 567 B",
    "5 763 D",
    "7 551 E",
    "9 675 C",
    "11 747 H",
    "13 453 F",
    "15 727 D",
    "17 023",
    "19 545 E",
    "21 613 D",
    "23 543 F",
    "25 433 B",
    "27 477 B",
    "37 537 F",
    "43 703 H",
    "45 471 A",
    "51 037",
    "85 007",
  ],
  "9": [
    "1 1021 E",
    "3 1131 E",
    "5 1461 G",
    "7 1231 A",
    "9 1423 G",
    "11 1055 E",
    "13 1167 F",
    "15 1541 E",
    "17 1333 F",
    "19 1605 G",
    "21 1027 A",
    "23 1751 E",
    "25 1743 H",
    "27 1617 H",
    "29 1553 H",
    "35 1401 C",
    "37 1157 F",
    "39 1715 E",
    "41 1563 H",
    "43 1713 H",
    "45 1175 E",
    "51 1725 G",
    "53 1225 E",
    "55 1275 E",
    "73 0013",
    "75 1773 G",
    "77 1511 C",
    "83 1425 G",
    "85 1267 E",
  ],
};
const InputBlock = () => {
  const [selectedOption, setSelectedOption] = useState<string>("1"); // Начальное значение

  const options = Object.keys(optionsData);
  return (
    <div className="flex flex-col justify-center gap-5 py-3 w-[500px]">
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <Listbox.Label>Оберіть ступінь поліному</Listbox.Label>
        <Listbox.Button>{selectedOption}</Listbox.Button>
        <Listbox.Options>
          {options.map((option) => (
            <Listbox.Option key={option} value={option}>
              {({ active, selected }) => (
                <li
                  className={`${
                    active ? "bg-blue-500 text-white" : "bg-white text-black"
                  }`}
                >
                  {selected && <CloseIcon className={"w-3 h-3"} />}
                  {option}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>

      {/*<Select label="Оберіть поліном">*/}
      {/*  {optionsData[selectedOption]?.map((data) => (*/}
      {/*    <Option key={data} value={data}>*/}
      {/*      {data}*/}
      {/*    </Option>*/}
      {/*  ))}*/}
      {/*</Select>*/}

      <input disabled={true} />
      <label>="Введіть початковий стан"</label>
      <input />
    </div>
  );
};

export default InputBlock;