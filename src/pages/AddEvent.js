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
  TimePicker,
} from "antd";
import { useHistory } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";

const AddEvent = () => {
  const navigate = useHistory();

  const [uploading, setUploading] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");

  const [bannerFileList, setBannerFileList] = useState([]);

  const handleUpload = (values) => {
    const formData = new FormData();

    // Append event photo file to formData
    bannerFileList.forEach((file) => {
      formData.append("banner", file);
    });

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("address", values.address);
    formData.append("date", date);
    formData.append("eventStartTime", startTime);
    formData.append("eventEndTime", endTime);
    setUploading(true);

    // You can use any AJAX library you like
    fetch("http://localhost:8000/api/v1/events/add", {
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
        message.success("Event Added Successfully.");
        navigate.push("/events");
      })
      .catch((error) => {
        console.error("Event Add Failed:", error);
        message.error("Event Add Failed.");
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
          Add Event
        </h1>
        <p>You can add event from here.</p>
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
                      message: "Please enter event title",
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
                      message: "Please enter event description",
                    },
                  ]}
                >
                  <TextArea rows={6} />
                </Form.Item>
                <Row gutter={[24, 0]}>
                  <Col xs={24} md={12} lg={12}>
                    <Form.Item
                      name="address"
                      label="Address"
                      placeholder="Enter event address"
                      rules={[
                        {
                          required: true,
                          message: "Please enter event address",
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
                          message: "Please enter event date",
                        },
                      ]}
                    >
                      <DatePicker
                        onChange={(date, dateString) => setDate(dateString)}
                        style={{
                          width: "100%",
                          padding: "7px",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 0]}>
                  <Col xs={24} md={8} lg={8}>
                    <Form.Item
                      name="eventStartTime"
                      label="Event Start Time"
                      placeholder="Enter event start time"
                      rules={[
                        {
                          required: true,
                          message: "Please enter start time",
                        },
                      ]}
                    >
                      <TimePicker
                        style={{
                          width: "100%",
                          padding: "7px",
                          borderRadius: "4px",
                        }}
                        use12Hours
                        format="h:mm a"
                        onChange={(time, timeString) =>
                          setStartTime(timeString)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8} lg={8}>
                    <Form.Item
                      name="eventEndTime"
                      label="Event End Time"
                      placeholder="Enter event end time"
                      rules={[
                        {
                          required: true,
                          message: "Please enter end time",
                        },
                      ]}
                    >
                      <TimePicker
                        style={{
                          width: "100%",
                          padding: "7px",
                          borderRadius: "4px",
                        }}
                        use12Hours
                        format="h:mm a"
                        onChange={(time, timeString) => setEndTime(timeString)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8} lg={8}>
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

export default AddEvent;
