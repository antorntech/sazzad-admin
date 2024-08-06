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

// {
//   /* <div className="card-main-wrapper">
//   {blogs.map((blog) => (
//     <div className="card-body-wrapper" key={blog._id}>
//       <div className="card-left">
//         <img src={`http://localhost:8000${blog.banner}`} alt="blog-banner" />
//       </div>
//       <div className="card-right">
//         <h1 style={{ margin: "0" }}>{blog.title}</h1>
//         <p>{blog.description}</p>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "5px",
//             marginTop: "10px",
//           }}
//         >
//           <i class="fa-solid fa-user"></i>
//           <p>{blog.author}</p>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "5px",
//             margin: "10px 0",
//           }}
//         >
//           <i class="fa-solid fa-calendar-days"></i>
//           <p>{blog.date}</p>
//         </div>
//         <div>
//           <Link to={`/blogs/edit-blog/${blog._id}`}>
//             <Button type="primary">
//               <EditOutlined />
//             </Button>
//           </Link>
//           <Button
//             type="danger"
//             onClick={() => showConfirm(blog._id)}
//             style={{ marginLeft: "10px" }}
//           >
//             <DeleteOutlined />
//           </Button>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>; */
// }

// <Table
//   dataSource={about}
//   rowKey="_id"
//   scroll={{
//     x: 1000,
//   }}
// >
//   <Column
//     title="Banner"
//     dataIndex="banner"
//     key="banner"
//     width="200px"
//     render={(banner) => (
//       <img
//         src={`http://localhost:8000${banner}`}
//         style={{ width: "100px", height: "80px" }}
//       />
//     )}
//   />
//   <Column title="Name" key="name" dataIndex="name" />
//   <Column title="Email" dataIndex="email" key="email" />
//   <Column title="Phone" dataIndex="phone" key="phone" />
//   <Column title="Address" dataIndex="address" key="address" />
//   <Column
//     title="Description"
//     key="description"
//     render={(_, record) => (
//       <Space>
//         <p style={{ color: "#000" }}>
//           {record.description.slice(0, 40)}...
//         </p>
//       </Space>
//     )}
//   />
//   <Column
//     title="Action"
//     key="action"
//     width="100px"
//     render={(_, record) => (
//       <Space size="middle">
//         <Link to={`/about/edit-about/${record._id}`}>
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
