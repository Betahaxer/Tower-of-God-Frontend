import {
    Text,
    VStack,
    HStack,
    useColorModeValue,
    Box,
    Image,
    Divider,
} from "@chakra-ui/react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

interface Props {
    e1: string
    e2: string
    img: string
}

function ExplanationDiv({e1, e2, img}:Props) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: false, amount: 0.7 })
    
    return (
        <HStack
            ref={ref}
            as={motion.section}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 100}}
            style={{transition: '1s', overflowX: 'hidden'}}
            spacing={'5vw'}
        >
            <Image
                w={'40%'} 
                h={'auto'} 
                src={img} 
                alt={e1 + '-img'} 
                borderRadius='lg' 
                border={'1px'}
                borderColor={useColorModeValue('teal.50', 'teal.700')}
            />
            <VStack
                spacing={'10vh'}
            >
                <Text fontSize={'2xl'}>
                    {e1}
                </Text>
                <Text fontSize={'2xl'}>
                    {e2}
                </Text>
            </VStack>
        </HStack>
    )
}

export default ExplanationDiv