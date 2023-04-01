import React from 'react';
// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

// @ts-ignore
const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Define a header',
    path: '/excel-front/header',
    icon: icon('ic_number_1'),
  },
  {
    title: 'Export Excel file',
    path: '/excel-front/export',
    icon: icon('ic_number_2'),
  },
  {
    title: 'Import Excel file',
    path: '/excel-front/import',
    icon: icon('ic_number_3'),
  }
];

export default navConfig;
