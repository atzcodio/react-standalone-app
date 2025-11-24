import { PlusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import { Popover } from 'antd';
import React from 'react'

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
    subGroups?: FilterGroup[];  // Allow nested groups
}


interface FilterGroupProps {
    // filterObject: Record<string, any>;  // Define the shape of the filterObject if needed
    filterGroups: FilterGroup[];
    originalFilterGroup: FilterGroup[];
    setFilterGroups: React.Dispatch<React.SetStateAction<FilterGroup[]>>;
    firstColumn: string;
    columns: Record<string, any>;
    parentGroupId?: string;
    parentLogicalOperator ?: string;
}

const filterObject: Record<string, { label: string; name: string }[]> = {
    "Text": [
        { "label": "includes", "name": "includes" },
        { "label": "does not include", "name": "notIncludes" },
        { "label": "is", "name": "is" },
        { "label": "is not", "name": "isNot" },
        { "label": "is empty", "name": "isEmpty" },
        { "label": "is not empty", "name": "isNotEmpty" },
    ],
    "Number": [
        { "label": "=", "name": "equalTo" },
        { "label": "!=", "name": "notEqualTo" },
        { "label": "<", "name": "lessThan" },
        { "label": ">", "name": "greaterThan" },
        { "label": "<=", "name": "lessThanEqual" },
        { "label": ">=", "name": "greaterThanEqual" },
        { "label": "between", "name": "between" },
        { "label": "is empty", "name": "isEmpty" },
        { "label": "is not empty", "name": "isNotEmpty" }
    ],
    "Boolean": [
        { "label": "is true", "name": "true" },
        { "label": "is false", "name": "false" }
    ],
    "date": [
        { "label": "is", "name": "is" },
        { "label": "is not", "name": "isNot" },
        { "label": "is before", "name": "isBefore" },
        { "label": "is after", "name": "isAfter" },
        { "label": "is empty", "name": "isEmpty" },
        { "label": "is not empty", "name": "isNotEmpty" }
    ]
};

