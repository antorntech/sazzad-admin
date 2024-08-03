import { Card, Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
function Home() {
  const [taskList, setTaskList] = useState([]);
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const { Title } = Typography;

  const token = JSON.parse(localStorage.getItem("token"));

  // Get all task list
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/tasklist", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setTaskList(data);
        } else {
          // Perform some action or set a message indicating that there is no data to reverse
          console.log("No data found to reverse!");
        }
      });
  }, [token]);

  // Get all events
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/events", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setEvents(data);
        } else {
          // Perform some action or set a message indicating that there is no data to reverse
          console.log("No data found to reverse!");
        }
      });
  }, [token]);

  // Get all news
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/news", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setNews(data);
        } else {
          // Perform some action or set a message indicating that there is no data to reverse
          console.log("No data found to reverse!");
        }
      });
  }, [token]);

  // Get all blogs
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/blogs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setBlogs(data);
        } else {
          // Perform some action or set a message indicating that there is no data to reverse
          console.log("No data found to reverse!");
        }
      });
  }, [token]);

  const count = [
    {
      title: "Total Task List",
      count: `${taskList && taskList.length > 0 ? taskList.length : 0}`,
      icon: <i class="fa-solid fa-list-check icon"></i>,
      bnb: "bnb",
    },

    {
      title: "Total Events",
      count: `${events && events.length > 0 ? events.length : 0}`,
      icon: <i class="fa-solid fa-list-check icon"></i>,
      bnb: "bnb",
    },

    {
      title: "Total News",
      count: `${news && news.length > 0 ? news.length : 0}`,
      icon: <i class="fa-solid fa-list-check icon"></i>,
      bnb: "bnb",
    },

    {
      title: "Total Blogs",
      count: `${blogs && blogs.length > 0 ? blogs.length : 0}`,
      icon: <i class="fa-solid fa-list-check icon"></i>,
      bnb: "bnb",
    },
  ];

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span style={{ fontSize: "22px" }}>{c.title}</span>
                      <Title
                        style={{
                          fontWeight: "bold",
                          fontSize: "55px",
                          margin: "0",
                        }}
                      >
                        {c.count}
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Home;
