import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaSearch,
  FaUserShield,
  FaUserFriends,
  FaUserTie,
  FaHandshake,
  FaSyncAlt,
} from "react-icons/fa";
import "../styles/UserManagement.css";

const API = "http://localhost:5000/api/users";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [error, setError] = useState("");

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API);

      setUsers(res.data);
      setFilteredUsers(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search + Filter
  useEffect(() => {
    let temp = [...users];

    if (roleFilter !== "All") {
      temp = temp.filter(
        (u) =>
          (u.role || "").toLowerCase() === roleFilter.toLowerCase()
      );
    }

    if (search.trim()) {
      temp = temp.filter((u) => {
        return (
          (u.full_name || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (u.username || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (u.mobile || "")
            .includes(search)
        );
      });
    }

    setFilteredUsers(temp);
  }, [users, search, roleFilter]);

  const totalUsers = useMemo(() => users.length, [users]);

  const getRoleIcon = (role) => {
    switch (role) {
      case "Admin":
        return <FaUserShield />;
      case "Volunteer":
        return <FaUserFriends />;
      case "Sponsor":
        return <FaHandshake />;
      default:
        return <FaUserTie />;
    }
  };
    return (
    <div className="user-management">

      <div className="user-header">

        <div>
          <h2>
            <FaUsers /> User Management
          </h2>

          <p>
            View all registered users of the Ganesh Mandal.
          </p>
        </div>

        <button
          className="refresh-btn"
          onClick={fetchUsers}
        >
          <FaSyncAlt /> Refresh
        </button>

      </div>

      <div className="user-top-card">

        <div className="total-card">

          <FaUsers className="card-icon" />

          <div>

            <h3>{totalUsers}</h3>

            <span>Total Registered Users</span>

          </div>

        </div>

      </div>

      <div className="filter-section">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search by Name, Username or Mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >

          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Sponsor">Sponsor</option>
          <option value="Member">Member</option>

        </select>

      </div>

   {loading ? (

  <div className="loading-box">
    Loading Users...
  </div>

) : error ? (

  <div className="error-box">
    {error}
  </div>

) : filteredUsers.length === 0 ? (

  <div className="empty-box">
    No Users Found
  </div>

) : (

  <div className="table-container">

    <table className="user-table">

      <thead>

        <tr>
          <th>Sr No.</th>
          <th>Full Name</th>
          <th>Username</th>
          <th>Mobile</th>
          <th>Age</th>
          <th>Role</th>
          <th>Registered Date</th>
        </tr>

      </thead>

      <tbody>

        {filteredUsers.map((user, index) => (

          <tr key={user.id}>

            <td>{index + 1}</td>
            <td>{user.full_name || "-"}</td>
            <td>{user.username}</td>
            <td>{user.mobile || "-"}</td>
            <td>{user.age || "-"}</td>

            <td>
              <span
                className={`role-badge ${(user.role || "Member").toLowerCase()}`}
              >
                {getRoleIcon(user.role)}
                {user.role}
              </span>
            </td>

            <td>
              {user.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "-"}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

)}

    </div>
  );
}

export default UserManagement;