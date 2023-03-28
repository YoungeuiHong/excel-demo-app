// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Define a header',
    path: '/excel/header',
    icon: icon('ic_number_1'),
  },
  {
    title: 'Export Excel file',
    path: '/excel/export',
    icon: icon('ic_number_2'),
  },
  {
    title: 'Import Excel file',
    path: '/excel/import',
    icon: icon('ic_number_3'),
  }
];

export default navConfig;
