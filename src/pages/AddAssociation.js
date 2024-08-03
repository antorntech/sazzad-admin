import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Button, message, Row, Col, Upload } from "antd";
import { useHistory } from "react-router-dom";

const AddAssociation = () => {
  const navigate = useHistory();
  const [form] = Form.useForm();

  const [logoFileList, setIconFileList] = useState([]);

  const handleUpload = (values) => {
    const formData = new FormData();

    logoFileList.forEach((file) => {
      formData.append("logo", file);
    });

    formData.append("title", values.title);
    formData.append("subtitle", values.subtitle);
    formData.append("link", values.link);

    // Send a POST request with JSON data
    fetch("http://localhost:8000/api/v1/association/add", {
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
            throw new Error("Failed to added associtation. Please try again.");
          }
        }
        return res.json();
      })
      .then(() => {
        message.success("Association created successfully");
        navigate.push("/association");
      })
      .catch((error) => {
        console.error(error);
        message.error(`${error}`);
      });
  };

  const logoFileProps = {
    onRemove: (file) => {
      const index = logoFileList.indexOf(file);
      const newFileList = logoFileList.slice();
      newFileList.splice(index, 1);
      setIconFileList(newFileList);
    },
    beforeUpload: (file) => {
      setIconFileList([...logoFileList, file]);
      return false; // Prevent default upload behavior
    },
    fileList: logoFileList,
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Add Association
        </h1>
        <p>You can add association from here.</p>
      </div>
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
                      message: "Please enter association title",
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
                  name="subtitle"
                  label="Subtitle"
                  placeholder="Enter subtitle"
                  rules={[
                    {
                      required: true,
                      message: "Please enter association subtitle",
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
                  name="link"
                  label="Association Link"
                  placeholder="Enter link"
                  rules={[
                    {
                      required: true,
                      message: "Please enter association link",
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
                  name="logo"
                  label="Upload Association Logo"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Upload {...logoFileProps}>
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

export default AddAssociation;
