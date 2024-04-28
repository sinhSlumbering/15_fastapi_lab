import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegForm() {
  const [validated, setValidated] = useState(false);
//   const [users, setUsers] = useState([]); 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone_number: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target; 
    setFormData({ ...formData, [name]: value }); 
  };
  
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(false);
      return; 
    }

    try {
        const response = await axios.post('http://localhost:8000/register', formData);
        toast.success('Registration successful!');
        setFormData({ username: '', password: '', email: '', phone_number: '' }); 
      } catch (error) {
        event.stopPropagation();
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.detail);
        } else {
          toast.error('Registration failed. Please try again.');
        }
      }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <ToastContainer/>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              aria-describedby="inputGroupPrepend"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={6}
              // isValid={checkUsernameUnique(users)}
            />
            <Form.Control.Feedback type="invalid">
              Username must be at least 6 characters and unique.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>


      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value = {formData.password}
            onChange={handleChange}
            required
            minLength={7}
          />
          <Form.Control.Feedback type="invalid">
            Password must be at least 7 characters.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            required
            minLength={7}
          />
          <Form.Control.Feedback type="invalid">
            Passwords must match.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>


      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" name="email" required value={formData.email} onChange={handleChange} //isValid={checkEmailUnique(users)} 
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid and unique email address.
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} md="6" controlId="validationPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel" 
            placeholder="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            pattern="[0-9]{11}" 
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid 11-digit phone number.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Button type="submit">Submit form</Button>
    </Form>
  );

 
}   


export default RegForm;