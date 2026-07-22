async function generateReceipt(pool) {

    const year = new Date().getFullYear();

    const result = await pool.query(

        `SELECT last_number
         FROM receipt_counter
         WHERE year=$1`,

        [year]

    );

    let nextNumber = 1;

    if (result.rows.length === 0) {

        await pool.query(

            `INSERT INTO receipt_counter(year,last_number)
             VALUES($1,$2)`,

            [year,1]

        );

    } else {

        nextNumber = result.rows[0].last_number + 1;

        await pool.query(

            `UPDATE receipt_counter
             SET last_number=$1
             WHERE year=$2`,

            [nextNumber, year]

        );

    }

    const receiptNo =
        `BMGM-${year}-${String(nextNumber).padStart(6, "0")}`;

    return receiptNo;

}

module.exports = generateReceipt;