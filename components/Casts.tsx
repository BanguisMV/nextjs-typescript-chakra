import React, { FC, useEffect, useState,Fragment } from 'react'
import {  Avatar,Text,Flex,Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"

import Link from 'next/link'
interface Props  {
    id:string;
}

export interface Casts {
    id:   number;
    cast?: Cast[];
    crew?: Cast[];
}

export interface Cast {
    adult:                boolean;
    gender:               number;
    id:                   number;
    known_for_department: string;
    name:                 string;
    original_name:        string;
    popularity:           number;
    profile_path:         null | string;
    cast_id?:             number;
    character?:           string;
    credit_id:            string;
    order?:               number;
    department?:          string;
    job?:                 string;
}


const Casts:FC<Casts> = ({ id }) => {
    const [loading , setLoading] = useState<boolean>(true)
    const [casts , setCasts] = useState<Cast[]>([])
    const [crews , setCrews] = useState<Cast[]>([])

    useEffect(() => {
    
    setLoading(true)
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c24e2e0c38251c16e41291ca0067c75d`)
        .then(res => res.json())
        .then(data => {
        setCasts(data.cast)   
        setCrews(data.crew) 
        setLoading(false)
    })

    },[])


    return (
    

<Tabs colorScheme="gray" variant="enclosed" _selected={{ color:"white", fontWeight:"bold"}}>
  <TabList>
    <Tab color='white'>Casts</Tab>
    <Tab color='white'>Crew</Tab>
  </TabList>

  <TabPanels>
    <TabPanel >
    <Flex flexDirection='row' wrap='wrap' justifyContent='space-between'>
        {casts.map(cast => 
            <Link href={`/people/${cast.id}`} key={cast.id.toString() + cast.credit_id.toString()}>
                <Avatar size="md" name={cast.original_name} 
                cursor='pointer'
                transition='.3s ease-in-out'
                _hover={{ transform:"scale(1.1)", boxShadow:"lg"}}
                src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`} 
                m={3} 
                />
            </Link>
        )}
        </Flex>
    </TabPanel>
    <TabPanel>
        <Flex flexDirection='row' wrap='wrap' justifyContent='space-between'>
            {crews.map(crew => 
                <Link href={`/people/${crew.id}`} key={crew.id.toString() + crew.credit_id.toString()}>
                    <Avatar size="md" name={crew.original_name} 
                    cursor='pointer'
                    transition='.3s ease-in-out'
                    _hover={{ transform:"scale(1.1)", boxShadow:"lg"}}
                    src={`https://image.tmdb.org/t/p/original/${crew.profile_path}`} 
                    m={3} 
                    />
                </Link>
            )}
        </Flex>
    </TabPanel>
  </TabPanels>
</Tabs>

    )
}

export default Casts
