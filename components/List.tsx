import { Box,Tag, TagLeftIcon, Img, Heading, TagLabel} from '@chakra-ui/react'
import Link from 'next/link'
import React, {FC} from 'react'
import { StarIcon } from "@chakra-ui/icons"

const List = ({results}) => {
    return (
        results.map(movie => (
            <Link  key={movie.id} href={`/movie/${movie.id}`}   >
              <Box  width='100%'
                    borderRadius='5px'
                    overflow='hidden' 
                    cursor='pointer'
                    transition='.3s ease-in-out'
                    textAlign='center'
                    color='gray.500'
                    _hover={{ background:'gray.500', boxShadow:"lg", color:'white !important' }}
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
                      <Heading as="h1" size="md" isTruncated p='1rem'> {movie.title}  </Heading>
                  </Box>
              </Link>
          ))
    )
}

export default List
