import ARController from './components/ARController';

const components = new Map();
components.set('ARController', ARController);

const componentFactory = (componentName) => components.get(componentName);

export default componentFactory;
