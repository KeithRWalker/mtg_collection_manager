import React from 'react';
import { Col,
  Row, 
  Button, 
  CustomInput,
  Form, 
  FormGroup, 
  Label, 
  Input 
} from 'reactstrap';


class AdvSearchForm extends React.Component {
  render(){
    return(
      <div className="AdvSearchForm">
        <Form className="adv-search-form">
          <Row form>

            <FormGroup className="rarity-check-group form-g">
              <Label for="rarityCheck">Rarity</Label>
              <Row form>
                <Col><CustomInput type="checkbox" id="commonCheck" label="Common" /></Col>
                <Col><CustomInput type="checkbox" id="uncommonCheck" label="Uncommon" /></Col>
              </Row>
              <Row>
                <Col><CustomInput type="checkbox" id="rareCheck" label="Rare" /></Col>
                <Col><CustomInput type="checkbox" id="mythicCheck" label="Mythic Rare"/></Col>
              </Row>
            </FormGroup>

            <FormGroup className="mana-color-check-group form-g">
              <Label for="manaColorCheck">Mana Color</Label>
                <Row form>
                  <Col><CustomInput type="checkbox" id="whiteMana" label="White" /></Col>
                  <Col><CustomInput type="checkbox" id="blueMana" label="Blue" /></Col>
                </Row>
                <Row>
                  <Col><CustomInput type="checkbox" id="blackMana" label="Black" /></Col>
                  <Col><CustomInput type="checkbox" id="redMana" label="Red"/></Col>
                </Row>
                <Row>
                  <Col><CustomInput type="checkbox" id="greenMana" label="Green" /></Col>
                  <Col><CustomInput type="checkbox" id="colorlessMana" label="Colorless"/></Col>
              </Row>
            </FormGroup>


          </Row>

          <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
        </FormGroup>
          <FormGroup>
            <Label for="exampleAddress">Address</Label>
            <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
          </FormGroup>
          <FormGroup>
            <Label for="exampleAddress2">Address 2</Label>
            <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor"/>
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleCity">City</Label>
                <Input type="text" name="city" id="exampleCity"/>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="exampleState">State</Label>
                <Input type="text" name="state" id="exampleState"/>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="exampleZip">Zip</Label>
                <Input type="text" name="zip" id="exampleZip"/>
              </FormGroup>  
            </Col>
          </Row>
          <FormGroup check>
            <Input type="checkbox" name="check" id="exampleCheck"/>
            <Label for="exampleCheck" check>Check me out</Label>
          </FormGroup>
          <Button>Sign in</Button>
        </Form>
      </div>
    );
  }
}

export default AdvSearchForm;

// <h4>Advanced Search:</h4>
//           <Col>
//             <FormGroup>
//               <Label for="descriptionSearch">
//                 Search By Description:
//               </Label>
//               <Input 
//                 type="search"
//                 name="descriptionSearch"
//                 id="descriptionSearch"
//                 placeholder="Card Description"
//                 value={searchState.description}
//                 onChange={this.descriptionUpdate}/>
//             </FormGroup>
//           </Col>