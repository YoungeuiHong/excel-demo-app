import React, {useEffect, useRef, useState} from 'react';
import {Button} from '@mui/material';
import {AgGridReact} from "ag-grid-react";
import axios from 'axios';
import {ColDef, ColGroupDef, GridReadyEvent} from "ag-grid-community";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {HeaderNode} from 'src/types/types';
import {useAtomValue} from "jotai";
import {headerAtom} from "../store";


export default function FrontImportPage() {

    /** Atoms */
    const headerNode = useAtomValue(headerAtom);

    /** States */
    const [colDefs, setColDefs] = useState<(ColDef | ColGroupDef)[]>([]);
    const [rowData, setRowData] = useState<any[]>([]);

    /** Ref */
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const onClickImport = () => {
        fileInputRef?.current?.click();
    }

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const form = new FormData();
            form.append('file', selectedFile);
            form.append('headerNode', JSON.stringify(headerNode));
            axios.post<any[]>(
                'http://exceldemobackend-env-1.eba-xir2423a.ap-northeast-2.elasticbeanstalk.com/import-via-header-node',
                form
            )
                .then((response) => {
                    setRowData(response.data);
                })
                .catch(() => {
                })

        }
    };

    const onGridReady = ({api}: GridReadyEvent) => {
        api.sizeColumnsToFit();
    }

    useEffect(() => {
        convertHeaderNodeToColDefs(headerNode);
    }, [headerNode]);

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <input id="file-input" type="file" ref={fileInputRef} onChange={handleFileInputChange}
                       style={{display: 'none'}}/>
                <Button
                    color="success"
                    variant="outlined"
                    size="small"
                    startIcon={<ArrowCircleUpIcon/>}
                    onClick={onClickImport}
                    sx={{marginBottom: 2, marginRight: 1}}
                >
                    Import
                </Button>

            </div>
            <div className="ag-theme-alpine" style={{width: '100%', height: 500}}>
                <AgGridReact
                    columnDefs={colDefs}
                    rowData={rowData}
                    onGridReady={onGridReady}
                />
            </div>
        </>

    );
}