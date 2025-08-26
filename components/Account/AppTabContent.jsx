import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { has, isEmpty } from "lodash";
import { useSearchParams } from 'next/navigation';
import { deletePlugins, getFormPluginsData } from "../../actions/FomPlugins";
import { apiGooglePluginCreate, apiHubspotPluginCreate, apiNotionPluginCreate, apiSlackPluginCreate, getPluginIconByConfigType } from "../../services/pluginService";
import AutoResponderIcon from "../Icons/AutoResponderIcon";
import DiscordIcon from "../Icons/DiscordIcon";
import HubspotIcon from "../Icons/HubspotIcon";
import MailchimpIcon from "../Icons/MailchimpIcon";
import MakeIcon from "../Icons/MakeIcon";
import NotionIcon from "../Icons/NotionIcon";
import SheetIcon from "../Icons/SheetIcon";
import SlackIcon from "../Icons/SlackIcon";
import TelegramIcon from "../Icons/TelegramIcon";
import WebhookIcon from "../Icons/WebhookIcon";
import ZapierIcon from "../Icons/ZapierIcon";
import ZendeskIcon from "../Icons/ZendeskIcon";
import AddAutoResponderModal from "../Plugin/AddAutoResponderModal";
import AddDiscordModal from "../Plugin/AddDiscordModal";
import AddTelegramPluginModal from "../Plugin/AddTelegramPluginModal";
import AddWebhookModal from "../Plugin/AddWebhookModal";
import BusinessOnlyPaywallModal from "../Plugin/BusinessOnlyPaywallModal";
import GoogleSheetSuccessModal from "../Plugin/GoogleSheetSuccessModal";
import PaywallModal from "../Plugin/PaywallModal";
import PluginEditModal from "../Plugin/PluginEditModal";
import AddMailchimpModal from "./AddMailchimpModal";
import AddMakeModal from "./AddMakeModal";
import AddZapierModal from "./AddZapierModal";
import AddZendeskModal from "./AddZendeskModal";
import ConnectAppCard from "./ConnectAppCard";
import UpgradePlanBar from "./UpgradePlanBar";

