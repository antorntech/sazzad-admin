import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Button, message, Row, Col } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddAbout = () => {
  const navigate = useHistory();

  const [mainBannerFileList, setMainBannerFileList] = useState([]);
  const [homeBanner1FileList, setHomeBanner1FileList] = useState([]);
  const [homeBanner2FileList, setHomeBanner2FileList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [uploading, setUploading] = useState(false);

  const handleUpload = (values) => {
    const formData = new FormData();

    // Append user photo file to formData
    mainBannerFileList.forEach((file) => {
      formData.append("main_banner", file);
    });

    homeBanner1FileList.forEach((file) => {
      formData.append("home_banner1", file);
    });

    homeBanner2FileList.forEach((file) => {
      formData.append("home_banner2", file);
    });

    // Append other form data
    formData.append("name", values.name);
    formData.append("designation", values.designation);
    formData.append("description", values.description);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    setUploading(true);
    // You can use any AJAX library you like
    fetch("http://localhost:8000/api/v1/about/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        // Reset form
        setMainBannerFileList([]);
        setHomeBanner1FileList([]);
        setHomeBanner2FileList([]);
        message.success("About Added Successfully.");
        navigate.push("/about");
      })
      .catch(() => {
        message.error("About Add Failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const mainBannerFileProps = {
    onRemove: (file) => {
      const index = mainBannerFileList.indexOf(file);
      const newFileList = mainBannerFileList.slice();
      newFileList.splice(index, 1);
      setMainBannerFileList(newFileList);
    },
    beforeUpload: (file) => {
      setMainBannerFileList([...mainBannerFileList, file]);
      return false; // Prevent default upload behavior
    },
    fileList: mainBannerFileList,
  };

  const homeBanner1FileProps = {
    onRemove: (file) => {
      const index = homeBanner1FileList.indexOf(file);
      const newFileList = homeBanner1FileList.slice();
      newFileList.splice(index, 1);
      setHomeBanner1FileList(newFileList);
    },
    beforeUpload: (file) => {
      setHomeBanner1FileList([...homeBanner1FileList, file]);
      return false; // Prevent default upload behavior
    },
    fileList: homeBanner1FileList,
  };

  const homeBanner2FileProps = {
    onRemove: (file) => {
      const index = homeBanner2FileList.indexOf(file);
      const newFileList = homeBanner2FileList.slice();
      newFileList.splice(index, 1);
      setHomeBanner2FileList(newFileList);
    },
    beforeUpload: (file) => {
      setHomeBanner2FileList([...homeBanner2FileList, file]);
      return false; // Prevent default upload behavior
    },
    fileList: homeBanner2FileList,
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Add About Details
        </h1>
        <p>You can add about details from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form onFinish={handleUpload} layout="vertical">
            <Row gutter={[24, 0]}>
              <Col xs={24} md={24} lg={24}>
                <Form.Item
                  name="name"
                  label="Name"
                  placeholder="Enter name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="designation"
                  label="Designation"
                  placeholder="Enter designation"
                  rules={[
                    {
                      required: true,
                      message: "Please enter designation",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Description"
                  placeholder="Enter description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter description",
                    },
                  ]}
                >
                  <Input.TextArea rows={6} />
                </Form.Item>
                <Row gutter={[24, 0]}>
                  <Col xs={24} md={12} lg={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      placeholder="Enter email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter email",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={12}>
                    <Form.Item
                      name="phone"
                      label="Phone"
                      placeholder="Enter phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter phone",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="address"
                  label="Address"
                  placeholder="Enter address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter about address",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Row>
                  <Col xs={24} md={8} lg={8}>
                    <Form.Item
                      name="main_banner"
                      label="Upload Main Banner"
                      rules={[
                        {
                          required: true,
                          message: "Please enter main banner",
                        },
                      ]}
                    >
                      <Upload {...mainBannerFileProps}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8} lg={8}>
                    <Form.Item
                      name="home_banner1"
                      label="Upload Home Banner 1"
                      rules={[
                        {
                          required: true,
                          message: "Please enter home banner 1",
                        },
                      ]}
                    >
                      <Upload {...homeBanner1FileProps}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8} lg={8}>
                    <Form.Item
                      name="home_banner2"
                      label="Upload Home Banner 2"
                      rules={[
                        {
                          required: true,
                          message: "Please enter home banner 2",
                        },
                      ]}
                    >
                      <Upload {...homeBanner2FileProps}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
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

export default AddAbout;
