import type { NextPage } from 'next';
import {
  Heading,
  Text,
  Image,
  Box,
  Container,
} from '@chakra-ui/react';
import Head from 'next/head';

const Style = {
  Box: { marginTop: '10px', marginBottom: '25px' },
  Container: {
    backgroundColor: "rgb(255 199 142 / 70%)",
    backdropFilter: "blur(2px)",
    height: "100%",
    paddingTop: "20px",
    paddingBottom: "10px",
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
        <Heading marginBottom="10px" textAlign="center">About</Heading>
        <Image padding="10px" src="/OfficialLogo.jpg"/>
        <Box style={Style.Box}>
          <Text {...Style.Heading}>「映えとる」とは</Text>
          <Box {...Style.ContentsBox}>
            <Text lineHeight="8" textAlign="center">
            「映え写真の撮り方を共有するサービス」<br/>
            いつ・どこで・どんな機材で・どんな画角で<br/>
            写真をアップロードすれば自動で撮影情報を読み込み・表示します！<br/>
            </Text>
          </Box>
        </Box>
        <Box style={Style.Box}>
          <Text {...Style.Heading}>今後の展望</Text>
          <Box {...Style.ContentsBox}>
            <Text lineHeight="8" textAlign="left">
            - 既に有名なSNSサービスと連携して撮り方を見れるようにする<br/>
            - 画像編集の前後を比べたり，手法を共有できる機能<br/>
            - SNS機能をつけてユーザーが交流でき，ポートフォリオとして使えるようにする<br/>
            <br/>[事業として]<br/>
            - 被写体として写りたい人と写真を撮りたい人を繋げる機能<br/>
            - カメラレンタル事業者と提携してその写真に必要な機材を丸ごとレンタル<br/>
            - 旅行事業者と提携してその写真を撮ることを目的とした旅行プランが予約できる機能<br/>

            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  )

export default About;