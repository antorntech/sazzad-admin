import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Row,
  Col,
  Upload,
  InputNumber,
} from "antd";
import { useHistory, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

const EditHeroContent = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm(); // Using Form Hooks
  const [heroContentData, setHeroContentData] = useState({});
  const [bannerFileList, setBannerFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/herocontent/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Hero Content data");
        }
        return res.json();
      })
      .then((data) => {
        setHeroContentData(data);
        form.setFieldsValue(data); // Set form values after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching Hero Content data:", error);
        message.error("Failed to fetch Hero Content data");
      });
  }, [id, form]);

  const handleUpload = (values) => {
    const formData = new FormData();

    // Append user photo file to formData
    bannerFileList.forEach((file) => {
      formData.append("banner", file);
    });

    // Append other form data
    formData.append("title", values.title);
    formData.append("facebookLink", values.facebookLink);
    formData.append("linkedinLink", values.linkedinLink);
    formData.append("whatsappNumber", "+880" + values.whatsappNumber);
    formData.append("youtubeVideoLink", values.youtubeVideoLink);
    setUploading(true);

    // You can use any AJAX library you like
    fetch(`http://localhost:8000/api/v1/herocontent/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update Hero Content data");
        }
        return res.json();
      })
      .then(() => {
        message.success("Hero Content data updated successfully.");
        navigate.push("/hero-content");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update Hero Content data");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const bannerFileProps = {
    onRemove: (file) => {
      const index = bannerFileList.indexOf(file);
      const newFileList = bannerFileList.slice();
      newFileList.splice(index, 1);
      setBannerFileList(newFileList);
    },
    beforeUpload: (file) => {
      setBannerFileList([...bannerFileList, file]);
      return false; // Prevent default upload behavior
    },
    fileList: bannerFileList,
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Edit Hero Content
        </h1>
        <p>You can edit hero content from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            onFinish={handleUpload}
            layout="vertical"
            form={form}
            initialValues={heroContentData}
          >
            <Row gutter={[24, 0]}>
              <Col xs={24} md={24} lg={24}>
                <Form.Item
                  name="title"
                  label="Title"
                  placeholder="Enter title"
                  rules={[
                    {
                      required: true,
                      message: "Please enter product title",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="facebookLink"
                  label="Facebook Link"
                  placeholder="Enter facebook link"
                  rules={[
                    {
                      required: true,
                      message: "Please enter facebook link",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="linkedinLink"
                  label="Linkedin Link"
                  placeholder="Enter linkedin link"
                  rules={[
                    {
                      required: true,
                      message: "Please enter linkedin link",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="whatsappNumber"
                  label="Whatsapp Number"
                  placeholder="Enter whatsapp number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter whatsapp number",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} prefix="+880" />
                </Form.Item>
                <Form.Item
                  name="youtubeVideoLink"
                  label="Youtube Video Link"
                  placeholder="Enter youtube video link"
                  rules={[
                    {
                      required: true,
                      message: "Please enter youtube video link",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="banner"
                  label="Upload Banner"
                  rules={[
                    {
                      required: true,
                      message: "Please enter banner",
                    },
                  ]}
                >
                  <Upload {...bannerFileProps}>
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

export default EditHeroContent;
