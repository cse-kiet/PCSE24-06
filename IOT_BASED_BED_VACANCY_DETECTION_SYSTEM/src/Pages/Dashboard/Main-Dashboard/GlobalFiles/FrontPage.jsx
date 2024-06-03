import { Table, Select, Button } from "antd";
import React, { useEffect, useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import { FaUserNurse, FaBed, FaAmbulance } from "react-icons/fa";
import { RiEmpathizeLine, RiAdminLine } from "react-icons/ri";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { GetAllData, GetPatients } from "../../../../Redux/Datas/action";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const topHospitals = [
  "Apollo Hospitals",
  "Fortis Healthcare",
  "Max Healthcare",
  "Manipal Hospitals",
  "Narayana Health",
  "Medanta - The Medicity",
  "BLK Super Speciality Hospital",
  "Kokilaben Dhirubhai Ambani Hospital",
  "Aster DM Healthcare",
  "Gleneagles Global Hospitals",
];

const bedData = {
  "Apollo Hospitals": { total: 500, available: 150, occupied: 350 },
  "Fortis Healthcare": { total: 600, available: 200, occupied: 400 },
  "Max Healthcare": { total: 550, available: 120, occupied: 430 },
  "Manipal Hospitals": { total: 400, available: 80, occupied: 320 },
  "Narayana Health": { total: 650, available: 300, occupied: 350 },
  "Medanta - The Medicity": { total: 700, available: 250, occupied: 450 },
  "BLK Super Speciality Hospital": {
    total: 450,
    available: 100,
    occupied: 350,
  },
  "Kokilaben Dhirubhai Ambani Hospital": {
    total: 600,
    available: 180,
    occupied: 420,
  },
  "Aster DM Healthcare": { total: 500, available: 200, occupied: 300 },
  "Gleneagles Global Hospitals": { total: 550, available: 170, occupied: 380 },
};

const FrontPage = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const columns = [
    { title: "Name", dataIndex: "patientName", key: "patientName" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Disease", dataIndex: "disease", key: "disease" },
    { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  const navigate = useNavigate();
  const { patients } = useSelector((store) => store.data.patients);
  const {
    dashboard: { data },
  } = useSelector((store) => store.data);

  console.log(data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPatients());
    dispatch(GetAllData());
  }, []);

  const handleHospitalChange = (value) => {
    setSelectedHospital(value);
  };

  const handleRequestBedClick = () => {
    navigate("/request-bed");
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="AfterSideBar">
        <h1 style={{ color: "rgb(184 191 234)" }}>Overview</h1>
        <div className="maindiv">
        <div style={{cursor:'pointer'}}  onClick={handleRequestBedClick} className="four commondiv">
            <div>
              <h1>{data?.bed}</h1>
              <p>Request a Bed</p>
            </div>
            <FaBed className="overviewIcon" />
          </div>
          <div className="one commondiv">
            <div>
              <h1>{data?.doctor}</h1>
              <p>Doctor</p>
            </div>
            <MdPersonAdd className="overviewIcon" />
          </div>
          {/* <div className="three commondiv">
            <div>
              <h1>{data?.patient}</h1>
              <p>Patient</p>
            </div>
            <RiEmpathizeLine className="overviewIcon" />
          </div> */}
        
          {/* <div className="six commondiv">
            <div>
              <h1>{data?.appointment}</h1>
              <p>Appointment</p>
            </div>
            <BsFillBookmarkCheckFill className="overviewIcon" />
          </div> */}
        </div>

        <div style={{ margin: "20px 0" }}>
          <h2>Select Hospital</h2>
          <Select
            style={{ width: 200 }}
            placeholder="Select a hospital"
            onChange={handleHospitalChange}
          >
            {topHospitals.map((hospital, index) => (
              <Option key={index} value={hospital}>
                {hospital}
              </Option>
            ))}
          </Select>
          {/* <Button
                type="primary"
                onClick={handleRequestBedClick}
                style={{ marginTop: "10px" , position:'relative', right:'50px'}}
              >
                Request a Bed
              </Button> */}
        </div>

        {selectedHospital && (
          <div className="bed-info-card">
            <img
              src="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg"
              alt={selectedHospital}
              className="hospital-image"
            />
            <div className="bed-info">
              <h3>{selectedHospital}</h3>
              <div className="bed-details">
                <p className="total-beds">
                  Total Beds: {bedData[selectedHospital].total}
                </p>
                <p className="available-beds">
                  Available Beds: {bedData[selectedHospital].available}
                </p>
                <p className="occupied-beds">
                  Occupied Beds: {bedData[selectedHospital].occupied}
                </p>
              </div>
 
            </div>
          </div>
        )}

        {/* Patient Details */}
        {/* <div className="patientDetails">
          <h1>Patient Details</h1>
          <div className="patientBox">
            <Table columns={columns} dataSource={patients} />
          </div>
        </div> */}
      </div>
      <style jsx>{`
        .bed-info-card {
          display: flex;
          align-items: center;
          background: #f9f9f9;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin-bottom: 20px;
        }

        .bed-info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .hospital-image {
          width: 150px;
          height: 150px;
          border-radius: 10px;
          margin-right: 20px;
        }

        .bed-info h3 {
          margin-bottom: 10px;
        }

        .bed-info p {
          margin: 5px 0;
        }

        .bed-details {
          display: flex;
          flex-direction: column;
        }

        .total-beds {
          color: #1976d2; /* Blue for total beds */
        }

        .available-beds {
          color: #4caf50; /* Green for available beds */
        }

        .occupied-beds {
          color: #f44336; /* Red for occupied beds */
        }

        .ant-btn-primary {
          background-color: #4a90e2;
          border-color: #4a90e2;
        }

        .ant-btn-primary:hover {
          background-color: #357ab8;
          border-color: #357ab8;
        }
      `}</style>
    </div>
  );
};

export default FrontPage;
