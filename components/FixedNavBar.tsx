import  { FC } from 'react'
import {StackDivider, VStack,Box } from "@chakra-ui/react"


  
export const Discovers = [
    { id: 'popular', name: "Popular" },
    { id: 'top_rated', name: "Top Rated" },
    { id: 'upcoming', name: "Upcoming" },
  ]

 export const Categories = [
      {id: 28, name: "Action"},
      {id: 12, name: "Adventure"},
      {id: 16, name: "Animation"},
      {id: 35, name: "Comedy"},
      {id: 80, name: "Crime"},
      {id: 99, name: "Documentary"},
      {id: 18, name: "Drama"},
      {id: 10751, name: "Family"},
      {id: 14, name: "Fantasy"},
      {id: 36, name: "History"},
      {id: 27, name: "Horror"},
      {id: 10402, name: "Music"},
      {id: 9648, name: "Mystery"},
      {id: 10749, name: "Romance"},
      {id: 878, name: "Science Fiction"},
      {id: 10770, name: "TV Movie"},
      {id: 53, name: "Thriller"},
      {id: 10752, name: "War"},
      {id: 37, name: "Western"},
    ];


const FixedNavBar:FC = () => {
    return (
        
        <VStack
        // divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        w="20rem" 
        p='1rem'
        >
            {Categories.map(category => (
            <Box h="3rem" bg="gray.200" key={category.id}>
                {category.name}
            </Box>
            ))}
      

        </VStack>
    )
}

export default FixedNavBar
