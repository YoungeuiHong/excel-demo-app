// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Define a header',
    path: '/dashboard/app',
    icon: icon('ic_number_1'),
  },
  {
    title: 'Enter body data',
    path: '/dashboard/user',
    icon: icon('ic_number_2'),
  },
  {
    title: 'Export Excel file',
    path: '/dashboard/products',
    icon: icon('ic_number_3'),
  },
  {
    title: 'Import Excel file',
    path: '/dashboard/blog',
    icon: icon('ic_number_4'),
  }
];

export default navConfig;
