import MuiModal from "@mui/material/Modal";
import { Box, Button } from "@mui/material";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";
import { actions } from "@/store";

function Modal() {
  const dispatch = useDispatch();
  
  const store_pokemon = useSelector((state: any) => state.pokemon)
  const store_modalOpen = useSelector((state: any) => state.modalOpen)

  const [ showModal, setShowModal ] = useState(store_modalOpen);
  const [ pokemon, setPokemon ] = useState<any>(store_pokemon);

  useEffect(() => {
    setShowModal(store_modalOpen)
  }, [store_modalOpen])

  useEffect(() => {
    setPokemon(store_pokemon)
  }, [store_pokemon])

  useEffect(() => {
    dispatch(actions.setPokemon(pokemon))
  }, [pokemon])

  useEffect(() => {
    dispatch(actions.setModalOpen(showModal))
  }, [showModal])

  return (
    <MuiModal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '700px',
        bgcolor: '#282828',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box className="flex flex-col items-center w-full h-[95%] bg-gray-800 rounded-lg overflow-y-scroll overflow-x-hidden">
        {/* create a fixed button at the top left to close modal */}
        <Button
          className="absolute top-0 right-0"
          sx={{
            backgroundColor: '#222222',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#3d3b3b',
            },
          
          }}
          onClick={() => setShowModal(false)}
        >
          X
        </Button>

        <Image
          src={pokemon?.sprites?.front_default}
          alt={pokemon?.name}
          className="w-64 h-64 object-contain"
          width={300}
          height={300}
          unoptimized={true}
        />
        <h1 className="text-3xl font-bold text-white uppercase">{pokemon?.name}</h1>
        <p className="text-xl text-white">Height: {pokemon?.height}</p>
        <p className="text-xl text-white">Weight: {pokemon?.weight}</p>
        <p className="text-xl text-white">Base Experience: {pokemon?.base_experience}</p>
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            height: 'auto',
            backgroundColor: '#120f11',
            borderRadius: '0.1rem',
            padding: '1rem',
            margin: '1rem',
            top: 0,
          }}
        >
          <h1 className="text-sm font-bold uppercase">Abilities</h1>
          {pokemon?.abilities?.map((item: any) => (
            <h1 className="text-gray-400 capitalize" key={item.ability.name}>{item.ability.name}</h1>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            height: 'auto',
            backgroundColor: '#120f11',
            borderRadius: '0.1rem',
            padding: '1rem',
            margin: '1rem',
            top: 0,
          }}
        >
          <h1 className="text-sm font-bold uppercase">All Moves</h1>
          {pokemon?.moves?.map((item: any) => (
            <h1 className="text-gray-400 capitalize" key={item.move.name}>{item.move.name}</h1>
          ))}
        </Box>
      </Box>
    </MuiModal>
  )
}

export default Modal