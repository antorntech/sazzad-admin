import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Upload,
  message,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";

export const EditNews = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [newsData, setNewsData] = useState({});
  const [bannerFileList, setBannerFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [date, setDate] = useState(moment()); // Initialize with moment object

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/news/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Blog data");
        }
        return res.json();
      })
      .then((data) => {
        // Parse date into moment object
        data.date = moment(data.date, "D MMM - YYYY");

        setNewsData(data);
        form.setFieldsValue(data);
        setDate(moment(data.date)); // Set date state as moment object
      })
      .catch((error) => {
        console.error("Error fetching Blog data:", error);
        message.error("Failed to fetch Blog data");
      });
  }, [id, form]);

  const formatDate = (date) => {
    setDate(date); // Update date state with moment object
  };

  const handleUpload = (values) => {
    const formData = new FormData();

    // Append user photo file to formData
    bannerFileList.forEach((file) => {
      formData.append("banner", file);
    });

    // Append other form data
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("date", date.format("D MMM - YYYY")); // Format date for backend
    formData.append("author", values.author);
    setUploading(true);
    // You can use any AJAX library you like
    fetch(`http://localhost:8000/api/v1/news/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update news data");
        }
        return res.json();
      })
      .then(() => {
        message.success("News data updated successfully.");
        navigate.push("/news");
      })
      .catch((error) => {
        console.error("Failed to update news data:", error);
        message.error("Failed to update news data.");
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
      return false;
    },
    fileList: bannerFileList,
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Edit News
        </h1>
        <p>You can edit news from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            onFinish={handleUpload}
            layout="vertical"
            form={form}
            initialValues={newsData}
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
                      message: "Please enter blog title",
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
                      message: "Please enter blog description",
                    },
                  ]}
                >
                  <TextArea rows={6} />
                </Form.Item>
                <Row gutter={[24, 0]}>
                  <Col xs={24} md={12} lg={12}>
                    <Form.Item
                      name="author"
                      label="Author"
                      placeholder="Enter author"
                      rules={[
                        {
                          required: true,
                          message: "Please enter blog author",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={12}>
                    <Form.Item
                      name="date"
                      label="Date"
                      placeholder="Enter date"
                      rules={[
                        {
                          required: true,
                          message: "Please enter blog date",
                        },
                      ]}
                    >
                      <DatePicker
                        value={moment(date)} // Set value prop to moment object
                        onChange={(date) => formatDate(date)} // Update date state
                        style={{
                          width: "100%",
                          padding: "7px",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="banner"
                  label="Upload banner"
                  rules={[
                    {
                      required: true,
                      message: "Please upload a banner",
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
