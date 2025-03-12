import React, { useState, useEffect, useCallback } from "react";
import "./Claim.css";
import axios from "axios";

const Claims = () => {
  const [claims, setClaims] = useState([]);

  const loadClaims = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/claim/all");
      setClaims(response.data);
    } catch (error) {
      console.error("Error fetching claims:", error);
    }
  }, []); 

  useEffect(() => {
    loadClaims();
  }, [loadClaims]); 
  return (
    <div className="container">
      <div className="all-claims">
        <h4>All Claims</h4>
        <hr />

        <section className="py-4 px-3">
          <table className="table table-striped shadow text-center">
            <thead className="table-dark">
              <tr>
                <th scope="col">Claim ID</th>
                <th scope="col">Member ID</th>
                <th scope="col">Member Name</th>
                <th scope="col">Plan Type</th>
                <th scope="col">Request Date</th>
                <th scope="col">Claim Amount</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim, index) => (
                <tr key={index}>
                  <td>{claim.claimId}</td>
                  <td>{claim.member.memberId}</td>
                  <td>{claim.member.memberName}</td>
                  <td>{claim.member.plan.planName}</td>
                  <td>{claim.requestDate}</td>
                  <td>{claim.claimAmount}</td>
                  <td className="fst-italic">{claim.claimStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Claims;
