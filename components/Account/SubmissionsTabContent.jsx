import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isEmpty, omit } from "lodash";
import { getFormSubmissions } from "../../actions/FormAction";
import Loader from "../Icons/Loader";
import PaywallModal from "../Plugin/PaywallModal";
import FormSubmissionsGraphCard from "./FormSubmissionsGraphCard";
import SingleSubmission from "./SingleSubmission";
import SubmissionsEmptyState from "./SubmissionsEmptyState";
import SubmissionsPagination from "./SubmissionsPagination";
import SubmissionsTabBar from "./SubmissionsTabBar";

const SubmissionsTabContent = ({submissionData}) => {
  const staticsData = submissionData?.statistics || {};
  const filtered_submissions = submissionData?.submissions?.data || [];
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentForm = useSelector((state) => state.forms?.currentForm);
  const submissionsData = useSelector((state) => state.forms?.submissions);
  const hasSubscription = useSelector((state) => state.auth?.hasSubscription);

  const [filters, setFilters] = useState({
    spam: undefined,
    all: true,
    perPage: undefined,
    page: undefined,
  });

  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [submissionsStatistics, setSubmissionsStatistics] = useState({
    items: [],
    categories: [],
  });
  const [showPaywallModal, setShowPaywallModal] = useState(false);

  const [pagination, setPagination] = useState({
    total: 0,
    count: 0,
    perPage: 10,
    currentPage: 1,
    lastPage: 1,
  });

  useEffect(() => {
    if (currentForm) {
      // Read query params
      const id = searchParams.get('id');
      const tab = searchParams.get('tab');
      const filterQuery = Object.keys(filters).filter((key) => filters[key]);
      let hasSpam = filterQuery.includes('spam');

      // Update query params
      let finalSearchParams = {
        ...Object.fromEntries(searchParams),
        ...filters,
      };
      const urlSearchParams = makeQueryParams(finalSearchParams, hasSpam);

      const newSearchParams = new URLSearchParams();
      Object.entries(urlSearchParams).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, value);
        }
      });
      if (id) {
        newSearchParams.set('id', encodeURIComponent(id));
      }
      if (tab) {
        newSearchParams.set('tab', tab);
      }

      router.push(`?${newSearchParams.toString()}`, { scroll: false });

      // Call API
      const payload = {
        id: currentForm?.id,
        filters: urlSearchParams,
      };
      dispatch(getFormSubmissions(payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const makeQueryParams = (searchParams, hasSpamFilter) => {
    let finalSearchParams = Object.entries(searchParams).reduce(
      (a, [k, v]) => (v ? ((a[k] = v), a) : a),
      {}
    );
    finalSearchParams = omit(finalSearchParams, "all");
    finalSearchParams = omit(finalSearchParams, "id");
    finalSearchParams = hasSpamFilter
      ? { ...finalSearchParams, spam: 1 }
      : omit(finalSearchParams, "spam");
    return finalSearchParams;
  };

  useEffect(() => {
    if (submissionsData.data && submissionsData.data?.statistics) {
      setSubmissionsStatistics({
        items: submissionsData.data?.statistics?.items,
        categories: submissionsData.data?.statistics?.categories,
      });
    }
    if (submissionsData.data && submissionsData.data?.submissions?.data) {
      setFilteredSubmissions(submissionsData.data?.submissions?.data);
    }
    if (submissionsData?.data?.pagination) {
      setPagination({
        count: submissionsData?.data?.pagination?.count,
        perPage: submissionsData?.data?.pagination?.perPage,
        currentPage: submissionsData?.data?.pagination?.currentPage,
        total: submissionsData?.data?.pagination?.total,
        lastPage: submissionsData?.data?.pagination?.lastPage,
      });
    }
  }, [submissionsData]);

  const handelPerPageChange = (e, value) => {
    e.preventDefault();
    let oldValue = { ...filters };
    oldValue["perPage"] = parseInt(value);
    oldValue["page"] = 1;
    setFilters(oldValue);
  };
  const handelPageChange = (e, value) => {
    e.preventDefault();
    let oldValue = { ...filters };
    oldValue["page"] = parseInt(value);
    setFilters(oldValue);
  };

  const openPaywallModal = () => {
    setShowPaywallModal(true);
  };

  return (
    <>
      <FormSubmissionsGraphCard
        items={staticsData?.items}
        categories={staticsData?.categories}
      />
      <SubmissionsTabBar filters={filters} setFilters={setFilters} />
      {submissionsData?.loading ? (
        <Loader show />
      ) : (
        <>
          {filteredSubmissions.map((submission, index) => (
            <SingleSubmission key={index} submission={submission} />
          ))}
        </>
      )}

      {!hasSubscription && pagination.total > 10 && (
        <div className="mb-12 flex w-full flex-wrap items-center justify-center">
          <button
            onClick={(e) => openPaywallModal()}
            className="mb-1 inline-flex items-center justify-center rounded-lg border border-primary bg-white px-4 py-2 text-primary shadow-primary duration-300 hover:bg-primary hover:text-white"
          >
            <span className="pr-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="fill-current"
              >
                <path d="M10.0002 14.1666C9.07516 14.1666 8.3335 13.4166 8.3335 12.5C8.3335 11.575 9.07516 10.8333 10.0002 10.8333C10.4422 10.8333 10.8661 11.0089 11.1787 11.3215C11.4912 11.634 11.6668 12.058 11.6668 12.5C11.6668 12.942 11.4912 13.3659 11.1787 13.6785C10.8661 13.9911 10.4422 14.1666 10.0002 14.1666ZM15.0002 16.6666V8.33331H5.00016V16.6666H15.0002ZM15.0002 6.66665C15.4422 6.66665 15.8661 6.84224 16.1787 7.1548C16.4912 7.46736 16.6668 7.89129 16.6668 8.33331V16.6666C16.6668 17.1087 16.4912 17.5326 16.1787 17.8452C15.8661 18.1577 15.4422 18.3333 15.0002 18.3333H5.00016C4.07516 18.3333 3.3335 17.5833 3.3335 16.6666V8.33331C3.3335 7.40831 4.07516 6.66665 5.00016 6.66665H5.8335V4.99998C5.8335 3.89491 6.27248 2.8351 7.05388 2.0537C7.83529 1.2723 8.89509 0.833313 10.0002 0.833313C10.5473 0.833313 11.0892 0.941087 11.5947 1.15048C12.1002 1.35988 12.5595 1.66679 12.9464 2.0537C13.3334 2.44061 13.6403 2.89994 13.8497 3.40547C14.0591 3.91099 14.1668 4.45281 14.1668 4.99998V6.66665H15.0002ZM10.0002 2.49998C9.33712 2.49998 8.70124 2.76337 8.2324 3.23221C7.76355 3.70105 7.50016 4.33694 7.50016 4.99998V6.66665H12.5002V4.99998C12.5002 4.33694 12.2368 3.70105 11.7679 3.23221C11.2991 2.76337 10.6632 2.49998 10.0002 2.49998Z"></path>
              </svg>
            </span>
            Upgrade to see more
          </button>
        </div>
      )}
      {hasSubscription &&
        !isEmpty(filtered_submissions) &&
        filtered_submissions.length > 0 && (
          <SubmissionsPagination
            handelPerPageChange={handelPerPageChange}
            pagination={pagination}
            handelPageChange={handelPageChange}
          />
      )}
      {isEmpty(filtered_submissions) && <SubmissionsEmptyState />}
      <PaywallModal
        modalOpen={showPaywallModal}
        setModalOpen={setShowPaywallModal}
      />
    </>
  );
};

export default SubmissionsTabContent;
