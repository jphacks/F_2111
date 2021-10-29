import {Box, Button, CircularProgress, Flex} from '@chakra-ui/react';
import Head from 'next/head';
import {Photo} from '../../src/components/pages/home/Photo';
import {PhotoSearchCondition, PhotoSearchParams, PhotoSearchResponse} from '../../src/types';
import {FC, useEffect, useRef, useState} from 'react';
import {RangeForm} from '../../src/components/pages/home/search/RangeForm';
import {useIntersection} from '../../src/hooks/useIntersection';

const PHOTO_COUNTS_PER_PAGE = 20;

interface PhotoSearchProps {
  photo_search_condition: PhotoSearchCondition
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
  const photoSearchCondition = props.photo_search_condition;
  // const classes = usePhotoSearchStyles()

  const [fnumberRangeId, setFNumberRangeId] = useState('');
  const [focalLengthRangeId, setFocalLengthRangeId] = useState('');
  const [photoSearchParams, setPhotoSearchParams] = useState<PhotoSearchParams | null>(null);
  const [searchResult, setSearchResult] = useState<PhotoSearchResponse | null>(null);
  const [page, setPage] = useState<number>(0);

  const ref = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;
  const intersection = useIntersection(ref);
  const [intersected, setIntersected] = useState<boolean>(true);
  const [fetching, setFetching] = useState<boolean>(true);

  const onSearch = () => {
    setFetching(true);

    const params: PhotoSearchParams = {
      fnumberRangeId,
      focalLengthRangeId,
      page: 0,
      perPage: PHOTO_COUNTS_PER_PAGE,
    };
    setPhotoSearchParams(params);
    setSearchResult(null);

    searchPhoto(params)
      .then(result => {
        setSearchResult(result);
        setPage(0);
        setFetching(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    setIntersected(intersection);
  }, [intersection]);

  useEffect(() => {
    if (intersected && !fetching) {
      onSearch();
    }
  }, [intersected, fetching]);


  return (
    <Box>
      <Head>
        <title>Home | baetoru.com</title>
        <meta name="description" content="Home | baetoru.com"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Box>
        <Box>
          <RangeForm
            name='F値'
            value={fnumberRangeId}
            rangeCondition={photoSearchCondition.fnumber}
            onChange={(value) => {
              setFNumberRangeId(value);
            }}
          />

          <RangeForm
            name='焦点距離'
            value={focalLengthRangeId}
            rangeCondition={photoSearchCondition.focal_length}
            onChange={(value) => {
              setFocalLengthRangeId(value);
            }}
          />

          <Button
            onClick={onSearch}
            disabled={
              fnumberRangeId === '' &&
              focalLengthRangeId === ''
            }
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
                    searchResult.photos.map((photo) => (
                      <Photo key={photo.id} {...photo} />
                    ))
                  }
                </>
              ) : (
                <CircularProgress/>
              )}
              {/*{!fetching && (*/}
                <div ref={ref} hidden={true}>
                  <Button onClick={
                    (e) => {
                      if (!photoSearchParams) return;
                      const params = {...photoSearchParams, page: page};
                      setPhotoSearchParams(params);
                      setSearchResult(null);
                      const urlSearchParams = new URLSearchParams();
                      for (const [key, value] of Object.entries(params)) {
                        urlSearchParams.append(key, value.toString());
                      }
                      searchPhoto(params)
                        .then(result => {
                          setSearchResult(result);
                          setPage(page + 1);
                        })
                        .catch(console.error);
                    }

                  }
                  >もっともっと</Button>
                </div>
              {/*)}*/}
            </Flex>
          </Box>
        </Box>
      {/*// ) : null}*/}
    </Box>
  );
};


export const getServerSideProps = async (): Promise<{
  props: PhotoSearchProps;
}> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SSR_HOST}/api/v1/photos/search/condition`);
  const data = (await res.json()) as PhotoSearchProps;

  return {
    props: data,
  };
};

export default PhotoSearch;
