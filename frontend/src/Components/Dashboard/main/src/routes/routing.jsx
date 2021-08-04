import Starter from '../views/starter/starter.jsx';
import Profile from '../views/ui-components/Profile.jsx';
import FetchImages from '../views/ui-components/FetchImages.jsx';

var ThemeRoutes = [
	{
		path: '/user/Overview',
		name: 'Algorithms',
		icon: 'mdi mdi-adjust',
		component: Starter,
	},
	{
		path: '/user/Profile',
		name: 'Profile',
		icon: 'mdi mdi-account-circle',
		component: Profile,
	},
	{
		path: '/user/StegoImages',
		name: 'Recent Images',
		icon: 'mdi mdi-tooltip-image',
		component: FetchImages,
	},
	// {
	//   path: '/ui-components/layout',
	//   name: 'Recent Uploads',
	//   icon: 'mdi mdi-apps',
	//   component: LayoutComponent,
	// },
	// // {
	// //   path: '/ui-components/pagination',
	// //   name: 'Pagination',

	// //   icon: 'mdi mdi-priority-high',
	// //   component: PaginationComponent,
	// // },

	// {
	//   path: '/ui-components/tooltip',
	//   name: 'Settings',
	//   icon: 'mdi mdi-image-filter-vintage',
	//   component: TooltipComponent,
	// },
	// {
	//   path: '/',
	//   pathTo: '/starter/starter',
	//   name: 'Dashboard',
	//   redirect: true,
	// },
	// {
	//   path: '/',
	//   name: 'Logout',
	//   icon: 'mdi mdi-logout-variant',
	//   component: PopoverComponent,
	// },
];
export default ThemeRoutes;
