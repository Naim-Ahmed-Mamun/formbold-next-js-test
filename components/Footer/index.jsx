import FooterBottom from "./FooterBottom";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        {/* <Newsletter /> */}

        <FooterLinks />

        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
