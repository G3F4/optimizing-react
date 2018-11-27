import React, { Component } from 'react';
import update from 'immutability-helper';
import { fake } from 'faker';
import Sidebar from './Sidebar';
import Invitations from './Invitations';
import './App.css';

const DEFAULT_INVITATION_COUNT = 10;
const generateInvitation = (_, id) => ({
  id,
  expanded: false,
  guestInfo: {
    name: fake(`{{name.firstName}}`),
    lastName: fake(`{{name.lastName}}`),
    table: fake(`{{random.number}}`) % 10 + 1,
    plusOne: Boolean(fake(`{{random.number}}`) % 2),
    sex: fake(`{{random.number}}`) % 3,
    sendBy: fake(`{{random.number}}`) % 4,
  },
});

class App extends Component {
  state = {
    memoize: false,
    scu: false,
    times: [],
    invitations: Array.from({ length: DEFAULT_INVITATION_COUNT }, generateInvitation),
    invitationsCount: DEFAULT_INVITATION_COUNT,
  };

  componentWillUpdate() {
      this.time = Date.now();
  }

  componentDidUpdate(prevProps, prevState) {
    this.refreshTimes(this.state.times === prevState.times);
  }
  
  refreshTimes(hasTimeChanged) {
    if (hasTimeChanged) {
      this.setState({ times: [
        Date.now() - this.time,
        ...this.state.times,
      ] });
    }
  }

  onChangeInvitationsCount = length => this.setState({
    invitations: Array.from({ length }, generateInvitation),
    invitationsCount: parseInt(length, 10),
  });

  updateInvitations = invitations => {
    this.setState(update(this.state, { invitations }));
  };

  toggleMemoize = () => this.setState({ memoize: !this.state.memoize });

  toggleSCU = () => this.setState({ scu: !this.state.scu });

  render() {
    return (
      <div className="App" ref={(c) => { this.el = c; }}>
        <Sidebar
          memoize={this.state.memoize}
          toggleMemoize={this.toggleMemoize}
          scu={this.state.scu}
          toggleSCU={this.toggleSCU}
          invitationsCount={this.state.invitationsCount}
          times={this.state.times}
          onChangeInvitationsCount={this.onChangeInvitationsCount}
        />
        <Invitations
          memoize={this.state.memoize}
          scu={this.state.scu}
          invitations={this.state.invitations}
          updateInvitations={this.updateInvitations}
        />
      </div>
    )
  }
}

export default App;
