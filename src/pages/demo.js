// <Table
//   dataSource={taskList}
//   rowKey="_id"
//   scroll={{
//     x: 1000,
//   }}
// >
//   <Column
//     fixed="left"
//     title="Banner"
//     dataIndex="icon"
//     key="icon"
//     width="100px"
//     render={(icon) => (
//       <img
//         src={`http://localhost:8000${icon}`}
//         alt="icon"
//         style={{ width: "100px", height: "50px" }}
//       />
//     )}
//   />
//   <Column title="Title" dataIndex="title" key="title" />
//   <Column
//     title="Action"
//     key="action"
//     width="150px"
//     render={(_, record) => (
//       <Space size="middle">
//         <Link to={`/edit-task-list/${record._id}`}>
//           <Button type="primary">
//             <EditOutlined />
//           </Button>
//         </Link>
//         <Button type="danger" onClick={() => showConfirm(record._id)}>
//           <DeleteOutlined />
//         </Button>
//       </Space>
//     )}
//   />
// </Table>

// <Table dataSource={heroContent} rowKey="_id">
//   <Column
//     title="Banner"
//     dataIndex="banner"
//     key="banner"
//     width="200px"
//     render={(banner) => (
//       <img
//         src={`http://localhost:8000${banner}`}
//         style={{ width: "250px", height: "150px" }}
//       />
//     )}
//   />
//   <Column title="Title" dataIndex="title" key="title" />
//   <Column
//     title="Facebook Link"
//     render={(_, record) =>
//       record.facebookLink ? "Link Available" : "Link Not Available"
//     }
//   />
//   <Column
//     title="Linkedin Link"
//     render={(_, record) =>
//       record.linkedinLink ? "Link Available" : "Link Not Available"
//     }
//   />
//   <Column
//     title="Whatsapp Number"
//     dataIndex="whatsappNumber"
//     key="whatsappNumber"
//   />
//   <Column
//     title="Action"
//     key="action"
//     width="100px"
//     render={(_, record) => (
//       <Space size="middle">
//         <Link to={`/edit-hero-content/${record._id}`}>
//           <Button type="primary">
//             <EditOutlined />
//           </Button>
//         </Link>
//         <Button type="danger" onClick={() => showConfirm(record._id)}>
//           <DeleteOutlined />
//         </Button>
//       </Space>
//     )}
//   />
// </Table>
