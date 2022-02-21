import logo from '../../logo.svg';
import UserContext from "../User/User";
import './App.css';

const user = {
  name: 'Drew'
}

function App() {
  return (
      // Give all child components access to user context.
      <UserContext.Provider value={user}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </UserContext.Provider>
  );
}

export default App;
