import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  TimePicker,
  Upload,
  message,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";

export const EditEvent = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [eventData, setEventData] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bannerFileList, setBannerFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [date, setDate] = useState(moment()); // Initialize with moment object

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/events/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Event data");
        }
        return res.json();
      })
      .then((data) => {
        // Convert eventStartTime and eventEndTime to moment objects
        data.eventStartTime = moment(data.eventStartTime, "h:mm a");
        data.eventEndTime = moment(data.eventEndTime, "h:mm a");

        // Parse date into moment object
        data.date = moment(data.date);

        setEventData(data);
        form.setFieldsValue(data); // Ensure form fields are updated
      })
      .catch((error) => {
        console.error("Error fetching Event data:", error);
        message.error("Failed to fetch Event data");
      });
  }, [id, form]);

  const handleUpload = (values) => {
    const formData = new FormData();

    // Append event photo file to formData
    bannerFileList.forEach((file) => {
      formData.append("banner", file);
    });

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("address", values.address);
    formData.append("date", date.format("D MMM - YYYY")); // Format date for backend

    // Append event start and end times
    formData.append(
      "eventStartTime",
      startTime
        ? moment(startTime, "h:mm a").format("h:mm a")
        : moment(eventData.eventStartTime, "h:mm a").format("h:mm a")
    );
    formData.append(
      "eventEndTime",
      endTime
        ? moment(endTime, "h:mm a").format("h:mm a")
        : moment(eventData.eventEndTime, "h:mm a").format("h:mm a")
    );

    setUploading(true);
    // You can use any AJAX library you like
    fetch(`http://localhost:8000/api/v1/events/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update review data");
        }
        return res.json();
      })
      .then(() => {
        message.success("Event data updated successfully.");
        navigate.push("/events");
      })
      .catch((error) => {
        console.log(error);
        message.error("Failed to update service data.");
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
          Edit Service
        </h1>
        <p>You can edit service from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            onFinish={handleUpload}
            layout="vertical"
            form={form}
            initialValues={eventData}
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
                          message: "Please enter blog date",
                        },
                      ]}
                    >
                      <DatePicker
                        value={date} // Set value prop to date state
                        onChange={(date) => setDate(date)} // Update date state
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
                        defaultValue={
                          eventData.eventStartTime
                            ? moment(eventData.eventStartTime, "h:mm a")
                            : undefined
                        }
                        use12Hours
                        format="h:mm a"
                        onChange={(time, timeString) => {
                          if (!startTime) {
                            setStartTime(timeString);
                          }
                        }}
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
                        defaultValue={
                          eventData.eventEndTime
                            ? moment(eventData.eventEndTime, "h:mm a")
                            : undefined
                        }
                        use12Hours
                        format="h:mm a"
                        onChange={(time, timeString) => {
                          if (!endTime) {
                            setEndTime(timeString);
                          }
                        }}
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
