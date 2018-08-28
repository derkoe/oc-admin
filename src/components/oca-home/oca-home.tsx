import { Component } from '@stencil/core';

@Component({
  tag: 'oca-home',
  styleUrl: 'oca-home.css'
})
export class OcaHome {

  render() {
    return (
      <div class='oca-home'>
        <p>
          Welcome to the OpenShift administation application.
        </p>
      </div>
    );
  }
}
