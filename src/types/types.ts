import {DataNode} from "antd/es/tree";
import { Color, createColor } from "material-ui-color";

export type NodeType = 'String' | 'Float' | 'Integer';

export type RGB = {
    r: number,
    g: number,
    b: number
}

export interface HeaderTreeNode extends DataNode {
    type: NodeType;
    columnName: string;
    fieldName: string;
    headerRGB: RGB;
    bodyRGB: RGB;
    children: HeaderTreeNode[];
    headerColor?: Color;
    bodyColor?: Color;
}

export interface HeaderNode {
    type: NodeType;
    columnName: string;
    fieldName: string;
    headerRGB: RGB;
    bodyRGB: RGB;
    children: HeaderNode[];
}

export const defaultHeaderColor: Color = createColor('lightgreen');

export const defaultBodyColor: Color = createColor('white');

export const defaultHeaderRGB: RGB = { r: 144, g: 238, b: 144};

export const defaultBodyRGB: RGB = { r: 255, g: 255, b: 255};