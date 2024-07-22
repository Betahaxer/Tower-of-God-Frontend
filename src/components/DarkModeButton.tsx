import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { chakra, IconButton, useColorMode, Tooltip } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export function DarkModeButton() {
    const { colorMode, toggleColorMode } = useColorMode()
    const light = colorMode == 'light'
    return (
      <header>
        <Tooltip label={light ? 'Dark Mode' : 'Light Mode'} fontSize={'xs'}>
        <IconButton icon={light ? <MoonIcon/> : <SunIcon/>} aria-label='dark mode' onClick={toggleColorMode}>
            Toggle {light ? 'Dark' : 'Light'}
        </IconButton>
        </Tooltip>
      </header>
    )
}