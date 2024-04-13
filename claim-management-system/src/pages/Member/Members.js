import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Member.css";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMembers();
  }, []); // Load members only once on component mount

  const loadMembers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/member/all");
      setMembers(result.data);
    } catch (error) {
      console.error("Error loading members:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement search logic here if needed
  };

  return (
    <div className="container">
      <div className="all-members">
        <h4>All Members List</h4>
        <hr />

        <section className="search-bar">
          <form
            className="d-flex justify-content-center col-md-4 mx-auto my-4"
            onSubmit={handleSubmit}
          >
            <input
              className="form-control py-2 rounded-pill shadow text-center"
              type="search"
              placeholder="Search member... 🔍"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </section>

        <section className="py-3 px-2">
          <table className="table table-striped shadow text-center">
            <thead className="table-dark">
              <tr>
                <th scope="col">Member Id</th>
                <th scope="col">Member Name</th>
                <th scope="col">Address</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Insurance Type</th>
                <th scope="col">Insured Amount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {members
                .filter((item) =>
                  item.memberName.toLowerCase().includes(search.toLowerCase())
                )
                .map((member) => (
                  <tr key={member.memberId}>
                    <td>{member.memberId}</td>
                    <td>{member.memberName}</td>
                    <td>{member.address}</td>
                    <td>{member.email}</td>
                    <td>{member.phone}</td>
                    <td>{member.insuranceType}</td>
                    <td>{member.insuredAmount}</td>
                    <td>
                      <Link
                        to={`/updateMember/${member.memberId}`}
                        className="btn btn-warning btn-sm"
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Members;
