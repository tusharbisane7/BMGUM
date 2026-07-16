import { useEffect, useState } from "react";

import axios from "axios";

import { CountUp } from "react-countup";

import { FaUsers } from "react-icons/fa";

import "../styles/visitorcounter.css";

const API = "https://bmgum.onrender.com";

function VisitorCounter() {

    const [count,setCount]=useState(0);

    const [loading,setLoading]=useState(true);

    const loadVisitor=async()=>{

        try{

            const visited=

                localStorage.getItem(

                    "bmgm_visitor"

                );

            let res;

            if(!visited){

                res=await axios.post(

                    `${API}/api/visitor`

                );

                localStorage.setItem(

                    "bmgm_visitor",

                    "true"

                );

            }

            else{

                res=await axios.get(

                    `${API}/api/visitor`

                );

            }

            setCount(

                res.data.totalVisitors

            );

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    };

    useEffect(()=>{

        loadVisitor();

    },[]);

    return(

        <section className="visitor-section container">

            <div className="visitor-card">

                <div className="visitor-icon">

                    <FaUsers/>

                </div>

                <h2>

                    वेबसाइटला भेट दिलेले भाविक

                </h2>

                {

                    loading

                    ?

                    (

                        <h1>

                            ...

                        </h1>

                    )

                    :

                    (

                        <h1>

                           <CountUp

    end={count}

    duration={2}

/>

                        </h1>

                    )

                }

                <p>

                    आपल्या प्रेम व सहकार्याबद्दल मनःपूर्वक धन्यवाद 🙏

                </p>

            </div>

        </section>

    );

}

export default VisitorCounter;