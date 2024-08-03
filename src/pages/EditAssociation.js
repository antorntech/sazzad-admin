import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Row, Col, Upload } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

const EditAssociation = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm(); // Using Form Hooks
  const [associationData, setAssociationData] = useState({});
  const [logoFileList, setLogoFileList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/association/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Association data");
        }
        return res.json();
      })
      .then((data) => {
        setAssociationData(data);
        form.setFieldsValue(data); // Set form values after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching Association data:", error);
        message.error("Failed to fetch Association data");
      });
  }, [id, form]);

  const handleUpload = (values) => {
    const formData = new FormData();

    logoFileList.forEach((file) => {
      formData.append("icon", file);
    });

    formData.append("title", values.title);
    formData.append("subtitle", values.subtitle);
    formData.append("link", values.link);

    fetch(`http://localhost:8000/api/v1/tasklist/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update Association data");
        }
        return res.json();
      })
      .then(() => {
        message.success("Association data updated successfully.");
        navigate.push("/head-menu");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update Association data");
      });
  };

  const logoFileProps = {
    onRemove: (file) => {
      const index = logoFileList.indexOf(file);
      const newFileList = logoFileList.slice();
      newFileList.splice(index, 1);
      setLogoFileList(newFileList);
    },
    beforeUpload: (file) => {
      setLogoFileList([...logoFileList, file]);
      return false; // Prevent default upload behavior
    },
    fileList: logoFileList,
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Edit Association
        </h1>
        <p>You can edit task list from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            form={form}
            onFinish={handleUpload}
            layout="vertical"
            initialValues={associationData}
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
                  name="Logo"
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

export default EditAssociation;
