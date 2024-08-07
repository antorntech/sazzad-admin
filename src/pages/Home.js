import { Card, Col, Row, Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Home() {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const todayDate = moment().format(" MMMM Do, YYYY");

  const token = JSON.parse(localStorage.getItem("token"));
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

  const recentNews = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet.",
      date: "12 Aug, 2024",
      img: "/images/news.jpg",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet.",
      date: "15 Sep, 2024",
      img: "/images/news.jpg",
    },
  ];

  const recentBlogs = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet.",
      date: "12 Aug, 2024",
      img: "/images/blogs.jpg",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet.",
      date: "15 Sep, 2024",
      img: "/images/blogs.jpg",
    },
  ];

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          <Col xs={24} md={18} lg={18}>
            <div>
              <div className="home-head">
                <div>
                  <h1>Dashboard</h1>
                  <p>Summary of this application.</p>
                </div>
                <div>
                  <div className="date">{todayDate}</div>
                </div>
              </div>
              <div className="home-banner">
                <div className="banner-left">
                  <h1>
                    Hello,{" "}
                    <span style={{ color: "#fff" }}>Dr. Sazzad Hossain</span>
                  </h1>
                  <p>
                    With a wealth of experience and expertise, Dr. Hossain has
                    been actively involved in shaping the higher education
                    landscape in Bangladesh. His commitment to academic
                    excellence, coupled with a passion for research and
                    development, has garnered him respect and admiration from
                    colleagues and students alike.
                  </p>
                </div>
                <div className="banner-right">
                  <img src="/images/banner-avatar.png" alt="" />
                </div>
              </div>
              <div className="home-card-main">
                <div className="home-card home-card-1">
                  <div className="home-card-head">
                    <i class="fa-solid fa-calendar-days"></i>
                    <h1>Total Events</h1>
                  </div>
                  <div>
                    <h2>{events && events.length > 0 ? events.length : 0}</h2>
                  </div>
                </div>
                <div className="home-card home-card-2">
                  <div className="home-card-head">
                    <i class="fa-solid fa-calendar-days"></i>
                    <h1>Total News</h1>
                  </div>
                  <div>
                    <h2>{news && news.length > 0 ? news.length : 0}</h2>
                  </div>
                </div>
                <div className="home-card home-card-3">
                  <div className="home-card-head">
                    <i class="fa-solid fa-calendar-days"></i>
                    <h1>Total Blogs</h1>
                  </div>
                  <div>
                    <h2>{blogs && blogs.length > 0 ? blogs.length : 0}</h2>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col
            xs={24}
            md={6}
            lg={6}
            style={{ backgroundColor: "#fff", borderRadius: "10px" }}
          >
            <div className="home-right-main">
              <div style={{ width: "100%", textAlign: "center" }}>
                <div>
                  <img
                    src="/images/avatar.png"
                    alt=""
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <h1
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      margin: "0px",
                    }}
                  >
                    Dr. Sazzad Hossain
                  </h1>
                  <p>Chief Advisor, NSO</p>
                </div>
              </div>
              <div style={{ width: "100%", marginTop: "10px" }}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <h1
                      style={{
                        margin: "0px",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      Recent News
                    </h1>
                    <Link to="/news" style={{ margin: "0px" }}>
                      View all
                    </Link>
                  </div>
                  {recentNews && recentNews.length > 0
                    ? recentNews.map((item, index) => (
                        <>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "10px",
                              marginBottom: "20px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <div
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                  overflow: "hidden",
                                }}
                              >
                                <img
                                  src={item.img}
                                  alt=""
                                  style={{ width: "100%", height: "100%" }}
                                />
                              </div>
                              <div className="home-right-content">
                                <h1
                                  style={{ margin: "0px", fontWeight: "bold" }}
                                >
                                  {" "}
                                  {item.title}
                                </h1>
                                <p style={{ margin: "0px", color: "#758694" }}>
                                  {item.date}
                                </p>
                              </div>
                            </div>
                            <div>
                              <Link to="#" style={{ color: "#000" }}>
                                <i
                                  class="fa-solid fa-angle-right"
                                  style={{ fontSize: "18px" }}
                                ></i>
                              </Link>
                            </div>
                          </div>
                        </>
                      ))
                    : null}
                </div>
              </div>
              <div style={{ width: "100%", marginTop: "10px" }}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <h1
                      style={{
                        margin: "0px",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      Recent Blogs
                    </h1>
                    <Link to="/blogs" style={{ margin: "0px" }}>
                      View all
                    </Link>
                  </div>
                  {recentBlogs && recentBlogs.length > 0
                    ? recentBlogs.map((item, index) => (
                        <>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "10px",
                              marginBottom: "20px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <div
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                  overflow: "hidden",
                                }}
                              >
                                <img
                                  src={item.img}
                                  alt=""
                                  style={{ width: "100%", height: "100%" }}
                                />
                              </div>
                              <div className="home-right-content">
                                <h1
                                  style={{ margin: "0px", fontWeight: "bold" }}
                                >
                                  {" "}
                                  {item.title}
                                </h1>
                                <p style={{ margin: "0px", color: "#758694" }}>
                                  {item.date}
                                </p>
                              </div>
                            </div>
                            <div>
                              <Link to="#" style={{ color: "#000" }}>
                                <i
                                  class="fa-solid fa-angle-right"
                                  style={{ fontSize: "18px" }}
                                ></i>
                              </Link>
                            </div>
                          </div>
                        </>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
