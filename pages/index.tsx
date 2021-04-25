import { Grid, Stack  } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import List from '../components/List';
import { Results } from '../components/types';
import Swipable from "../components/Swipable";


export default function Home({ trending,topRated,upcoming }) {
  const movies:Results = trending
  const { results } = movies

  return (
    <Stack p='1rem' > 
 
    <Swipable data={results} title='Trending' />

    <Swipable data={topRated.results} title='Top Rated' />

    <Swipable data={upcoming.results} title='Up Coming' />
{/* 
    <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={8}>
      <List results={results} />
    </Grid> */}

    </Stack>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const getTrendingData = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=1&include_adult=true`)
  const getTopData = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=1&include_adult=true`)
  
  const getUpcomingData = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&page=1&include_adult=true`)

  const topRated = await getTopData.json()
  const trending = await getTrendingData.json()
  const upcoming = await getUpcomingData.json()


  //
  return {
    props: { trending, topRated,upcoming }, // will be passed to the page component as props
  }
}
