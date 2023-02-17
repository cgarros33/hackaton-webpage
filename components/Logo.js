import Link from "next/link";
import { Heading, Img } from "@chakra-ui/react";
import styled from "@emotion/styled";

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 60px;
  line-height: 20px;
  padding: 10px;
  display: flex;
  cursor: pointer;
  // &:hover img {  
  //   transform: rotate(20deg);
  // }
`;

const Logo = () => {
  const csImage = `/images/cs_logo.svg`;

  return (
    <Link href="/" passHref={true}>
      <LogoBox>
        <Img src={csImage} height="90%" alt="logo" />
        {/* <Heading
          letterSpacing={0}
          marginLeft="13px"
          color="#A5ABB6"
          size="md"
          fontWeight={500}
        >
          HackIT-BA!
        </Heading> */}
      </LogoBox>
    </Link>
  );
};

export default Logo;
