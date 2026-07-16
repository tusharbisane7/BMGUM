const pool = require("../config/neon");

// ================= GET ALL SPONSORS =================

const getSponsors = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
                id,
                sponsorname AS "sponsorName",
                companyname AS "companyName",
                mobile,
                address,
                sponsortype AS "sponsorType",
                logo,
                status,
                createdat AS "createdAt"
             FROM sponsors
             ORDER BY id DESC`

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// ================= ACTIVE SPONSORS =================

const getActiveSponsors = async (req,res)=>{

    try{

        const result=await pool.query(

            `SELECT
                id,
                sponsorname AS "sponsorName",
                companyname AS "companyName",
                sponsortype AS "sponsorType",
                logo
             FROM sponsors
             WHERE status='Active'
             ORDER BY id DESC`

        );

        res.json(result.rows);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};
// ================= SPONSOR SUMMARY =================

const getSponsorSummary = async (req, res) => {

    try {

        const total = await pool.query(

            "SELECT COUNT(*) AS total FROM sponsors"

        );

        const gold = await pool.query(

            "SELECT COUNT(*) AS total FROM sponsors WHERE sponsortype='Gold'"

        );

        const silver = await pool.query(

            "SELECT COUNT(*) AS total FROM sponsors WHERE sponsortype='Silver'"

        );

        const bronze = await pool.query(

            "SELECT COUNT(*) AS total FROM sponsors WHERE sponsortype='Bronze'"

        );

        const diamond = await pool.query(

            "SELECT COUNT(*) AS total FROM sponsors WHERE sponsortype='Diamond'"

        );

        res.json({

            totalSponsors: Number(total.rows[0].total),

            goldSponsors: Number(gold.rows[0].total),

            silverSponsors: Number(silver.rows[0].total),

            bronzeSponsors: Number(bronze.rows[0].total),

            diamondSponsors: Number(diamond.rows[0].total)

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ================= ADD SPONSOR =================

const addSponsor = async (req, res) => {

    try {

        const {

            sponsorName,

            companyName,

            mobile,

            address,

            sponsorType,

            status

        } = req.body;

        const logo = req.file

            ? req.file.filename

            : null;

        const result = await pool.query(

            `INSERT INTO sponsors
            (
                sponsorname,
                companyname,
                mobile,
                address,
                sponsortype,
                logo,
                status
            )
            VALUES($1,$2,$3,$4,$5,$6,$7)
            RETURNING id`,

            [

                sponsorName,

                companyName,

                mobile,

                address,

                sponsorType,

                logo,

                status

            ]

        );

        res.json({

            success: true,

            message: "Sponsor Added Successfully",

            id: result.rows[0].id

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
// ================= UPDATE SPONSOR =================

const updateSponsor = async (req, res) => {

    try {

        const {

            sponsorName,

            companyName,

            mobile,

            address,

            sponsorType,

            status

        } = req.body;

        // Get Existing Logo

        const oldSponsor = await pool.query(

            "SELECT logo FROM sponsors WHERE id=$1",

            [

                req.params.id

            ]

        );

        if (oldSponsor.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Sponsor Not Found"

            });

        }

        const logo = req.file

            ? req.file.filename

            : oldSponsor.rows[0].logo;

        await pool.query(

            `UPDATE sponsors
             SET
                sponsorname=$1,
                companyname=$2,
                mobile=$3,
                address=$4,
                sponsortype=$5,
                logo=$6,
                status=$7
             WHERE id=$8`,

            [

                sponsorName,

                companyName,

                mobile,

                address,

                sponsorType,

                logo,

                status,

                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Sponsor Updated Successfully"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
// ================= DELETE SPONSOR =================

const deleteSponsor = async (req, res) => {

    try {

        const sponsor = await pool.query(

            "SELECT id FROM sponsors WHERE id=$1",

            [

                req.params.id

            ]

        );

        if (sponsor.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Sponsor Not Found"

            });

        }

        await pool.query(

            "DELETE FROM sponsors WHERE id=$1",

            [

                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Sponsor Deleted Successfully"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ================= EXPORTS =================

module.exports = {

    getSponsors,

    getActiveSponsors,

    getSponsorSummary,

    addSponsor,

    updateSponsor,

    deleteSponsor

};