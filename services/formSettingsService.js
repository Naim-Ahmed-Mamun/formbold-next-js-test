import configs from "./config";
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";

export const htmlCode = (formId) => `
<!-- modify this form HTML and place wherever you want your form -->
<form action="${configs.siteURL}/s/${formId}" method="POST">
  <input type="email" placeholder="Email" name="email">
  <input type="text" placeholder="Subject" name="subject">
  <textarea name="message" placeholder="Type your message"></textarea>

  <!-- your other form fields go here -->
  <button type="submit">Send Message</button>
</form>
`;

export const htmlWithFileCode = (formId) => `
<!-- modify this form HTML and place wherever you want your form -->
<form action="${configs.siteURL}/s/${formId}" method="POST" enctype="multipart/form-data">
  <input type="email" placeholder="Email" name="email">
  <input type="text" placeholder="Subject" name="subject">
  <input type="file" placeholder="File" name="file">
  <textarea name="message" placeholder="Type your message"></textarea>

  <!-- your other form fields go here -->
  <button type="submit">Send Message</button>
</form>
`;
export const reactCode = (formId) => `
<form action="${configs.siteURL}/s/${formId}" method="POST" enctype="multipart/form-data">
  <input type="email" placeholder="Email" name="email">
  <input type="text" placeholder="Subject" name="subject">
  <input type="file" placeholder="File" name="file">
  <textarea name="message" placeholder="Type your message"></textarea>

  <button type="submit">Send Message</button>
</form>
`;

export const formateRawHtmlContent = (rawHtmlContent) => {
  // Format the HTML content using prettier with the HTML parser
  return prettier.format(rawHtmlContent, {
    parser: "html",
    plugins: [parserHtml],
  });
};
