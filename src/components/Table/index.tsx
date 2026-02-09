
// React import will be bundled by Rollup, do not import explicitly for full bundle

import { runtimeDeps, registerRuntimeDeps, loadRuntimeDeps } from "./runtime";

interface TableProps {
    data: Array<Record<string, any>>;
    selectable?: boolean;
    onRowSelect?: (selectedRow: Record<string, any>) => void;
    header_bg?: string;
    header_font_color?: string;
    body_bg?: string;
    body_font_color?: string;
    selected_row?: Record<string, any>,
    selection_type: "single" | "multiple";
    border_radius: Array<string>;
    margin: Array<string>;
    border: string;
    key: number;
    primary_key: any;
    columns: Record<string, any>;
    columnList: Array<string>;
    checkbox_accent_col: string;
    selectionBg: string;
    checkboxBorderColor: string;
    defaultSelected?: string;
    defaultSelectedFilter?: Record<string, any>;
}

interface TableRow {
    key: string | number; // Or whatever type your row identifier should be
    [key: string]: any;   // This allows any other dynamic properties to be included in the row
}

export const getConfiguration = (BaseConfiguration: any) => ({
    ...BaseConfiguration,
    grid: {
        desktop: {
            width: 12, // Override width for desktop
            height: 30, // Keep height the same or adjust as needed
        },
        mobile: {
            width: 24, // Keep the same or adjust for mobile
            height: 20, // Keep the same or adjust as needed
        },
    },
    resizable: {
        width: true,
        height: true
    }
})


export const getEditProperties = (ElementTypes: any, THEME: any) => ([
    {
        type: ElementTypes.GROUP("basic"),
        width: 24,
        collaseOpen: true,
        elements: [
            {
                label: "Name",
                name: "_name",
                type: ElementTypes.TEXT(""),
                showLabel: true,
                width: 24
            },

        ],
    },

    {
        type: ElementTypes.GROUP("data"),  // Grouping for basic properties
        elements: [
            {
                label: "Data",
                name: "data",
                type: ElementTypes.TEXT(),
                width: 24,
                showFx: true,
                onlyFx: true,
                fx: `[{"name":"John Doe","age":28,"email":"john@example.com","id":1},{"name":"Jane Smith","age":34,"email":"jane@example.com","id":2},{"name":"Mike Johnson","age":45,"email":"mike@example.com","id":3}]`
            },
            {
                label: "Default Selected",
                name: "defaultSelected",
                type: ElementTypes.SELECT(["none", "first", "last", "filter"], "none"),
                width: 12
            },
            {
                label: "Default Filter",
                name: "defaultSelectedFilter",
                type: ElementTypes.JSON({}),
                width: 12,
                showFx: true,
                fx: `{"columnName": "value to match"}`
            },
            {
                label: "selection_type",
                name: "selection_type",
                type: ElementTypes.SELECT(["single", "multiple"], "single"),
                width: 24
            },
        ]
    },
    {
        type: ElementTypes.GROUP("columns"),
        width: 24,
        collaseOpen: true,
        elements: [
            {
                label: "primary_key",
                name: "primary_key",
                type: ElementTypes.SELECT([], ""),
                width: 24
            },
            {
                label: "Column List",
                name: "columns",
                type: ElementTypes.REPEATBLOCK({
                    columnName: ElementTypes.TEXT(""),
                    columnType: ElementTypes.SELECT(["Text", "Number", "Boolean", "Url", "Email", "Json", "MultiSelect", "SingleSelect", "Image"], "Text"),
                }, [], {
                    add: false,
                    remove: false,
                    height: '250px',
                    sortable: true,
                    showOrder: true
                }),
                width: 24
            }
        ]
    },
    {
        type: ElementTypes.GROUP("style"),
        width: 24,
        collaseOpen: true,
        elements: [
            {
                label: "Header Background",
                name: "header_bg",
                type: ElementTypes.COLOR("#f7f7f7"),
                showLabel: true,
                width: 24,
                showFx: true
            },
            {
                label: "Header Font Color",
                name: "header_font_color",
                type: ElementTypes.COLOR("#ffffff"),
                showLabel: true,
                width: 24,
                showFx: true
            },
            {
                label: "Body Backgorund",
                name: "body_bg",
                type: ElementTypes.COLOR("#d9e3f0"),
                showLabel: true,
                width: 24,
                showFx: true
            },
            {
                label: "Body Font Color",
                name: "body_font_color",
                type: ElementTypes.COLOR("#555555"),
                showLabel: true,
                width: 24,
                showFx: true
            },
            {
                label: "Check Color",
                name: "checkbox_accent_col",
                type: ElementTypes.COLOR("#b0b0b0"),
                showLabel: true,
                width: 24,
                showFx: true
            },
            {
                label: "Check Border Color",
                name: "checkboxBorderColor",
                type: ElementTypes.COLOR("#b0b0b0"),
                showLabel: true,
                width: 24,
                showFx: true
            },
            {
                label: "Selection Background",
                name: "selectionBg",
                type: ElementTypes.COLOR("#bae0ff"),
                showLabel: true,
                width: 24,
                showFx: true
            },
            {
                label: "Border",
                name: "border",
                type: ElementTypes.TEXT("1px solid #e1e1e1"),
                showLabel: true,
                width: 24,
                themePropertyName: THEME.backgroundColor,
                showFx: true
            },
            {
                label: "Border Radius",
                name: "border_radius",
                type: ElementTypes.BORDERRADIUS(["5px", "5px", "5px", "5px"]),
                showLabel: true,
                width: 24
            },
            {
                label: "Margin",
                name: "margin",
                type: ElementTypes.SPACING(['5px', '5px', '5px', '5px']),
                showLabel: true,
                width: 24
            },

        ]
    },
]);

//const defaultProps: Partial<TableProps> = getDefaultProps(getEditProperties(ElementTypes));

// --- Manifest/Factory API ---
export const getThemeMapping = (THEME: any) => ({
    border: THEME.borderColor,
});



export function getManifest(ElementTypes: any, THEME: any, BaseConfiguration: any, getDefaultProps: any) {
    const EditProps = getEditProperties(ElementTypes, THEME);
    return {
        name: "Table",
        EditProperties: EditProps,
        Configuration: getConfiguration(BaseConfiguration),
        ThemeMapping: getThemeMapping(THEME),
        defaultProps: getDefaultProps(EditProps),
    };
}

