import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  id: number;
  url: string;
  exif?: any;
  title: string;
  description?: string;
}

export const Photo = (props: Props): JSX.Element => (
    <Box 
    key={props.id} 
    margin="5px 5px"
    height={300}
    width={450}
    overflow="hidden"
    position="relative"
  >
    <Box _hover={{ 
      transform: 'scale(1.2)',
      transition: 'transform .5s',  
      filter: 'brightness(50%)',
    }}>
      <Link href="/photo/[id]" as={`/photo/${props.id}`}>
        <a>
          <Image src={props.url} height={300} width={450} quality={30} />
        </a>
      </Link>
    </Box>
  </Box>
  )