const AppTabContent = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const [hasPluginFeature, setHasPluginFeature] = useState(false);

  //modals
  const [editModalData, setEditModalData] = useState(undefined);
  const [showGoogleSheetSuccessModal, setShowGoogleSheetSuccessModal] = useState(false);
  const [showPluginEditModal, setShowPluginEditModal] = useState(false);
  const [showAddTelegramModal, setShowAddTelegramModal] = useState(false);
  const [showAddWebhookModal, setShowAddWebhookModal] = useState(false);
  const [showAddDiscordModal, setShowAddDiscordModal] = useState(false);  
  const [showAddAutoResponderModal, setShowAddAutoResponderModal] = useState(false);
  const [showAddZapierModal, setShowAddZapierModal] = useState(false);
  const [showAddMakeModal, setShowAddMakeModal] = useState(false);
  const [showAddZendeskModal, setShowAddZendeskModal] = useState(false);
  const [showAddMailchimpModal, setShowAddMailchimpModal] = useState(false);
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [showBusinessOnlyPaywallModal, setShowBusinessOnlyPaywallModal] = useState(false);

  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const currentForm = useSelector((state) => state.forms?.currentForm);
  const formPlugins = useSelector((state) => state.formPlugins);

  const hasSubscriptions = userInfo?.hasSubscription;
  const plan = userInfo?.plan;
  const connectedPlugins = formPlugins?.plugins;
  const googleSheetUrl = searchParams.get("googleSheetUrl");

  useEffect(() => {
    currentForm && dispatch(getFormPluginsData(currentForm?.id));
    if (googleSheetUrl) {
      setShowGoogleSheetSuccessModal(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    !showPluginEditModal && setEditModalData(undefined);
  }, [showPluginEditModal]);

  useEffect(() => {
    plan && has(plan?.features, "plugins") && setHasPluginFeature(plan?.features?.plugins);
  }, [plan]);

  const isAutoResponderConnected = () => connectedPlugins.some((plugin) => plugin.configuration_type === "auto-response");
  const isGooglePluginConnected = () => connectedPlugins.some((plugin) => plugin.configuration_type === "google-sheet");

  //urls
  const redirectToSlack = (formId) => `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/plugins/slack`;
  const redirectToNotion = (formId) => `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/plugins/notion`;
  const redirectToGoogle = (formId) => `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/plugins/google`;
  const redirectToHubspot = (formId) => `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/plugins/hubspot/oauth`;


  const openRedirectInNewTab = (data) => {
    const { data: responseData } = data;
    if (has(responseData, "redirect_url")) {
      const redirectUrl = responseData.redirect_url;
      window.open(redirectUrl, "_blank");
    } else {
      toast.warning("Redirect URL not found");
    }
  };

  const redirectToSlackApi = async () => {
    await apiSlackPluginCreate({
      url: redirectToSlack(currentForm?.id),
      callback: openRedirectInNewTab,
    });
  };

  const redirectToNotionApi = async () => {
    await apiNotionPluginCreate({
      url: redirectToNotion(currentForm?.id),
      callback: openRedirectInNewTab,
    });
  };
  const redirectToGoogleApi = async () => {
    await apiGooglePluginCreate({
      url: redirectToGoogle(currentForm?.id),
      callback: openRedirectInNewTab,
    });
  };

  const redirectToHubspotApi = async () => {
    await apiHubspotPluginCreate({
      url: redirectToHubspot(currentForm?.id),
      callback: openRedirectInNewTab,
    });
  };

  const addPlugin = async (plugin) => {
    if (!hasPluginFeature) {
      return openPaywallModal();
    }
    if (plugin === "webhook") {
      return setShowAddWebhookModal(true);
    } else if (plugin === "auto-response") {
      if (isAutoResponderConnected()) {
        toast.warning("Already created! Delete previous one to create a new one");
      } else {
        return setShowAddAutoResponderModal(true);
      }
    } else if (plugin === "telegram") {
      return setShowAddTelegramModal(true);
    } else if (plugin === "slack") {
      return redirectToSlackApi();
    } else if (plugin === "notion") {
      return redirectToNotionApi();
    } else if (plugin === "discord") {
      return setShowAddDiscordModal(true)
    } else if (plugin === "zapier") {
      return setShowAddZapierModal(true);
    } else if (plugin === "make") {
      return setShowAddMakeModal(true);
    } else if (plugin === "hubspot") {
      return redirectToHubspotApi();
    } else if (plugin === "zendesk") {
      return setShowAddZendeskModal(true);
    } else if (plugin === "mailchimp") {
      return setShowAddMailchimpModal(true);
    } else if (plugin === "google-sheet") {
      if (isGooglePluginConnected()) {
        toast.warning("Already connected! Delete previous one to create a new one");
      } else {
        return redirectToGoogleApi();
      }
    }
  };

  const openPaywallModal = () => {
    setShowPaywallModal(true);
  };

  const handelPlugingEdit = (e, plugin) => {
    e.preventDefault();
    if (plugin.configuration_type === "auto-response" && !plan?.features?.autoresponder) {
      setShowBusinessOnlyPaywallModal(true);
      return false;
    }
    setEditModalData(plugin);
    setShowPluginEditModal(true);
  };

  const handlePluginDelete = (e, plugin) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this plugin?")) {
      const pluginPayload = {
        ...plugin,
        formId: currentForm?.id,
        pluginId: plugin?.route_key,
      };
      currentForm && dispatch(deletePlugins(pluginPayload));
    }
  };
  return (
    <>
      {plan === "Free" && <UpgradePlanBar />}

      <div className="mb-10 @container/app-card">
        <h3 className="mb-8 text-2xl font-bold text-black">Available apps</h3>
        {/* <div className={`-mx-[11px] flex flex-wrap gap-y-[22px] ${!hasPluginFeature && "opacity-50"}`}>
          <div className="w-max max-w-max px-[11px]">
            <ConnectAppCard
              appItem={{
                title: "Webhooks",
                connected: false,
                icon: <WebhookIcon />,
              }}
              onClickCallBack={(e) => addPlugin("webhook")}
            />
          </div>
          <div className="w-max max-w-max px-[11px]">
            <ConnectAppCard
              appItem={{
                title: "Slack",
                connected: false,
                icon: <SlackIcon />,
              }}
              onClickCallBack={(e) => addPlugin("slack")}
            />
          </div>
          <div className="w-max max-w-max px-[11px]">
            <ConnectAppCard
              appItem={{
                title: "Telegram",
                connected: false,
                icon: <TelegramIcon />,
              }}
              onClickCallBack={(e) => addPlugin("telegram")}
            />
          </div>
          <div className="w-max max-w-max px-[11px]">
            <ConnectAppCard
              appItem={{
                title: "Notion",
                connected: false,
                icon: <NotionIcon />,
              }}
              onClickCallBack={(e) => addPlugin("notion")}
            />
          </div>
          <div className="w-max max-w-max px-[11px]">
            <ConnectAppCard
              appItem={{
                title: "Google Sheet",
                connected: false,
                icon: <SheetIcon />,
              }}
              onClickCallBack={(e) => addPlugin("google-sheet")}
            />
          </div>
          <div className={`w-max max-w-max px-[11px] ${!plan?.features?.autoresponder && "opacity-50"}`}>
            <ConnectAppCard
              appItem={{
                title: "Auto Responder",
                connected: false,
                icon: <AutoResponderIcon />,
              }}
              onClickCallBack={(e) => (plan?.features?.autoresponder ? addPlugin("auto-response") : setShowBusinessOnlyPaywallModal(true))}
            />
          </div>
          <div className="w-max max-w-max px-[11px]">
            <ConnectAppCard
              appItem={{
                title: "Discord",
                connected: false,
                icon: <DiscordIcon />,
              }}
              onClickCallBack={(e) => addPlugin("discord")}
            />
          </div>
          <div className="w-max max-w-max px-[11px]">
            <ConnectAppCard
              appItem={{
                title: "Zapier",
                connected: false,
                icon: <ZapierIcon />,
              }}
              onClickCallBack={(e) => addPlugin("zapier")}
            />
          </div>
          <div className="w-max max-w-max px-[11px]">
            <ConnectAppCard
              appItem={{
                title: "Make",
                connected: false,
                icon: <MakeIcon />,
              }}
              onClickCallBack={(e) => addPlugin("make")}
            />
          </div>
          <div className="w-max max-w-max px-[11px]">
            <ConnectAppCard
              appItem={{
                title: "Mailchimp",
                connected: false,
                icon: <MailchimpIcon />,
              }}
              onClickCallBack={(e) => addPlugin("mailchimp")}
            />
          </div>
          <div className="w-max max-w-max px-[11px]">
            <ConnectAppCard
              appItem={{
                title: "HubSpot",
                connected: false,
                icon: <HubspotIcon />,
              }}
              onClickCallBack={(e) => addPlugin("hubspot")}
            />
          </div>
          <div className="w-max max-w-max px-[11px]">
            <ConnectAppCard
              appItem={{
                title: "Zendesk",
                connected: false,
                icon: <ZendeskIcon />,
              }}
              onClickCallBack={(e) => addPlugin("zendesk")}
            />
          </div>
        </div> */}
        <div className={`gap-6 grid grid-cols-1 @lg/app-card:grid-cols-2 @4xl/app-card:grid-cols-3 @6xl/app-card:grid-cols-4 *:w-full ${!hasPluginFeature && "opacity-50"}`}>
          <div className="">
            <ConnectAppCard
              appItem={{
                title: "Webhooks",
                connected: false,
                icon: <WebhookIcon />,
              }}
              onClickCallBack={(e) => addPlugin("webhook")}
            />
          </div>
          <div className="">
            <ConnectAppCard
              appItem={{
                title: "Slack",
                connected: false,
                icon: <SlackIcon />,
              }}
              onClickCallBack={(e) => addPlugin("slack")}
            />
          </div>
          <div className="">
            <ConnectAppCard
              appItem={{
                title: "Telegram",
                connected: false,
                icon: <TelegramIcon />,
              }}
              onClickCallBack={(e) => addPlugin("telegram")}
            />
          </div>
          <div className="">
            <ConnectAppCard
              appItem={{
                title: "Notion",
                connected: false,
                icon: <NotionIcon />,
              }}
              onClickCallBack={(e) => addPlugin("notion")}
            />
          </div>
          <div className="">
            <ConnectAppCard
              appItem={{
                title: "Google Sheet",
                connected: false,
                icon: <SheetIcon />,
              }}
              onClickCallBack={(e) => addPlugin("google-sheet")}
            />
          </div>
          <div className="">
            <ConnectAppCard
              appItem={{
                title: "Auto Responder",
                connected: false,
                icon: <AutoResponderIcon />,
              }}
              onClickCallBack={(e) => (plan?.features?.autoresponder ? addPlugin("auto-response") : setShowBusinessOnlyPaywallModal(true))}
            />
          </div>
          <div className="">
            <ConnectAppCard
              appItem={{
                title: "Discord",
                connected: false,
                icon: <DiscordIcon />,
              }}
              onClickCallBack={(e) => addPlugin("discord")}
            />
          </div>
          <div className="">
            <ConnectAppCard
              appItem={{
                title: "Zapier",
                connected: false,
                icon: <ZapierIcon />,
              }}
              onClickCallBack={(e) => addPlugin("zapier")}
            />
          </div>
          <div className="">
            <ConnectAppCard
              appItem={{
                title: "Make",
                connected: false,
                icon: <MakeIcon />,
              }}
              onClickCallBack={(e) => addPlugin("make")}
            />
          </div>
          <div className="">
            <ConnectAppCard
              appItem={{
                title: "Mailchimp",
                connected: false,
                icon: <MailchimpIcon />,
              }}
              onClickCallBack={(e) => addPlugin("mailchimp")}
            />
          </div>
          <div className="">
            <ConnectAppCard
              appItem={{
                title: "HubSpot",
                connected: false,
                icon: <HubspotIcon />,
              }}
              onClickCallBack={(e) => addPlugin("hubspot")}
            />
          </div>
          <div className="">
            <ConnectAppCard
              appItem={{
                title: "Zendesk",
                connected: false,
                icon: <ZendeskIcon />,
              }}
              onClickCallBack={(e) => addPlugin("zendesk")}
            />
          </div>
        </div>
      </div>
      {!isEmpty(connectedPlugins) && (
        <div>
          <h3 className="mb-8 font-heading text-2xl font-bold text-black">Connected apps</h3>
          <div className="gap-6 grid grid-cols-1 @lg/app-card:grid-cols-2 @4xl/app-card:grid-cols-3 @6xl/app-card:grid-cols-4">
            {connectedPlugins.map((plugin, index) => (
              <div
                key={`${plugin.id + index}`}
                className={`w-full ${plugin?.configuration_type === "auto-response" && !plan?.features?.autoresponder && "opacity-50"}`}
                onClick={(e) => handelPlugingEdit(e, plugin)}
              >
                <ConnectAppCard
                  appItem={{
                    title: plugin?.title,
                    connected: true,
                    icon: getPluginIconByConfigType(plugin?.configuration_type),
                  }}
                  onClickCallBack={(e) => handelPlugingEdit(e, plugin)}
                  onDisconnectClickCallback={(e) => handlePluginDelete(e, plugin)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <PluginEditModal modalOpen={showPluginEditModal} setModalOpen={setShowPluginEditModal} plugin={editModalData} />

      <PaywallModal modalOpen={showPaywallModal} setModalOpen={setShowPaywallModal} />
      <BusinessOnlyPaywallModal modalOpen={showBusinessOnlyPaywallModal} form={currentForm} setModalOpen={setShowBusinessOnlyPaywallModal} />

      {/* add modal */}
      <GoogleSheetSuccessModal modalOpen={showGoogleSheetSuccessModal} url={googleSheetUrl} setModalOpen={setShowGoogleSheetSuccessModal} />
      <AddWebhookModal modalOpen={showAddWebhookModal} form={currentForm} setModalOpen={setShowAddWebhookModal} />
      <AddDiscordModal modalOpen={showAddDiscordModal} form={currentForm} setModalOpen={setShowAddDiscordModal} />
      <AddAutoResponderModal modalOpen={showAddAutoResponderModal} form={currentForm} setModalOpen={setShowAddAutoResponderModal} />
      <AddTelegramPluginModal modalOpen={showAddTelegramModal} form={currentForm} setModalOpen={setShowAddTelegramModal} />
      <AddZapierModal modalOpen={showAddZapierModal} form={currentForm} setModalOpen={setShowAddZapierModal} />
      <AddMakeModal modalOpen={showAddMakeModal} form={currentForm} setModalOpen={setShowAddMakeModal} />
      <AddMailchimpModal modalOpen={showAddMailchimpModal} form={currentForm} setModalOpen={setShowAddMailchimpModal} />
      {showAddZendeskModal && (
        <AddZendeskModal modalOpen={showAddZendeskModal} form={currentForm} setModalOpen={setShowAddZendeskModal} />
      )}
    </>
  );
};

export default AppTabContent;
