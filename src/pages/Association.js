import { Space, Table, Button, Modal, Tooltip } from "antd";
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

const Association = () => {
  const [association, setAssociation] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set loading to true

  const getAssociation = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("http://localhost:8000/api/v1/association", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAssociation(data);
          setLoading(false); // Set loading to false after fetching
        })
        .catch((error) => {
          console.error("Error fetching task list:", error);
          setLoading(false); // Set loading to false on error
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAssociation();
  }, []);

  // Delete task from the list
  const handleDelete = (id) => {
    setLoading(true); // Set loading state to true
    fetch(`http://localhost:8000/api/v1/association/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Association Deleted Successfully", {
          autoClose: 1000,
        });
        // Fetch updated list after successful deletion
        getAssociation();
      })
      .catch((error) => {
        console.error("Error deleting task list item:", error);
        setLoading(false); // Set loading state to false if there's an error
      });
  };

  // Confirm delete modal
  const showConfirm = (id) => {
    confirm({
      title: "Do you Want to delete this item?",
      icon: <ExclamationCircleOutlined />,
      content:
        "After clicking on delete, your item will be deleted permanently.",
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
            <h1>Association</h1>
            <p>
              Associations are{" "}
              {association.length > 0 ? "available." : "not available."}
            </p>
          </div>
          <div>
            {association.length === 3 ? (
              <Tooltip title="Can't add more than 3">
                <Button type="primary" disabled>
                  <Link to="/add-association">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add Association
                  </Link>
                </Button>
              </Tooltip>
            ) : (
              <Button type="primary" className="primary-btn">
                <Link to="/add-association">
                  <PlusOutlined style={{ marginRight: "5px" }} />
                  Add Association
                </Link>
              </Button>
            )}
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : association.length > 0 ? (
          <div className="card-main">
            {association.map((task) => (
              <div className="card-body" key={task._id}>
                <div>
                  <img
                    src={`http://localhost:8000${task.logo}`}
                    alt=""
                    style={{ width: "132px", height: "60px" }}
                  />
                </div>
                <h1 style={{ margin: "0" }}>{task.title}</h1>
                <p>{task.subtitle}</p>
                <div>
                  <Link to={`/edit-association/${task._id}`}>
                    <Button type="primary">
                      <EditOutlined />
                    </Button>
                  </Link>
                  <Button
                    type="danger"
                    onClick={() => showConfirm(task._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Association;
