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

const TaskList = () => {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTaskList = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("http://localhost:8000/api/v1/tasklist", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setTaskList(data);
          } else {
            // Perform some action or set a message indicating that there is no data to reverse
            console.log("No data found to reverse!");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  // Delete hero content item
  const handleDelete = (id) => {
    setLoading(true); // Set loading state to true
    fetch(`http://localhost:8000/api/v1/tasklist/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Task List Deleted Successfully", {
          autoClose: 1000,
        });
        getTaskList(); // Fetch updated list after successful deletion
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
            <h1>Task List</h1>
            <p>
              Task List are{" "}
              {taskList.length > 0 ? "available." : "not available."}
            </p>
          </div>
          <div>
            <Button type="primary" className="primary-btn">
              <Link to="/add-task-list">
                <PlusOutlined style={{ marginRight: "5px" }} />
                Add Task List
              </Link>
            </Button>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : taskList.length > 0 ? (
          <Table
            dataSource={taskList}
            rowKey="_id"
            scroll={{
              x: 1000,
            }}
          >
            <Column
              fixed="left"
              title="Banner"
              dataIndex="icon"
              key="icon"
              width="100px"
              render={(icon) => (
                <img
                  src={`http://localhost:8000${icon}`}
                  alt="icon"
                  style={{ width: "100px", height: "50px" }}
                />
              )}
            />
            <Column title="Title" dataIndex="title" key="title" />
            <Column
              title="Action"
              key="action"
              width="150px"
              render={(_, record) => (
                <Space size="middle">
                  <Link to={`/edit-task-list/${record._id}`}>
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

export default TaskList;
