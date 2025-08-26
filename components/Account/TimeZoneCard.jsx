import { find, isEmpty, isNil } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { updateTimeZone } from "../../actions/AccountSettings";

const TimeZoneCard = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const timezones = useSelector((state) => state.auth?.timeZoneList);
  const userTimezone = useSelector((state) => state.auth?.userTimezone);

  const [timeZone, setTimeZone] = useState({
    value: "",
    label: "Choose Timezone",
  });
  const [timeZoneList, setTimeZoneList] = useState([]);

  useEffect(() => {
    const allTimezones = timezones
      ? Object.keys(timezones).map((zone, index) => ({
          key: index,
          value: zone,
          label: timezones[zone],
        }))
      : [{ value: "", label: "Choose Timezone" }];
    timezones && setTimeZoneList(allTimezones);
    if (userTimezone && !isEmpty(userTimezone)) {
      const time = find(allTimezones, { value: userTimezone });
      !isNil(time) && !isEmpty(time) && setTimeZone(time);
    }
  }, [userTimezone, timezones]);

  const handelUpdateTimezone = (val) => {
    setTimeZone(val);
  };

  const updateUserTimeZone = (e) => {
    e.preventDefault();
    const payload = {
      timezone: timeZone ? timeZone.value : undefined,
    };
    dispatch(updateTimeZone(payload));
  };

  const selectStyles = {};

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-fb-one sm:p-10 xl:p-8 2xl:p-10">
      <h3 className="mb-3 text-[22px] font-bold text-black">
        Time Zone Information
      </h3>
      <p className="mb-8 text-sm text-body-color">
        Select your desired Time Zone for submission records, you will see the
        time stamp based on selected zone.
      </p>

      <div className="mb-5">
        <label
          htmlFor="time-zone"
          className="mb-2.5 block font-heading text-base font-medium text-black"
        >
          Time Zone
        </label>
        <div className="relative z-10">
          <Select
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            // name="additional-email"
            options={timeZoneList}
            value={timeZone}
            onChange={(val) => handelUpdateTimezone(val)}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                height: "52px",
                borderRadius: "8px",
              }),
            }}
            classNames={{
              control: () =>
                "relative h-[52px] w-full appearance-none rounded-lg border border-fb-gray-3 bg-white text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover",
            }}
          />
        </div>
      </div>
      <button
        onClick={(e) => updateUserTimeZone(e)}
        className="flex h-[52px] w-full items-center justify-center rounded-lg bg-black px-5 font-heading text-base font-medium text-white duration-300 hover:bg-black/90"
      >
        Update
      </button>
    </div>
  );
};

export default TimeZoneCard;
