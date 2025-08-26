import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isEmpty, isNil } from "lodash";
import { IntlProvider } from "react-intl";
import { getFormContent } from "../../actions/FormAction";
import FormName from "./FormName";
import DemoBar from "./demobar";
import FormGenerator from "./form";
import AppLocale from "./language-provider";
import Preview from "./preview";
import Registry from "./stores/registry";
import store from "./stores/store";
import Toolbar from "./toolbar";
import { getCurrentFormContents } from "../../services/forms";
import useClickOutside from "../../hooks/useClickOutside";

const ReactFormGenerator = (props, ref) => {
  const language = props.locale ? props.locale : "en";
  const currentAppLocale = AppLocale[language];

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <FormGenerator {...props} innerRef={ref} />
    </IntlProvider>
  );
};

const ReactFormBuilder = (props) => {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [editElement, setEditElement] = useState(null);
  const [formTheme, setFormTheme] = useState("themeOne");
  const [showFormName, setShowFormName] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [showFormActionModal, setShowFormActionModal] = useState(false);
  const [showFormSettings, setShowFormSettings] = useState(false);
  const [showThemeHandler, setShowThemeHandler] = useState(false);
  const [currentFormContents, setCurrentFormContents] = useState([]);

  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);

  const currentForm = useSelector((state) => state.forms?.currentForm);
  const form = useSelector((state) => state.forms?.createOrUpdateForm);
  // const currentFormContents = useSelector((state) => state.forms?.currentFormContents);
  const pageLoading = useSelector((state) => state.forms?.pageLoading);
  const allFormContents = useSelector((state) => state.forms?.formContents);

  const editModeOn = (data, e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditMode(!editMode);
    setEditElement(editMode ? null : data);
  };

  const manualEditModeOff = () => {
    if (editMode) {
      setEditMode(false);
      setEditElement(null);
    }
  };

  const toolbarProps = {
    showDescription: props.show_description,
  };

  const language = props.locale ? props.locale : "en";
  const currentAppLocale = AppLocale[language];
  if (props.toolbarItems) {
    toolbarProps.items = props.toolbarItems;
  }

  useEffect(() => {
    if (!userInfo && !isNil(currentForm)) {
      setShowFormName(false);
    }
    // if (!isNil(currentForm) && !form?.requestSucess && !isNil(currentFormContents) && currentFormContents.length === 0) {
    //   dispatch(getFormContent(currentForm.id));
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isNil(currentForm) && !form?.requestSucess) {
      if (!isEmpty(allFormContents)) {
        const contents = getCurrentFormContents(currentForm, allFormContents);
        if (!isEmpty(contents)) {
          setCurrentFormContents(contents);
        }
        if (isEmpty(contents)) {
          dispatch(getFormContent(currentForm.id));
        }
      } else {
        dispatch(getFormContent(currentForm.id));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentForm]);

  const [showSidebar, setShowSidebar] = useState(false);

  // handle ClickOutside
  // click outside delete popup
  const divRef = useRef(null);
  useClickOutside(divRef, () => setShowSidebar(false));

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <div>
        <div className="formbold-builder w-full">
          <div className="flex w-full flex-wrap xl:flex-nowrap">
            <div
              ref={divRef}
              className={`p-7.5 fixed top-0 grid h-screen w-full max-w-[350px] overflow-y-auto bg-[#EFF1F4] transition-all duration-300 xl:sticky xl:left-0 xl:h-[calc(100vh-100px)] ${
                showSidebar ? "left-0" : "-left-[351px] xl:left-0"
              } ${previewVisible ? "z-[99]" : "z-[999]"}`}
            >
              <Toolbar
                {...toolbarProps}
                customItems={props.customToolbarItems}
              />
            </div>

            <div className="w-full">
              <div
                className={`sticky top-0 bg-[#eff1f4] py-3.5 pl-16 pr-5 xl:pl-5 ${
                  previewVisible ||
                  showFormActionModal ||
                  showFormSettings ||
                  showThemeHandler
                    ? "z-[999999]"
                    : "z-[99]"
                }`}
              >
                <button
                  onClick={() => setShowSidebar(true)}
                  className="absolute left-5 top-1/2 -translate-y-1/2 space-y-1.5 xl:hidden"
                >
                  <span className="block h-0.5 w-7 bg-black"></span>
                  <span className="block h-0.5 w-7 bg-black"></span>
                  <span className="block h-0.5 w-7 bg-black"></span>
                </button>
                <DemoBar
                  formThemeHandler={setFormTheme}
                  formTheme={formTheme}
                  previewVisible={previewVisible}
                  setPreviewVisible={setPreviewVisible}
                  showFormActionModal={showFormActionModal}
                  setShowFormActionModal={setShowFormActionModal}
                  showFormSettings={showFormSettings}
                  setShowFormSettings={setShowFormSettings}
                  showThemeHandler={showThemeHandler}
                  setShowThemeHandler={setShowThemeHandler}
                />
              </div>

              <div className="px-5 py-20">
                {showFormName && !isNil(userInfo) ? (
                  <FormName handleFormName={setShowFormName} />
                ) : (
                  <Preview
                    files={props.files}
                    manualEditModeOff={manualEditModeOff}
                    showCorrectColumn={props.showCorrectColumn}
                    parent={this}
                    data={currentFormContents}
                    url={props.url}
                    saveUrl={props.saveUrl}
                    onLoad={props.onLoad}
                    onPost={props.onPost}
                    editModeOn={editModeOn}
                    editMode={editMode}
                    variables={props.variables}
                    registry={Registry}
                    editElement={editElement}
                    renderEditForm={props.renderEditForm}
                    saveAlways={props.saveAlways}
                    formTheme={formTheme}
                    pageLoading={pageLoading}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </IntlProvider>
  );
};

const FormBuilders = {};
FormBuilders.ReactFormBuilder = ReactFormBuilder;
FormBuilders.ReactFormGenerator = ReactFormGenerator;
FormBuilders.ElementStore = store;
FormBuilders.Registry = Registry;

export default FormBuilders;

export {
  store as ElementStore,
  ReactFormBuilder,
  ReactFormGenerator,
  Registry,
};
