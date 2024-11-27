import "./styles.css";
import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashbroad from "../../features/activities/dashboard/ActivityDashbroad";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading..." />;

  return (
    <div>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashbroad />
      </Container>
    </div>
  );
}

export default observer(App);
