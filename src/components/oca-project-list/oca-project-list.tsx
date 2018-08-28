import { Component } from '@stencil/core';


@Component({
  tag: 'oca-project-list'
})
export class OcaProjectList {

  projectList: any;

  componentWillLoad() {
    return fetch('http://localhost:8001/apis/project.openshift.io/v1/projects')
      .then(response => response.json())
      .then(data => {
        this.projectList = data;
      });
  }

  render() {
    return <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Display Name</th>
          <th>Requester</th>
          <th>Cost Center</th>
          <th>Actions</th>
        </tr>
        {this.projectList.items.map((project) =>
          <tr>
            <td>{project.metadata.name}</td>
            <td>{project.metadata.annotations['openshift.io/display-name']}</td>
            <td>{project.metadata.annotations['openshift.io/requester']}</td>
            <td>{project.metadata.annotations['porscheinformatik.cloud/cost-center']}</td>
            <td><stencil-route-link url={`/projects/${project.metadata.name}`}><button>Edit</button></stencil-route-link></td>
          </tr>
        )}
      </table>
    </div>;
  }

}
