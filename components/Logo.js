import Link from "next/link";
import { Img } from "@chakra-ui/react";
import styled from "@emotion/styled";

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  //display: inline-flex;
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
  const csImage = `/images/hackitba-new-isologo.png`;

  return (
    <Link href="/" passHref={true}>
      <LogoBox>
        <Img src={csImage} height={["50%","60%","70%","80%","90%"]} alt="logo" />
      </LogoBox>
    </Link>
  );
};

export default Logo;
