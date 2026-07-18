import { useEffect, useState } from "react";
import "../styles/PrintVolunteer.css";

const API = "https://bmgum.onrender.com";

function PrintVolunteer() {

    const [volunteer, setVolunteer] = useState(null);

    useEffect(() => {

        const data = sessionStorage.getItem("printVolunteer");

        if (!data) {

            return;

        }

        const obj = JSON.parse(data);

        setVolunteer(obj);

    }, []);

    useEffect(() => {

        if (!volunteer) return;

        const timer = setTimeout(() => {

            window.print();

        }, 500);

        return () => clearTimeout(timer);

    }, [volunteer]);

    if (!volunteer) {

        return (

            <div className="print-loading">

                Loading Volunteer...

            </div>

        );

    }

    const photo = volunteer.photo

        ? volunteer.photo.startsWith("http")

            ? volunteer.photo

            : `${API}/uploads/volunteers/${volunteer.photo}`

        : "/default-user.png";

    return (

        <div className="print-page">

            <div className="id-card">

                <div className="id-header">

                    <h2>

                        बाल मित्र गणेश उत्सव मंडळ

                    </h2>

                    <h3>

                        VOLUNTEER ID CARD

                    </h3>

                </div>

                <div className="photo-section">

                    <img

                        src={photo}

                        alt={volunteer.fullName}

                        onError={(e) => {

                            e.target.onerror = null;

                            e.target.src = "/default-user.png";

                        }}

                    />

                </div>

                <div className="id-details">

                    <p>

                        <strong>Volunteer ID :</strong>

                        {volunteer.volunteerId}

                    </p>

                    <p>

                        <strong>Name :</strong>

                        {volunteer.fullName}

                    </p>

                    <p>

                        <strong>Mobile :</strong>

                        {volunteer.mobile}

                    </p>

                    <p>

                        <strong>Age :</strong>

                        {volunteer.age}

                    </p>

                    <p>

                        <strong>Gender :</strong>

                        {volunteer.gender}

                    </p>
                                        <p>

                        <strong>Address :</strong>

                        {volunteer.address}

                    </p>

                    <p>

                        <strong>Approved By :</strong>

                        {volunteer.approvedBy || "Admin"}

                    </p>

                </div>

                <div className="approved-box">

                    ✔ APPROVED VOLUNTEER

                </div>

                <div className="signature-box">

                    <div className="signature-line"> </div>

                    <p>
                             
                        Authorised Signatory

                    </p>

                </div>

            </div>

        </div>

    );

}

export default PrintVolunteer;