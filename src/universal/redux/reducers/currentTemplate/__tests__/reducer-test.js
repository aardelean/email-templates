import {expect} from 'chai';
import {reducer} from './../reducer';
import * as actions from './../actions';

describe('GIVEN template detail reducer tests', () => {
  let currentState = reducer();
  const newTemplate = {
    objectId: '1234',
    name: 'some template',
    description: 'some template description',
    developmentVersion: {
      html: 'initial html',
      sampleJson: 'initial json',
      translations: []
    },
    versions: [{
      objectId: "567c2e24464efd1c0770uyiedhas",
      html: 'initial html',
      sampleJson: 'initial json',
      translations: [],
      createdAt: "2010-12-24T17:40:52.508Z",
    }]
  };

  it('initial state should a null template',
    () => expect(reducer().template).to.deep.equal(null));

  describe('WHEN starting to load a template', () => {
    let action = { type: actions.LOAD_TEMPLATE_DETAIL };
    beforeEach(() => currentState = reducer(currentState, action));

    it('should be loading the template',
      () => expect(currentState.loadingTemplate).to.equal(true));

    describe('WHEN loaded template with success', () => {
      let action = {
        type: actions.LOAD_TEMPLATE_DETAIL_SUCCESS,
        result: newTemplate
      };
      beforeEach(() => currentState = reducer(currentState, action));

      it('should not be loading the template',
        () => expect(currentState.loadingTemplate).to.equal(false));

      it('should have a template',
        () => expect(currentState.template).not.to.equal(null));

      it('should the current version as the developmentVersion', () => {
        const expectation = Object.assign({}, currentState.template.developmentVersion, {
          isDevelopment: true
        });
        expect(currentState.template.currentVersion).to.deep.equal(expectation);
      });

      describe('WHEN updated development version html and sampleJSon with success', () => {
        let newVersion = {
          html: 'changed html',
          sampleJson: 'changed json'
        };

        let action = {
          type: actions.UPDATE_DEVELOPMENT_VERSION_SUCCESS,
          result: {
            developmentVersion: newVersion
          }
        };
        beforeEach(() => currentState = reducer(currentState, action));

        it('should the current version as the developmentVersion', () => {
          const expectation = Object.assign({}, currentState.template.developmentVersion, {
            isDevelopment: true
          });
          expect(currentState.template.currentVersion).to.deep.equal(expectation);
        });

        it('should have the new html',
          () => expect(currentState.template.developmentVersion.html).to.equal(newVersion.html));

        it('should have the new sample json',
          () => expect(currentState.template.developmentVersion.sampleJson).to.equal(newVersion.sampleJson));

        describe('WHEN promoting the development version to production versions with success', () => {
          let action = {
            type: actions.PROMOTE_PRODUCTION_VERSION_SUCCESS,
            result: {
              commitMessage: 'This is a new version',
              createdAt: "2015-12-24T17:40:52.508Z",
              html: "<div><h1><%= model.title %></h1><p><%= model.message %></p></div>",
              isProduction: false,
              objectId: "567c2e24464efd1c0770f48b",
              sampleJson: "{ message: 'Welcome', title: 'this is a new title', someOtherProp: 'here is one prop'}",
              templateId: "567ab1683d2a70fe73b1fbc6"
            }
          };

          beforeEach(() => currentState = reducer(currentState, action));

          it('should have 2 versions',
            () => expect(currentState.template.versions.length).to.equal(2));

          it('should have the dev version html',
            () => expect(currentState.template.versions[0].html).to.equal(action.result.html));

          it('should have the dev version of json',
            () => expect(currentState.template.versions[0].sampleJson).to.equal(action.result.sampleJson));

          describe('WHEN willing to view the second version', () => {
            let action = {
              type: actions.LOAD_VERSION_FROM_HISTORY_SUCCESS,
              result: {
                objectId: "567c2e24464efd1c0770uyiedhas"
              }
            };

            beforeEach(() => currentState = reducer(currentState, action));

            it('should have currentVersion html from the second version',
              () => expect(currentState.template.currentVersion.html).to.equal(currentState.template.versions[1].html));

            it('should have currentVersion sampleJson from the second version',
              () => expect(currentState.template.currentVersion.html).to.equal(currentState.template.versions[1].html));

            it('should have currentVersion isDevelopment to false',
              () => expect(currentState.template.currentVersion.isDevelopment).to.equal(false));
          });

          describe('WHEN changing the production version to the second initial version', () => {
            let action = {
              type: actions.CHANGE_PRODUCTION_VERSION_SUCCESS,
              result: {
                objectId: "567c2e24464efd1c0770uyiedhas"
              }
            };

            beforeEach(() => currentState = reducer(currentState, action));

            it('should have the id of "567c2e24464efd1c0770uyiedhas"',
              () => expect(currentState.template.versions[1].objectId).to.equal('567c2e24464efd1c0770uyiedhas'));

            it('should have the first version marked as production',
              () => expect(currentState.template.versions[1].isProduction).to.equal(true));
          });
        });
      });
    });
  });
});
