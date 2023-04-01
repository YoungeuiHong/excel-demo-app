// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const backNavConfig = [
  {
    title: 'Export Excel file',
    path: '/excel-back/export',
    icon: icon('ic_number_1'),
  },
  {
    title: 'Import Excel file',
    path: '/excel-back/import',
    icon: icon('ic_number_2'),
  }
];

export default backNavConfig;