interface RowProps {
    row: any;
    index: number;
    isSelected: boolean;
    columns: Record<string, any>;
    selectionType: string;
    handleRowClick: (row: any, index: number) => void;
    checkboxBorderColor: string;
    checkboxAccentCol: string;
    selectionBg: string;
    columnsState: any;
    renderCell: (cellValue: any, columnType: any, key: any) => any;
    showDrawer: (row: any) => void;
    style: object;
}
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
    parentLogicalOperator?: string;
}

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




const createDependentComponents = (api: any) => {
    const { React } = api;
    if (!React) return { FilterComponent: () => null, FilterGroup: () => null, RowComponent: () => null };

    const useState = React.useState;
    const useRef = React.useRef;
    const useEffect = React.useEffect;
    const getDeps = () => runtimeDeps;

    const FilterComponent: React.FC<FilterComponentProps> = ({
        columns,
        tableData,
        originalData,
        setTableData,
    }) => {
        const { Drawer, Popover, PlusOutlined, AiOutlineCaretDown, AiOutlineCaretUp, AiOutlineCompress, FaFilter, TableList, AutoSizer } = getDeps();
        const [tableState, setTableState] = useState(tableData);
        let firstColumn = columns[0].columnType;
        const [filterGroups, setFilterGroups] = useState([
            {
                id: "group1",
                filters: [{ column: firstColumn, operator: "", value: "" }],
                logicalOperator: "And",
                subGroups: [],
            },
        ] as FilterGroup[]);
        const [originalfilterGroups, setOriginalfilterGroups] = useState([
            {
                id: "group1",
                filters: [{ column: firstColumn, operator: "", value: "" }],
                logicalOperator: "And",
                subGroups: [],
            },
        ] as FilterGroup[]);

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
                    // first parse string to datetime and check else compare string
                    if (!isNaN(Date.parse(String(columnValue))) && !isNaN(Date.parse(String(value)))) {
                        return new Date(columnValue).getTime() === new Date(value).getTime();
                    }
                    return String(columnValue) === String(value);
                case "isNot":
                    if (!isNaN(Date.parse(String(columnValue))) && !isNaN(Date.parse(String(value)))) {
                        return new Date(columnValue).getTime() !== new Date(value).getTime();
                    }
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
                case "isBefore":
                    return new Date(columnValue).getTime() < new Date(value).getTime();
                case "isAfter":
                    return new Date(columnValue).getTime() > new Date(value).getTime();
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

    const FilterGroup = function ({ filterGroups, setFilterGroups, firstColumn, columns, originalFilterGroup, parentGroupId, parentLogicalOperator }: FilterGroupProps) {
        const { Popover, PlusOutlined } = getDeps();

        const handleFilterChange = (groupId: string, index: number, key: any, value: string, isBetween?: boolean) => {
            // const newFilterGroups = [...filterGroups];
            const newFilterGroups = [...originalFilterGroup];
            // const group = newFilterGroups.find(group => group.id === groupId);
            // const newFilterGroups = [...originalFilterGroup];
            const group: any = findGroupById(newFilterGroups, groupId);
            if (group) {
                if (isBetween) {
                    // If changing "from" or "to" in a "between" filter, update the correct part
                    const existingValues = group.filters[index].value?.split(",") || ["", ""];
                    if (key === "from") {
                        existingValues[0] = value;
                    } else if (key === "to") {
                        existingValues[1] = value;
                        console.log("between in handle", existingValues);
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
                            <div key={index} className="flex items-center gap-2 mb-2" style={{ marginLeft: `${index === 0 ? (`${group.logicalOperator === 'And' ? '33px' : '23px'}`) : 0}` }}>
                                {index > 0 && (<div><h1>{group.logicalOperator}</h1></div>)}
                                <div className="flex-1 " style={{ maxWidth: '30%' }} >
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

                                <div className="flex-1" style={{ maxWidth: '30%' }}>
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
                                <div className="flex-1 shrink-1" style={{ maxWidth: '32%' }}>
                                    {filter.column && columns.find((obj: Record<string, string>) => obj.columnName === filter.column)?.columnType !== "Boolean" && (
                                        filter.operator === "between" ? (
                                            <div className="flex gap-2 "  >
                                                <input
                                                    style={{
                                                        maxWidth: '50%',
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
                                                        handleFilterChange(group.id, index, "from", e.target.value, true)
                                                    }
                                                />
                                                <input
                                                    style={{
                                                        maxWidth: '50%',
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
                                                        handleFilterChange(group.id, index, "to", e.target.value, true)
                                                    }
                                                    className="border rounded px-3 py-1 w-1/2 text-gray-600"
                                                />
                                            </div>
                                        ) : (
                                            <input
                                                style={{
                                                    maxWidth: '100%',
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


                                <button onClick={() => removeFilter(group.id, index)} className="text-gray-600 ml-auto " style={{ fontSize: 'medium' }}>✕</button>
                            </div>
                        ))}


                        {group?.subGroups.length > 0 && (
                            <div
                                className="relative w-full  rounded-md border"
                                style={{ backgroundColor: "#f9f9f9", borderLeft: "4px solid #007bff", overflow: 'auto' }} // Parent container
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
                                        style={{ maxHeight: "200px", paddingBottom: "10px", width: '534px' }}
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

    const RowComponent: React.FC<RowProps> = React.memo(({
        row, index, isSelected, columns, columnsState, selectionType, handleRowClick, checkboxBorderColor, checkboxAccentCol, selectionBg, renderCell, showDrawer, style
    }: RowProps) => {
        const { AiOutlineCompress, Popover } = getDeps();

        let rowhasRender = useRef(false);

        const popOverContent = (value: any) => {
            // console.log("value in popOverContent", value);
            return (<div style={{ maxWidth: '300px', maxHeight: '200px', overflow: 'auto' }}>
                <pre>{value}</pre> {/* Use <pre> for formatted JSON display */}
            </div>
            )
        }

        useEffect(() => {
            if (rowhasRender.current) {
                return;
            }
            rowhasRender.current = true; // Set the flag after the first run

        }, [columns]);

        return (
            <tr
                key={row.key || index}
                onClick={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.type === 'checkbox') return;
                    handleRowClick(row, index);
                }}
                style={{
                    ...style,
                    backgroundColor: isSelected ? selectionBg : 'transparent',
                    cursor: 'pointer',
                    borderBottom: '1px solid #E1E1E1',
                    maxHeight: '50px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                {selectionType === 'multiple' && (
                    <td style={{ padding: '15px', alignItems: 'center' }}>
                        <div>
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    handleRowClick(row, index);
                                }}
                                style={{
                                    appearance: "none",
                                    width: "18px",
                                    height: "18px",
                                    borderRadius: "6px",
                                    border: `1px solid ${checkboxBorderColor}`,
                                    backgroundColor: isSelected ? checkboxAccentCol : "transparent",
                                    transition: "all 0.2s ease-in-out",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "static",
                                }}
                            />
                        </div>
                    </td>
                )}


                <td style={{ padding: '5px', maxHeight: '50px', minWidth: '110px', maxWidth: '110px', textAlign: 'center', alignItems: "center", position: 'relative' }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                        <a
                            onClick={(e) => { e.stopPropagation(); showDrawer(row); }}
                            className="text-black no-underline transition duration-200 ease-in-out hover:text-blue-600"
                        >
                            <AiOutlineCompress style={{ fontSize: "20px" }} />
                        </a>
                    </div>
                </td>

                {/* Dynamic Columns Rendering */}
                {columnsState.map((column: any) => {
                    const col = columns.find((obj: any) => obj.columnName === column.accessor);
                    if (!col) {
                        console.warn(`Column not found for columnName: ${column.accessor}`);
                        return null;
                    }
                    const cellKey = `${row.key}-${column.accessor}`;
                    let cellContent = renderCell(row[column.accessor], col.columnType, cellKey);

                    return (
                        <td key={cellKey} className='w-full' style={{ padding: "5px 15px", minWidth: '160px', maxWidth: '160px', maxHeight: '50px', alignItems: "center", position: 'relative' }}>
                            {col.columnType === "MultiSelect" && Array.isArray(cellContent) ? (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                                    {cellContent?.slice(0, 2).map((item: any, idx: number) => (
                                        <span key={idx} style={{
                                            backgroundColor: "#E6F7FF",
                                            padding: "5px 10px",
                                            borderRadius: "4px",
                                            fontSize: "12px",
                                            color: "#333",
                                            border: "1px solid rgba(0,0,0,0.1)"
                                        }}>
                                            {item?.title ?? "N/A"}
                                        </span>
                                    ))}
                                    {cellContent?.length > 2 && (
                                        <Popover
                                            content={(
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "4px",
                                                    maxWidth: "200px",
                                                    padding: "8px"
                                                }}>
                                                    {cellContent?.slice(2).map((item: any, idx: number) => (
                                                        <span key={idx} style={{
                                                            backgroundColor: "#FFF7E6",
                                                            padding: "4px 8px",
                                                            borderRadius: "6px",
                                                            fontSize: "12px",
                                                            color: "#333",
                                                            border: "1px solid rgba(0,0,0,0.1)"
                                                        }}>
                                                            {item?.title ?? "N/A"}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            trigger="hover"
                                            placement="right"
                                        >
                                            <span style={{
                                                cursor: "pointer",
                                                color: "#888",
                                                fontSize: "12px",
                                                paddingLeft: "5px"
                                            }}>
                                                +{cellContent.length - 2} more
                                            </span>
                                        </Popover>
                                    )}
                                </div>
                            ) : (
                                col.columnType === "Json" || col.columnType === "Text" ? (
                                    <Popover
                                        content={() => popOverContent(cellContent)}
                                        trigger="hover"
                                        placement="right"
                                    >
                                        <span style={{ cursor: "pointer", color: "#898585" }}>
                                            {String(cellContent).length > 15 ? String(cellContent).substring(0, 15) + "..." : String(cellContent)}
                                        </span>
                                    </Popover>
                                ) : cellContent
                            )}
                        </td>
                    );
                })}
            </tr>
        );
    }, (prevProps: RowProps, nextProps: RowProps) => {
        if (prevProps.isSelected !== nextProps.isSelected) {
            return false;
        }

        if (prevProps.selectionType !== nextProps.selectionType) {
            return false;
        }

        if (prevProps.checkboxAccentCol !== nextProps.checkboxAccentCol) {
            return false;
        }

        if (prevProps.checkboxBorderColor !== nextProps.checkboxBorderColor) {
            return false;
        }

        if (prevProps.selectionBg !== nextProps.selectionBg) {
            return false;
        }

        if (JSON.stringify(prevProps.row) !== JSON.stringify(nextProps.row)) {
            return false;
        }

        if (JSON.stringify(prevProps.columns) !== JSON.stringify(nextProps.columns)) return false;

        if (JSON.stringify(prevProps.columnsState) !== JSON.stringify(nextProps.columnsState)) {
            return false;
        }

        if (JSON.stringify(prevProps.style) !== JSON.stringify(nextProps.style)) {
            return false;
        }

        return true;
    });

    return { FilterComponent, FilterGroup, RowComponent };
}


function createComponent(api: any) {
    const { ElementTypes, THEME, BaseComponent, BaseConfiguration, getDefaultProps, useComponentContext } = api;
    const platformDeps = api.getPlatformHooks();

    const deps = {
        ...platformDeps, // platform injected deps
        ...runtimeDeps
    };

    const { React } = api;
    const { useEffect, useState,
        useMemo,
        useRef,
        useCallback } = React;

    const getDeps = () => ({ ...platformDeps, ...runtimeDeps });


    const { FilterComponent, FilterGroup, RowComponent } = createDependentComponents(api);

    const { useExecuteFlow, evaluateFormula } = deps;

    const manifest = getManifest(ElementTypes, THEME, BaseConfiguration, getDefaultProps);

    const defaultProps = manifest.defaultProps;

    const Table: any = (props: any) => {
        const { id, grid, properties, meta, updateProperties, onFxChange, ...rest } = props;
        let { selectionBg, checkboxBorderColor, data = [], margin, border, header_bg, header_font_color, body_bg, body_font_color, checkbox_accent_col, onRowSelect, selected_row, selection_type, columns, primary_key, border_radius, defaultSelected, defaultSelectedFilter } = { ...defaultProps, ...properties } as Required<TableProps>;

        const [selectedRow, setSelectedRow] = useState(null as Record<string, any> | null);
        const [selectedRows, setSelectedRows] = useState([] as Record<string, any>[]);

        const { Drawer, Popover, ArrowUpOutlined, ArrowDownOutlined, PlusOutlined, AiOutlineCaretDown, AiOutlineCaretUp, FaFilter, TableList, AutoSizer } = getDeps() || {};
        const [isDrawerOpen, setIsDrawerOpen] = useState(false); //preview drawer
        const [selectedProfile, setSelectedProfile] = useState(null);//drawer
        const [tableData, setTableData] = useState([] as TableRow[]);
        const [jsonPopup, setJsonPopup] = useState(null);
        const [loadingData, setLoadingData] = useState(true);
        let [columnsState, setColumns] = useState([{ accessor: "", header: "" }]);
        const memoizedColumns = useMemo(() => columns, [columns]);
        const tableHasRunOnce = useRef(false);
        const [defaultSelectionApplied, setDefaultSelectionApplied] = useState(false);

        // Function to apply default selection
        const applyDefaultSelection = useCallback((tableData: TableRow[]) => {
            console.log('🔍 [Table] applyDefaultSelection called:', {
                defaultSelected,
                tableDataLength: tableData.length,
                currentSelectedRow: !!selectedRow,
                defaultSelectionApplied,
                tableDataFirstKey: tableData[0]?.key
            });

            if (!defaultSelected || defaultSelected === 'none' || tableData.length === 0) {
                console.log('🔍 [Table] Skipping default selection: no selection type or no data');
                return;
            }

            // Don't apply if already applied or if there's already a selected row
            if (defaultSelectionApplied || selectedRow) {
                console.log('🔍 [Table] Skipping default selection: already applied or row selected');
                return;
            }

            let targetRow: TableRow | null = null;

            switch (defaultSelected) {
                case 'first':
                    targetRow = tableData[0];
                    console.log('🎯 [Table] Selecting first row:', targetRow?.key);
                    break;
                case 'last':
                    targetRow = tableData[tableData.length - 1];
                    console.log('🎯 [Table] Selecting last row:', targetRow?.key);
                    break;
                case 'filter':
                    if (defaultSelectedFilter && typeof defaultSelectedFilter === 'object') {
                        targetRow = tableData.find(row => {
                            return Object.entries(defaultSelectedFilter).every(([key, value]) => {
                                if (row[key] === undefined) return false;

                                // Handle different comparison types
                                if (typeof value === 'string' && typeof row[key] === 'string') {
                                    return row[key].toLowerCase().includes(value.toLowerCase());
                                }
                                return row[key] === value;
                            });
                        }) || null;
                        console.log('🎯 [Table] Filter result:', targetRow?.key, 'with filter:', defaultSelectedFilter);
                    } else {
                        console.log('🔍 [Table] No valid filter provided for filter selection');
                    }
                    break;
            }

            if (targetRow) {
                console.log('🎯 [Table] Applying default selection:', targetRow);
                console.log('🎯 [Table] Before setting - selectedRow:', selectedRow, 'selected_row prop:', selected_row);
                setSelectedRow(targetRow);
                setDefaultSelectionApplied(true);
                onRowSelect?.(targetRow);
                updateProperties(id, "selected_row", targetRow);
                console.log('🎯 [Table] After setting - targetRow:', targetRow);
            } else {
                console.log('🔍 [Table] No target row found for default selection');
            }
        }, [defaultSelected, defaultSelectedFilter, onRowSelect, updateProperties, id, defaultSelectionApplied]);

        const [originalData, setOriginalData] = useState([] as TableRow[]);// will be used filtering

        // Reset defaultSelectionApplied when defaultSelected property changes
        useEffect(() => {
            console.log('🔄 [Table] Default selection properties changed, resetting flag');
            setDefaultSelectionApplied(false);
        }, [defaultSelected, defaultSelectedFilter]);

        // Apply default selection when properties change and we have table data
        useEffect(() => {
            if (tableData.length > 0 && !defaultSelectionApplied && !selectedRow) {
                console.log('🔄 [Table] Properties changed, applying default selection');
                setTimeout(() => applyDefaultSelection(tableData), 100);
            }
        }, [defaultSelected, defaultSelectedFilter, tableData, defaultSelectionApplied, applyDefaultSelection, selectedRow]);

        // Handle column order changes from the sortable columns list
        useEffect(() => {
            console.log('🔄 [Table] Columns configuration changed:', {
                columnsLength: columns?.length,
                tableDataLength: tableData.length,
                columnNames: columns?.map((c: any) => c.columnName),
                currentColumnsState: columnsState.map((c: any) => c.accessor)
            });

            if (columns && Array.isArray(columns) && columns.length > 0 && tableData.length > 0) {
                // Re-order columns based on the columns array order
                const orderedColumnNames = columns.map((col: any) => col.columnName);
                const availableColumns = Object.keys(tableData[0] || {})
                    .filter(key => key !== 'key' && key !== primary_key);

                console.log('🔍 [Table] Available data columns:', availableColumns);
                console.log('🔍 [Table] Ordered column names from config:', orderedColumnNames);

                // Filter to only include valid columns that exist in the data
                const validOrderedColumns = orderedColumnNames.filter(name => availableColumns.includes(name));

                // Add any columns that exist in data but not in the configuration
                const missingColumns = availableColumns.filter(name => !orderedColumnNames.includes(name));
                const finalColumnOrder = [...validOrderedColumns, ...missingColumns];

                console.log('🔍 [Table] Final column order:', finalColumnOrder);

                // Always update when configuration changes - remove the order check to force updates
                const newColumns = finalColumnOrder.map((key, index) => ({
                    header: key,
                    accessor: key,
                    type: tableData[0]
                }));

                setColumns(newColumns);
                console.log('🔄 [Table] Columns FORCE reordered:', {
                    configOrder: orderedColumnNames,
                    finalOrder: newColumns.map(c => c.header),
                    timestamp: Date.now()
                });
            }
        }, [columns, tableData, primary_key]);


        // Sync selected_row prop with internal selectedRow state
        useEffect(() => {
            console.log("🔄 [Table] Selected row prop sync - selected_row:", selected_row, "selectedRow:", selectedRow, "defaultSelectionApplied:", defaultSelectionApplied);

            // Don't sync if we're in the middle of applying default selection
            if (!defaultSelectionApplied && selected_row && JSON.stringify(selected_row) !== JSON.stringify(selectedRow)) {
                console.log("🔄 [Table] Syncing selected_row prop to internal state:", selected_row);
                setSelectedRow(selected_row);
            } else if (!selected_row && selectedRow && !defaultSelectionApplied) {
                // Only clear selection if no default selection was applied
                console.log("🔄 [Table] Clearing selected row");
                setSelectedRow(null);
            } else {
                console.log("🔄 [Table] No sync needed - conditions not met");
            }
        }, [selected_row, selectedRow, defaultSelectionApplied]);

        // Also sync selectedRows for multiple selection if you have selected_rows prop
        // useEffect(() => {
        //     if (properties.selected_rows && Array.isArray(properties.selected_rows)) {
        //         setSelectedRows(properties.selected_rows);
        //     }
        // }, [properties.selected_rows]);


        const showDrawer = (row: any) => {
            setSelectedProfile(row);
            setIsDrawerOpen(true);
        };

        const closeDrawer = () => {
            setIsDrawerOpen(false);
            setSelectedProfile(null);
        };


        data = data || [];

        const detectDataType = (value: any): string => {
            if (typeof value === "number") return "Number";
            if (typeof value === "boolean") return "Boolean";
            if (typeof value === "string") {
                if (value.includes("@") && value.includes(".")) return "Email"; // Basic email check
                if ((value.startsWith("http://") || value.startsWith("https://")) && (value.endsWith(".jpg") || value.endsWith(".jpeg") || value.endsWith(".png") || value.endsWith(".gif"))) return "Image";
                if (value.startsWith("http://") || value.startsWith("https://")) return "Url"; // URL check

                // Check if the string is a valid Date
                const parsedDate = Date.parse(value);
                if (!isNaN(parsedDate)) return "Date"; // If parsing is successful, it's a date

                try {
                    const parsedValue = JSON.parse(value);
                    if (Array.isArray(parsedValue)) return "MultiSelect"; // If it's an array, assume MultiSelect
                    if (typeof parsedValue === "object" && parsedValue !== null) return "Json"; // JSON object check
                } catch (e) {
                    return "Text"; // Default to text if parsing fails
                }
            }
            if (Array.isArray(value)) return "MultiSelect"; // Explicitly handle arrays
            if (typeof value === "object" && value !== null) return "Json"; // JSON object

            return "Text"; // Default fallback
        };


        const [sortConfig, setSortConfig] = useState({
            key: null,
            direction: null,
        } as { key: string | null; direction: string | null });

        const handleSort = (columnKey: string, direction: string) => {

            setSortConfig({ key: columnKey, direction });
            const sortedData = [...tableData].sort((a, b) => {
                const valueA = a[columnKey] ?? '';
                const valueB = b[columnKey] ?? '';

                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return direction === 'asc' ? valueA - valueB : valueB - valueA;
                }

                return direction === 'asc'
                    ? String(valueA).localeCompare(String(valueB))
                    : String(valueB).localeCompare(String(valueA));
            });

            setTableData(sortedData);
            setOriginalData(sortedData);
        };


        const sortingPopoverContent = (column: any, sortConfig: any, handleSort: any) => (
            <div className="rounded-sm w-full h-full flex flex-col gap-2 ">
                <button
                    onClick={() => handleSort(column.accessor, "asc")}
                    className={`group w-full flex items-start flex-start p-[5px] rounded-md transition font-sans font-semibold tracking-wide 
                    ${sortConfig.key === column.accessor && sortConfig.direction === 'asc' ? 'bg-gray-200 text-black' : ''} 
                    group-bg-gray-200 hover:text-black`}
                >
                    <ArrowUpOutlined className={`text-[17px] pr-2 transition  ${sortConfig.key === column.accessor && sortConfig.direction === 'asc' ? 'text-black' : 'text-gray-400'} group-hover:text-black`} />
                    <span className="text-gray-600 group-hover:text-black">Sort Ascending</span>
                </button>
                <button
                    onClick={() => handleSort(column.accessor, "desc")}
                    className={`group w-full flex items-start  p-[5px] flex-start rounded-md transition font-sans font-semibold tracking-wide
                        ${sortConfig.key === column.accessor && sortConfig.direction === 'desc' ? 'bg-gray-200 text-black' : ''} 
                        group-bg-gray-200 hover:text-black`}//hover:bg-gray-300
                >
                    <ArrowDownOutlined className={`text-[17px] transition pr-2
                            ${sortConfig.key === column.accessor && sortConfig.direction === 'desc' ? 'text-black' : 'text-gray-400'} 
                            group-hover:text-black`}
                    />
                    <span className="text-gray-600 group-hover:text-black">Sort Descending</span>
                </button>
            </div>
        );


        const renderHeader = useMemo(() => {
            console.log("render 123= header")
            return (
                <tr style={{ backgroundColor: header_bg, color: header_font_color }}>
                    {selection_type === 'multiple' && (
                        <th style={{ padding: '15px' }} >
                            {selection_type === 'multiple' ? (
                                <input
                                    type='checkbox'
                                    checked={selectedRows.length === tableData.length && tableData.length > 0}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        if (e.target.checked) {
                                            setSelectedRows([...tableData]);
                                        } else {
                                            setSelectedRows([]);
                                        }
                                    }}
                                    style={{
                                        appearance: "none",
                                        width: "18px",
                                        height: "18px",
                                        borderRadius: "6px",
                                        border: `1px solid ${checkboxBorderColor}`,
                                        // border: `2px solid ${checkbox_accent_col}`,
                                        backgroundColor: selectedRows.length === tableData.length && tableData.length > 0 ? checkbox_accent_col : "transparent", // Gray when checked
                                        transition: "all 0.2s ease-in-out",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        position: "relative",
                                        visibility: selectedRows.length > 0 ? "visible" : "hidden"
                                    }}
                                />
                            ) : null}
                        </th>
                    )}
                    <th style={{ padding: '5px 15px', minWidth: '110px', maxWidth: '110px', textAlign: 'start' }}>
                        <span className='font-sans font-semibold tracking-wide' style={{ cursor: 'pointer', fontSize: 'medium', color: '#555870' }}>
                            {/* preview */}
                        </span>
                    </th >
                    {columnsState.map((column: any) => (
                        <th key={column.accessor} style={{ padding: '8px 15px', paddingLeft: '5px', minWidth: '160px', maxWidth: '160px', textAlign: 'start' }}>
                            <div className="flex items-center justify-start h-7">
                                {/* Parent div with 'group' to control hover effect */}
                                <div className="group hover:bg-gray-200 group-hover:text-black transition font-sans font-semibold tracking-wide rounded-md cursor-pointer flex items-center gap-2  px-2 h-full " style={{ fontSize: 'medium', color: '#555870' }}>
                                    {column.header}
                                    <Popover
                                        content={sortingPopoverContent(column, sortConfig, handleSort)}
                                        trigger="click"
                                        placement="bottom"
                                    >
                                        {/* Child div with 'group-hover' to change icon colors */}
                                        <div className="flex flex-col items-center h-5">
                                            <AiOutlineCaretUp className={`text-[13px] ${sortConfig.key === column.accessor && sortConfig.direction === 'asc' ? 'text-black' : 'text-gray-400'} group-hover:text-black`} />
                                            <AiOutlineCaretDown className={`text-[13px] ${sortConfig.key === column.accessor && sortConfig.direction === 'desc' ? 'text-black' : 'text-gray-400'} group-hover:text-black`} />
                                        </div>
                                    </Popover>
                                </div>
                            </div>
                        </th>

                    ))}
                </tr>
            )
        }, [tableData, selectedRows, selection_type]);//selectedRow

        const formatCellValue = useCallback((value: any, columnType: any) => {

            // Function to format date into a readable format
            const formatDateOfBirth = (dob: any) => {
                if (!dob) return ""; // Handle empty values
                const date = new Date(dob);
                return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
            };



            switch (columnType) {
                case "Email":
                    return <a href={`mailto:${value}`} style={{ color: "#2563EB" }}>{value}</a>;

                case "Url":
                    return <a href={value} target="_blank" rel="noopener noreferrer" style={{ color: "#2563EB" }}>{value}</a>;
                case "Image":
                    return <img src={value} alt="Image" style={{ width: "60px", height: "60px", borderRadius: "8px" }} />;
                case "Number":
                case "Boolean":
                    return <span style={{ color: "#2563EB" }}>{value}</span>;

                case "Date":
                case "DOB":
                    return formatDateOfBirth(value);

                case "Json":

                    try {

                        const parsed = typeof value === "string" ? JSON.parse(value) : value;
                        return JSON.stringify(parsed);
                    } catch (e) {
                        return value;
                    }

                case "Text":
                    return value;

                case "MultiSelect":
                    const colors = ["#FFEFD5", "#FFDAB9", "#E6E6FA", "#D3F8E2", "#F5E6CC", "#D0E2FF", "#FFDFD3"];

                    // Ensure value is an array and filter out invalid items
                    const items = Array.isArray(value)
                        ? value.map(item => typeof item === "object" ? JSON.stringify(item) ?? "N/A" : item) // Extract title if object
                            .filter(item => typeof item === "string" && item.trim() !== "")
                        : [];

                    return items.length > 0 ? (
                        <div style={{ display: "flex", flexWrap: "nowrap", gap: "5px", alignItems: "center" }}>
                            {items.slice(0, 2).map((item: string, index: number) => (
                                <Popover
                                    content={(
                                        <div key={index} style={{
                                            backgroundColor: colors[index % colors.length],
                                            padding: "2px 6px",
                                            borderRadius: "5px",
                                            fontSize: "12px",
                                            color: "black",
                                            fontWeight: "300",
                                            display: "inline-block"
                                        }}>
                                            {item}
                                        </div>
                                    )}
                                    trigger="hover"
                                    placement="top"
                                >
                                    <div key={index} style={{
                                        backgroundColor: colors[index % colors.length],
                                        padding: "2px 6px",
                                        borderRadius: "5px",
                                        fontSize: "10px",
                                        color: "black",
                                        fontWeight: "300",
                                        display: "inline-block"
                                    }}>
                                        {item.substring(0, 10) + ".."}
                                    </div>
                                </Popover>
                            ))}

                            {items.length > 1 && (
                                <Popover
                                    content={(
                                        <div style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
                                            gap: "4px",
                                            maxWidth: "220px",
                                            background: "white",
                                            borderRadius: "8px",
                                        }}>
                                            {items.slice(2).map((item: string, index: number) => (
                                                <div key={index} style={{
                                                    backgroundColor: colors[(index + 2) % colors.length], // Keep color pattern
                                                    padding: "3px 5px",
                                                    borderRadius: "6px",
                                                    fontSize: "14px",
                                                    color: "black",
                                                    fontWeight: "300",
                                                    textAlign: "center"
                                                }}>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    trigger="hover"
                                    placement="top"
                                >
                                    <div style={{
                                        cursor: "pointer",
                                        color: "#888",
                                        fontSize: "12px",
                                        paddingLeft: "5px"
                                    }}>
                                        +{items.length - 2}
                                    </div>
                                </Popover>
                            )}
                        </div>
                    ) : "N/A"; // Default fallback when value is empty or not an array


                default:
                    return value;
            }
        }, []);






        interface CellProps {
            cellValue: any;
            columnType: any;
        }


        const renderCell = useCallback((cellValue: any, columnType: any) => {
            return formatCellValue(cellValue, columnType);
        }, [columns]); // Add columns as a dependency




        const handleRowClick = useCallback((row: Record<string, any>, index: number) => {
            console.log("Row clicked:", row, "Current selectedRow:", selectedRow);

            if (selection_type === 'single') {
                // Check if this is a different row or no row was previously selected
                if (!selectedRow || selectedRow.key !== row.key) {
                    console.log("Updating selected row to:", row);
                    setSelectedRow(row);
                    onRowSelect?.(row);
                    updateProperties(id, "selected_row", row);
                }
            } else if (selection_type === 'multiple') {
                setSelectedRows((prevSelectedRows: any) => {
                    const rowKey = row.key;
                    const selectedKeys = new Set(prevSelectedRows.map((r: any) => r.key));

                    if (selectedKeys.has(rowKey)) {
                        // Remove row if already selected
                        const updatedRows = prevSelectedRows.filter((r: any) => r.key !== rowKey);
                        updateProperties(id, "selected_rows", updatedRows);
                        return updatedRows;
                    } else {
                        // Add new row to selection
                        const updatedRows = [...prevSelectedRows, row];
                        updateProperties(id, "selected_rows", updatedRows);
                        return updatedRows;
                    }
                });
            }
        }, [selection_type, id, onRowSelect, updateProperties, selectedRow]);


        // const renderBody = useMemo(() => {
        //     if (!Array.isArray(tableData) || tableData.length === 0) {
        //         return (
        //             <tr style={{ maxHeight: '50px' }}>
        //                 <td colSpan={columnsState.length + (selection_type ? 1 : 0)}>No data found</td>
        //             </tr>
        //         );
        //     }

        //     console.log("render 123= renderBody");
        //     const columnsKey = JSON.stringify(columns);
        //     return (
        //         <>
        //             {tableData.map((row, index) => {
        //                 const isSelected =
        //                     selection_type === 'single'
        //                         ? selectedRow?.key === row.key
        //                         : selectedRows.some((r) => r.key === row.key);


        //                 return (
        //                     <RowComponent
        //                         key={`${row.key || index}-${columnsKey}`}
        //                         row={row}
        //                         index={index}
        //                         isSelected={isSelected}
        //                         columns={columns}
        //                         columnsState={columnsState}
        //                         selectionType={selection_type}
        //                         handleRowClick={handleRowClick}
        //                         checkboxBorderColor={checkboxBorderColor}
        //                         checkboxAccentCol={checkbox_accent_col}
        //                         selectionBg={selectionBg}
        //                         renderCell={renderCell}
        //                         showDrawer={showDrawer}
        //                     />
        //                 );
        //             })}
        //         </>
        //     );
        // }, [tableData, selectedRow, selectedRows, selection_type, columns, checkboxBorderColor, checkbox_accent_col, selectionBg]);

        const RenderRow: React.FC<{ index: number; style: React.CSSProperties }> = ({ index, style }) => {
            const row = tableData[index];
            const isSelected = selection_type === 'single'
                ? selectedRow?.key === row.key
                : selectedRows.some((r: any) => r.key === row.key);

            return (
                // <div style={{ ...style, display: 'table-row' }} key={`${row.key || index}-${JSON.stringify(columns)}`}>
                <RowComponent
                    row={row}
                    index={index}
                    isSelected={isSelected}
                    columns={columns}
                    columnsState={columnsState}
                    selectionType={selection_type}
                    handleRowClick={handleRowClick}
                    checkboxBorderColor={checkboxBorderColor}
                    checkboxAccentCol={checkbox_accent_col}
                    selectionBg={selectionBg}
                    renderCell={renderCell}
                    showDrawer={showDrawer}
                    style={style}
                />
                // </div>
            );
        };



        const renderBody = useMemo(() => {
            if (!Array.isArray(tableData) || tableData.length === 0) {
                return (
                    <tr style={{ maxHeight: '50px' }}>
                        <td colSpan={columnsState.length + (selection_type ? 1 : 0)}>No data found</td>
                    </tr>
                );
            }

            console.log("render 123= renderBody");

            return (
                <AutoSizer>
                    {({ height, width }: { height: number; width: number }) => (
                        <TableList
                            width={width}
                            height={height} // Dynamically adjusts based on container size
                            itemCount={tableData.length}
                            itemSize={50} // Adjust row height as needed
                        >
                            {({ index, style }: { index: number, style: any }) => <RenderRow index={index} style={style} />}
                        </TableList>
                    )}
                </AutoSizer>
            );
        }, [tableData, selectedRow, selectedRows, selection_type, columns, checkboxBorderColor, checkbox_accent_col, selectionBg]);

        const baseCmpProps = {
            id,
            properties,
            meta,
            EditProperties,
            updateProperties,
            grid,
            Configuration
        };



        useEffect(() => {
            console.log('🔍 [Table] useEffect triggered with data:', {
                hasData: !!data,
                dataLength: data?.length || 'N/A',
                dataKeys: data && data.length > 0 ? Object.keys(data[0]) : 'N/A',
                tableHasRunOnce: tableHasRunOnce.current,
                dataStringified: JSON.stringify(data)?.substring(0, 100) + '...'
            });

            if (tableHasRunOnce.current && JSON.stringify(data) === JSON.stringify(originalData)) {
                console.log('🔍 [Table] Skipping update - data unchanged');
                return;
            }

            tableHasRunOnce.current = true;

            const startTime = performance.now(); // Start timing

            async function fetchData() {

                console.log("render 123 table");

                // Extract column names dynamically
                const columnList = data.length > 0 ? Object.keys(data[0]) : [];
                const primaryKey = columnList.find(col => col.toLowerCase().includes("id")) || columnList.find(col => col.toLowerCase().includes("_id")) || columnList[0];

                console.log("Primary Key Determined:", primaryKey);

                EditProperties[2].elements[0] = {
                    label: "primary_key",
                    name: "primary_key",
                    type: ElementTypes.SELECT(columnList, primaryKey),
                    width: 24
                };

                if (data && Object.keys(data).length > 0) {
                    const tableDataWithKeys = Object.values(data).map((obj: any) => {
                        return {
                            ...obj,
                            key: obj[primaryKey], // Set its value as the key
                        };
                    });

                    const tableDataWithKeysTime = performance.now(); // Capture time after evaluateFormula completes
                    setTableData(() => tableDataWithKeys);
                    setOriginalData(() => tableDataWithKeys);

                    // Apply default selection only if no row is currently selected
                    setTimeout(() => {
                        if (!selectedRow) {
                            applyDefaultSelection(tableDataWithKeys);
                        } else {
                            console.log('🔍 [Table] Skipping default selection - row already selected');
                        }
                    }, 100);

                    updateProperties(id, "value", data);
                    updateProperties(id, "data", data);
                }

                setLoadingData(false);

                console.log("evaluatedvalue===", data);

                // Generate columns respecting the order from columns property, excluding the 'key' field and primary_key
                if (data.length > 0) {
                    const availableDataColumns = Object.keys(data[0])
                        .filter(key => key !== 'key' && key !== primary_key);

                    console.log('📊 [Table] Data useEffect - Available data columns:', availableDataColumns);
                    console.log('📊 [Table] Data useEffect - Current columns config:', columns?.map((c: any) => c.columnName));
                    console.log('📊 [Table] Data useEffect - Current columnsState:', columnsState.map((c: any) => c.accessor));

                    // If we have existing columns configuration, respect their order
                    let orderedColumns = availableDataColumns;
                    if (columns && Array.isArray(columns) && columns.length > 0) {
                        // Get column names from the sorted columns array
                        const existingColumnNames = columns
                            .map((col: any) => col.columnName)
                            .filter((name: any) => availableDataColumns.includes(name));

                        // Add any new columns that weren't in the previous configuration
                        const newColumns = availableDataColumns.filter((col: any) =>
                            !columns.some((existingCol: any) => existingCol.columnName === col)
                        );

                        orderedColumns = [...existingColumnNames, ...newColumns];
                        console.log('📊 [Table] Data useEffect - Ordered columns from config:', orderedColumns);
                    }

                    // Only update columns state if columns are uninitialized (prevent overriding user reordering)
                    const currentColumnOrder = columnsState.map((col: any) => col.accessor).filter(Boolean);
                    const expectedOrder = orderedColumns;
                    const isUninitialized = columnsState.length === 0 || columnsState[0].accessor === "";

                    console.log('📊 [Table] Data useEffect - Update decision:', {
                        currentColumnOrder,
                        expectedOrder,
                        isUninitialized,
                        willUpdate: isUninitialized,
                        skipReason: isUninitialized ? 'none' : 'columns already initialized'
                    });

                    // Only update if columns are completely uninitialized
                    if (isUninitialized) {
                        // Generate columns for display based on the order
                        const newColumns = orderedColumns.map((key, index) => ({
                            header: key,
                            accessor: key,
                            type: data[0]
                        }));
                        setColumns(() => newColumns);
                        console.log('🔄 [Table] Columns INITIALIZED from data:', newColumns.map(c => c.header));
                    }

                    // Generate column properties maintaining the order
                   const ColumnProperty = orderedColumns.map((columnName, index) => {
                        // Try to find existing config for this column
                        let userCol = Array.isArray(columns) ? columns.find((c: any) => c.columnName === columnName) : undefined;
                        return {
                            columnName,
                            columnType: userCol && userCol.columnType ? userCol.columnType : detectDataType(data[0][columnName]) || "Text",
                        };
                    });
                    
                    updateProperties(id, "columns", [...ColumnProperty]);
                }

                const endTime = performance.now(); // End timing after everything
                console.log(`Total useEffect execution time: ${(endTime - startTime).toFixed(2)} ms`);
            }

            console.log("table rerender")
            fetchData(); // Call the async function inside useEffect

        }, [data]);


        useEffect(() => {
            console.log("render 123 columns")
        }, [columns])

        let isFilterApplied = tableData && originalData && Array.isArray(tableData) && Array.isArray(originalData) && tableData.length !== originalData.length;

        return (
            <BaseComponent
                {...baseCmpProps}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}
            >
                <div
                    className='tableWrap'
                    style={{
                        flex: '1 1 auto',
                        overflowY: 'auto',
                        overflowX: 'auto',
                        maxHeight: '100%',
                        margin: `${margin[0]} ${margin[1]} ${0} ${margin[3]}`,
                        // marginBottom: selectedRows.length > 0 ? 0 : margin[2],
                        borderRadius: `${border_radius[0]} ${border_radius[1]} ${0} ${0}`
                        // paddingBottom: '40px', // Add padding equal to the height of the bottom div
                    }}

                >
                    <table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            height: '100%',
                            maxHeight: '100%'
                        }}
                    >
                        {loadingData ? (<div className='flex items-center justify-center h-full w-full'><img style={{ height: '15%', width: '15%' }} src="/images/loading.gif" alt='loading...' /></div>) : (
                            <>
                                <thead>
                                    {renderHeader}
                                </thead>
                                <tbody  >
                                    {renderBody}
                                </tbody>
                            </>
                        )}
                    </table>
                </div>
                <div
                    className="relative flex items-center  bg-gray-100  rounded-b-lg"
                    style={{
                        flex: '0 0 auto',
                        margin: `${0} ${margin[1]} ${margin[2]} ${margin[3]}`,
                        borderRadius: `${0} ${0} ${border_radius[2]} ${border_radius[3]}`,
                        width: `calc(100% - (${margin[1]} + ${margin[3]}))`,
                        padding: '10px'
                    }}
                >
                    <span className="absolute left-1/2 transform -translate-x-1/2 text-gray-600">
                        {selectedRows.length > 0 ? `${selectedRows.length} out of ${tableData.length} selected` : `${tableData.length} Results`}
                    </span>
                    {!loadingData && <Popover
                        trigger={'click'}
                        placement='bottom'
                        content={<FilterComponent columns={columns} tableData={tableData} originalData={originalData} setTableData={setTableData} />}
                    >
                        {isFilterApplied ? <FaFilter className="ml-auto text-blue-400 text-sm cursor-pointer hover:text-blue-800" /> : <FaFilter className="ml-auto text-gray-400 text-sm cursor-pointer hover:text-gray-800" />}

                    </Popover>}
                </div>

                <Drawer title="User Profile" width={840} placement="right" onClose={closeDrawer} open={isDrawerOpen}>
                    {selectedProfile ? (
                        <div style={{ padding: "8px" }}>
                            {columnsState.map(({ header, accessor }: any, index: any) => {
                                let value = selectedProfile[accessor];


                                // Function to handle any type of nested object
                                const formatValue: any = (val: any) => {
                                    if (typeof val === "object" && val !== null) {
                                        return Object.entries(val)
                                            .map(([key, subValue]) => `${key}: ${formatValue(subValue)}`)
                                            .join(", ");
                                    }

                                    let col = columns.find((obj: any) => obj.columnName === accessor);

                                    if (!col) {
                                        console.warn(`Column not found for columnName: ${accessor}`);
                                    }

                                    const cellKey = `${index}-${col.accessor}`; // Using row index and column accessor as the key
                                    const cellContent = renderCell(val, col.columnType);
                                    // const cellContent = renderCell(val, col.columnType);
                                    return cellContent;
                                };
                                return (
                                    <div key={accessor} style={{ marginBottom: "0px", padding: "5px" }}>
                                        {accessor === "image" ? (
                                            <div>
                                                <strong>{header}</strong>
                                                <br />
                                                <img
                                                    src={value}
                                                    alt="Profile"
                                                    style={{ width: "100px", borderRadius: "8px", marginTop: "5px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
                                                />
                                            </div>
                                        ) : (
                                            <p style={{ margin: "0" }}>
                                                <strong style={{ display: "block", marginBottom: "5px" }}>{header}</strong>
                                                <p style={{ color: '#898585' }}>{formatValue(value)}</p>
                                            </p>
                                        )}
                                        <hr style={{ border: "1px solid #f7f7f7", margin: "8px 0" }} />
                                    </div>
                                );

                            })}
                        </div>
                    ) : (
                        <p style={{ padding: "16px" }}>No profile data</p>
                    )}
                </Drawer>

                <style>{`


                .tableWrap {
                    height: 100%;
                    border: ${border};
                    overflow: auto;
                }
                
                tbody{
                max-height:100%
                display: block
                }
        
                thead tr {
                    background-color: ${header_bg};
                    color: ${header_font_color};
                    
                }
                
            tbody td{
            td {
                height: 8px; 
                overflow: hidden; 
                padding: 0; 
                white-space: nowrap;
                }
            }
        
                thead tr th {
                    padding: 10px;
                    border-bottom: 2px solid #ddd;
                    position: sticky;
                    top: 0;
                }
                
                tbody tr td {
                padding:10px
                }
        
                table {
                    border-collapse: collapse;
                }
        
                th {
                    padding: 16px;
                    border-bottom: 1px solid #e8e8e8;
                    background: ${header_bg};
                    color: ${header_font_color};
                    box-shadow: 0px 0px 0 2px #e8e8e8;
                }
            `}</style>
            </BaseComponent>
        );

    };

    const EditProperties = getEditProperties(ElementTypes, THEME);
    const Configuration = getConfiguration(BaseConfiguration);

    Table.EditProperties = EditProperties;
    Table.PropsList = Object.keys(EditProperties);
    Table.properties = getDefaultProps(EditProperties)
    Table.Configuration = Configuration;
    // Wrap the existing Table component to inject manifest/config
    const TableComponent = (props: any) => {
        return (
            <Table
                {...props}
                EditProperties={manifest.EditProperties}
                Configuration={manifest.Configuration}
            />
        );
    };

    return {
        component: TableComponent,
        manifest: manifest,
    };
}


// ...existing code...
export { createComponent, runtimeDeps, registerRuntimeDeps, loadRuntimeDeps };


