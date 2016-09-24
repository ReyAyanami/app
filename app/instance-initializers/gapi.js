export function initialize(appInstance) {
  appInstance.inject('route', 'gapi', 'service:gapi');
}

export default {
  name: 'gapi',
  initialize
};
