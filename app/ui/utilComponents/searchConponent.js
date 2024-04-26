"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Input,
  Spacer,
  Select,
  SelectItem,
  Checkbox,
  Textarea,
} from "@nextui-org/react";

function SearchForm({
  searchCategory,
  setSearchCategory,
  searchTerm,
  setSearchTerm,
  startDate,
  setStartDate,
  handleSearch,
  postType,
}) {
  return (
    <div className="my-5 flex flex-col md:flex-row">

      <Select
        placeholder="Select Condition"
        className="w-full md:w-64 "
        variant="bordered"
        classNames={{ mainWrapper: ["bg-white rounded-2xl"] }}
        selectedKeys={[searchCategory]}
        onChange={(e) => {
          setSearchCategory(e.target.value);
        }}
      >
        <SelectItem key={"itemName"} value="itemName">
          Item Name
        </SelectItem>
        <SelectItem key={"categories"} value="categories">
          Categories
        </SelectItem>
        <SelectItem key={"postNumber"} value="postNumber">
          Post Number
        </SelectItem>
        <SelectItem key={"location"} value="location">
          Location
        </SelectItem>
        <SelectItem key={"userName"} value="userName">
          User ID
        </SelectItem>
        {postType == "lostPost" ? (
          <SelectItem key={"lostDate"} value="lostDate">
            Lost Date
          </SelectItem>
        ) : (
          <SelectItem key={"foundDate"} value="foundDate">
            Found Date
          </SelectItem>
        )}
      </Select>

      <Spacer y={2} />

      <div className="w-full md:w-96">
        {searchCategory === "lostDate" || searchCategory === "foundDate" ? (
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            dateFormat="yyyy-MM-dd"
            className="input w-full lg:w-96 border-2 rounded-xl hover:border-gray-400 border-gray-200 mb-2 md:mb-0 md:mr-2 p-1.5  "
          />
        ) : (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search by ${searchCategory} `}
            className="input w-full border-2 hover:border-gray-400 border-gray-200 rounded-xl mb-2 md:mb-0 p-1.5"
          />
        )}
      </div>
      <Button
        type="button"
        size="md"
        onClick={handleSearch}
        className={`w-full md:ml-2 md:w-auto  bg-green-500 hover:bg-black text-white dark`}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchForm;
