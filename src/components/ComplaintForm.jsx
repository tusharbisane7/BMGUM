import React from "react";

const ComplaintForm = ({
  formData,
  setFormData,
  handleSubmit,
  loading,
}) => {

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const messageLength = formData.message.length;

  return (
    <div className="complaint-card">

      <div className="card-header">

        <div className="card-icon">
          📝
        </div>

        <div>

          <h2>तक्रार नोंदवा</h2>

          <p>
            कृपया खालील माहिती अचूक भरा.
          </p>

        </div>

      </div>

      <form
        className="complaint-form"
        onSubmit={handleSubmit}
      >

        {/* Complaint Type */}

        <div className="form-group">

          <label>
            तक्रारीचा प्रकार
            <span className="required">*</span>
          </label>

          <select
            className="form-control"
            name="complaint_type"
            value={formData.complaint_type}
            onChange={handleChange}
            required
          >
            <option value="">
              तक्रारीचा प्रकार निवडा
            </option>

            <option value="स्वच्छता">
              🧹 स्वच्छता
            </option>

            <option value="पार्किंग">
              🚗 पार्किंग
            </option>

            <option value="ध्वनी">
              🔊 ध्वनी
            </option>

            <option value="महाप्रसाद">
              🍛 महाप्रसाद
            </option>

            <option value="स्वयंसेवक">
              🙋 स्वयंसेवक
            </option>

            <option value="देणगी">
              💰 देणगी
            </option>

            <option value="इतर">
              📌 इतर
            </option>

          </select>

        </div>

        {/* Name */}

        <div className="form-group">

          <label>
            पूर्ण नाव
            <span className="required">*</span>
          </label>

          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="उदा. राहुल देशमुख"
            value={formData.name}
            onChange={handleChange}
            required
          />

        </div>

        {/* Mobile */}

        <div className="form-group">

          <label>
            मोबाईल क्रमांक
          </label>

          <input
            className="form-control"
            type="tel"
            name="mobile"
            placeholder="9876543210"
            maxLength="10"
            pattern="[0-9]{10}"
            value={formData.mobile}
            onChange={handleChange}
          />

          <small className="helper-text">

            हा क्रमांक ऐच्छिक आहे.

          </small>

        </div>

        {/* Complaint */}

        <div className="form-group">

          <label>

            तक्रार

            <span className="required">*</span>

          </label>

          <textarea
            className="form-control"
            name="message"
            rows="6"
            maxLength="500"
            placeholder="तुमची तक्रार येथे सविस्तर लिहा..."
            value={formData.message}
            onChange={handleChange}
            required
          />

          <div className="char-count">

            {messageLength}/500

          </div>

        </div>

        {/* Submit */}

        <div className="button-group">

          <button
            className="submit-btn"
            type="submit"
            disabled={loading}
          >

            {loading ? (

              <span className="loading-btn">

                <span className="spinner"></span>

                तक्रार नोंदवली जात आहे...

              </span>

            ) : (

              <>🚀 तक्रार नोंदवा</>

            )}

          </button>

        </div>

      </form>

    </div>
  );
};

export default ComplaintForm;