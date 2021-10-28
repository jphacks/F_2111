import type { NextPage } from 'next';
import {
  Heading,
  Text,
  Image,
  Box,
  Container,
  Stack
} from '@chakra-ui/react';
import Head from 'next/head';

const Style = {
  Box: { marginTop: '10px', marginBottom: '25px' },
  Container: {
    backgroundColor: "rgb(255 199 142 / 70%)",
    backdropFilter: "blur(2px)",
    height: "110vh",
  },
  Heading: {
    fontSize: "200%",
    fontWeight: "700",
    paddingBottom: "2px",
    marginBottom: "10px",
    borderBottom: "1px",
    borderBottomWidth: "2px",
    borderColor: "orange",
    textAlign: "center"
  },
  ContentsBox: {
    focusBorderColor: "Orange",
    borderColor: "orange",
    background: "white",
    padding: "30px",
    borderRadius: "5px",
  },
  Image: {
    position: "fixed",
    height: "100vh",
    opacity: "20%",
  }
};

const About: NextPage = (): JSX.Element => (
    <Box>
      <Head>
        <title>About | baetoru.com</title>
        <meta name="description" content="About | baetoru.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image src="/Background.jpg" display={{ base: "none", sm: "fixed" }} style={Style.Image} />
      <Container style={Style.Container}>
        <Heading>About</Heading>
        <Image padding="10px" src="/OfficialLogo.jpg"/>
        <Box style={Style.Box}>
          <Text {...Style.Heading}>「映えとる」とは</Text>
          <Box {...Style.ContentsBox}>
            <Text lineHeight="8" textAlign="center">
            「映え写真の撮り方を共有するサービス」<br/>
            写真をアップロードすれば自動で撮影情報を読み込み・表示します！<br/>
            「いつ・どこで・どんな機材で・どんな画角で」<br/>
            </Text>
          </Box>
        </Box>
        <Box style={Style.Box}>
          <Text {...Style.Heading}>タイトル 1</Text>
          <Box {...Style.ContentsBox}>
            <Text lineHeight="8" textAlign="center">
              ここに内容を書きます
              <br/>。
              <br/>。。
              <br/>。。。
              <br/>。。。。
              <br/>。。。。。
            </Text>
          </Box>
        </Box>
        <Box style={Style.Box}>
          <Text {...Style.Heading}>タイトル 2</Text>
          <Box {...Style.ContentsBox}>
            <Text lineHeight="8" textAlign="center">
              ここに内容を書きます
              <br/>。
              <br/>。。
              <br/>。。。
              <br/>。。。。
              <br/>。。。。。
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  )

export default About;