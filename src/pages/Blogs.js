import { Space, Table, Button, Modal } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/shared/loader/Loader";

const { confirm } = Modal;
const { Column } = Table;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const getBlogs = async () => {
    setLoading(true); // Set loading state to true
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("http://localhost:8000/api/v1/blogs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setBlogs(data); // Update blogs state with fetched data
          setLoading(false); // Set loading state to false after data is fetched
        });
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  // Delete hero content item
  const handleDelete = (id) => {
    setLoading(true); // Set loading state to true
    fetch(`http://localhost:8000/api/v1/blogs/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Blog Deleted Successfully", {
          autoClose: 1000,
        });
        getBlogs(); // Fetch updated list after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting hero content:", error);
        setLoading(false); // Set loading state to false if there's an error
      });
  };

  // Confirm delete modal
  const showConfirm = (id) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content:
        "After click on delete then your item will be delete permanently.",
      okText: "Delete",
      okType: "danger",
      onOk() {
        handleDelete(id); // Call handleDelete function on OK
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
              Blog
            </h1>
            <p>
              Blogs are {blogs.length > 0 ? "available." : "not available."}
            </p>
          </div>
          <div>
            <Button type="primary" className="primary-btn">
              <Link to="/blogs/add-blog">
                <PlusOutlined style={{ marginRight: "5px" }} />
                Add Blog
              </Link>
            </Button>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : blogs.length > 0 ? (
          <Table dataSource={blogs} rowKey="_id">
            <Column
              title="Banner"
              dataIndex="banner"
              key="banner"
              width="200px"
              render={(banner) => (
                <img
                  src={`http://localhost:8000${banner}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "40px",
                  }}
                />
              )}
            />
            <Column title="Title" dataIndex="title" key="title" />
            <Column title="Author" dataIndex="author" key="author" />
            <Column title="Date" dataIndex="date" key="date" />
            <Column
              title="Action"
              key="action"
              width="100px"
              render={(_, record) => (
                <Space size="middle">
                  <Link to={`/blogs/edit-blog/${record._id}`}>
                    <Button type="primary">
                      <EditOutlined />
                    </Button>
                  </Link>
                  <Button type="danger" onClick={() => showConfirm(record._id)}>
                    <DeleteOutlined />
                  </Button>
                </Space>
              )}
            />
          </Table>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Blogs;
