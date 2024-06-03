import React, { useState } from 'react';
import { Select, Input, Button, Form, message } from 'antd';
import emailjs from '@emailjs/browser';



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

const RequestBed = () => {
  const [form] = Form.useForm();
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleHospitalChange = (value) => {
    setSelectedHospital(value);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    console.log(values);

    const templateParams = {
      hospital: values.hospital,
      from_name: values.name,
      from_email: values.email, // Added email field
      contact: values.contact,
      additionalInfo: values.additionalInfo || ''
    };

    emailjs.send(
      REACT_APP_EMAILJS_SERVICE_ID,
      REACT_APP_EMAILJS_TEMPLATE_ID,
      templateParams,
      REACT_APP_EMAILJS_PUBLIC_KEY
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      message.success('Bed request submitted successfully');
      form.resetFields();
      setLoading(false);
    })
    .catch((error) => {
      console.error('FAILED...', error);
      message.error('Failed to submit bed request');
      setLoading(false);
    });
  };

  return (
    <div className="request-bed-container">
      <h2>Request a Bed</h2>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="hospital"
          label="Select Hospital"
          rules={[{ required: true, message: 'Please select a hospital' }]}
        >
          <Select
            placeholder="Select a hospital"
            onChange={handleHospitalChange}
          >
            {topHospitals.map((hospital, index) => (
              <Option key={index} value={hospital}>
                {hospital}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          name="email" // Added email field
          label="Email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="contact"
          label="Contact Number"
          rules={[{ required: true, message: 'Please enter your contact number' }]}
        >
          <Input placeholder="Enter your contact number" />
        </Form.Item>

        <Form.Item
          name="additionalInfo"
          label="Additional Information"
        >
          <Input.TextArea rows={4} placeholder="Enter any additional information" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit Request
          </Button>
        </Form.Item>
      </Form>
      <style jsx>{`
        .request-bed-container {
          background: #ffffff;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          margin: 40px auto;
          border: 1px solid #e0e0e0;
        }

        .request-bed-container h2 {
          text-align: center;
          color: #4a90e2;
          font-size: 24px;
          margin-bottom: 30px;
        }

        .ant-form-item {
          margin-bottom: 20px;
        }

        .ant-select-selector {
          border-radius: 8px !important;
          height: 40px !important;
        }

        .ant-input, .ant-input-number, .ant-input-textarea {
          border-radius: 8px !important;
        }

        .ant-btn-primary {
          width: 100%;
          height: 40px;
          border-radius: 8px;
          background: #4a90e2;
          border: none;
          font-size: 16px;
          transition: background 0.3s ease;
        }

        .ant-btn-primary:hover {
          background: #357ab8;
        }

        @media (max-width: 600px) {
          .request-bed-container {
            padding: 20px;
          }

          .request-bed-container h2 {
            font-size: 20px;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default RequestBed;
