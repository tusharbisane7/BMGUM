const addTimeline = async (req, res) => {

    console.log("BODY:", req.body);

    try {

        const { title, eventDate, description } = req.body;

        const result = await pool.query(
            `INSERT INTO timeline
            (title, eventDate, description)
            VALUES ($1,$2,$3)
            RETURNING *`,
            [title, eventDate, description]
        );

        console.log("INSERTED:", result.rows[0]);

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });

    }

};