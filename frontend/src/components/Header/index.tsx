import Link from 'next/link';
import {
  Box,
  Flex,
  HStack,
  Stack,
  Text,
  Image,
  Container,
  Collapse,
  IconButton,
  useDisclosure
} from '@chakra-ui/react';

import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons';

const Links = [
  {
    text: 'About',
    path: '/about',
  },
  {
    text: '投稿',
    path: '/upload',
  },
  {
    text: '検索', 
    path: '/search',
  },
];

const Header = (): JSX.Element => (
  <>
    <Box>
      <Flex padding="10px" paddingLeft="30px" alignItems="center" display={{ base: 'none', md: 'flex' }}>
        <DeskTopNav />
      </Flex>
      <Container paddingTop="5px" display={{ base: 'fixed', md: 'none' }}>
        <MobileNav />
      </Container>
    </Box>
    <hr />
  </>
)

const DeskTopNav = (): JSX.Element => (
  <HStack alignItems="center">
    <HStack>
      <Link href='/' key='Logo'>
        <a style={{ display: "contents" }}><Image width="5%" src="/Logo.jpg" /></a>
      </Link>
      {Links.map(({ text, path }) => (
        <Link href={`${path}`} key={text}>
          <a><Text>{text}</Text></a>
        </Link>
      ))}
    </HStack>
  </HStack>
)

const MobileNav = (): JSX.Element => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'sm'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'} justifyContent="center" marginLeft="-5">
          <Link href='/' key='Logo'>
            <a style={{ display: "contents" }}><Image width="40%" src="/Logo.jpg" /></a>
          </Link>
        </HStack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Stack as={'nav'} spacing={4} paddingBottom="5px">
          {Links.map(({ text, path }) => (
            <Link href={`${path}`} key={text}>
              <a><Text>{text}</Text></a>
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Box>
  )
}

export default Header;