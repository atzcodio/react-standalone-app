import React, { useEffect, useState } from "react";
import FilterGroup from "./filterGroup";

interface Filter {
  column: string;
  operator: string;
  value: string;
  logicalOperator?: string;
}

interface FilterGroup {
  id: string;
  filters: Filter[];
  logicalOperator?: string;
  subGroups?: FilterGroup[]; // Allow nested groups
}

interface FilterComponentProps {
  columns: Record<string, any>;
  tableData: any[];
  originalData: any[];
  setTableData: any;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  columns,
  tableData,
  originalData,
  setTableData,
}) => {
  const [tableState, setTableState] = useState(tableData);
  let firstColumn = columns[0].columnType;
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([
    {
      id: "group1",
      filters: [{ column: firstColumn, operator: "", value: "" }],
      logicalOperator: "And",
      subGroups: [],
    },
  ]);
  const [originalfilterGroups, setOriginalfilterGroups] = useState<
    FilterGroup[]
  >([
    {
      id: "group1",
      filters: [{ column: firstColumn, operator: "", value: "" }],
      logicalOperator: "And",
      subGroups: [],
    },
  ]);

  const findGroupById = (
    groups: FilterGroup[],
    groupId: string
  ): FilterGroup | null => {
    for (const group of groups) {
      if (group.id === groupId) return group;
      if (group.subGroups) {
        const found = findGroupById(group.subGroups, groupId);
        if (found) return found;
      }
    }
    return null;
  };

  const applyFilters = (data: any, filterGroups: FilterGroup[]) => {
    if (!filterGroups || filterGroups.length === 0) return data;

    return filterGroups.reduce((filteredData, group) => {
      return filterGroup(filteredData, group);
    }, data);
  };

  const filterGroup = (data: any, group: FilterGroup) => {
    let filteredData = [...data];

    // Apply filters in the group
    if (group.filters.length > 0) {
      if (group.logicalOperator === "And") {
        filteredData = filteredData.filter((item) =>
          group.filters.every((filter) => applyCondition(item, filter))
        );
      } else if (group.logicalOperator === "Or") {
        filteredData = filteredData.filter((item) =>
          group.filters.some((filter) => applyCondition(item, filter))
        );
      }
    }

    // Apply subGroups recursively
    if (group.subGroups && group.subGroups.length > 0) {
      if (group.logicalOperator === "And") {
        filteredData = group.subGroups.reduce(
          (data, subGroup) => filterGroup(data, subGroup),
          filteredData
        );
      } else if (group.logicalOperator === "Or") {
        const subGroupResults = group.subGroups.map((subGroup) =>
          filterGroup(data, subGroup)
        );
        filteredData = subGroupResults.flat(); // Merge OR results
      }
    }

    return filteredData;
  };

  const applyCondition = (item: any, filterElement: Filter) => {
    let columnValue = item[filterElement.column];

    if (!filterElement.operator || !filterElement.column) return true; // Ignore invalid filters

    const { column, operator, value } = filterElement;

    switch (operator) {
      case "includes":
        return String(columnValue).includes(String(value));
      case "notIncludes":
        return !String(columnValue).includes(String(value));
      case "is":
        return String(columnValue) === String(value);
      case "isNot":
        return String(columnValue) !== String(value);
      case "isEmpty":
        return (
          columnValue === null ||
          columnValue === undefined ||
          columnValue === ""
        );
      case "isNotEmpty":
        return (
          columnValue !== null &&
          columnValue !== undefined &&
          columnValue !== ""
        );
      case "equalTo":
        return Number(columnValue) === Number(value);
      case "notEqualTo":
        return Number(columnValue) !== Number(value);
      case "lessThan":
        return Number(columnValue) < Number(value);
      case "greaterThan":
        return Number(columnValue) > Number(value);
      case "lessThanEqual":
        return Number(columnValue) <= Number(value);
      case "greaterThanEqual":
        return Number(columnValue) >= Number(value);
      case "between":
        let from = value.split(",")[0];
        let to = value.split(",")[1];
        return (
          Number(columnValue) >= Number(from) &&
          Number(columnValue) <= Number(to)
        );
      case "true":
        return columnValue === true;
      case "false":
        return columnValue === false;
      case "is":
        return new Date(columnValue).getTime() === new Date(value).getTime();
      case "isNot":
        return new Date(columnValue).getTime() !== new Date(value).getTime();
      case "isBefore":
        return new Date(columnValue).getTime() < new Date(value).getTime();
      case "isAfter":
        return new Date(columnValue).getTime() > new Date(value).getTime();
      case "isEmpty":
        return columnValue === null || columnValue === undefined;
      case "isNotEmpty":
        return columnValue !== null && columnValue !== undefined;
      default:
        return false;
    }
  };

  const updateTable = () => {
    console.log("group filter", filterGroups)
    let updatedTable = applyFilters(originalData, filterGroups);
    setTableData(updatedTable);
  };

  const ResetFilter = () => {
    setFilterGroups([
      {
        id: "group1",
        filters: [{ column: firstColumn, operator: "", value: "" }],
        logicalOperator: "And",
        subGroups: [],
      },
    ]);
    setTableData(originalData);
  };

  // useEffect(() => {
  //     if (filterGroups.length > 0) {
  //         const allFilters = filterGroups.flatMap(group => group.filters);
  //         let filteredTable = applyFilters(originalData, allFilters);
  //         setTableData(filteredTable);
  //     }
  // }, [filterGroups]);

  return (
    <div
      className="border-none p-0 rounded-md w-full bg-white"
      style={{ width: "650px" }}
    >
      <FilterGroup
        filterGroups={filterGroups}
        setFilterGroups={setFilterGroups}
        firstColumn={firstColumn}
        columns={columns}
        originalFilterGroup={originalfilterGroups}
      />
      {/* Apply Button - Positioned at the Bottom Right */}
      <div className="flex justify-end mt-4 gap-2">
        <button
          onClick={updateTable}
          className="px-4 py-1 bg-blue-500 text-sm text-white rounded-md hover:bg-blue-600 transition"
        >
          Apply Filter
        </button>
        <button
          onClick={ResetFilter}
          className="px-4 py-1 bg-blue-500 text-sm text-white rounded-md hover:bg-red-400 transition"
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
