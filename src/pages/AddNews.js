import React, { useState } from "react";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Upload,
  Button,
  message,
  Row,
  Col,
  DatePicker,
} from "antd";
import { useHistory } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";

const AddNews = () => {
  const navigate = useHistory();

  const [uploading, setUploading] = useState(false);
  const formatDate = (dateString) => {
    // Split the date string into year, month, and day
    const [year, month, day] = dateString.split("-");

    // Create a Date object from the splitted parts
    const dateObject = new Date(dateString);

    // Format the month using an array of month names
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = monthNames[dateObject.getMonth()];

    // Construct the formatted date string
    const formattedDate = `${parseInt(day, 10)} ${monthName} - ${year}`;

    setDate(formattedDate);
  };

  const [date, setDate] = useState("");

  const [bannerFileList, setBannerFileList] = useState([]);

  const handleUpload = (values) => {
    const formData = new FormData();

    bannerFileList.forEach((file) => {
      formData.append("banner", file);
    });

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("date", date);
    formData.append("author", values.author);
    setUploading(true);

    // You can use any AJAX library you like
    fetch("http://localhost:8000/api/v1/news/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => {
        setBannerFileList([]);
        message.success("News Added Successfully.");
        navigate.push("/news");
      })
      .catch((error) => {
        console.error("Blog Add Failed:", error);
        message.error("Blog Add Failed.");
      })
      .finally(() => setUploading(false));
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
          Add News
        </h1>
        <p>You can add news from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form onFinish={handleUpload} layout="vertical">
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
                        onChange={(date, dateString) => formatDate(dateString)}
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
                      message: "",
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

export default AddNews;
