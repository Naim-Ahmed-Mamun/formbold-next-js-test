import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormSubmissionsGraphCard from "../FormSubmissionsGraphCard";
import { MonthlySubmissionsCard } from "./MonthlySubmissionsCard";
import { PlanListCard } from "./PlanListCard";
import TotalFormsCard from "./TotalFormsCard";
import { getUserDashboardData } from "../../../actions/UserDashboard";
import { isNil } from "lodash";

const DashboardContent = ({userDashboard}) => {
  const dispatch = useDispatch();
  // const userDashboard = useSelector((state) => state.userDashboard);

  const formsCount = userDashboard?.formsCount;
  const statistics = userDashboard?.statistics;
  const plans = userDashboard?.plans;
  const activeFormsCount = userDashboard?.activeFormsCount;
  const archivedFormsCount = userDashboard?.archivedFormsCount;


  const [submissionsStatistics, setSubmissionsStatistics] = useState({
    items: [],
    categories: [],
  });

  useEffect(() => {
    dispatch(getUserDashboardData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isNil(statistics)) {
      setSubmissionsStatistics(statistics);
    }
  }, [statistics]);

  return (
    <>
      <FormSubmissionsGraphCard items={submissionsStatistics.items} categories={submissionsStatistics.categories} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-8">
          <TotalFormsCard
              formsCount={formsCount}
              activeFormsCount={activeFormsCount}
              archivedFormsCount={archivedFormsCount}
            />
          </div>
          <div className="mb-8">
            <MonthlySubmissionsCard />
          </div>
        </div>

        <div>
          <PlanListCard />
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
