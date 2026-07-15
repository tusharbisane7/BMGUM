import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/aartiPage.css";

function AartiPage() {

  const [aartiList, setAartiList] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadAarti = async () => {

    try {

      const res = await axios.get(

        "http://localhost:5000/api/aarti"

      );

      setAartiList(res.data);

    }

    catch(err){

      console.log(err);

    }

    finally{

      setLoading(false);

    }

  };

  useEffect(() => {

    loadAarti();

    const interval = setInterval(() => {

      loadAarti();

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  if(loading){

    return(

      <div className="container">

        <h2 style={{textAlign:"center"}}>

          आरती माहिती लोड होत आहे...

        </h2>

      </div>

    );

  }

  return (

    <div className="container aarti-page">

      <h1 className="title">

        🪔 आरती वेळापत्रक

      </h1>

      <div className="table-wrapper">

        <table className="aarti-table">

          <thead>

            <tr>

              <th>क्र.</th>

              <th>आरतीचे नाव</th>

              <th>वार</th>

              <th>तारीख</th>

              <th>वेळ</th>

              <th>आरती करणारे</th>

              <th>प्रकार</th>

              <th>स्थिती</th>

            </tr>

          </thead>

          <tbody>

            {

              aartiList.length===0 ?

              (

                <tr>

                  <td

                    colSpan="8"

                    style={{

                      textAlign:"center",

                      padding:"25px"

                    }}

                  >

                    कोणतीही आरती उपलब्ध नाही.

                  </td>

                </tr>

              )

              :

              aartiList.map((item,index)=>(

                <tr key={item.id}>

                  <td>

                    {index+1}

                  </td>

                  <td>

                    {item.name}

                  </td>

                  <td>

                    {item.day}

                  </td>

                  <td>

                    {item.date}

                  </td>

                  <td>

                    {item.time}

                  </td>

                  <td>

                    {item.performedBy}

                  </td>

                  <td>

                    <span className="type">

                      {item.type}

                    </span>

                  </td>

                  <td>

                    <span

                      className={

                        item.status==="आज"

                        ?

                        "status today"

                        :

                        "status upcoming"

                      }

                    >

                      {item.status}

                    </span>

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

export default AartiPage;