import React from 'react';
import { Jumbotron, Button, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


const JumbotronComponent = (props) => {
    return (
        <div>
            <Jumbotron style={{backgroundColor:"gray"}}>
                <Container>
                    <h1 className="display-3">Hi Enigmanians!</h1>
                    <hr className="my-2" />
                    <h5>First, solve the problem. Then, write the code.</h5>
                </Container>
            </Jumbotron>
            {/*<footer className="footer">*/}
            {/*    <div className="container">*/}
            {/*        <span className="text-muted">Place sticky footer content here.</span>*/}
            {/*    </div>*/}
            {/*</footer>*/}
        </div>
    );
};


export default JumbotronComponent;