import React, { useEffect, useRef } from 'react';
import { Popover } from 'antd';
import { AiOutlineCompress } from 'react-icons/ai';

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
    style:object;
}

const RowComponent: React.FC<RowProps> = React.memo(({
    row, index, isSelected, columns, columnsState, selectionType, handleRowClick, checkboxBorderColor, checkboxAccentCol, selectionBg, renderCell, showDrawer,style
}) => {
    
    let rowhasRender= useRef(false);

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
                maxHeight:'50px',
                overflow:'hidden',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            {selectionType === 'multiple' && (
                <td style={{ padding: '15px',alignItems: 'center' }}>
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


            <td style={{ padding: '5px',maxHeight:'50px', minWidth: '110px',maxWidth:'110px', textAlign: 'center' , alignItems: "center",position:'relative'}}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%",position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)' }}>
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
                    <td key={cellKey} className='w-full' style={{ padding: "5px 15px",  minWidth: '160px',maxWidth:'160px',maxHeight:'50px' , alignItems: "center" ,position:'relative'}}>
                        {col.columnType === "MultiSelect" && Array.isArray(cellContent) ? (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center" ,position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
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
}, (prevProps, nextProps) => {
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



export default RowComponent;
