import { FaUser } from "react-icons/fa6";
import { FcDepartment } from "react-icons/fc";
import { BiSolidReport } from "react-icons/bi";
import { GrPlan } from "react-icons/gr";

import "./Overview.css";
import UserCount from "./UserCount";
import ApproverPlansCount from "./ApproverPlansCount";
import ApprovedReportsCount from "./ApprovedReportsCount";
import PlansByDateBarChart from "./PlansDateChart";
import ApprovedReportsByDateBarChart from "./ApprovedReportsByDateBarChart";

function Overview() {
  return (
    <div>
      {/* Statistics section */}
      <div className="overview-statics-container">
        <div className="overview-statics">
          <div className="icon">
            <FaUser size={30} />
          </div>
          <div className="user">
            <p>Users</p>
            <p>
              <UserCount />
            </p>
          </div>
        </div>

        <div className="overview-statics">
          <div className="icon">
            <GrPlan size={30} />
          </div>
          <div className="user">
            <p>Plans</p>
            <p>
              <ApproverPlansCount />
            </p>
          </div>
        </div>

        <div className="overview-statics">
          <div className="icon">
            <BiSolidReport size={30} />
          </div>
          <div className="user">
            <p>Reports</p>
            <p>
              <ApprovedReportsCount />
            </p>
          </div>
        </div>

        <div className="overview-statics">
          <div className="icon">
            <FcDepartment size={30} />
          </div>
          <div className="user">
            <p>Departments</p>
            <p>11</p>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="chart-container">
        <div className="bar-chart">
          <p className="chart-p">Plans by Date</p>
          <PlansByDateBarChart />
        </div>

        <div className="bar-chart">
          <p className="chart-p">Reports by Date</p>
          <ApprovedReportsByDateBarChart />
        </div>
      </div>
    </div>
  );
}

export default Overview;





