import Link from 'next/link';
import {
  Box,
  Flex,
  HStack,
  Stack,
  Text,
  Image,
  Collapse,
  Container,
  useDisclosure
} from '@chakra-ui/react';

const Links = [
  {
    text: 'About',
    path: '/about',
  },
  {
    text: '投稿',
    path: '/upload',
  }
  //   {
  //     text: 'Hoge', 
  //     path: '/hoge',
  //   },
];

const Header = (): JSX.Element => (
  <>
    <Box>
      <Flex padding="10px" paddingLeft="30px" alignItems="center" display={{ base: 'none', md: 'flex' }}>
        <DeskTopNav />
      </Flex>
      <Container paddingTop="5px" display={{ base: 'flex', md: 'none' }}>
        <MobileNav />
      </Container>
    </Box>
    <hr />
  </>
)

const DeskTopNav = (): JSX.Element => (
  <HStack alignItems="center" justifyContent="left">
    <HStack>
      <Link href='/' key='Logo'>
        <Image width="10%" src="/Logo.jpg"/>
      </Link>
      {Links.map(({ text, path }) => (
        <Link
          href={`${path}`}
          key={text}
        >
          <Text><a>{text}</a></Text>
        </Link>
      ))}
    </HStack>
  </HStack>
)

const MobileNav = (): JSX.Element => {

  const { isOpen, onToggle } = useDisclosure();

  return (
    <HStack alignItems="center" justifyContent="center" onClick={onToggle}>
      <Link
        href='/'
        key="Home"
      >
        <a><Image width="37%" src="/Logo.jpg"/></a>
      </Link>
      <Text justifyContent="right">Menu</Text>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          align={'start'}>
        {Links.map(({ text, path }) => (
        <Link
          href={`${path}`}
          key={text}
        >
          <Text><a>{text}</a></Text>
        </Link>
      ))}
        </Stack>
      </Collapse>
    </HStack>
  )
}

export default Header;