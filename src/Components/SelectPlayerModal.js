import React from 'react';
import {
  Button, Grid, List, Message, Modal,
} from 'semantic-ui-react';

class SelectPlayerModal extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  includes(starting11, player) {
    const flattenTeam = [].concat(...starting11);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < flattenTeam.length; i++) {
      if (flattenTeam[i].name === player.name
        && flattenTeam[i].birthYear === player.birthYear
        && flattenTeam[i].position === player.position
        && flattenTeam[i].defense === player.defense
        && flattenTeam[i].attack === player.attack) {
        return true;
      }
    }
    return false;
  }

  filterStartingPlayers() {
    const { info, teams } = this.props;
    const filtered = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < teams[info.team].roster.length; i++) {
      if (!this.includes(teams[info.team].starting11, teams[info.team].roster[i])) {
        filtered.push(teams[info.team].roster[i]);
      }
    }
    return filtered;
  }

  modalContent() {
    const { info } = this.props;
    if (info.team !== '') {
      return this.filterStartingPlayers().length !== 0;
    }
    return false;
  }

  render() {
    const {
      info, handleSelectPlayerModal, handlePlayerSelection,
    } = this.props;
    return (
      <Modal open={info.open}>
        <Modal.Header>Select a Player</Modal.Header>
        <Modal.Content>
          {this.modalContent()
            ? (
              <List selection relaxed divided size='big' style={{ maxHeight: '50vh', overflowY: 'auto', overflowX: 'hidden' }}>
                {this.filterStartingPlayers().map((player, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <List.Item key={i} onClick={() => handlePlayerSelection(player)}>
                    <Grid textAlign='left'>
                      <Grid.Column width={7}>
                        {player.position}
                        |
                        {' '}
                        {player.name}
                        {' '}
                        (
                        {new Date().getFullYear() - player.birthYear}
                        )
                      </Grid.Column>
                      <Grid.Column width={7}>
                        Def:
                        {' '}
                        {player.defense}
                        , Att:
                        {' '}
                        {player.attack}
                      </Grid.Column>
                    </Grid>
                  </List.Item>
                ))}
              </List>
            )
            : (
              <Message
                info
                header='No Players Available on Team Roster!'
                content='Please add or upload players to your team.'
              />
            )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => handleSelectPlayerModal(false, '')} negative content='Cancel' />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default SelectPlayerModal;
