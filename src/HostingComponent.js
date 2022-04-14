import React from 'react';
import Popout from 'react-popout';
import ReactGodot from 'react-godot';

export default class HostingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.popout = this.popout.bind(this);
    this.popoutClosed = this.popoutClosed.bind(this);
    this.popoutContentClicked = this.popoutContentClicked.bind(this);
    this.state = { isPoppedOut: false };
  }

  popout() {
    this.setState({
      isPoppedOut: true,
      timerId: setInterval(this.incrementTimer, 1000),
    });
  }

  popoutClosed() {
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
      this.setState({ isPoppedOut: false, timerId: null, timer: 0 });
    }
  }

  popoutContentClicked() {
    this.popoutClosed();
  }

  render() {
    if (this.state.isPoppedOut) {
      return (
        // Remove url parameter to see about:blank support
        <Popout title="Test" onClosing={this.popoutClosed}>
          <div>
            <ReactGodot
              script="../public/blacjack/Blackjack.js"
              pck="../public/blacjack/Blackjack.pck"
            />
            <button onClick={this.popoutContentClicked}>Close</button>
          </div>
        </Popout>
      );
    } else {
      return (
        <div>
          <button
            style={{
              cursor: 'pointer',
            }}
            onClick={this.popout}
          >
            pop window out
          </button>
        </div>
      );
    }
  }
}