export default function FilterGroup({ filterGroups, setFilterGroups, firstColumn, columns, originalFilterGroup, parentGroupId,parentLogicalOperator }: FilterGroupProps) {

    const handleFilterChange = (groupId: string, index: number, key: any, value: string,isBetween?:boolean) => {
        // const newFilterGroups = [...filterGroups];
        const newFilterGroups = [...originalFilterGroup];
        // const group = newFilterGroups.find(group => group.id === groupId);
        // const newFilterGroups = [...originalFilterGroup];
        const group:any = findGroupById(newFilterGroups, groupId);
        if (group) {
            if (isBetween) {
                // If changing "from" or "to" in a "between" filter, update the correct part
                const existingValues = group.filters[index].value?.split(",") || ["", ""];
                if (key === "from") {
                    existingValues[0] = value;
                } else if (key === "to") {
                    existingValues[1] = value;
                    console.log("between in handle",existingValues);
                }
                group.filters[index].value = existingValues.join(",");
            } else {
                // Handle normal single-value filters
                group.filters[index][key] = value;
            }

            if (key === "column") {
                let columnType = columns[value]?.columnType || "string";
                if (columnType === 'Url' || columnType === 'Email' || columnType === 'Url' || columnType === 'Json')
                    columnType = "Text";
                group.filters[index].operator = filterObject[columnType as keyof typeof filterObject]?.[0]?.name || "";
                group.filters[index].value = "";
            }

            setFilterGroups(newFilterGroups);

        }
    };

    const handleLogicalOperatorChange = (groupId: string, value: string) => {
        const newFilterGroups = [...originalFilterGroup];
        // const group = newFilterGroups.find(group => group.id === groupId);
        const group = findGroupById(newFilterGroups, groupId);
        if (group) {
            group.logicalOperator = value;
            setFilterGroups(newFilterGroups);
        }
    };

    const findGroupById = (groups: FilterGroup[], groupId: string): FilterGroup | null => {
        for (const group of groups) {
            if (group.id === groupId) return group;
            if (group.subGroups) {
                const found = findGroupById(group.subGroups, groupId);
                if (found) return found;
            }
        }
        return null;
    };



    const addFilterGroup = (parentGroupId?: string) => {

        const newGroupId = `group${Date.now()}`;
        const newGroup: FilterGroup = { id: newGroupId, filters: [{ column: firstColumn, operator: "", value: "" }], logicalOperator: "And", subGroups: [] };

        if (parentGroupId) {
            // Add as a nested group
            // const newFilterGroups = [...filterGroups];
            const newFilterGroups = [...originalFilterGroup];
            const parentGroup = findGroupById(newFilterGroups, parentGroupId);
            if (parentGroup) {
                parentGroup.subGroups?.push(newGroup);
            }
            setFilterGroups(newFilterGroups);
        } else {
            // Add as a top-level group
            console.log("filterGroups not parentGroup", [...filterGroups, newGroup])
            setFilterGroups([...filterGroups, newGroup]);
        }
        console.log("filterGroups updated", filterGroups)
    };

    const removeFilterGroup = (groupId: string) => {
        if (parentGroupId) {
            let newFilterGroups = [...originalFilterGroup];
            const parentGroup = findGroupById(newFilterGroups, parentGroupId);
            if (parentGroup) {
                parentGroup.subGroups = parentGroup.subGroups?.filter(group => group.id !== groupId);
            }
            setFilterGroups(newFilterGroups);
        } else {
            setFilterGroups(filterGroups.filter(group => group.id !== groupId));
        }
    };

    const addFilter = (groupId: string) => {
        const newFilter = { column: "", operator: "", value: "" };
        // const newFilterGroups = [...filterGroups];

        const newFilterGroups = [...originalFilterGroup];
        const parentGroup = findGroupById(newFilterGroups, groupId);
        if (parentGroup) {
            parentGroup?.filters?.push(newFilter)
        }
        setFilterGroups(newFilterGroups);
    };


    const removeFilter = (groupId: string, index: number) => {
        let newFilterGroups = [...originalFilterGroup];
        let parentGroup = findGroupById(newFilterGroups, groupId);
        // let group = newFilterGroups.find(group => group.id === groupId);
        if (parentGroup) {
            parentGroup.filters.splice(index, 1);
        }
        setFilterGroups(newFilterGroups);
    };



    return (
        <div>
            {filterGroups.map((group: any) => (
                <div key={group.id} className=" mb-4 p-4" >
                    <div className='flex justify-between mb-2'>
                        <div className="flex items-center gap-2">
                            {/* {parentLogicalOperator && <span>{parentLogicalOperator}</span>} */}
                            <div className="flex items-center gap-0 mt-2 border rounded-sm">
                                <button
                                    onClick={() => handleLogicalOperatorChange(group.id, group.logicalOperator === "And" ? "Or" : "And")}
                                    className={`px-2 text-xs  py-1 ${group.logicalOperator === "And" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}
                                >
                                    AND
                                </button>
                                <button
                                    onClick={() => handleLogicalOperatorChange(group.id, group.logicalOperator === "Or" ? "And" : "Or")}
                                    className={`px-2 text-xs py-1 ${group.logicalOperator === "Or" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}
                                >
                                    OR
                                </button>
                            </div>
                            <Popover
                                trigger="click"
                                content={
                                    <div className="flex flex-col">
                                        <button
                                            className="text-left px-4 py-2 hover:bg-gray-100 w-full"
                                            onClick={() => addFilter(group.id)}
                                        >
                                            Add Filter
                                        </button>
                                        <button
                                            className="text-left px-4 py-2 hover:bg-gray-100 w-full"
                                            onClick={() => addFilterGroup(group.id)}
                                        >
                                            Add Filter Group
                                        </button>
                                    </div>
                                }
                            >
                                <span className="m-4 ml-0 cursor-pointer ">
                                    <PlusOutlined className='mt-2 ml-1 text-gray-400' style={{ fontSize: '25px' }} />
                                </span>
                            </Popover>
                            {/* <PlusCircleOutlined onClick={()=>addFilterGroup()} className='mt-2 ml-1' style={{fontSize:'25px'}} /> */}
                        </div>
                        <button onClick={() => removeFilterGroup(group.id)} className="text-gray-600 font-semibold">✕</button>
                    </div>

                    {group.filters.map((filter: Filter, index: any) => (
                        <div key={index} className="flex items-center gap-2 mb-2" style={{marginLeft:`${index===0 ? (`${group.logicalOperator==='And'?'33px':'23px'}`):0 }`}}>
                            {index > 0 && (<div><h1>{group.logicalOperator}</h1></div>)}
                            <div className="flex-1 " style={{maxWidth:'30%'}} >
                                <select
                                    style={{
                                        appearance: "none",
                                        WebkitAppearance: "none",
                                        MozAppearance: "none",
                                        backgroundColor: "white",
                                        border: "1px solid #E1E1E1",
                                        padding: "4px 23px 4px 10px",
                                        fontSize: "14px",
                                        color: "#4B5563",
                                        borderRadius: "4px",
                                        backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='gray' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "right 0px center",
                                        backgroundSize: "27px",
                                        cursor: "pointer",
                                      }}
                                    value={filter.column}
                                    onChange={(e) => handleFilterChange(group.id, index, "column", e.target.value)}
                                    className="border rounded px-3 py-1 w-full text-gray-600"
                                >
                                    <option value="">Select Column</option>
                                    {Object.keys(columns).map(key => (
                                        <option key={key} value={columns[key].columnName}>{columns[key].columnName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1" style={{maxWidth:'30%'}}>
                                {filter.column && (
                                    <select
                                    style={{
                                        appearance: "none",
                                        WebkitAppearance: "none",
                                        MozAppearance: "none",
                                        backgroundColor: "white",
                                        border: "1px solid #E1E1E1",
                                        padding: "4px 23px 4px 10px",
                                        fontSize: "14px",
                                        color: "#4B5563",
                                        borderRadius: "4px",
                                        backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='gray' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "right 0px center",
                                        backgroundSize: "27px",
                                        cursor: "pointer",
                                      }}
                                        value={filter.operator}
                                        onChange={(e) => handleFilterChange(group.id, index, "operator", e.target.value)}
                                        className="border rounded px-3 py-1 w-full text-gray-600"
                                    >
                                        {filterObject[columns.find((obj: Record<string, string>) => obj.columnName === filter.column)?.columnType as keyof typeof filterObject]
                                            ?.map((cond: any) => (
                                                <option key={cond.name} value={cond.name}>{cond.label}</option>
                                            ))}
                                    </select>
                                )}
                            </div>
                            <div className="flex-1 shrink-1" style={{maxWidth:'32%'}}>
                                {filter.column && columns.find((obj: Record<string, string>) => obj.columnName === filter.column)?.columnType !== "Boolean" && (
                                    filter.operator === "between" ? (
                                        <div className="flex gap-2 "  >
                                            <input
                                                style={{
                                                    maxWidth:'50%',
                                                    border: "1px solid #E1E1E1",
                                                    padding: "4px",
                                                    fontSize: "14px",
                                                    color: "#4B5563",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                  }}
                                                type="number"
                                                placeholder='from'
                                                value={filter.value?.split(",")[0] || ""}
                                                onChange={(e) =>
                                                    handleFilterChange(group.id, index, "from", e.target.value,true)
                                                }
                                            />
                                            <input
                                            style={{
                                                maxWidth:'50%',
                                                border: "1px solid #E1E1E1",
                                                padding: "4px",
                                                fontSize: "14px",
                                                color: "#4B5563",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                              }}
                                                type="number"
                                                placeholder='to'
                                                value={filter.value?.split(",")[1] || ""}
                                                onChange={(e) =>
                                                    handleFilterChange(group.id, index, "to", e.target.value,true)
                                                }
                                                className="border rounded px-3 py-1 w-1/2 text-gray-600"
                                            />
                                        </div>
                                    ) : (
                                        <input
                                        style={{
                                            maxWidth:'100%',
                                            // appearance: "none",
                                            // WebkitAppearance: "none",
                                            // MozAppearance: "none",
                                            // backgroundColor: "white",
                                            border: "1px solid #E1E1E1",
                                            padding: "4px",
                                            fontSize: "14px",
                                            color: "#4B5563",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                          }}
                                            type={columns[filter.column]?.columnType === "Date" ? "date" : "text"}
                                            value={filter.value || ""}
                                            onChange={(e) => handleFilterChange(group.id, index, "value", e.target.value)}
                                            // className="border rounded px-3 py-1 w-full text-gray-600"
                                            placeholder={columns[filter.column]?.columnType === "Date" ? "MMM D, YYYY" : "Filter Value"}
                                        />
                                    )
                                )}
                            </div>


                            <button onClick={() => removeFilter(group.id, index)} className="text-gray-600 ml-auto " style={{fontSize:'medium'}}>✕</button>
                        </div>
                    ))}

                    
                    {group?.subGroups.length > 0 && (
                        <div
                            className="relative w-full  rounded-md border"
                            style={{ backgroundColor: "#f9f9f9", borderLeft: "4px solid #007bff" ,overflow:'auto' }} // Parent container
                        >
                            {/* Logical Operator - Fixed Inside Parent */}
                            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 font-bold text-sm">
                                {group.logicalOperator}
                            </div>

                            {/* Scrollable Filter Group - Appears to Overflow Below */}
                            <div
                                className="ml-[50px] overflow-auto relative" // Prevents direct overflow visibility
                                style={{ width: "calc(100% - 50px)", maxHeight: "200px" }} // Restricts height
                            >
                                <div
                                    className="overflow-y-auto p-2 bg-white rounded-md shadow-md"
                                    style={{ maxHeight: "200px", paddingBottom: "10px" ,width:'534px' }} 
                                >
                                    <FilterGroup
                                        // filterObject={filterObject}
                                        filterGroups={group.subGroups}
                                        setFilterGroups={setFilterGroups}
                                        firstColumn={firstColumn}
                                        columns={columns}
                                        originalFilterGroup={originalFilterGroup}
                                        parentGroupId={group.id}
                                        parentLogicalOperator={group.logicalOperator}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}