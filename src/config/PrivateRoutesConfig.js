import { Roles } from '../config'

// Components
//Admin
import AdminDashboard from "../pages/Admin/Dashboard";
import VisitingPlaces from '../pages/Admin/VisitingPlaces';
import Tourists from '../pages/Admin/Tourists';
import Assistents from '../pages/Admin/Assistents';
//Assistant
import AssistantDashboard from "../pages/Assistant/AssistantDashboard";
import TouristsManager from "../pages/Assistant/TouristsManager";
import ScheduleManager from "../pages/Assistant/ScheduleManager";
import AssistantVisitingPlaces from "../pages/Assistant/AssistantVisitingPlaces";
//Tourist
import TouristDashboard from "../pages/Tourist/Dashboard";
import TouristVisitingPlaces from '../pages/Tourist/VisitingPlaces';

export default [
	//Admin Routes
	{
		component: AdminDashboard,
		path: '/',
		title: 'Dashboard',
		exact: true,
		permission: [
			Roles.SUPER_ADMIN,
			Roles.ADMIN,
		],
	},
	{
		component: VisitingPlaces,
		path: '/visitingplaces',
		title: 'Visiting Palces',
		permission: [
			Roles.SUPER_ADMIN,
			Roles.ADMIN,
			

		],
	},
	{
		component: Assistents,
		path: '/assistants',
		title: 'Assistants',
		permission: [
			Roles.SUPER_ADMIN,
			Roles.ADMIN,
		],
	},
	{
		component: Tourists,
		path: '/tourists',
		title: 'Tourists',
		permission: [
			Roles.SUPER_ADMIN,
			Roles.ADMIN,
		],
	},
	//Assistant Routes
	{
		component: AssistantVisitingPlaces,
		path: '/assistantvp',
		title: 'Visiting Places',
		permission: [
			Roles.ASSISTANT
		],
	},
	{
		component: TouristsManager,
		path: '/tourists',
		title: 'Tourists',
		permission: [
			Roles.ASSISTANT
		],
	}, 
	{
		component: ScheduleManager,
		path: '/schedules',
		title: 'Schedules',
		permission: [
			Roles.ASSISTANT
		],
	},
	{
		component: AssistantDashboard,
		path: '/',
		title: 'Dashboard',
		permission: [
			Roles.ASSISTANT
		],
	},
	
	
	//Tourist Routes
	{
		component: TouristVisitingPlaces,
		path: '/visitingplaces',
		title: 'Visiting Places',
		permission: [
			Roles.CUSTOMER
		],
	},
	{
		component: TouristDashboard,
		path: '/',
		title: 'Dashboard',
		permission: [
			Roles.CUSTOMER
		],
	},
	

]
