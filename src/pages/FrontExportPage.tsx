import {Button} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useAtomValue} from "jotai";
import {AgGridReact} from "ag-grid-react";
import {ColDef, ColGroupDef, GridReadyEvent} from "ag-grid-community";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import {headerAtom} from "../store";
import {HeaderNode} from "../types";

export default function FrontExportPage() {

    const headerNode = useAtomValue(headerAtom);

    const [colDefs, setColDefs] = useState<(ColDef | ColGroupDef)[]>([]);
    const [rowData, setRowData] = useState<any[]>([]);

    const gridRef = useRef<AgGridReact>(null);

    const makeColDefs = (nodePath: string, node: HeaderNode): (ColDef | ColGroupDef)[] => {

        if (node.children.length === 0) {
            return [{
                field: `${nodePath}/${node.fieldName}`,
                headerName: node.columnName,
                editable: true,
            }] as ColDef[];
        }

        return [{
            headerName: node.columnName,
            children: node.children.flatMap(childNode => makeColDefs(`${nodePath}/${node.fieldName}`, childNode)),
        }] as ColGroupDef[];
    }

    const convertHeaderNodeToColDefs = (rootNode: HeaderNode | undefined): (ColDef | ColGroupDef)[] => {
        if (rootNode === undefined) {
            return [];
        }
        const columnDefs = makeColDefs('', rootNode);
        const rootColDef = columnDefs.at(0) as ColGroupDef;
        setColDefs(rootColDef?.children ?? []);

        return columnDefs;
    }

    const makeEmptyRow = (colDefsParam: (ColDef | ColGroupDef)[]): any => {

        const rowMap = new Map();
        for (let i = 0; i < colDefsParam.length; i += 1) {
            if ((colDefsParam[i] as ColDef).field) {
                rowMap.set((colDefsParam[i] as ColDef).field, ' ');
            } else if ((colDefsParam[i] as ColGroupDef).children.length > 0) {
                makeEmptyRow((colDefsParam[i] as ColGroupDef).children);
            }
        }

        return Object.fromEntries(rowMap.entries());
    }

    const addNewRow = () => {
        const rowMap = makeEmptyRow(colDefs);

        if (gridRef.current) {
            gridRef.current.api.applyTransaction({
                add: [rowMap]
            })
        }
    }

    const init = () => {
        convertHeaderNodeToColDefs(headerNode);
    }

    const onClickAdd = () => {
        addNewRow();
    }

    const onGridReady = ({api}: GridReadyEvent) => {
        api.sizeColumnsToFit();
    }

    useEffect(() => {
        convertHeaderNodeToColDefs(headerNode);
    }, [headerNode]);

    useEffect(() => {
        init();
    }, []);


    const onClickExport = () => {
        //
        const form = new FormData();
        const gridData = gridRef?.current ? gridRef.current.api.getRenderedNodes().map(rowNode => {
            return rowNode.data;
        }) : [];
        form.append('data', JSON.stringify(gridData));
        form.append('headerNode', JSON.stringify(headerNode));
        axios.post(
            'http://exceldemobackend-env-1.eba-xir2423a.ap-northeast-2.elasticbeanstalk.com/export-via-header-node',
            form,
            {
                responseType: 'blob'
            }
        )
            .then((response) => {
                const blob = new Blob([response.data], {type: 'application/vnd.ms-excel'});
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'export.xlsx';
                a.click();
            })
            .catch(() => {
            });
    }

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button
                    color="warning"
                    variant="outlined"
                    size="small"
                    startIcon={<AddCircleIcon/>}
                    onClick={onClickAdd}
                    sx={{marginBottom: 2, marginRight: 1}}
                >
                    Add Row
                </Button>
                <Button
                    color="success"
                    variant="outlined"
                    size="small"
                    startIcon={<DownloadForOfflineIcon/>}
                    onClick={onClickExport}
                    sx={{marginBottom: 2, marginRight: 1}}
                >
                    Export
                </Button>

            </div>
            <div className="ag-theme-alpine" style={{width: '100%', height: 500}}>
                <AgGridReact
                    ref={gridRef}
                    columnDefs={colDefs}
                    rowData={rowData}
                    onGridReady={onGridReady}
                />
            </div>
        </>
    );
}