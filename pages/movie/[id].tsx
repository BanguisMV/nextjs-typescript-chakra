import React,{ FC,Fragment} from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { Data } from './types'
import { Box,Img,VStack,Text, Tag, TagLeftIcon, TagLabel, Flex,HStack,useMediaQuery ,Divider, Avatar, Container  } from '@chakra-ui/react'
import { StarIcon, TimeIcon } from '@chakra-ui/icons'
import Casts from '../../components/Casts'

interface Props {
    data: Data
}

function addCommas(num) {
    var characters = parseInt(num, 10).toString();
    var output = '';
    for (var offset = characters.length; offset > 0; offset -= 3) {
        output = characters.slice(Math.max(offset - 3, 0), offset) + (output ? ',' + output : '');
    }
    return output;
}

const movie:FC<Props> = ({ data }) => {
    const router = useRouter()
    const [isMobile] = useMediaQuery("(max-width: 760px)")
    const language = data.spoken_languages.map(language => language.english_name)
    const companies = data.production_companies.map(company => company)
    const countries = data.production_countries.map(country => country)

    return (
        <Fragment>
            <Img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} 
                alt={data.original_title} 
                borderRadius='5px'
                boxShadow='md' 
                height={isMobile ? "100%" : '28rem'}
                width={isMobile ? "100%" : '100%'}
                _hover={{ boxShadow:'lg'}}
            />   

        <VerticalOrHorizontal isMobile={!isMobile}>

        
            {/* <Box  _hover={{ boxShadow:'lg'}} flex={1} 
            width='28rem' 
            position='relative' 
            marginRight={!isMobile && '-3.5rem'}>
            <Box position={isMobile ? "static" : 'fixed'} >
                
            <Img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} 
                alt={data.original_title} 
                borderRadius='5px'
                boxShadow='md' 
                height={isMobile ? "100%" : '28rem'}
                width={isMobile ? "100%" : 'auto'}
                _hover={{ boxShadow:'lg'}}
            />    

            <Flex justifyContent='space-between' alignItems='center' p={2}>
            <Text fontSize="2xl"  color='white'>{data.original_title}</Text>
            <Tag variant="transparent" size='lg' color='yellow.300' pt='15px' fontSize='1rem'>
                <TagLeftIcon boxSize="1rem" as={StarIcon} /> 
                <TagLabel >{data.vote_average}</TagLabel> 
            </Tag>  
 
            </Flex>
            <Flex justifyContent='space-between' alignItems='center' p={2}>
            <Text fontSize="1xl"  color='gray'>{data.tagline}</Text>
            <Tag variant="transparent" size='lg' color='yellow.300' fontSize='1rem'>
                <TagLeftIcon boxSize="1rem" as={ TimeIcon } /> 
                <TagLabel >{data.runtime} min</TagLabel> 
            </Tag>  
 
            </Flex>
            </Box>   
            </Box> */}

 
            <Box bg='#242526' boxShadow='md' rounded='lg' padding='1rem' _hover={{ boxShadow:'lg'}} flex={2}>
            <Box textAlign='center'>
            <Text fontSize="3xl"  color='white'>{data.original_title}</Text>
            <Text fontSize="1xl"  color='gray'>{data.tagline}</Text>
            <Tag variant="transparent" size='lg' color='yellow.300' fontSize='1rem'>
                <TagLeftIcon boxSize="1rem" as={StarIcon} /> 
                <TagLabel >{data.vote_average}</TagLabel> 
            </Tag>  
 
            </Box>
        
                
                <Text fontSize="2xl"  color='white'>Plot</Text>
                <Text fontSize="1xl"  color='gray.300' m={2}>&nbsp; &nbsp; {data.overview}</Text>       

                <Text fontSize="2xl"  color='white' my='2'>Language</Text>
 
                { language ? language.map((lang, index )=> (
                <Tag  size='xs' p='8px' m='2' fontSize='1rem' variant='solid' key={index}>
                    <TagLabel >{lang}</TagLabel> 
                </Tag>  
                )) : 
                <Tag  size='xs' p='8px' mx='2' fontSize='10px' variant='solid'>
                    <TagLabel >No Language Found</TagLabel> 
                </Tag>  
                
                }
                <Text fontSize="2xl"  color='white' my='2'>Revenue</Text>
                <Tag  size='xs' p='8px' mx='2' fontSize='1rem' variant='transparent' color='white'>
                    <TagLabel >${addCommas(data.revenue)}</TagLabel> 
                </Tag> 
<VerticalOrHorizontal isMobile={!isMobile}>

            <VStack padding='1rem 0'   align="stretch" spacing={4}>
    
            <Text fontSize="2xl"  color='white' my='2'>Production Companies</Text>

            { companies ? companies.map((company, index )=> (
            <Tag  size='xs' p='8px' m='2' fontSize='1rem' variant='transparent' key={company.id} color='gray.300'>
            <Avatar size="xs" name={company.name} src={`https://image.tmdb.org/t/p/original/${company.logo_path}`} marginRight='1rem'/>
            <TagLabel > {company.name} </TagLabel> 
            </Tag>  
            )) : 
            <Tag  size='xs' p='8px' m='2' fontSize='10px' variant='solid'>
                <TagLabel >No companies Found</TagLabel> 
            </Tag>  

            }
            </VStack>

            <VStack padding='1rem 0'   align="stretch" spacing={4}>
            <Text fontSize="2xl"  color='white' my='2'>Production Companies</Text>
            { countries ? countries.map((country, index )=> (
            <Tag  size='xs' p='8px' m='2' fontSize='1rem' variant='transparent' key={country.iso_3166_1} color='gray.300'>
            <TagLabel > {country.name} </TagLabel> 
            </Tag>  
            )) : 
            <Tag  size='xs' p='8px' m='2' fontSize='10px' variant='solid'>
                <TagLabel >No countries Found</TagLabel> 
            </Tag>  
            }
           </VStack>

           </VerticalOrHorizontal>
            </Box>

            <Box bg='#242526' boxShadow='md' rounded='lg' padding='1rem' _hover={{ boxShadow:'lg'}} flex={1} >
                <Casts id={data.id}/>
            </Box>
            

        </VerticalOrHorizontal>

        </Fragment>
    )
}

export default movie

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  
const {id} = query

const getData = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`)
const data = await getData.json()
    return {
        props: { data }, // will be passed to the page component as props
      }
}
  
interface IVerticalOrHorizontal {
    isMobile:boolean
}
const VerticalOrHorizontal:FC<IVerticalOrHorizontal> = (props) => {
    return (
        props.isMobile ? 
        <HStack padding='1rem 0'  align="flex-start" spacing={4}>
            {props.children}
        </HStack>   
        : 
        <VStack padding='1rem 0'   align="stretch" spacing={2}>
        {props.children}
        </VStack> 
    )
}