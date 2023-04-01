import React, {useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import {Button} from "@mui/material";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {ColDef, ColGroupDef, GridReadyEvent} from "ag-grid-community";
import axios from "axios";

interface PersonalInfo {
    name: string;
    age: number;
    gender: string;
}

interface Grade {
    korean: number;
    english: number;
    math: number;
}

interface ExcelSampleDto {
    personalInfo: PersonalInfo;
    grade: Grade;
}

interface RowData {
    name: string;
    age: number;
    gender: string;
    korean: number;
    english: number;
    math: number;
}

export default function BackImportPage() {

    /** State */
    const [rowData, setRowData] = useState<RowData[]>([]);

    /** Ref */
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onClickImport = () => {
        fileInputRef?.current?.click();
    }

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const form = new FormData();
            form.append('file', selectedFile);
            axios.post<ExcelSampleDto[]>(
                'http://exceldemobackend-env-1.eba-xir2423a.ap-northeast-2.elasticbeanstalk.com/import-excel-via-dto',
                form
            )
                .then((response) => {
                    setRowData(response.data.map(dto => {
                        return ({
                            name: dto.personalInfo.name,
                            age: dto.personalInfo.age,
                            gender: dto.personalInfo.gender,
                            korean: dto.grade.korean,
                            english: dto.grade.english,
                            math: dto.grade.math,
                        } as RowData)
                    }));
                })
                .catch(() => {
                })

        }
    };

    const onGridReady = ({api}: GridReadyEvent) => {
        api.sizeColumnsToFit();
    }

    const colDefs: (ColDef | ColGroupDef)[] = [
        {
            headerName: 'Personal Info',
            children: [
                {
                    field: 'name',
                    headerName: 'Name'
                },
                {
                    field: 'age',
                    headerName: 'Age'
                },
                {
                    field: 'gender',
                    headerName: 'Gender',
                }
            ]
        },
        {
            headerName: 'Grade',
            children: [
                {
                    field: 'korean',
                    headerName: 'Korean'
                },
                {
                    field: 'english',
                    headerName: 'English'
                },
                {
                    field: 'math',
                    headerName: 'Math'
                }
            ]
        }
    ];

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
            <div className="ag-theme-alpine" style={{width: '100%', height: 400}}>
                <AgGridReact
                    columnDefs={colDefs}
                    rowData={rowData}
                    defaultColDef={{
                        editable: true,
                        resizable: true,
                    }}
                    onGridReady={onGridReady}
                />
            </div>
        </>
    );
}