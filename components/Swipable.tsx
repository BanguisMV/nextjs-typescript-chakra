import {useState, Fragment, FC} from 'react'
import { Box, Flex, Heading, Img, Tag ,TagLabel, TagLeftIcon,useMediaQuery  } from '@chakra-ui/react'
import React from 'react'
import { ArrowForwardIcon, StarIcon } from "@chakra-ui/icons"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller, } from 'swiper';
import Link from 'next/link';
import { Result } from './types';

SwiperCore.use([Controller]);

interface Props {
  data:Result[];
  title:string;
}
const Swipable:FC<Props> = ({ data,title }) => {
  const [toDisplay, setToDisplay]= useState<number>(5)
  const [Mobile500] = useMediaQuery("(max-width: 500px)")

    return (
    <Fragment>
        <Flex justifyContent='space-between' width='100%'  color='white' alignItems='center'>
          <Box> <Heading as="h1" size="lg" isTruncated p='1rem' color='white'> {title}  </Heading></Box>

          <Box> 

          <Link href="https://chakra-ui.com">
            <Heading as="h1" size="sm" isTruncated p='1rem' color='white' _hover={{ color:"cyan.200", cursor:"pointer"}}> View All <ArrowForwardIcon />  </Heading>
          </Link>

          </Box>
        </Flex>

        <Box color='white'>
          <Swiper
          spaceBetween={10}
          slidesPerView={Mobile500 ? 1 : 5}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          >
            
          {data.map(movie => (
            <SwiperSlide key={movie.id}>
              <Link  href={`/movie/${movie.id}`}   >
                <Box  width='12rem'
                      borderRadius='5px'
                      overflow='hidden' 
                      cursor='pointer'
                      transition='.3s ease-in-out'
                      textAlign='center'
                      color='gray.500'
                      _hover={{ background:'#242526', boxShadow:"lg", color:'white !important' }}
                      position='relative'
                    >
    
                        <Tag position='absolute' variant="transparent" top='0' right='0' size='lg' color='yellow.300' p='1rem'>
                        <TagLeftIcon boxSize="1rem" as={StarIcon} /> <TagLabel>{movie.vote_average}</TagLabel> </Tag>
                        <Img
                          objectFit="contain" 
                          borderRadius='5px'
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title}    
                          boxShadow='lg'  
                          _hover={{  borderRadius:'0', boxShadow:'0' }}
                        /> 
                        <Heading as="h1" size="sm" isTruncated p='1rem'> {movie.title}  </Heading>
                    </Box>
                </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        </Box>
      </Fragment>
    )
}

export default Swipable
