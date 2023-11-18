import { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Typography } from '@mui/material';
import { List } from '@mui/material';
import Image from "next/image";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: '5.5rem',
        width: '100%',
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        backgroundColor: '#0c0c0c',
        color: 'white',
        justifyContent: 'space-around',
        alignItems: 'center',
    }}>
      <Image
        src="/imgs/logo.svg"
        width={150}
        height={150}
        draggable={false}
        alt="Pokedex"
        className="cursor-pointer object-contain"
        unoptimized={true}
        onClick={() => {
          router.reload();
        }}
      />

      <List
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '20%',
          height: '100%',
      }}>
        <Link href="#">Home</Link>
        <Link href="#">About</Link>
        <Link href="https://www.pokemon.com/us" target="_blank">Official Page</Link>
        <Link href="https://github.com/P55D2K/redux-mui-pokedex-app" target="_blank">Source Code</Link>
      </List>
    </Box>
  )
}

export default Header;