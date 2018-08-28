import { Component, Prop } from '@stencil/core';
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'oca-project'
})
export class OcaProject {

  @Prop() match: MatchResults;

  private project: any;
  private roleBindingList: any;

  componentWillLoad() {
    const projectPromise = fetch(`http://localhost:8001/apis/project.openshift.io/v1/projects/${this.match.params.name}`)
      .then(response => response.json())
      .then(data => {
        this.project = data;
      });

    const roleBindingPromise = fetch(`http://localhost:8001/apis/authorization.openshift.io/v1/namespaces/${this.match.params.name}/rolebindings`)
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        this.roleBindingList = data;
      });

    return Promise.all([projectPromise, roleBindingPromise]);
  }

  render() {
    return (
      <div>
        <h1>Project {this.project.metadata.name}</h1>
        <ul>
          <li>Created: {this.project.metadata.creationTimestamp}</li>
          <li>Requester: {this.project.metadata.annotations['openshift.io/requester']}</li>
          <li>Node Selector: {this.project.metadata.annotations['openshift.io/node-selector']}</li>
          <li>Cost Center: {this.project.metadata.annotations['porscheinformatik.cloud/cost-center']}</li>
        </ul>
        {this.renderRoles()}
      </div>
    );
  }

  renderRoles() {
    if (this.roleBindingList) {
      return (
        <div>
          <h2>Roles</h2>
          <ul>
            {this.roleBindingList.items.map((roleBinding) =>
              <li>
                <strong>{roleBinding.metadata.name}</strong><br />
                Users: {roleBinding.userNames ? roleBinding.userNames.map(name => `${name} `) : '-'}<br />
                Groups: {roleBinding.groupNames ? roleBinding.groupNames.map(name => `${name} `) : '-'}<br /></li>
            )}
          </ul>
        </div>
      );
    } else {
      return (
        <div><h2>Roles</h2><p>Could not load roles</p></div>
      );
    }
  }
}
