import { requiredAuthenticated } from './../../middleware';
import { sendHttpError } from './../../http';
import {
  getProjects,
  getProjectById,
  getProjectByIdAndQuery,
  insertProject,
  updateProject,
  deleteProject
} from './projects';

export function setupRoutes(app, prefix = '') {
  app.get(`${prefix}/`, requiredAuthenticated, (req, res) => {
    getProjects(req.user.objectId)
      .then((response) => res.json(response))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.get(`${prefix}/:projectId`, requiredAuthenticated, (req, res) => {
    const withTemplateHtml = req.query.with_template_html === 'true';
    const withLayoutHtml = req.query.with_layout_html === 'true';
    const query = {withTemplateHtml, withLayoutHtml};

    getProjectByIdAndQuery(req.user.objectId, req.params.projectId, query)
      .then((response) => res.json(response))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.post(`${prefix}/`, requiredAuthenticated, (req, res) => {
    insertProject(req.user.objectId, req.body)
      .then((response) => res.json(response))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.put(`${prefix}/:projectId`, requiredAuthenticated, (req, res) => {
    updateProject(req.params.projectId, req.body)
      .then(() => getProjectById(req.user.objectId, req.params.projectId))
      .then((response) => res.json(response))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });

  app.delete(`${prefix}/:projectId`, requiredAuthenticated, (req, res) => {
    deleteProject(req.params.projectId)
      .then(() => res.json({ response: 'success' }))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });
}
