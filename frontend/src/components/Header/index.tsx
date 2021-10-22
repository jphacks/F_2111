import Link from 'next/link';
import {
  Box,
  Flex,
  HStack,
  chakra, 
} from '@chakra-ui/react';

const Links = [{
    text: 'About', 
    path: '/about',
  },
//   {
//     text: 'Hoge', 
//     path: '/hoge',
//   },
];

const Header = () => (
    <>
      <Box>
        <Flex padding="20px" alignItems="center">
          <HStack alignItems="center">
            <Link href="/">
              <a><chakra.h1>baetoru.com</chakra.h1></a>
            </Link>
            <HStack
              as="nav"
              display={{
                md: 'flex'
              }}
              >
              {Links.map(({ text, path }) => (
                <Link href={`${path}`} key={text}>
                  <a>
                    {text}
                  </a>
                </Link>
              ))}
            </HStack>
          </HStack>
        </Flex>
      </Box>
      <hr />
    </>
  )

export default Header;