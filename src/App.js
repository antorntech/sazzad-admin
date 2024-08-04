import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.min.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddHeroContent from "./pages/AddHeroContent";
import HeroContent from "./pages/HeroContent";
import TaskList from "./pages/TaskList";
import AddTaskList from "./pages/AddTaskList";
import EditTaskList from "./pages/EditTaskList";
import EditHeroContent from "./pages/EditHeroContent";
import Blogs from "./pages/Blogs";
import AddBlog from "./pages/AddBlog";
import { EditBlog } from "./pages/EditBlog";
import About from "./pages/About";
import AddAbout from "./pages/AddAbout";
import EditAbout from "./pages/EditAbout";
import Notification from "./pages/Notification";
import Association from "./pages/Association";
import AddAssociation from "./pages/AddAssociation";
import EditAssociation from "./pages/EditAssociation";
import Events from "./pages/Events";
import AddEvent from "./pages/AddEvent";
import { EditEvent } from "./pages/EditEvent";

function App() {
  const user = JSON.parse(localStorage.getItem("token"));

  return (
    <div className="App">
      {user ? (
        <Switch>
          <Main>
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/hero-content" component={HeroContent} />
            <Route exact path="/add-hero-content" component={AddHeroContent} />
            <Route
              exact
              path="/edit-hero-content/:id"
              component={EditHeroContent}
            />
            <Route exact path="/events" component={Events} />
            <Route exact path="/events/add-event" component={AddEvent} />
            <Route exact path="/events/edit-event/:id" component={EditEvent} />
            <Route exact path="/task-list" component={TaskList} />
            <Route exact path="/add-task-list" component={AddTaskList} />
            <Route exact path="/edit-task-list/:id" component={EditTaskList} />
            <Route exact path="/blogs" component={Blogs} />
            <Route exact path="/blogs/add-blog" component={AddBlog} />
            <Route exact path="/blogs/edit-blog/:id" component={EditBlog} />
            <Route exact path="/about" component={About} />
            <Route exact path="/about/add-about" component={AddAbout} />
            <Route exact path="/about/edit-about/:id" component={EditAbout} />
            <Route exact path="/association" component={Association} />
            <Route exact path="/add-association" component={AddAssociation} />
            <Route
              exact
              path="/edit-association/:id"
              component={EditAssociation}
            />
            <Route exact path="/notification" component={Notification} />
            <Redirect from="*" to="/dashboard" />
          </Main>
        </Switch>
      ) : (
        <Switch>
          <Route path="/sign-in" exact component={SignIn} />
          <Redirect from="*" to="/sign-in" />
        </Switch>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
