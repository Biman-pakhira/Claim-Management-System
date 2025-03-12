import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Claim.css";
import { useNavigate } from "react-router-dom";

const ClaimRequest = () => {
  let navigate = useNavigate();

  const [memberName, setMemberName] = useState("");
  const [memberId, setMemberId] = useState("");
  const [planType, setPlanType] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [insuredAmount, setInsuredAmount] = useState("");
  const [search, setSearch] = useState("");
  const [maxClaimAmount, setMaxClaimAmount] = useState("");

  const clearData = useCallback(() => {
    if (search === "") {
      setMaxClaimAmount("");
      setMemberName("");
      setMemberId("");
      setPlanType("");
      setInsuredAmount("");
    }
  }, [search]);

  const fetchData = useCallback(async () => {
    if (search === "") return;

    try {
      const result = await axios.get(
        `http://localhost:8080/api/member/${search}`
      );

      const { memberId, memberName, plan } = result.data;
      setMemberId(memberId);
      setMemberName(memberName);
      setPlanType(plan.planName);
      setInsuredAmount(plan.insuredAmount);
      setMaxClaimAmount("Rs. 700000");
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  }, [search]);

  useEffect(() => {
    fetchData();
    clearData();
  }, [search, fetchData, clearData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      claimAmount: claimAmount,
      requestDate: requestDate,
      member: {
        memberId: memberId,
      },
    };

    try {
      await axios.post("http://localhost:8080/claim/add", obj);
      navigate("/claims");
    } catch (error) {
      console.error("Error submitting claim:", error);
    }
  };

  return (
    <div className="container">
      <div className="process-claim">
        <h4>New Claim Request</h4>
        <hr className="bg-success border-2 border-top border-success" />

        <section className="search-bar">
          <form
            className="d-flex justify-content-center col-md-3 mx-auto mt-4"
            onSubmit={(e) => e.preventDefault()}
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
          <div className="row d-flex justify-content-center mb-2">
            <div className="col-md-2">
              <label htmlFor="name" className="form-label">
                Member Id
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={memberId}
                disabled
              />
            </div>
            <div className="col-md-5 mb-2">
              <label htmlFor="memberName" className="form-label">
                Member Name
              </label>
              <input
                type="text"
                className="form-control"
                id="memberName"
                value={memberName}
                disabled
              />
            </div>

            <div className="col-md-4">
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

            <div className="col-md-3">
              <label htmlFor="insuredAmount" className="form-label">
                Insured Amount
              </label>
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend">
                  ₹
                </span>
                <input
                  type="number"
                  className="form-control"
                  id="insuredAmount"
                  value={insuredAmount}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-center mb-2">
            <div className="col-md-3">
              <label htmlFor="date" className="form-label">
                Request Date
              </label>
              <input
                type="text"
                className="form-control"
                id="date"
                value={requestDate}
                onChange={(e) => setRequestDate(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="amount" className="form-label">
                Claim Amount
              </label>
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend">
                  ₹
                </span>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <label htmlFor="maxAmount" className="form-label">
              Max Claimable Amount
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                ₹
              </span>
              <input
                type="text"
                className="form-control"
                id="maxAmount"
                value={maxClaimAmount}
                disabled
              />
            </div>
          </div>

          <div className="col-12 text-center mt-5">
            <button
              type="submit"
              className="btn btn-success btn-lg px-4 shadow"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClaimRequest;
