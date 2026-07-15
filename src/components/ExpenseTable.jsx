import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/expense.css";

function ExpenseTable() {

  const [expenses, setExpenses] = useState([]);

  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState(null);

  const loadExpenses = async () => {

    try {

      const res = await axios.get(

        "http://localhost:5000/api/expenses"

      );

      setExpenses(res.data);

    }

    catch(err){

      console.log(err);

    }

  };

  useEffect(() => {

    loadExpenses();

    const interval = setInterval(() => {

      loadExpenses();

    }, 2000);

    return () => clearInterval(interval);

  }, []);

  const filtered = expenses.filter((item) =>

    (item.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <>

      <input

        className="search-box"

        placeholder="🔍 खर्च शोधा..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

      />

      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>SR</th>

              <th>खर्च</th>

              <th>रक्कम</th>

              <th>प्रकार</th>

              <th>दिनांक</th>

              <th>वेळ</th>

              <th>पुरावा</th>

            </tr>

          </thead>

          <tbody>

            {

              filtered.length===0 ?

              (

                <tr>

                  <td colSpan="7">

                    कोणताही खर्च उपलब्ध नाही.

                  </td>

                </tr>

              )

              :

              filtered.map((item)=>(

                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>{item.title}</td>

                  <td>

                    ₹ {item.amount}

                  </td>

                  <td>{item.category}</td>

                  <td>{item.date}</td>

                  <td>{item.time}</td>

                  <td>

                    {

                      item.bill ?

                      (

                        <button

                          className="receipt-btn"

                          onClick={()=>setSelected(item)}

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

            onClick={()=>setSelected(null)}

          >

            <div

              className="receipt-box"

              onClick={(e)=>e.stopPropagation()}

            >

              <h2>

                📄 खर्च तपशील

              </h2>

              <hr/>

              <p>

                <b>खर्च :</b>

                {" "}

                {selected.title}

              </p>

              <p>

                <b>रक्कम :</b>

                ₹ {selected.amount}

              </p>

              <p>

                <b>प्रकार :</b>

                {selected.category}

              </p>

              <p>

                <b>दिनांक :</b>

                {selected.date}

              </p>

              <p>

                <b>वेळ :</b>

                {selected.time}

              </p>

              <p>

                <b>वर्णन :</b>

                {selected.description}

              </p>

              {

                selected.bill && (

                  <img

                    src={`http://localhost:5000/uploads/bills/${selected.bill}`}

                    alt="Bill"

                    style={{

                      width:"100%",

                      borderRadius:"10px",

                      marginTop:"15px"

                    }}

                  />

                )

              }

              <button

                className="receipt-btn"

                onClick={()=>setSelected(null)}

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

export default ExpenseTable;