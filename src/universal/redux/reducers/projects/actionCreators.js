import * as actions from './actions';

export function getProjectsAction() {
  return {
    types: [actions.LOAD_PROJECT_LIST, actions.LOAD_PROJECT_LIST_SUCCESS, actions.LOAD_PROJECT_LIST_FAIL],
    promise: (client) => {
      return client.get('/project');
    }
  };
}

export function insertProjectsAction(project) {
  return {
    types: [actions.INSERT_PROJECT, actions.INSERT_PROJECT_SUCCESS, actions.INSERT_PROJECT_FAIL],
    promise: (client) => {
      return client.post('/project', {
        data: project
      });
    }
  };
}

export function updateProjectsAction(project) {
  return {
    types: [actions.INSERT_PROJECT, actions.INSERT_PROJECT_SUCCESS, actions.INSERT_PROJECT_FAIL],
    promise: (client) => {
      return client.put('/project/' + project.objectId, {
        data: project
      });
    }
  };
}

export function deleteProjectsAction(project) {
  return {
    types: [actions.INSERT_PROJECT, actions.INSERT_PROJECT_SUCCESS, actions.INSERT_PROJECT_FAIL],
    promise: (client) => {
      return client.del('/project/' + project.objectId);
    }
  };
}
