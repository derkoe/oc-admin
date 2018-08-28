import { Component } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  render() {
    return (
      <div>
        <header>
          <stencil-route-link url='/'>
            <h1>OC Admin</h1>
          </stencil-route-link>
          <stencil-route-link url='/projects'>
            <span>Projects</span>
          </stencil-route-link>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="oca-home" exact={true} />
              <stencil-route url='/projects' component='oca-project-list' exact={true} />
              <stencil-route url='/projects/:name' component='oca-project' />
              <stencil-route-redirect url="/"></stencil-route-redirect>
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
