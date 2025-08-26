import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { apiFetchNotionResource } from "../../../services/pluginService";

const NotionConfigurationFields = (props) => {
  const { pluginErr, payload, setPayload, pluginId } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyOption, setShowEmptyOption] = useState(false);
  const [resourceArr, setResourceArr] = useState([]);

  const [resourceId, setResourceId] = useState(payload?.resource_id);
  const [isFieldsMapEnabled, setIsFieldsMapEnabled] = useState(payload?.is_fields_map_enabled);
  const [fieldsMap, setFieldsMap] = useState(payload?.fields_map);

  useEffect(() => {
    (async () => {
      await apiFetchNotionResource({
        id: pluginId,
        callback: handelSetResourceArr,
      });
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEmpty(payload)) {
      setResourceId(payload?.resource_id);
      setIsFieldsMapEnabled(payload?.is_fields_map_enabled ? true : false);
      setFieldsMap(!isEmpty(payload?.fields_map) ? payload?.fields_map : []);
    }
  }, [payload]);

  const handelSetResourceArr = (data) => {
    if (!isEmpty(data)) {
      const resourseId = [...data].shift().id;
      setResourceId(resourseId);
      setPayload({ ...payload, resource_id: resourseId });
      setResourceArr(data);
      setShowEmptyOption(false);
    } else {
      setResourceArr([]);
      setShowEmptyOption(true);
    }
  };

  const [err, setErr] = useState({
    resource_id: undefined,
    resource_name: undefined,
    fields_map: [],
    is_fields_map_enabled: false,
  });

  useEffect(() => {
    if (!isEmpty(pluginErr)) {
      setErr({ ...pluginErr });
    }
  }, [pluginErr]);

  const handelToggoleUpdate = (e, id, value) => {
    if (id === "isFieldsMapEnabled") {
      setIsFieldsMapEnabled(value);
      setPayload({ ...payload, is_fields_map_enabled: value });
    }
  };

  const addField = (e, item) => {
    const newObj = {
      form_field: "",
      notion_type: "",
      notion_field: "",
    };
    const currentFields = [newObj];
    setFieldsMap([...fieldsMap, ...currentFields]);
  };

  const removeField = (index) => {
    setFieldsMap(fieldsMap.filter((_, i) => i !== index));
  };

  const onChange = (e) => {
    setResourceId(e.target.value);
  };

  const updateFieldsMapTextField = (e, index, value) => {
    e.preventDefault();
    const array = [...fieldsMap];
    let updateObject = array[index];
    updateObject["form_field"] = value;
    let final = fieldsMap.map((fi_mp, index1) => (index1 === index ? updateObject : fi_mp));
    setFieldsMap([...final]);
    setPayload({ ...payload, fields_map: [...final] });
  };
  const updateFieldsMapNotionType = (e, index, value) => {
    e.preventDefault();
    const array = [...fieldsMap];
    let updateObject = array[index];
    updateObject["notion_type"] = value;
    let final = fieldsMap.map((fi_mp, index1) => (index1 === index ? updateObject : fi_mp));
    setFieldsMap([...final]);
    setPayload({ ...payload, fields_map: [...final] });
  };
  const updateFieldsMapNotionField = (e, index, value) => {
    e.preventDefault();
    const array = [...fieldsMap];
    let updateObject = array[index];
    updateObject["notion_field"] = value;
    let final = fieldsMap.map((fi_mp, index1) => (index1 === index ? updateObject : fi_mp));
    setFieldsMap([...final]);
    setPayload({ ...payload, fields_map: [...final] });
  };

  return (
    <div>
      <div className="mb-5">
        <label htmlFor="email" className="mb-3 block text-base font-medium text-black">
          Your Notion database
        </label>
        <select onChange={onChange}>
          {isLoading && <option>Loading...</option>}
          {showEmptyOption && <option>Not selected</option>}
          {!isLoading &&
            resourceArr.map((resource, index) => (
              <option key={index} value={resource.id} selected={resourceId === resource.id}>
                {resource.title}
              </option>
            ))}
        </select>
        {err &&
          err.resource_id &&
          err.resource_id.map((err, index) => (
            <p key={index} style={{ color: "red" }}>
              {err}
            </p>
          ))}
      </div>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <input
            type="radio"
            id="is_fields_map_enabled"
            name="is_fields_map_enabled"
            checked={isFieldsMapEnabled}
            value="true"
            onClick={(e) => handelToggoleUpdate(e, "isFieldsMapEnabled", true)}
            className="form-radio h-4 w-4 text-gray-600 transition duration-150 ease-in-out"
          />
        </div>
        <label htmlFor="is_fields_map_enabled" className="ml-1.5 block text-sm leading-5 text-gray-900">
          Manually (recommended)
        </label>

        <div className="ml-2 flex-shrink-0">
          <input
            type="radio"
            id="is_column_map_disabled"
            name="is_fields_map_enabled"
            value="false"
            checked={!isFieldsMapEnabled}
            className="form-radio h-4 w-4 text-gray-600 transition duration-150 ease-in-out"
            disabled={!resourceId}
            onClick={(e) => handelToggoleUpdate(e, "isFieldsMapEnabled", false)}
          />
        </div>
        <label htmlFor="is_column_map_disabled" className="ml-1.5 block text-sm leading-5 text-gray-900">
          Automatically
        </label>
      </div>
      {isFieldsMapEnabled && (
        // <NotionFieldManager />
        <div className="mb-6 space-y-3">
          <label htmlFor="resource_id" className="mb-3 block text-base font-medium text-gray-900">
            Field Mapper
          </label>

          <table className="w-full overflow-hidden font-mono text-sm font-medium text-gray-900">
            <tbody>
              {fieldsMap.map((item, index) => (
                <>
                  <tr key={index}>
                    <td>
                      <input
                        placeholder="Form field name"
                        type="text"
                        onChange={(e) => updateFieldsMapTextField(e, index, e.target.value)}
                        value={item.form_field}
                        className="w-full border-4 border-gray-200 px-4 py-2"
                      />
                    </td>
                    <td>
                      <select value={item.notion_type} onChange={(e) => updateFieldsMapNotionType(e, index, e.target.value)} className="w-32 border-4 border-gray-200 px-4 py-2">
                        <option value="undefined">Type</option>
                        <option value="title">Title</option>
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                        <option value="boolean">Boolean</option>
                        <option value="email">Email</option>
                        <option value="url">URL</option>
                        <option value="phonenumber">Phone</option>
                        <option value="richtext">Rich Text</option>
                        <option value="select">Select</option>
                        <option value="multiselect">Multi Select</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.notion_field}
                        onChange={(e) => updateFieldsMapNotionField(e, index, e.target.value)}
                        className="w-full border-4 border-gray-200 px-4 py-2"
                        placeholder="Notion field name"
                      />
                    </td>
                    <td>
                      <button onClick={(e) => removeField(index)} className="mx-0.5 rounded-full border p-1.5 text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </>
              ))}
              <tr>
                <td colspan="3">
                  <button
                    className="focus:shadow-outline w-full rounded bg-blue-500 py-3 text-xs font-bold text-white focus:outline-none hover:bg-blue-700"
                    onClick={(e) => addField(e)}
                  >
                    Add field
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {err &&
            err.fields_map &&
            err.fields_map.map((err, index) => (
              <p key={index} style={{ color: "red" }}>
                {err}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

export default NotionConfigurationFields;
