import Head from "next/head"
import Header from "@/components/Header"
import Pokemon from "@/components/Pokemon"
import { Box, Button, Grid } from '@mui/material'
import { useState } from "react"
import axios from "axios"
import Modal from "@/components/Modal"

interface HomeProps {
  all_results : any
}

function parse_str(url : any) {
  const parts = url.split('/');
  return parts[parts.length - 2];
}

const Home = ({
  all_results,
}: HomeProps) => {
  const [ pokemons, setPokemons ] = useState<any>(all_results)

  const loadBack = async () => {
    axios.get(pokemons.previous).then((res: any) => {
      setPokemons(res.data)
    })
  }

  const loadMore = async () => {
    axios.get(pokemons.next).then((res: any) => {
      setPokemons(res.data)
    })
  }

  return (
    <Box className="relative h-screen bg-black lg:h-[210vh] m-8">
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex" />
      </Head>
      <Modal />
      <Header />
      <Grid
        container
        spacing={5}
        sx={{
          marginTop: '6rem',
        }}
      >
        {pokemons.results.map((item: any) => {
          let id = parse_str(item.url);
          let url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              key={item.name}
              height={400}
            >
              <Pokemon name={item.name} image_url={url} id={id} fetch_url={item.url} />
            </Grid>
          )
        })}
      </Grid>
      {pokemons.previous ? (
        <Button variant="contained" sx={{
          position: 'fixed',
          bottom: '2rem',
          right: '10rem',
        }} color="error" onClick={loadBack}>
          prev page
        </Button>
      ) : null}
      {pokemons.next ? (
        <Button variant="contained" sx={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
        }} color="error" onClick={loadMore}>
          next page
        </Button>
      ) : null}
    </Box>
  )
}

export default Home;

export const getServerSideProps = async () => {
  const result : any = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=30")
  const results : any = await result.json()

  return {
    props: {
      all_results: results,
    }
  }
}

