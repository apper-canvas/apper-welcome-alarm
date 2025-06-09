import HomePage from '../components/pages/HomePage';
import HowItWorksPage from '../components/pages/HowItWorksPage';
import CourseContentPage from '../components/pages/CourseContentPage';
import NotFound from '../pages/NotFound';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: HomePage
  },
  howItWorks: {
    id: 'howItWorks',
    label: 'How It Works',
    path: '/how-it-works',
    icon: 'HelpCircle',
    component: HowItWorksPage
  },
  courseContent: {
    id: 'courseContent',
    label: 'Course Content',
    path: '/course',
    icon: 'BookOpen',
    component: CourseContentPage
  }
};

export const routeArray = Object.values(routes);