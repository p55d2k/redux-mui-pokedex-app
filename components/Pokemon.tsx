import React, { use, useEffect, useState } from 'react'
import axios from "axios"
import { Box } from "@mui/material"
import { useSelector, useDispatch } from "react-redux";
import { actions } from "@/store";
import Image from "next/image"

interface PokemonProps {
  name: string
  image_url: string
  fetch_url: string
  id: string
}

const Pokemon = ({
  name,
  image_url,
  fetch_url,
  id,
}: PokemonProps) => {
  const dispatch = useDispatch();

  const store_pokemon = useSelector((state: any) => state.pokemon)
  const store_modalOpen = useSelector((state: any) => state.modalOpen)

  const handleClick = () => {
    console.log(fetch_url)
    if (fetch_url) {
      axios.get(fetch_url).then((res) => {
        dispatch(actions.setPokemon(res.data))
      })
    }
    dispatch(actions.setModalOpen(true))

    console.log(store_pokemon)
    console.log(store_modalOpen)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#3d3b3b',
        borderRadius: '0.1rem',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: '#282828',
          cursor: 'pointer',
        },
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
          width: '104%',
          height: '3rem',
          backgroundColor: '#120f11',
          borderRadius: '0.1rem',
          padding: '0.2rem',
          top: 0,
        }}
      >
        <h1 className="text-sm font-bold uppercase">{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        <h1 className="text-gray-400">#{id}</h1>
      </Box>
      <Image
        src={image_url}
        width={300}
        height={300}
        draggable={false}
        alt={name}
        className="cursor-pointer object-contain"
        unoptimized={true}
      />
    </Box>
  )
}

export default Pokemon