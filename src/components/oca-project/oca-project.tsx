import { Component, Prop } from '@stencil/core';
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'oca-project'
})
export class OcaProject {

  @Prop() match: MatchResults;

  render() {
    if (this.match && this.match.params.id) {
      return (
        <div>
          <h1>This is project {this.match.params.id}</h1>
        </div>
      );
    }
  }
}
