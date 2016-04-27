import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  icon, flag, flagShort, color, size, floated, aligned, column, deviceOnlyGrid, relaxed, textAligned, verticalAligned, attached, wide,
  Button, attachedButton,
  Container,
  Icon,
  Segment, raised, padded, emphasis,
  Grid, divided, celled, paddedGrid,
  Column, wideMobile, wideTablet, wideComputer, wideLargeScreen, wideWidescreen,
  Header, sizeHeader, outerTagHeader, subHeader,
  Row,
  InputTag,
  Form, outerTagForm, stateForm, sizeForm,
  Field,
  Fields, eqWidthFields,
  Message, stateMessage, sizeMessage,
} from '../../common/exports';
import * as ui from '../../common/exports';

export const FormsTest: ui.StatelessComponent<ui.IProps> = props => {
  return <Container>
    <h1>Forms</h1>
    <Form>
      <Field>
        <label>First Name</label>
        <InputTag placeholder='First Name'/>
      </Field>
      <Field>
        <label>Last Name</label>
        <InputTag placeholder='Last Name'/>
      </Field>
      <Button>Submit</Button>
    </Form>
    <br/><br/><hr/><br/><br/>
    <Form>
      <Header $dividing>Shipping Information</Header>
      <Field>
        <label>Name</label>
        <Fields $two>
          <Field>
            <InputTag placeholder='First Name'/>
          </Field>
          <Field>
            <InputTag placeholder='Last Name'/>
          </Field>
        </Fields>
      </Field>
      <Field>
        <label>Billing Address</label>
        <Fields>
          <Field $twelveWide>
            <InputTag placeholder='Street Address'/>
          </Field>
          <Field $fourWide>
            <InputTag placeholder='App #'/>
          </Field>
        </Fields>
      </Field>
      <Button>Submit</Button>
    </Form>
    <br/><br/>
    <h2>Fields</h2>
    <Form>
      <Fields>
        <Field><label>First Name</label><InputTag placeholder='First Name'/></Field>
        <Field><label>Middle Name</label><InputTag placeholder='Middle Name'/></Field>
        <Field><label>First Name</label><InputTag placeholder='First Name'/></Field>
      </Fields>
    </Form>
    <br/><br/>
    <Form>
      <Fields $three>
        <Field><label>First Name</label><InputTag placeholder='First Name'/></Field>
        <Field><label>Middle Name</label><InputTag placeholder='Middle Name'/></Field>
        <Field><label>First Name</label><InputTag placeholder='First Name'/></Field>
      </Fields>
    </Form>
    <br/><br/>
    <Form>
      <Fields $inline>
        <Field $eightWide><label>Name</label><InputTag placeholder='First Name'/></Field>
        <Field $threeWide><InputTag placeholder='Middle Name'/></Field>
        <Field $fiveWide><InputTag placeholder='First Name'/></Field>
      </Fields>
    </Form>
    <br/><br/>
    <h2>Loading</h2>
    <Form $loading>
      <Field>
        <label>First Name</label>
        <InputTag placeholder='First Name'/>
      </Field>
      <Field>
        <label>Last Name</label>
        <InputTag placeholder='Last Name'/>
      </Field>
      <Button>Submit</Button>
    </Form>
    <br/><br/>
    <h2>Success</h2>
    <Form $success>
      <Field>
        <label>First Name</label>
        <InputTag placeholder='First Name'/>
      </Field>
      <Message $success>
        <Header>Last Name</Header>
        <p>You're all signed up for the newsletter.</p>
      </Message>
      <Button>Submit</Button>
    </Form>
    <br/><br/>
    <h2>Warning</h2>
    <Form $warning>
      <Field>
        <label>First Name</label>
        <InputTag placeholder='First Name'/>
      </Field>
      <Message $warning>
        <Header>Last Name</Header>
        <p>You're all signed up for the newsletter.</p>
      </Message>
      <Button>Submit</Button>
    </Form>
    <br/><br/>
    <h2>Error</h2>
    <Form $error>
      <Field>
        <label>First Name</label>
        <InputTag placeholder='First Name'/>
      </Field>
      <Message $error>
        <Header>Last Name</Header>
        <p>You're all signed up for the newsletter.</p>
      </Message>
      <Button>Submit</Button>
    </Form>
    <br/><br/>
    <h2>Size</h2>
    <Form $small>
      <Field>
        <label>First Name</label>
        <InputTag placeholder='First Name'/>
      </Field>
      <Button>Submit</Button>
    </Form>
    <br/><br/>
    <Form>
      <Field>
        <label>First Name</label>
        <InputTag placeholder='First Name'/>
      </Field>
      <Button>Submit</Button>
    </Form>
    <br/><br/>
    <Form $large>
      <Field>
        <label>First Name</label>
        <InputTag placeholder='First Name'/>
      </Field>
      <Button>Submit</Button>
    </Form>
    <br/><br/>
    <Form $huge>
      <Field>
        <label>First Name</label>
        <InputTag placeholder='First Name'/>
      </Field>
      <Button>Submit</Button>
    </Form>
    <br/><br/>
    <h2>Equal Width</h2>
    <Form $equalWidth>
      <Fields>
        <Field><label>First Name</label><InputTag placeholder='First Name'/></Field>
        <Field><label>Middle Name</label><InputTag placeholder='Middle Name'/></Field>
        <Field><label>First Name</label><InputTag placeholder='First Name'/></Field>
      </Fields>
      <Fields>
        <Field><label>First Name</label><InputTag placeholder='First Name'/></Field>
        <Field><label>First Name</label><InputTag placeholder='First Name'/></Field>
      </Fields>
    </Form>
    <br/><br/>

    <h2>Inverted</h2>
    <Segment $inverted>
    <Form $inverted>
      <Fields $equalWidth>
        <Field><label>First Name</label><InputTag placeholder='First Name'/></Field>
        <Field><label>Middle Name</label><InputTag placeholder='Middle Name'/></Field>
        <Field><label>First Name</label><InputTag placeholder='First Name'/></Field>
      </Fields>
      <Button>Submit</Button>
    </Form>
    </Segment>
    <br/><br/>
    <h2>Inline Field</h2>
    <Form>
      <Field $inline><label>First Name</label><InputTag placeholder='First Name'/></Field>
    </Form>
    <br/><br/>

    <h2>Required</h2>
    <Form>
      <Field $required><label>First Name</label><InputTag placeholder='First Name'/></Field>
    </Form>
    <br/><br/>
  </Container>;
}