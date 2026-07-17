import { useState, useEffect } from "react";
import axios from "axios";

import {
    FaHandshake,
    FaSave,
    FaUndo,
    FaEdit,
    FaTrash,
    FaSearch,
    FaImage,
    FaCrown,
    FaGem
} from "react-icons/fa";

import "../styles/admin/sponsormanagement.css";

const API = "https://bmgum.onrender.com";

function SponsorManagement() {

    const [sponsors, setSponsors] = useState([]);

    const [summary, setSummary] = useState({
        totalSponsors: 0,
        goldSponsors: 0,
        silverSponsors: 0,
        bronzeSponsors: 0,
        diamondSponsors: 0
    });

    const [loading, setLoading] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");

    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        sponsorName: "",
        companyName: "",
        mobile: "",
        address: "",
        sponsorType: "Gold",
        status: "Active",
        logo: null
    });

    // ================= LOAD SPONSORS =================

    const loadSponsors = async () => {

        try {

            setLoading(true);

            const res = await axios.get(
                `${API}/api/sponsors`
            );

            setSponsors(res.data);

        } catch (err) {

            console.log(err);

            alert("Unable to load sponsors.");

        } finally {

            setLoading(false);

        }

    };

    // ================= LOAD SUMMARY =================

    const loadSummary = async () => {

        try {

            const res = await axios.get(
                `${API}/api/sponsors/summary`
            );

            setSummary(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadSponsors();

        loadSummary();

    }, []);

    // ================= HANDLE CHANGE =================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // ================= HANDLE IMAGE =================

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setFormData({
            ...formData,
            logo: file
        });

        setPreview(URL.createObjectURL(file));

    };

    // ================= CLEAR FORM =================

    const clearForm = () => {

        setEditingId(null);

        setPreview(null);

        setFormData({

            sponsorName: "",
            companyName: "",
            mobile: "",
            address: "",
            sponsorType: "Gold",
            status: "Active",
            logo: null

        });

        const fileInput = document.getElementById("logo");

        if (fileInput) {

            fileInput.value = "";

        }

    };

    // ================= SAVE =================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const data = new FormData();

        data.append("sponsorName", formData.sponsorName);
        data.append("companyName", formData.companyName);
        data.append("mobile", formData.mobile);
        data.append("address", formData.address);
        data.append("sponsorType", formData.sponsorType);
        data.append("status", formData.status);

        if (formData.logo) {

            data.append("logo", formData.logo);

        }

        try {

            if (editingId) {

                await axios.put(
                    `${API}/api/sponsors/${editingId}`,
                    data,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

                alert("Sponsor Updated Successfully");

            } else {

                await axios.post(
                    `${API}/api/sponsors`,
                    data,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

                alert("Sponsor Added Successfully");

            }

            clearForm();

            loadSponsors();

            loadSummary();

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Unable to save sponsor."
            );

        }

    };

    // ================= EDIT =================

    const handleEdit = (item) => {

        setEditingId(item.id);

        setFormData({

            sponsorName: item.sponsorName,
            companyName: item.companyName,
            mobile: item.mobile,
            address: item.address,
            sponsorType: item.sponsorType,
            status: item.status,
            logo: null

        });

        if (item.logo) {

            setPreview(
                `${API}/uploads/sponsors/${item.logo}`
            );

        } else {

            setPreview(null);

        }

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    // ================= DELETE =================

    const handleDelete = async (id) => {

        if (
            !window.confirm(
                "Are you sure you want to delete this sponsor?"
            )
        ) {
            return;
        }

        try {

            await axios.delete(
                `${API}/api/sponsors/${id}`
            );

            alert("Sponsor Deleted Successfully");

            loadSponsors();

            loadSummary();

        } catch (err) {

            console.log(err);

            alert("Unable to delete sponsor.");

        }

    };

    // ================= SEARCH =================

    const filteredSponsors = sponsors.filter(

        (item) =>

            item.sponsorName
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            item.companyName
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            item.mobile
                ?.includes(search)

    );

    return (

        <div className="sponsor-page">

            {/* ================= PAGE HEADER ================= */}

            <div className="page-title">

                <div className="title-icon">

                    <FaHandshake />

                </div>

                <div className="title-content">

                    <h1>Sponsor Management</h1>

                    <p>
                        Add, update and manage all Ganesh
                        Mandal sponsors from one place.
                    </p>

                </div>

            </div>

            {/* Part 2 continues from here */}

                        {/* ================= SUMMARY ================= */}

            <div className="summary-grid">

                <div className="summary-card total">

                    <div>

                        <h3>Total Sponsors</h3>

                        <h2>{summary.totalSponsors}</h2>

                    </div>

                    <FaHandshake />

                </div>

                <div className="summary-card gold">

                    <div>

                        <h3>Gold Sponsors</h3>

                        <h2>{summary.goldSponsors}</h2>

                    </div>

                    <FaCrown />

                </div>

                <div className="summary-card silver">

                    <div>

                        <h3>Silver Sponsors</h3>

                        <h2>{summary.silverSponsors}</h2>

                    </div>

                    <FaHandshake />

                </div>

                <div className="summary-card bronze">

                    <div>

                        <h3>Bronze Sponsors</h3>

                        <h2>{summary.bronzeSponsors}</h2>

                    </div>

                    <FaHandshake />

                </div>

                <div className="summary-card diamond">

                    <div>

                        <h3>Diamond Sponsors</h3>

                        <h2>{summary.diamondSponsors}</h2>

                    </div>

                    <FaGem />

                </div>

            </div>

            {/* ================= FORM ================= */}

            <div className="sponsor-card">

                <form

                    className="sponsor-form"

                    onSubmit={handleSubmit}

                    encType="multipart/form-data"

                >

                    {/* LEFT SIDE */}

                    <div className="form-left">

                        <div className="form-group">

                            <label>Sponsor Name *</label>

                            <input

                                type="text"

                                name="sponsorName"

                                value={formData.sponsorName}

                                onChange={handleChange}

                                placeholder="Enter Sponsor Name"

                                required

                            />

                        </div>

                        <div className="form-group">

                            <label>Company Name</label>

                            <input

                                type="text"

                                name="companyName"

                                value={formData.companyName}

                                onChange={handleChange}

                                placeholder="Enter Company Name"

                            />

                        </div>

                        <div className="form-group">

                            <label>Mobile Number</label>

                            <input

                                type="text"

                                name="mobile"

                                value={formData.mobile}

                                onChange={handleChange}

                                placeholder="Enter Mobile Number"

                            />

                        </div>

                        <div className="form-group">

                            <label>Address</label>

                            <textarea

                                rows="4"

                                name="address"

                                value={formData.address}

                                onChange={handleChange}

                                placeholder="Enter Address"

                            />

                        </div>

                        <div className="form-row">

                            <div className="form-group">

                                <label>Sponsor Type</label>

                                <select

                                    name="sponsorType"

                                    value={formData.sponsorType}

                                    onChange={handleChange}

                                >

                                    <option value="Gold">

                                        Gold Sponsor

                                    </option>

                                    <option value="Silver">

                                        Silver Sponsor

                                    </option>

                                    <option value="Bronze">

                                        Bronze Sponsor

                                    </option>

                                    <option value="Diamond">

                                        Diamond Sponsor

                                    </option>

                                </select>

                            </div>

                            <div className="form-group">

                                <label>Status</label>

                                <select

                                    name="status"

                                    value={formData.status}

                                    onChange={handleChange}

                                >

                                    <option value="Active">

                                        Active

                                    </option>

                                    <option value="Inactive">

                                        Inactive

                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}

                    <div className="form-right">

                        <div className="upload-card">

                            <FaImage className="upload-icon" />

                            <h3>Sponsor Logo</h3>

                            <p>

                                Upload PNG, JPG or JPEG

                            </p>

                            <input

                                id="logo"

                                type="file"

                                accept="image/*"

                                onChange={handleImage}

                            />

                            {

                                preview ?

                                (

                                    <img

                                        src={preview}

                                        alt="Preview"

                                        className="preview-image"

                                    />

                                )

                                :

                                (

                                    <div className="preview-placeholder">

                                        No Image Selected

                                    </div>

                                )

                            }

                        </div>

                    </div>

                    {/* BUTTONS */}

                    <div className="button-group">

                        <button

                            type="submit"

                            className="save-btn"

                        >

                            <FaSave />

                            {

                                editingId

                                    ?

                                    " Update Sponsor"

                                    :

                                    " Add Sponsor"

                            }

                        </button>

                        <button

                            type="button"

                            className="clear-btn"

                            onClick={clearForm}

                        >

                            <FaUndo />

                            Clear Form

                        </button>

                    </div>

                </form>

            </div>

                       {/* ================= SEARCH ================= */}

            <div className="table-header">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search by Sponsor, Company or Mobile..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="table-info">

                    <strong>
                        Total :
                    </strong>

                    {filteredSponsors.length}

                </div>

            </div>

            {/* ================= TABLE ================= */}

            <div className="table-card">

                <table className="sponsor-table">

                    <thead>

                        <tr>

                            <th>Logo</th>

                            <th>Sponsor</th>

                            <th>Company</th>

                            <th>Mobile</th>

                            <th>Type</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            loading ?

                            (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="no-data"
                                    >

                                        Loading Sponsors...

                                    </td>

                                </tr>

                            )

                            :

                            filteredSponsors.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="no-data"
                                    >

                                        No Sponsors Found

                                    </td>

                                </tr>

                            )

                            :

                            filteredSponsors.map((item) => (

                                <tr key={item.id}>

                                    <td>

                                        {

                                            item.logo ?

                                            (

                                                <img
                                                    src={`${API}/uploads/sponsors/${item.logo}`}
                                                    alt={item.sponsorName}
                                                    className="table-logo"
                                                />

                                            )

                                            :

                                            (

                                                <div className="table-logo empty">

                                                    <FaImage />

                                                </div>

                                            )

                                        }

                                    </td>

                                    <td>

                                        <strong>

                                            {item.sponsorName}

                                        </strong>

                                    </td>

                                    <td>

                                        {

                                            item.companyName || "-"

                                        }

                                    </td>

                                    <td>

                                        {

                                            item.mobile || "-"

                                        }

                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${item.sponsorType.toLowerCase()}`}
                                        >

                                            {item.sponsorType}

                                        </span>

                                    </td>

                                    <td>

                                        {

                                            item.status === "Active"

                                            ?

                                            (

                                                <span className="active">

                                                    Active

                                                </span>

                                            )

                                            :

                                            (

                                                <span className="inactive">

                                                    Inactive

                                                </span>

                                            )

                                        }

                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <button
                                                type="button"
                                                className="edit-btn"
                                                title="Edit Sponsor"
                                                onClick={() =>
                                                    handleEdit(item)
                                                }
                                            >

                                                <FaEdit />

                                            </button>

                                            <button
                                                type="button"
                                                className="delete-btn"
                                                title="Delete Sponsor"
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                            >

                                                <FaTrash />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default SponsorManagement;
            