import { 
  Heading,
  Box, 
  Button, 
  CircularProgress, 
  Flex, 
  Container, 
  Image as Img 
} from '@chakra-ui/react';
import Head from 'next/head';
import { Photo } from '../../src/components/pages/home/Photo';
import { PhotoSearchCondition, PhotoSearchParams, PhotoSearchResponse, PhotoType } from '../../src/types';
import { FC, useEffect, useState } from 'react';
import { RangeForm } from '../../src/components/pages/home/search/RangeForm';
import { useIntersection } from '../../src/hooks/useIntersection';

const PHOTO_COUNTS_PER_PAGE = 16;

interface PhotoSearchProps {
  photoSearchCondition: PhotoSearchCondition
}

const searchPhoto = async (params: PhotoSearchParams) => {
  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    urlSearchParams.append(key, value.toString());
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/v1/photos/search?${urlSearchParams.toString()}`);
  const json = await response.json();
  return json as PhotoSearchResponse;
};

const PhotoSearch: FC<PhotoSearchProps> = (props: PhotoSearchProps) => {
  const photoSearchCondition = props.photoSearchCondition;
  // const classes = usePhotoSearchStyles()

  const [fnumberRangeId, setFNumberRangeId] = useState('');
  const [focalLengthRangeId, setFocalLengthRangeId] = useState('');
  const [photoGraphicSensitivityRangeId, setPhotoGraphicSensitivityRangeId] = useState('');
  const [shutterSpeedValueRangeId, setShutterSpeedValueRangeId] = useState('');
  const [page, setPage] = useState(0);
  const [photoSearchParams, setPhotoSearchParams] = useState<PhotoSearchParams>({
    fnumberRangeId,
    focalLengthRangeId,
    photoGraphicSensitivityRangeId,
    shutterSpeedValueRangeId,
    page,
    perPage: PHOTO_COUNTS_PER_PAGE,
  });
  const [searchResult, setSearchResult] = useState<PhotoType[] | null>(null);
  const [isEnd, setIsEnd] = useState(false);
  const intersection = useIntersection();
  const [intersected, setIntersected] = useState<boolean>(true);
  const [fetching, setFetching] = useState<boolean>(true);

  const handleSearch = () => {
    setFetching(true);
    const params: PhotoSearchParams = {
      fnumberRangeId,
      focalLengthRangeId,
      photoGraphicSensitivityRangeId,
      shutterSpeedValueRangeId,
      page,
      perPage: PHOTO_COUNTS_PER_PAGE,
    };
    searchPhoto(params)
      .then(result => {
        if (result.photos === null) setIsEnd(true);
        const r = searchResult ?? [] as PhotoType[];
        setSearchResult([...r, ...result.photos]);
        setPage(page + 1);
        setFetching(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    setIntersected(intersection);
    if (intersection && !isEnd) handleSearch();
  }, [intersection]);

  useEffect(() => {
    searchPhoto(photoSearchParams)
      .then(result => {
        setSearchResult(result.photos);
        setFetching(false);
      })
      .catch(console.error);

    if (intersected && !fetching) {
      handleSearch();
    }
  }, [photoSearchParams]);

  return (
    <>
      <Head>
        <title>検索 | baetoru.com</title>
        <meta name="description" content="検索 | baetoru.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Img
        src="/Background.jpg"
        display={{ base: "none", sm: "fixed" }}
        position="fixed"
        style={{
          height: "100vh",
          opacity: "15%",
        }}
      />
      <Container
        maxWidth={{ base: "110vh" }}
        style={{
          paddingTop: "20px",
          backgroundColor: "rgb(255 199 142 / 70%)",
          backdropFilter: "blur(2px)",
          height: "100%",
          paddingBottom: "10px",
          textAlign: "center"
        }}
      >
        <Heading marginBottom="10px">検索ページ</Heading>
        <Box>
          <Box textAlign="left">
            <RangeForm
              name='F値'
              value={fnumberRangeId}
              rangeCondition={photoSearchCondition.fnumber}
              onChange={setFNumberRangeId}
            />

            <RangeForm
              name='焦点距離'
              value={focalLengthRangeId}
              rangeCondition={photoSearchCondition.focalLength}
              onChange={setFocalLengthRangeId}
            />

            <RangeForm
              name='ISO感度'
              value={photoGraphicSensitivityRangeId}
              rangeCondition={photoSearchCondition.photoGraphicSensitivity}
              onChange={setPhotoGraphicSensitivityRangeId}
            />

            <RangeForm
              name='シャッタースピード'
              value={shutterSpeedValueRangeId}
              rangeCondition={photoSearchCondition.shutterSpeedValue}
              onChange={setShutterSpeedValueRangeId}
            />
          </Box>

          <Box padding="5px" textAlign="left" marginTop="10px">
            <Button
              type="button"
              variant="solid"
              colorScheme="pink"
              onClick={() => {
                const params: PhotoSearchParams = {
                  fnumberRangeId,
                  focalLengthRangeId,
                  photoGraphicSensitivityRangeId,
                  shutterSpeedValueRangeId,
                  page: 0,
                  perPage: PHOTO_COUNTS_PER_PAGE,
                };
                setPhotoSearchParams(params);
              }}
            >
              Search
            </Button>
          </Box>
        </Box>

        {/*{photoSearchParams ? (*/}
        <Box>
          <Box alignItems='center'>
            <Flex flexWrap="wrap" justifyContent="center" marginTop="5px">
              {searchResult ? (
                <>
                  {
                    searchResult.map((photo, idx) => <Photo key={idx} {...photo} />)
                  }
                </>
              ) : (
                <CircularProgress />
              )}
            </Flex>
          </Box>
        </Box>
        {/*// ) : null}*/}
      </Container>
    </>
  );
};


export const getServerSideProps = async (): Promise<{
  props: PhotoSearchProps;
}> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SSR_HOST}/api/v1/photos/search/condition`);
  const data = await res.json() as PhotoSearchProps;

  return {
    props: data,
  };
};

export default PhotoSearch;
