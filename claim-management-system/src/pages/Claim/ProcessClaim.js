import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Claim.css";
import { useNavigate } from "react-router-dom";

const ProcessClaim = () => {
  let navigate = useNavigate();

  const [memberName, setMemberName] = useState("");
  const [planType, setPlanType] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [claimAmount, setClaimAmount] = useState(0);
  const [insuredAmount, setInsuredAmount] = useState(0);
  const [status, setStatus] = useState("");
  const [claimId, setClaimId] = useState("");
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/claim/fetchMember/${search}`
      );
      const { member, requestDate, claimAmount, claimId, plan } = result.data;
      setMemberName(member.memberName);
      setPlanType(plan.planName);
      setRequestDate(requestDate);
      setClaimAmount(claimAmount);
      setInsuredAmount(plan.insuredAmount);
      setClaimId(claimId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchDataWrapper = async () => {
      if (search) {
        await fetchData();
      }
    };

    fetchDataWrapper();
  }, [search]); // Only run effect when 'search' changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      claimStatus: status,
    };
    try {
      await axios.put(`http://localhost:8080/claim/process/${claimId}`, obj);
      navigate("/claims");
    } catch (error) {
      console.error("Error processing claim:", error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform any additional actions on search submit if needed
  };

  return (
    <div className="container">
      <div className="process-claim">
        <h4>Process Claim</h4>
        <hr />

        <section className="search-bar">
          <form
            className="d-flex justify-content-center col-md-3 mx-auto mt-4"
            onSubmit={handleSearchSubmit}
          >
            <input
              className="form-control py-2 rounded-pill shadow text-center"
              type="number"
              placeholder="Enter member id...   🔍"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </section>

        <section className="row g-3 p-4 mt-2">
          <div className="col-md-6 mb-2">
            <label htmlFor="name" className="form-label">
              Member Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={memberName}
              disabled
            />
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="planType" className="form-label">
              Insurance Type
            </label>
            <input
              type="text"
              className="form-control"
              id="planType"
              value={planType}
              disabled
            />
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="date" className="form-label">
              Request Date
            </label>
            <input
              type="text"
              className="form-control"
              id="date"
              value={requestDate}
              disabled
            />
          </div>

          <div className="col-md-3 mb-2">
            <label htmlFor="amount" className="form-label">
              Claim Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={claimAmount}
              disabled
            />
          </div>

          <div className="col-md-3 mb-2">
            <label htmlFor="insuredAmount" className="form-label">
              Insured Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="insuredAmount"
              value={insuredAmount}
              disabled
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="col-md-4 mb-2">
              <label htmlFor="status" className="form-label">
                Process Response
              </label>
              <select
                id="status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Approved">Approve</option>
                <option value="Rejected">Reject</option>
              </select>
            </div>

            <div className="col-12 text-center mt-4">
              <button type="submit" className="btn btn-success px-4 shadow">
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ProcessClaim;
