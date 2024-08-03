import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Button, message, Row, Col, Upload } from "antd";
import { useHistory } from "react-router-dom";

const AddTaskList = () => {
  const navigate = useHistory();
  const [form] = Form.useForm();

  const [iconFileList, setIconFileList] = useState([]);

  const handleUpload = (values) => {
    const formData = new FormData();

    iconFileList.forEach((file) => {
      formData.append("icon", file);
    });

    formData.append("title", values.title);

    // Send a POST request with JSON data
    fetch("http://localhost:8000/api/v1/tasklist/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 400) {
            // Handle the case where label already exists
            const errorMessage = await res.text();
            throw new Error(errorMessage);
          } else {
            // Handle other errors
            throw new Error("Failed to added head menu. Please try again.");
          }
        }
        return res.json();
      })
      .then(() => {
        message.success("TaskList created successfully");
        navigate.push("/task-list");
      })
      .catch((error) => {
        console.error(error);
        message.error(`${error}`);
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
    <Row gutter={[24, 0]}>
      <Col xs={24} md={12} lg={12}>
        <Form form={form} onFinish={handleUpload} layout="vertical">
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
  );
};

export default AddTaskList;
