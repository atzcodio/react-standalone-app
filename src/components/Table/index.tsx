import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ElementTypes } from '../../elements_types';
import { BaseComponent, BaseConfiguration, BaseProps, getDefaultProps,LowCodeComponent } from '../../baseComponent';
import { useComponentContext } from '../../context/componentContext';
import { Checkbox, Radio, Avatar, Col, Divider, Drawer, List, Row, Popover } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { AiOutlineCaretDown, AiOutlineCaretUp, AiOutlineCompress } from 'react-icons/ai';
import { FaFilter } from "react-icons/fa";
import TableFilter from "./tableFilter"
import { THEME } from '../../props';

import RowComponent from "./rowComponent";
import { FixedSizeList as TableList, ListChildComponentProps } from 'react-window'
import AutoSizer from "react-virtualized-auto-sizer";
import { m } from 'framer-motion';



interface DescriptionItemProps {
    title: string;
    content: React.ReactNode;
}

interface TableProps extends BaseProps {
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




const Configuration = {
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
}


const EditProperties = [
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
                    columnType: ElementTypes.SELECT(["Text", "Number", "Boolean", "Url", "Email", "Json", "MultiSelect", "SingleSelect"], "Text"),
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
];


const defaultProps: Partial<TableProps> = getDefaultProps(EditProperties);
const Table:LowCodeComponent<TableProps> = (props) => {
    const { id, grid, properties, meta, updateProperties, onFxChange, ...rest } = props;
    let { selectionBg, checkboxBorderColor, data = [], margin, border, header_bg, header_font_color, body_bg, body_font_color, checkbox_accent_col, onRowSelect, selected_row, selection_type, columns, primary_key, border_radius, defaultSelected, defaultSelectedFilter } = { ...defaultProps, ...properties } as Required<TableProps>;
    const { evaluateFormula } = useComponentContext();

    const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null);
    const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); //preview drawer
    const [selectedProfile, setSelectedProfile] = useState(null);//drawer
    const [tableData, setTableData] = useState<TableRow[]>([]);
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

    const [originalData, setOriginalData] = useState<TableRow[]>([]);// will be used filtering

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
            currentColumnsState: columnsState.map(c => c.accessor)
        });

        if (columns && Array.isArray(columns) && columns.length > 0 && tableData.length > 0) {
            // Re-order columns based on the columns array order
            const orderedColumnNames = columns.map(col => col.columnName);
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


    const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: string | null }>({
        key: null,
        direction: null,
    });

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
                {columnsState.map((column) => (
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
    }, [tableData, , selectedRows, selection_type]);//selectedRow

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
            setSelectedRows((prevSelectedRows) => {
                const rowKey = row.key;
                const selectedKeys = new Set(prevSelectedRows.map((r) => r.key));

                if (selectedKeys.has(rowKey)) {
                    // Remove row if already selected
                    const updatedRows = prevSelectedRows.filter((r) => r.key !== rowKey);
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
            : selectedRows.some((r) => r.key === row.key);

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
                console.log('📊 [Table] Data useEffect - Current columnsState:', columnsState.map(c => c.accessor));

                // If we have existing columns configuration, respect their order
                let orderedColumns = availableDataColumns;
                if (columns && Array.isArray(columns) && columns.length > 0) {
                    // Get column names from the sorted columns array
                    const existingColumnNames = columns
                        .map(col => col.columnName)
                        .filter(name => availableDataColumns.includes(name));

                    // Add any new columns that weren't in the previous configuration
                    const newColumns = availableDataColumns.filter((col: string) =>
                        !columns.some((existingCol: any) => existingCol.columnName === col)
                    );

                    orderedColumns = [...existingColumnNames, ...newColumns];
                    console.log('📊 [Table] Data useEffect - Ordered columns from config:', orderedColumns);
                }

                // Only update columns state if columns are uninitialized (prevent overriding user reordering)
                const currentColumnOrder = columnsState.map(col => col.accessor).filter(Boolean);
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
                const ColumnProperty = orderedColumns.map((columnName, index) => ({
                    columnName,
                    columnType: detectDataType(data[0][columnName]) || "Text",
                }));

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
                    content={<TableFilter columns={columns} tableData={tableData} originalData={originalData} setTableData={setTableData} />}
                >
                    {isFilterApplied ? <FaFilter className="ml-auto text-blue-400 text-sm cursor-pointer hover:text-blue-800" /> : <FaFilter className="ml-auto text-gray-400 text-sm cursor-pointer hover:text-gray-800" />}

                </Popover>}
            </div>

            <Drawer title="User Profile" width={840} placement="right" onClose={closeDrawer} open={isDrawerOpen}>
                {selectedProfile ? (
                    <div style={{ padding: "8px" }}>
                        {columnsState.map(({ header, accessor }, index) => {
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

Table.defaultProps = defaultProps;
Table.EditProperties = EditProperties;
Table.PropsList = Object.keys(EditProperties);
Table.Configuration = Configuration;
export default Table;


