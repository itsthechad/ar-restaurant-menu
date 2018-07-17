import Welcome from './components/Welcome';
import ARScene from './components/ARScene';
import VRScene from './components/VRScene';
import BottomUI from './components/BottomUI';
import ThreeDObject from './components/ThreeDObject';

const components = new Map();
components.set('Welcome', Welcome);
components.set('ARScene', ARScene);
components.set('VRScene', VRScene);
components.set('BottomUI', BottomUI);
components.set('ThreeDObject', ThreeDObject);

const componentFactory = (componentName) => components.get(componentName);

export default componentFactory;
