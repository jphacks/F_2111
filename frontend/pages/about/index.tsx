import type { NextPage } from 'next';
import Link from 'next/link';
import {
  Heading,
  Text,
  Image,
  Box,
  Container,
  OrderedList,
  UnorderedList,
  ListItem,
  Divider,
  Button
} from '@chakra-ui/react';
import {
  ChevronRightIcon
} from '@chakra-ui/icons'
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
    paddingBottom: "2px",
    marginBottom: "10px",
  },
  ContentsBox: {
    focusBorderColor: "Orange",
    borderColor: "orange",
    background: "white",
    padding: "30px",
    borderRadius: "5px",
  },
  Image: {
    height: "100vh",
    opacity: "20%",
  }
};
const About: NextPage = (): JSX.Element => (
  <Box>
    <Head>
      <title>About | baetoru.com</title>
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:url" content="https://baetoru.tetsuzawa.com/about" />
      <meta property="og:title" content="About | baetoru.com" />
      <meta property="og:description" content="映える写真や撮り方を共有できるサービス、baetoruです。" />
      <meta property="og:image" content="https://baetoru.tetsuzawa.com/Logo.jpg" />
      <meta property="twitter:url" content="https://baetoru.tetsuzawa.com/about" />
      <meta property="twitter:title" content="About | baetoru.com" />
      <meta property="twitter:description" content="映える写真や撮り方を共有できるサービス、baetoruです。" />
      <meta property="twitter:image" content="https://baetoru.tetsuzawa.com/Logo.jpg" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Image src="/Background.jpg" display={{ base: "none", sm: "fixed" }} position="fixed" style={Style.Image} />
    <Container style={Style.Container}>
      <Heading marginBottom="10px" textAlign="center">About</Heading>
      <Image padding="10px" src="/OfficialLogo.jpg" />
      <Box style={Style.Box}>
        <Text style={Style.Heading} borderBottom="1px" borderBottomWidth="2px" borderColor="orange" fontSize="200%" textAlign="center">「映えとる」とは</Text>
        <Box style={Style.ContentsBox}>
          <Text lineHeight="8" textAlign="left">
            <UnorderedList>
              <ListItem>
                映え写真の撮り方を共有するサービス
              </ListItem>
              <ListItem>
                いつ・どこで・どんな機材で・どんな画角が写真から知れます
            </ListItem>
              <ListItem>
                写真をアップロードすれば自動で撮影情報を読み込み・表示します！
            </ListItem>
            </UnorderedList>
          </Text>
        </Box>
      </Box>
      <Box style={Style.Box}>
        <Text style={Style.Heading} borderBottom="1px" borderBottomWidth="2px" borderColor="orange" fontSize="200%" textAlign="center">映えとるの特徴</Text>
        <Box style={Style.ContentsBox}>
          <Text lineHeight="8" textAlign="left">
            <OrderedList>
              <ListItem>
                写真をアップロードすると自動で情報を読み取り表示します
              </ListItem>
              <ListItem>
                Google Map・ストリートビューに写真を撮った場所・向きを表示します
              </ListItem>
            </OrderedList>
          </Text>
        </Box>
      </Box>
      <Box textAlign="center">
        <Box style={Style.Box} textAlign="center">
          <Text>位置情報をオンにして写真を取ると良いかも！</Text>
          <Text>↓試しに撮って、投稿して見よう↓</Text>
        </Box>
        <Box style={Style.Box} textAlign="center">
          <Link href='/upload' key="upload">
            <a>
              <Button type="submit" variant="solid" size="lg" colorScheme="orange">
                投稿してみる
              <ChevronRightIcon />
              </Button>
            </a>
          </Link>
        </Box>
      </Box>
      <Box style={Style.Box}>
        <Text style={Style.Heading} borderBottom="1px" borderBottomWidth="2px" borderColor="orange" fontSize="200%" textAlign="center">技術スタック</Text>
        <Box style={Style.ContentsBox}>
          <Text lineHeight="8" textAlign="left">
            <UnorderedList>
              <ListItem>exif</ListItem>
              <ListItem>AWS(EC2, S3)</ListItem>
            </UnorderedList>
            <UnorderedList>
              <ListItem>Next.js</ListItem>
              <ListItem>chakra-ui</ListItem>
              <ListItem>gin-gonic/gin</ListItem>
              <ListItem>dsoprea/go-exif/v3</ListItem>
            </UnorderedList>
          </Text>
        </Box>
      </Box>
      <Box style={Style.Box}>
        <Text style={Style.Heading} borderBottom="1px" borderBottomWidth="2px" borderColor="orange" fontSize="200%" textAlign="center">今後の展望</Text>
        <Box style={Style.ContentsBox}>
          <Text lineHeight="8" textAlign="left">
            <UnorderedList>
              <ListItem>既に有名なSNSサービスと連携して撮り方を見れるようにする</ListItem>
              <ListItem>画像編集の前後を比べたり，手法を共有できる機能</ListItem>
              <ListItem>SNS機能をつけてユーザーが交流でき，ポートフォリオとして使えるようにする</ListItem>
            </UnorderedList>
            <Divider size="large" />
            <Text>[事業として]</Text>
            <UnorderedList>
              <ListItem>被写体として写りたい人と写真を撮りたい人を繋げる機能</ListItem>
              <ListItem>カメラレンタル事業者と提携してその写真に必要な機材を丸ごとレンタル</ListItem>
              <ListItem>旅行事業者と提携してその写真を撮ることを目的とした旅行プランが予約できる機能</ListItem>
            </UnorderedList>
          </Text>
        </Box>
      </Box>
    </Container>
  </Box>
)

export default About;