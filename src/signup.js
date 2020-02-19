import React from 'react';
import './globalcss.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';

class Signup extends React.Component {

  constructor() {
    super()
    this.state = {
      firstname: null,
      middlename: null,
      lastname: null,
      email: null,
      password: null,
      mobile: null,
      gender: null,
      occupation: null,
      hobby: [],
      required: {
        fnameerror: '',
        lnameerror: '',
        emailerror: '',
        passworderror: '',
        mobileerror: '',
        gendererror: '',
        occupationerror: '',
        hobbyerror: ''
      }
    }
  }

  checkFormate = (name, value) => {

    //regular expression for checking spacific requirnment
    let nameregex = /^[A-Za-z]{2,20}$/;
    let emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passwordregex1lowercase = /(?=.*[a-z])/;
    let passwordregex2uppercase = /(?=.*[A-Z])/;
    let passwordregex3numeric = /(?=.*[0-9])/;
    let passwordregex4spacial = /(?=.*[!@#\$%\^&\*])/;
    let passwordregex5length = /(?=.{8,})/;
    let mobilereg = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;

    //distructured required object 
    let { required } = this.state

    //checking validation condition for all comp.
    if (name === "firstname") {
      if (value === "") {
        required.fnameerror = "Required"
      }
      else if (!nameregex.test(value)) {
        required.fnameerror = "Please provide valid first name wihout numbers and at least 2 character."
      }
      else {
        required.fnameerror = ""
      }
    }
    if (name === "lastname") {
      if (value === "") {
        required.lnameerror = "Required"
      }
      else if (!nameregex.test(value)) {
        required.lnameerror = "Please provide valid last name wihout numbers and at least 2 character."
      }
      else {
        required.lnameerror = ""
      }
    }
    if (name === "email") {
      if (value === "") {
        required.emailerror = "Required"
      }
      else if (!emailregex.test(value)) {
        required.emailerror = "Please provide valid Email."
      }
      else {
        required.emailerror = ""
      }
    }
    if (name === "password") {
      if (value === "") {
        required.passworderror = "Required"
      }
      else if (!passwordregex1lowercase.test(value)) {
        required.passworderror = "Password must be containt lowercase character."
      }
      else if (!passwordregex2uppercase.test(value)) {
        required.passworderror = "Password must be containt uppercase character."
      }
      else if (!passwordregex3numeric.test(value)) {
        required.passworderror = "Password must be containt numaric character."
      }
      else if (!passwordregex4spacial.test(value)) {
        required.passworderror = "Password must be containt spacial character."
      }
      else if (!passwordregex5length.test(value)) {
        required.passworderror = "Password must be of 8 character long."
      }
      else {
        required.passworderror = ""
      }
    }
    if (name === "mobile") {
      if (value === "") {
        required.mobileerror = "Required"
      }
      else if (!mobilereg.test(value)) {
        required.mobileerror = "Please provide valid Mobile number without containing space."
      }
      else {
        required.mobileerror = ""
      }
    }
    if (this.state.gender === null) {
      required.gendererror = "Required.. Please mention gender."
    }
    else {
      required.gendererror = ""
    }

    //setting the states of required object of errors.
    this.setState({ required: required })
  }

  //setting the commaon textbox value
  setValue = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value }, () => this.checkFormate(name, value))
  }

  //setting occupation 
  setOccupation = (e) => {
    //set the occuption in state and call the function checkingrequ
    this.setState({ [e.target.name]: e.target.value }, () => this.checkingRequ())
  }

  // setting hobby 
  setHobby = (e) => {
    //distructuring hobby 
    let { hobby } = this.state;
    //get value and checked of e.target 
    let { value, checked } = e.target;
    let index;
    //check condition if checked than push
    if (checked)
      hobby.push(value);
    else {
      index = hobby.indexOf(value)
      hobby.splice(index, 1)
    }
    //set the state of hobby and call the checking requirement functionality
    this.setState({ hobby }, () => this.checkingRequ());
  }

  // function on button click event to check requirnment
  checkingRequ = () => {

    //making required object distructured
    let { required } = this.state

    //checking first time required error if all componatnt are null than display required error
    if (this.state.firstname === null)
      required.fnameerror = "Required"

    if (this.state.lastname === null)
      required.lnameerror = "Required"

    if (this.state.email === null)
      required.emailerror = "Required"

    if (this.state.password === null)
      required.passworderror = "Required"

    if (this.state.mobile === null)
      required.mobileerror = "Required"

    if (this.state.occupation === null)
      required.occupationerror = "Required.. Please mention one occupation."
    else
      required.occupationerror = ""

    if (this.state.gender === null)
      required.gendererror = "Required.. Please mention gender."
    else
      required.gendererror = ""

    if (this.state.hobby.length < 2)
      required.hobbyerror = "Required minimum 2 hobby."
    else
      required.hobbyerror = ""
    //setting states of required object at the end 
    this.setState({ required: required })
  }

  render() {
    return (
      <div className="signup_componant">
        <Form>
          {/* firstname input */}
          <Form.Group controlId="formBasicfirstname">
            <Form.Label>First Name</Form.Label><span className="star">*</span>
            <Form.Control type="text" autoComplete="off" name="firstname" onChange={(e) => this.setValue(e)} onBlur={(e) => this.setValue(e)} placeholder="First Name" />
            <Form.Text className="star">{this.state.required.fnameerror}</Form.Text>
          </Form.Group>

          {/* middlename  */}
          <Form.Group controlId="formBasicmiddlename">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control autoComplete="off" type="text" name="middlename" onChange={(e) => this.setValue(e)} onBlur={(e) => this.setValue(e)} placeholder="Middle Name" />
          </Form.Group>

          {/* lastname  */}
          <Form.Group controlId="formBasiclastname">
            <Form.Label>Last Name</Form.Label><span className="star">*</span>
            <Form.Control autoComplete="off" type="text" name="lastname" onChange={(e) => this.setValue(e)} onBlur={(e) => this.setValue(e)} placeholder="Last Name" />
            <Form.Text className="star">{this.state.required.lnameerror}</Form.Text>
          </Form.Group>

          {/* email  */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label><span className="star">*</span>
            <Form.Control autoComplete="off" type="email" name="email" onChange={(e) => this.setValue(e)} onBlur={(e) => this.setValue(e)} placeholder="Enter email" />
            <Form.Text className="star">{this.state.required.emailerror}</Form.Text>
          </Form.Group>

          {/* password  */}
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label><span className="star">*</span>
            <Form.Control type="password" name="password" onChange={(e) => this.setValue(e)} onBlur={(e) => this.setValue(e)} placeholder="Password" />
            <Form.Text className="star">{this.state.required.passworderror}</Form.Text>
          </Form.Group>

          {/* mobile  */}
          <Form.Group controlId="formBasicmobile">
            <Form.Label>Mobile</Form.Label><span className="star">*</span>
            <Form.Control type="number" name="mobile" onChange={(e) => this.setValue(e)} onBlur={(e) => this.setValue(e)} placeholder="Mobile Number" />
            <Form.Text className="star">{this.state.required.mobileerror}</Form.Text>
          </Form.Group>

          {/* gender */}
          <Form.Group controlId="formBasicradio">
            <Form.Label>Gender</Form.Label><span className="star">*</span>
            <Form.Check type="radio" onChange={(e) => this.setValue(e)} onBlur={(e) => this.setValue(e)} name="gender" label="Male" id="formmale" value="Male" />
            <Form.Check type="radio" onChange={(e) => this.setValue(e)} onBlur={(e) => this.setValue(e)} name="gender" label="Female" id="formfemale" value="Female" />
            <Form.Text className="star">{this.state.required.gendererror}</Form.Text>
          </Form.Group>

          {/* occupation checkbox checked property condition to checked only one checkbox is checked.*/}
          <Form.Group controlId="formBasicoccupation">
            <Form.Label>Occupation</Form.Label><span className="star">*</span>
            <Form.Check type="checkbox" name="occupation" label="Employee" checked={this.state.occupation === "Employee" ? true : false} id="formemployee" value="Employee" onChange={(e) => this.setOccupation(e)} onBlur={(e) => this.setOccupation(e)} />
            <Form.Check type="checkbox" name="occupation" label="Student" checked={this.state.occupation === "Student" ? true : false} id="formstudent" value="Student" onChange={(e) => this.setOccupation(e)} onBlur={(e) => this.setOccupation(e)} />
            <Form.Text className="star">{this.state.required.occupationerror}</Form.Text>
          </Form.Group>

          {/* hobby checkbox*/}
          <Form.Group controlId="formBasichobby">
            <Form.Label>Hobby</Form.Label><span className="star">*</span>
            <Form.Check type="checkbox" name="hobby" label="Swiming" id="formswiming" value="Swiming" onChange={(e) => this.setHobby(e)} />
            <Form.Check type="checkbox" name="hobby" label="Reading" id="formreading" value="Reading" onChange={(e) => this.setHobby(e)} />
            <Form.Check type="checkbox" name="hobby" label="Teaching" id="formteaching" value="Teaching" onChange={(e) => this.setHobby(e)} />
            <Form.Check type="checkbox" name="hobby" label="Learning" id="formlearning" value="Learning" onChange={(e) => this.setHobby(e)} />
            <Form.Text className="star">{this.state.required.hobbyerror}</Form.Text>
          </Form.Group>
          {/* submit button to submit the form */}
          <Button variant="primary" type="button" onClick={() => this.checkingRequ()}>Submit</Button>

        </Form>
      </div>
    )
  }
}

export default Signup;