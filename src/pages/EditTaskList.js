import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Row, Col, Upload } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

const EditTaskList = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm(); // Using Form Hooks
  const [taskListData, setTaskListData] = useState({});
  const [iconFileList, setIconFileList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/tasklist/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Task List data");
        }
        return res.json();
      })
      .then((data) => {
        setTaskListData(data);
        form.setFieldsValue(data); // Set form values after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching Task List data:", error);
        message.error("Failed to fetch Task List data");
      });
  }, [id, form]);

  const handleUpload = (values) => {
    const formData = new FormData();

    iconFileList.forEach((file) => {
      formData.append("icon", file);
    });

    formData.append("title", values.title);

    fetch(`http://localhost:8000/api/v1/tasklist/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update Task List data");
        }
        return res.json();
      })
      .then(() => {
        message.success("Task List data updated successfully.");
        navigate.push("/head-menu");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update Task List data");
      });
  };

  const iconFileProps = {
    onRemove: (file) => {
      const index = iconFileList.indexOf(file);
      const newFileList = iconFileList.slice();
      newFileList.splice(index, 1);
      setIconFileList(newFileList);
    },
    beforeUpload: (file) => {
      setIconFileList([...iconFileList, file]);
      return false; // Prevent default upload behavior
    },
    fileList: iconFileList,
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Edit Task List
        </h1>
        <p>You can edit task list from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            form={form}
            onFinish={handleUpload}
            layout="vertical"
            initialValues={taskListData}
          >
            <Row gutter={[24, 0]}>
              <Col xs={24} md={12} lg={12}>
                <Form.Item
                  name="title"
                  label="Title"
                  placeholder="Enter title"
                  rules={[
                    {
                      required: true,
                      message: "Please enter task list title",
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="icon"
                  label="Upload Icon"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Upload {...iconFileProps}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button type="primary" className="primary-btn" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default EditTaskList;
