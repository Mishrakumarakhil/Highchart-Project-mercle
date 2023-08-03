import './App.css';
import EngagementMessagesOverTime from './components/EngagementMessagesOverTime';

function App() {
  return (
    <div className="App">
     <div className="title">Engagement Helper Over Time Chart </div>
     <div className="chart-conatiner">
      <EngagementMessagesOverTime/>
     </div>
    </div>
  );
}

export default App;
