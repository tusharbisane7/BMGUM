import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/donation.css";

function DonationTable() {

  const [donations, setDonations] = useState([]);

  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState(null);

  const loadDonations = async () => {

    try {

      const res = await axios.get(

        "https://bmgum.onrender.com/api/donations"

      );

      setDonations(res.data);

    }

    catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadDonations();

    const interval = setInterval(() => {

      loadDonations();

    }, 2000);

    return () => clearInterval(interval);

  }, []);

  const filtered = donations.filter((d) =>

    (d.donorName || "")
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <>

      <input

        className="search-box"

        placeholder="🔍 देणगीदाराचे नाव शोधा..."

        value={search}

        onChange={(e) =>

          setSearch(e.target.value)

        }

      />

      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>अ.क्र.</th>

              <th>नाव</th>

              <th>रक्कम</th>

              <th>बाकी</th>

              <th>दिनांक</th>

              <th>वेळ</th>

              <th>पावती</th>

            </tr>

          </thead>

          <tbody>

            {

              filtered.length === 0 ?

              (

                <tr>

                  <td colSpan="7">

                    कोणतीही देणगी उपलब्ध नाही.

                  </td>

                </tr>

              )

              :

              filtered.map((item) => (

                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>{item.donorName}</td>

                  <td>

                    ₹ {item.amount}

                  </td>

                  <td>

                    ₹ {item.pendingAmount}

                  </td>

                  <td>{item.date}</td>

                  <td>{item.time}</td>

                  <td>

                    {

                      item.receipt ?

                      (

                        <button

                          className="receipt-btn"

                          onClick={() =>

                            setSelected(item)

                          }

                        >

                          View

                        </button>

                      )

                      :

                      "-"

                    }

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

      {

        selected && (

          <div

            className="receipt-modal"

            onClick={() =>

              setSelected(null)

            }

          >

            <div

              className="receipt-box"

              onClick={(e) =>

                e.stopPropagation()

              }

            >

              <h2>

                🧾 देणगी पावती

              </h2>

              <hr />

              <p>

                <b>नाव :</b>

                {" "}

                {selected.donorName}

              </p>

              <p>

                <b>रक्कम :</b>

                ₹ {selected.amount}

              </p>

              <p>

                <b>बाकी :</b>

                ₹ {selected.pendingAmount}

              </p>

              <p>

                <b>दिनांक :</b>

                {selected.date}

              </p>

              <p>

                <b>वेळ :</b>

                {selected.time}

              </p>

              {

                selected.receipt && (

                  <img

                    src={`https://bmgum.onrender.com/uploads/receipts/${selected.receipt}`}

                    alt="Receipt"

                    style={{

                      width:"100%",

                      marginTop:"15px",

                      borderRadius:"10px"

                    }}

                  />

                )

              }

              <button

                className="receipt-btn"

                onClick={() =>

                  setSelected(null)

                }

              >

                बंद करा

              </button>

            </div>

          </div>

        )

      }

    </>

  );

}

export default DonationTable;