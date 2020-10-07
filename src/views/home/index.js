import React from 'react';
import {Container, Jumbotron} from 'reactstrap';

function Index() {
  return (
    <Container>
      <Jumbotron className="mt-5">
        <h1 className="display-4">Alphonnso Allarde</h1>
        <address>
          <a href="mailto:email@address.com">alphonnsoallarde@gmail.com</a>
          <br />
          <a href="tel:+635552368">(+63) 9174170254</a>
        </address>
      </Jumbotron>
    </Container>
  );
}

export default Index;
