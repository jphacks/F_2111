import { Box, chakra } from '@chakra-ui/react';
import { Image } from '@chakra-ui/image';
import React from 'react';

export default function Custom500() {
    return (
        <Box textAlign="center" padding="100px">
          <Image margin="0 auto 50px" src="https://baetoru.tetsuzawa.com/Logo.jpg" width="50%" />
          <chakra.h1 fontSize="2rem" fontWeight="800">404 Page Not Found...</chakra.h1>
          <chakra.h1 fontSize="2rem" fontWeight="800">お探しのページは見つかりませんでした。</chakra.h1>
        </Box>
      )
}