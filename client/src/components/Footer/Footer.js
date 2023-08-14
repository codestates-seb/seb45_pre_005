import { 
  FooterContainer, 
  FooterWrap, 
  FooterLogoWrap, 
  FooterNav,
  FooterCopyright
} from './Footer.styled';
import logo from  '../../common/image/logo.ico'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLogoWrap>
          <Link to="/">
            <img src={logo} alt='logo'/>
          </Link>
        </FooterLogoWrap>
        <FooterNav>
          <div>
            <h5>STACK OVERFLOW</h5>
            <ul> 
              <li>Questions</li>
              <li>Help</li>
            </ul>
          </div>
          <div>
            <h5>PRODUCTS</h5>
            <ul> 
              <li>Teams</li>
              <li>Advertising</li>
              <li>Collectives</li>
              <li>Talent</li>  
            </ul>
          </div>
          <div>
            <h5>COMPANY</h5>
            <ul> 
              <li>About</li>
              <li>Press</li>
              <li>Work Here</li>
              <li>Legal</li> 
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Us</li>
              <li>Cookie Settings</li> 
              <li>Cookie Policy</li>
            </ul>
          </div>
          <div>
            <h5>STACK EXCHANGE NETWORK</h5>
            <ul> 
              <li>Technology</li>
              <li>Culture & recreation</li>
              <li>Life & arts</li>
              <li>Science</li> 
              <li>Professional</li>
              <li>Business</li>
              <li>API</li>
              <li>Data</li> 

            </ul>
          </div>
        </FooterNav>
        <FooterCopyright>
          <ul>
            <li>Blog</li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>LinkdIn</li>
            <li>Instagram</li>
          </ul>
          <p>
            Site design / logo © 2023 Stack Exchange Inc; user contributions licensed under CC BY-SA. rev 2023.8.9.43572
          </p>
        </FooterCopyright>
      </FooterWrap>
    </FooterContainer>
  );
}
