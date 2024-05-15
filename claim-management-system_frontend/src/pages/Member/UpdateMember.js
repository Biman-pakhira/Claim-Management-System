import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Member.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateMember = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [memberName, setMemberName] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [emailId, setEmailId] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [planName, setPlanName] = useState("");
  const [insuredAmount, setInsuredAmount] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const memberDetails = {
      memberName,
      dob,
      city,
      state,
      emailId,
      contactNo,
    };

    await axios.put(`http://localhost:8080/api/member/update/${id}`, memberDetails);
    navigate("/members");
  };

  useEffect(() => {
    const loadMember = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/api/member/${id}`);
        const { data } = result;
        setMemberName(data.memberName);
        setDob(data.dob);
        setCity(data.city);
        setState(data.state);
        setEmailId(data.emailId);
        setContactNo(data.contactNo);
        setUsername(data.username);
        setPassword(data.password);
        setPlanName(data.plan.planName);
        setInsuredAmount(data.plan.insuredAmount);
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    loadMember();
  }, [id]);

  return (
    <div className="container">
      <h4>Update Member</h4>
      <hr className="bg-success border-2 border-top border-success" />
      <Link to="/members" className="btn btn-warning btn-sm mx-5 mt-2 px-2">
        <i className="fa-solid fa-arrow-left-long px-2"></i> Back
      </Link>

      <form className="row g-3 p-4 mt-0" onSubmit={onSubmit}>
        <div className="row d-flex justify-content-center">
          <div className="col-md-3 mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="memberName"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="emailId"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="contact" className="form-label">
              Contact
            </label>
            <input
              type="number"
              className="form-control"
              id="contact"
              name="contactNo"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>
        </div>

        <div className="row d-flex justify-content-center mb-3">
          <div className="col-md-3">
            <label htmlFor="dob" className="form-label">
              DOB
            </label>
            <input
              type="text"
              className="form-control"
              id="dob"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled
            />
          </div>
        </div>

        <div className="row d-flex justify-content-center mb-3">
          <div className="col-md-5">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>

        <div className="row d-flex justify-content-center mb-3">
          <div className="col-md-5">
            <label htmlFor="planName" className="form-label">
              Plan Type
            </label>
            <input
              type="text"
              className="form-control"
              id="planName"
              name="planName"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              disabled
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="insuredAmount" className="form-label">
              Insured Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="insuredAmount"
              name="insuredAmount"
              value={insuredAmount}
              onChange={(e) => setInsuredAmount(e.target.value)}
              disabled
            />
          </div>
        </div>

        <div className="col-12 text-center mt-5">
          <button type="submit" className="btn btn-success btn-lg shadow px-4">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMember;
