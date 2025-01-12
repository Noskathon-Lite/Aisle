import logo from './logo.png';
import './style.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <div className="nav">
          <img src={logo} className="logo" alt="logo" />
          <nav>
            <ul className="nav_links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Service</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
          <div className="butn">
            <a className="login" href="#"><button>Login</button></a>
            <a className="sign_up" href="#"><button>Sign Up</button></a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
