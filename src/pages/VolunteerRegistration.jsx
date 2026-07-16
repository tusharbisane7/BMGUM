import { useState } from "react";

import axios from "axios";

import {

    FaUser,

    FaPhone,

    FaMapMarkerAlt,

    FaCamera,

    FaIdCard,

    FaSave,

    FaBirthdayCake

} from "react-icons/fa";

import "../styles/volunteer.css";

const API = "https://bmgum.onrender.com";

function VolunteerRegistration() {

    const [preview,setPreview]=useState(null);

    const [loading,setLoading]=useState(false);

    const [registered,setRegistered]=useState(false);

    const [volunteerId,setVolunteerId]=useState("");

    const [formData,setFormData]=useState({

        photo:null,

        fullName:"",

        mobile:"",

        age:"",

        gender:"Male",

        address:""

    });

    // ================= HANDLE CHANGE =================

    const handleChange=(e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };

    // ================= PHOTO =================

    const handlePhoto=(e)=>{

        const file=e.target.files[0];

        if(!file) return;

        setFormData({

            ...formData,

            photo:file

        });

        setPreview(

            URL.createObjectURL(file)

        );

    };

    // ================= SUBMIT =================

    const handleSubmit=async(e)=>{

        e.preventDefault();

        const data=new FormData();

        data.append(

            "fullName",

            formData.fullName

        );

        data.append(

            "mobile",

            formData.mobile

        );

        data.append(

            "age",

            formData.age

        );

        data.append(

            "gender",

            formData.gender

        );

        data.append(

            "address",

            formData.address

        );

        if(formData.photo){

            data.append(

                "photo",

                formData.photo

            );

        }

        try{

            setLoading(true);

            const res=await axios.post(

                `${API}/api/volunteers`,

                data,

                {

                    headers:{

                        "Content-Type":

                        "multipart/form-data"

                    }

                }

            );

            setVolunteerId(

                res.data.volunteerId

            );

            setRegistered(true);

        }

       catch(err){

    console.error("Axios Error:", err);

    console.error("Status:", err.response?.status);

    console.error("Response:", err.response?.data);

    alert(

        err.response?.data?.message ||

        "Registration Failed"

    );



        }

        finally{

            setLoading(false);

        }

    };
        // ================= SUCCESS PAGE =================

    if (registered) {

        return (

            <div className="volunteer-success container">

                <div className="success-card">

                    <h1>

                        🎉 नोंदणी यशस्वी

                    </h1>

                    <p>

                        तुमची स्वयंसेवक म्हणून नोंदणी यशस्वीरित्या झाली आहे.

                    </p>

                    <div className="volunteer-id-box">

                        <FaIdCard />

                        <h2>

                            Volunteer ID

                        </h2>

                        <h1>

                            {volunteerId}

                        </h1>

                    </div>

                    <button

                        className="print-btn"

                        onClick={() =>

                            window.print()

                        }

                    >

                        🖨️ स्वयंसेवक ओळखपत्र प्रिंट करा

                    </button>

                </div>

            </div>

        );

    }

    return (

        <div className="volunteer-page container">

            <div className="volunteer-form-card">

                <h1>

                    🙋 स्वयंसेवक नोंदणी

                </h1>

                <p>

                    बाल मित्र गणेश उत्सव मंडळासाठी स्वयंसेवक म्हणून नोंदणी करा.

                </p>

                <form

                    onSubmit={handleSubmit}

                    encType="multipart/form-data"

                >

                    {/* PHOTO */}

                    <div className="form-group">

                        <label>

                            <FaCamera />

                            फोटो *

                        </label>

                        <input

                            type="file"

                            accept="image/*"

                            onChange={handlePhoto}

                            required

                        />

                        {

                            preview && (

                                <img

                                    src={preview}

                                    alt="Preview"

                                    className="photo-preview"

                                />

                            )

                        }

                    </div>

                    {/* NAME */}

                    <div className="form-group">

                        <label>

                            <FaUser />

                            पूर्ण नाव *

                        </label>

                        <input

                            type="text"

                            name="fullName"

                            value={formData.fullName}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    {/* MOBILE */}

                    <div className="form-group">

                        <label>

                            <FaPhone />

                            मोबाईल क्रमांक *

                        </label>

                        <input

                            type="text"

                            name="mobile"

                            value={formData.mobile}

                            onChange={handleChange}

                            required

                        />

                    </div>
                                        {/* AGE */}

                    <div className="form-group">

                        <label>

                            <FaBirthdayCake />

                            वय *

                        </label>

                        <input

                            type="number"

                            name="age"

                            value={formData.age}

                            onChange={handleChange}

                            min="10"

                            max="80"

                            required

                        />

                    </div>

                    {/* GENDER */}

                    <div className="form-group">

                        <label>

                            लिंग *

                        </label>

                        <select

                            name="gender"

                            value={formData.gender}

                            onChange={handleChange}

                            required

                        >

                            <option value="Male">

                                पुरुष

                            </option>

                            <option value="Female">

                                महिला

                            </option>

                            <option value="Other">

                                इतर

                            </option>

                        </select>

                    </div>

                    {/* ADDRESS */}

                    <div className="form-group full">

                        <label>

                            <FaMapMarkerAlt />

                            पत्ता *

                        </label>

                        <textarea

                            rows="4"

                            name="address"

                            value={formData.address}

                            onChange={handleChange}

                            placeholder="संपूर्ण पत्ता लिहा"

                            required

                        />

                    </div>

                    {/* SUBMIT */}

                    <div className="button-area">

                        <button

                            type="submit"

                            className="register-btn"

                            disabled={loading}

                        >

                            {

                                loading

                                ?

                                "नोंदणी सुरू आहे..."

                                :

                                <>

                                    <FaSave />

                                    {" "}

                                    नोंदणी करा

                                </>

                            }

                        </button>

                    </div>

                </form>

            </div>

       
                      </div>

    );

}

export default VolunteerRegistration;