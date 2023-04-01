import React, {useState} from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {defaultStyle} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Typography} from "@mui/material";
import {AgGridReact} from "ag-grid-react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import axios from "axios";
import {ColDef, ColGroupDef, GridReadyEvent} from "ag-grid-community";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ExcelSampleDto {
    name: string;
    age: number;
    gender: string;
    korean: number;
    english: number;
    math: number;
}

export default function BackExportPage() {

    const [rowData, setRowData] = useState<ExcelSampleDto[]>([]);

    const onClickAdd = () => {
        const emptyRow = {
            name: '',
            age: 0,
            gender: '',
            korean: 0,
            english: 0,
            math: 0
        } as ExcelSampleDto;

        setRowData(rowData.concat(emptyRow));
    }

    const onGridReady = ({api} : GridReadyEvent) => {
        api.sizeColumnsToFit();
    }

    const onClickExport = () => {
        //
        const data: any[] = rowData.map(dto => {
           return (
               {
                   personalInfo: {
                       name: dto.name,
                       age: dto.age,
                       gender: dto.gender,
                   },
                   grade: {
                       korean: dto.korean,
                       english: dto.english,
                       math: dto.math,
                   }
               }
           )
        });

        axios.post(
            'http://exceldemobackend-env-1.eba-xir2423a.ap-northeast-2.elasticbeanstalk.com/export-excel-via-dto',
            data,
            {
                responseType: 'blob',
                headers: {'Content-Type': 'application/json'}
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

    const resourceCodes = "@RestController\n" +
        "public class ExcelController {\n" +
        "    @PostMapping(value=\"/export-excel-via-dto\")\n" +
        "    public void exportExcel(HttpServletResponse response, @RequestBody List< ExcelSampleDto>; data) throws IOException {\n" +
        "        response.setContentType(\"application/vnd.ms-excel\");\n" +
        "        ExcelFile excelFile = new OneSheetExcelFile<>(data, ExcelSampleDto.class);\n" +
        "        excelFile.write(response.getOutputStream());\n" +
        "    }\n" +
        "}"

    const backendCodes =
        "@DefaultHeaderStyle(\n" +
        "    style = @ExcelColumnStyle(excelCellStyleClass = DefaultExcelCellStyle.class, enumName = \"BLUE_HEADER\")\n" +
        ")\n" +
        "@DefaultBodyStyle(\n" +
        "    style = @ExcelColumnStyle(excelCellStyleClass = DefaultExcelCellStyle.class, enumName = \"BODY\")\n" +
        ")\n" +
        "public class ExcelSampleDto {\n" +
        "    @ExcelColumn(headerName = \"Personal Info\")\n" +
        "    private PersonalInfo personalInfo;\n" +
        "    @ExcelColumn(headerName = \"Grade\")\n" +
        "    private Grade grade;\n" +
        "}\n" +
        "\n" +
        "public class PersonalInfo {\n" +
        "    //\n" +
        "    @ExcelColumn(headerName = \"Name\")\n" +
        "    private String name;\n" +
        "    @ExcelColumn(headerName = \"Age\")\n" +
        "    private int age;\n" +
        "    @ExcelColumn(headerName = \"Gender\")\n" +
        "    private String gender;\n" +
        "}\n" +
        "\n" +
        "public class Grade {\n" +
        "    //\n" +
        "    @ExcelColumn(headerName = \"Korean\")\n" +
        "    private int korean;\n" +
        "    @ExcelColumn(headerName = \"English\")\n" +
        "    private int english;\n" +
        "    @ExcelColumn(headerName = \"Math\")\n" +
        "    private int math;\n" +
        "}";

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={11} sx={{marginLeft: 3}}>
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
                    <div className="ag-theme-alpine" style={{width: '100%', height: 300}}>
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
                </Grid>
                <Grid xs={11} sx={{marginLeft: 3}}>
                    <Typography variant={'h6'} mt={3} mb={3}>💻 Backend Code</Typography>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant={'button'}>@RestController</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box component="div" sx={{ overflow: 'auto', height: 300 }}>
                                <SyntaxHighlighter language="java" style={defaultStyle as {[p: string]: React.CSSProperties}}>
                                    {resourceCodes}
                                </SyntaxHighlighter>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography variant={'button'}>@ExcelColumn DTO</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box component="div" sx={{ overflow: 'auto', height: 300 }}>
                                <SyntaxHighlighter language="java" style={defaultStyle as {[p: string]: React.CSSProperties}}>
                                    {backendCodes}
                                </SyntaxHighlighter>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </>
    )
}