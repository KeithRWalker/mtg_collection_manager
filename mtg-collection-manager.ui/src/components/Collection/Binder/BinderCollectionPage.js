import React from 'react'
import {
  Button,
  CardDeck,
  Input,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter 
} from 'reactstrap';
import binderData from '../../../data/binderData';
import Binder from './Binder';
import './BinderStyle.scss';

const defaultInput = {
  name: "",
  description: "",
  type: "",
}

class BinderCollectionPage extends React.Component{
  state = {
    userBinders: [],
    binderModalOpen: false,
    binderSubmit: defaultInput,
  }

  componentDidMount() {
    this.loadBinderCollection();
  }

  loadBinderCollection = () => {
    binderData.getUserBinders()
    .then((resp) => {
      this.setState({ userBinders: resp })
    })
    .catch(err => console.error(err, "Error in loadBinderCollection() =>componentDidMount // BinderCollectionPage.js"))
  }

  toggleBinderModal = () => this.setState({ binderModalOpen: !this.state.binderModalOpen });
  binderNameUpdate = e => this.updateBinderState(e, 'name');
  binderDescriptionUpdate = e => this.updateBinderState(e, 'description');
  updateBinderState = (e, formName) => {
    const binderObject = { ...this.state.binderSubmit }
    binderObject[formName] = e.target.value;
    this.setState({ binderSubmit: binderObject })
  }
  binderSubmit = (e) => {
    e.preventDefault();
    const binderObject = { ...this.state.binderSubmit };
    binderData.postNewBinder(binderObject).then(() => {
      this.toggleBinderModal()
      this.loadBinderCollection();
    })
  }

  render() {

    const { binderModalOpen, binderSubmit } = this.state;

    const bindersToShow = this.state.userBinders.map(binder => (
      <Binder userBinder={binder} key={binder.id}/>
    ));

    return(
      <div className="BinderCollectionPage PageComp">
        <div className="PageCon">
          <div className="binder-section-container">

            <div className="binders-label">
              <h1>Binders:</h1>
              <Button className="add-binder-btn" size="sm" onClick={this.toggleBinderModal}>Add a Binder</Button>
            </div>
          <div className="binder-container">
            <CardDeck>
              {bindersToShow}
            </CardDeck>
          </div>

          <div className="binder-modal collection-modal">
            <Modal isOpen={binderModalOpen} toggle={this.toggleBinderModal} className="binder-modal">
              <ModalHeader toggle={this.toggleBinderModal}> Add a Binder</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  name="binderName"
                  placeholder="Name"
                  value={binderSubmit.name}
                  onChange={this.binderNameUpdate}
                />
                <Input
                  type="textarea"
                  rows={4}
                  name="binderDescription"
                  placeholder="Description"
                  value={binderSubmit.description}
                  onChange={this.binderDescriptionUpdate}
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={this.toggleBinderModal}>Cancel</Button>{' '}
                <Button type="submit" onClick={this.binderSubmit}>Submit</Button>{' '}
              </ModalFooter>
            </Modal>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BinderCollectionPage;
