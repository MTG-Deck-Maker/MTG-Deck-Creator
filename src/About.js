import { Component } from "react";
import Card from 'react-bootstrap/Card';
import tylerImg from './images/TylerHuntley.png'
import brennanImg from './images/Capricious_Malone.png'
import marcoImg from './images/Marco_Villafana.png'
import rafaelImg from './images/Rafael.png'
import kenImg from './images/Ken_Holt.png'

class Profile extends Component {

  render() {
    /* TODO: render information about the developers */
    return (
      <>
        <Card style={{ width: '30rem' }}>
          <Card.Img variant="top" src={tylerImg} />
          <Card.Body>
            <Card.Title>About Tyler:</Card.Title>
            <Card.Text>
            Hello! My name is Tyler Huntley. I am a software developer. Prior to software development, I served for 6 years in the United States Air Force and then spent over 9 years as an HVAC service technician repairing and maintaining heating equipment and building great relationships with my clients. I have a strong attention to detail and I try to live according to the Air Force Core Values to this day. Those Core Values are: integrity first, service before self, and excellence in all we do. I am currently attending Code Fellows to gain a strong foundation for software development and a speciality in Python. I plan on applying these learned skills as part of a team, building products (or games) that may bring joy to people of all ages, for generations to come. 
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: '30rem' }}>
          <Card.Img variant="top" src={brennanImg} />
          <Card.Body>
            <Card.Title>About Brennan:</Card.Title>
            <Card.Text>
            Hello! My name is Brennan Malone; my pronouns are he/him/his. I live in Bangor, Maine, and my background is in network engineering and working with the USAF in communications. I enjoy running, reading, and playing board games. I hope you enjoy our webpage.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: '30rem' }}>
          <Card.Img variant="top" src={kenImg} />
          <Card.Body>
            <Card.Title>About Ken:</Card.Title>
            <Card.Text>
            Hi, my name is Ken Holt. I am married with two daughters, and while being a veteran of the military as well, I come to this from a medical background. I love to learn and I like working with good people and so I find myself here. I look forward to continuing my education in this field, helping locally with small businesses and at the local schools. Which will probably mean a business…
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: '30rem' }}>
          <Card.Img variant="top" src={marcoImg} />
          <Card.Body>
            <Card.Title>About Marco:</Card.Title>
            <Card.Text>
            Hi, my name is Marco Villafana (he/him). I am an army veteran and live in Washington state. I was an information technology specialist. Where I did desktop support and network support. Since then, I have recently completed a computer science degree at Central Washington University. I am still undecided on what to specialize in and web design wasn't covered very much in my degree, so I'm interested in finding out if this is something I want to pursue 
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: '30rem' }}>
          <Card.Img variant="top" src={rafaelImg} />
          <Card.Body>
            <Card.Title>About Rafael:</Card.Title>
            <Card.Text>
            Hello everyone my name is Rafael I’m an up and coming software developer, with a passion for creating products that are innovative, exceed the criteria and that will make the client ecstatic to see their vision fulfilled. 
            </Card.Text>
          </Card.Body>
        </Card>
      </>

    )
  }
};

export default Profile;
