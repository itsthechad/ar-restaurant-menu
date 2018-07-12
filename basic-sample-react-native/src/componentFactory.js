import Welcome from './components/Welcome';
import ARScene from './components/ARScene';
import VRScene from './components/VRScene';
import BottomUI from './components/BottomUI';

const components = new Map();
components.set('Welcome', Welcome);
components.set('ARScene', ARScene);
components.set('VRScene', VRScene);
components.set('BottomUI', BottomUI);

const componentFactory = (componentName) => components.get(componentName);

export default componentFactory;
