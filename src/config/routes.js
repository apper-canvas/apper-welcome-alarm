import HomePage from '@/components/pages/HomePage';
import HowItWorksPage from '@/components/pages/HowItWorksPage';
import CourseContentPage from '@/components/pages/CourseContentPage';
import LearningModulesPage from '@/components/pages/LearningModulesPage';
import StudyGuidePage from '@/components/pages/StudyGuidePage';
import StartOverPage from '@/components/pages/StartOverPage';

export const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/how-it-works', component: HowItWorksPage, name: 'How It Works' },
  { path: '/course-content', component: CourseContentPage, name: 'Course Content' },
  { path: '/learning-modules', component: LearningModulesPage, name: 'Learning Modules' },
  { path: '/study-guides', component: StudyGuidePage, name: 'Study Guides' },
  { path: '/start-over', component: StartOverPage, name: 'Start Over' }
];

export const routeConfig = {
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
  },
learningModules: {
    id: 'learningModules',
    label: 'Learning Modules',
    path: '/modules',
    icon: 'GraduationCap',
    component: LearningModulesPage
  },
  startOver: {
    id: 'startOver',
    label: 'Start Over',
    path: '/start-over',
    icon: 'RotateCcw',
    component: StartOverPage
  }
};

export const routeArray = Object.values(routeConfig);
export default routes;