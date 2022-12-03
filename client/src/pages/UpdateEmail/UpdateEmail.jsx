import {Button, Container, TextField} from "@material-ui/core";
import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

class UpdateEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
    };
  }
  handleSubmit(e) {

    e.preventDefault();
    const formData = new FormData();
    formData.append("username", this.state.name);
    formData.append("email", this.state.email);
    formData.append("address", this.state.address);
    axios({
      method: "POST",
      url: "http://localhost:5000/update_user",
      data: formData,
    }).then((response) => {
      alert("Address updated.");
      window.location.reload();
    });
  }
  resetForm() {
    this.setState({ name: "", email: "", address: "" });
  }
  render() {
    return (
        <Container component="main" maxWidth="xs">
          <form id="contact-form"
                onSubmit={this.handleSubmit.bind(this)}
                method="POST">
            <TextField type="text" variant="outlined" margin="normal" required fullWidth id="Username"
                       inputProps={{title: "Username"}}
                       label="Username" name="Username" autoComplete="Username" autoFocus
                       onChange={this.onNameChange.bind(this)}/>
            <TextField type="email" variant="outlined" margin="normal" required fullWidth id="Email"
                       inputProps={{title: "Email"}}
                       label="Email" name="Email" autoComplete="Email" autoFocus
                       onChange={this.onEmailChange.bind(this)}/>
            <TextField type="text" variant="outlined" margin="normal" required fullWidth id="Address"
                       inputProps={{title: "Address"}}
                       label="Address" name="Address" autoComplete="Address" autoFocus
                       onChange={this.onAddressChange.bind(this)}/>
            <Button type="submit" fullWidth variant="contained" color="primary"
                    title="Set Transaction">
              Set Transaction
            </Button>
          </form>


        </Container>

    );
  }
  onNameChange(event) {
    this.setState({ name: event.target.value });
  }
  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  onAddressChange(event) {
    this.setState({ address: event.target.value });
  }
}
export default UpdateEmail;