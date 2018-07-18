import Welcome from './components/Welcome';
import ARController from './components/ARController';
import ThreeDObject from './components/ThreeDObject';

const components = new Map();
components.set('Welcome', Welcome);
components.set('ARController', ARController);
components.set('ThreeDObject', ThreeDObject);

const componentFactory = (componentName) => components.get(componentName);

export default componentFactory;
