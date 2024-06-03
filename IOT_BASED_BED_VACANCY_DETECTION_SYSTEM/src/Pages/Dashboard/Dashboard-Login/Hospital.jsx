import React, { useState } from 'react';
import { Select, InputNumber, Button } from 'antd';
// import Sidebar from './Sidebar';

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
  "Gleneagles Global Hospitals"
];

const initialBedData = {
  "Apollo Hospitals": { total: 500, available: 150, occupied: 350 },
  "Fortis Healthcare": { total: 600, available: 200, occupied: 400 },
  "Max Healthcare": { total: 550, available: 120, occupied: 430 },
  "Manipal Hospitals": { total: 400, available: 80, occupied: 320 },
  "Narayana Health": { total: 650, available: 300, occupied: 350 },
  "Medanta - The Medicity": { total: 700, available: 250, occupied: 450 },
  "BLK Super Speciality Hospital": { total: 450, available: 100, occupied: 350 },
  "Kokilaben Dhirubhai Ambani Hospital": { total: 600, available: 180, occupied: 420 },
  "Aster DM Healthcare": { total: 500, available: 200, occupied: 300 },
  "Gleneagles Global Hospitals": { total: 550, available: 170, occupied: 380 }
};

const Hospital = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [bedData, setBedData] = useState(initialBedData);

  const handleHospitalChange = (value) => {
    setSelectedHospital(value);
  };

  const handleInputChange = (type, value) => {
    setBedData((prev) => ({
      ...prev,
      [selectedHospital]: {
        ...prev[selectedHospital],
        [type]: value,
        occupied: type === 'available' 
          ? prev[selectedHospital].total - value 
          : prev[selectedHospital].total - prev[selectedHospital].available
      }
    }));
  };

  return (
    <div className="container">
      {/* <Sidebar /> */}
      <div className="AfterSideBar">
        <h1 style={{ color: "rgb(184 191 234)" }}>Hospital Management: Update the beds data</h1>

        {/* Select Hospital from dropdown */}
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
        </div>

        {/* Display and modify bed information */}
        {selectedHospital && (
          <div className="bed-info-card">
            <img src="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg" alt={selectedHospital} className="hospital-image" />
            <div className="bed-info">
              <h3>{selectedHospital}</h3>
              <div className="bed-details">
                <p className="total-beds">Total Beds: {bedData[selectedHospital].total}</p>
                <p className="available-beds">
                  Available Beds: 
                  <InputNumber 
                    min={0} 
                    max={bedData[selectedHospital].total} 
                    value={bedData[selectedHospital].available} 
                    onChange={(value) => handleInputChange('available', value)} 
                  />
                </p>
                <p className="occupied-beds">Occupied Beds: {bedData[selectedHospital].occupied}</p>
              </div>
            </div>
          </div>
        )}
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
      `}</style>
    </div>
  );
};

export default Hospital;
