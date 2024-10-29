import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Header, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((response) => {
      console.log(response);
      setActivities(response.data);
    });
  }, []);
  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {activities.map((activity: any, index: number) => {
          return <List.Item key={index}>{activity.title}</List.Item>;
        })}
      </List>
    </div>
  );
}

export default App;
