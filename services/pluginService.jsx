import { toast } from "react-toastify";
import Client from "../config/axiosClient";
import TelegramIcon from "../components/Icons/TelegramIcon";
import NotionIcon from "../components/Icons/NotionIcon";
import SlackIcon from "../components/Icons/SlackIcon";
import WebhookIcon from "../components/Icons/WebhookIcon";
import SheetIcon from "../components/Icons/SheetIcon";
import AutoResponderIcon from "../components/Icons/AutoResponderIcon";
import DiscordIcon from "../components/Icons/DiscordIcon";
import ZapierIcon from "../components/Icons/ZapierIcon";
import MakeIcon from "../components/Icons/MakeIcon";
import MailchimpIcon from "../components/Icons/MailchimpIcon";
import HubspotIcon from "../components/Icons/HubspotIcon";
import ZendeskIcon from "../components/Icons/ZendeskIcon";


export const apiSlackPluginCreate = async ({ url, callback }) => {
  try {
    const { data } = await Client.get(url);
    return callback(data);
  } catch ({ response }) {
    toast.error(response?.data?.message);
  } finally {
  }
};
export const apiHubspotPluginCreate = async ({ url, callback }) => {
  try {
    const { data } = await Client.get(url);
    return callback(data);
  } catch ({ response }) {
    toast.error(response?.data?.message);
  } finally {
  }
}
export const apiNotionPluginCreate = async ({ url, callback }) => {
  try {
    const { data } = await Client.get(url);
    return callback(data);
  } catch ({ response }) {
    toast.error(response?.data?.message);
  } finally {
  }
};
export const apiGooglePluginCreate = async ({ url, callback }) => {
  try {
    const { data } = await Client.get(url);
    return callback(data);
  } catch ({ response }) {
    toast.error(response?.data?.message);
  } finally {
  }
};
export const apiFetchNotionResource = async ({ id, callback }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/plugins/${id}/resources`;
    const { data } = await Client.get(url);
    return callback(data);
  } catch ({ response }) {
    toast.error(response?.data?.message);
  } finally {
  }
};

export const getPluginIconByConfigType = (configType) => {
  switch (configType) {
    case "telegram":
      return <TelegramIcon />;
    case "notion":
      return <NotionIcon />;
    case "slack":
      return <SlackIcon />;
    case "webhook":
      return <WebhookIcon />;
    case "google-sheet":
      return <SheetIcon />;
    case "auto-response":
      return <AutoResponderIcon />;
    case "discord":
      return <DiscordIcon />;
    case "zapier":
      return <ZapierIcon />;
    case "make":
      return <MakeIcon />;
    case "mailchimp":
      return <MailchimpIcon />;
    case "hubspot":
      return <HubspotIcon />;
    case "zendesk":
      return <ZendeskIcon />;
    default:
      return null;
  }
};
