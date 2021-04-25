import { GetServerSideProps } from 'next'
import React from 'react'

const people = ({ data }) => {
    console.log(data)
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}

export default people

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    const { id } = query 
    const getData = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
    const data = await getData.json()
        return {
            props: { data }, // will be passed to the page component as props
          }
    }
      