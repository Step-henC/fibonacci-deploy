import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import OtherPage from './OtherPage';
import Fib from './MainFibonacciForm';
function App() {
  return (
    <Router>

    <div className="App">
      {/* <header className="App-header">
        
    <Link to="/">Home</Link>
    <Link to="/otherpage">Other Page</Link>
      </header> */}
<div>
  <h3>Welcome to Fibonacci Generator</h3>
  <h6>Enter an index to find its value</h6>
  <Route exact path="/" component={Fib} />
  <Route exact path="/otherpage" component={OtherPage} />


</div>
<Link to="/otherpage">Other Page</Link>
    </div>
    </Router>

  );
}

export default App;
