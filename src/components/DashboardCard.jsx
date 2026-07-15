import "./../styles/dashboardCard.css";

function DashboardCard({ title, value, color, icon }) {
  return (
    <div
      className="dashboard-card"
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
      }}
    >
      <div className="dashboard-card-icon">
        {icon}
      </div>

      <div className="dashboard-card-content">

        <h3>{title}</h3>

        <h2>{value}</h2>

      </div>

    </div>
  );
}

export default DashboardCard;