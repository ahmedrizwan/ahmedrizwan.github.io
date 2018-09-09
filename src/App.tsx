import * as React from 'react';
import 'bulma/css/bulma.css';
import Header from './Header';

interface IProps {}

class App extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <section className="section">
        <div className="container">
          <Header />
          
        </div>
      </section>
    );
  }
}

export default App;
