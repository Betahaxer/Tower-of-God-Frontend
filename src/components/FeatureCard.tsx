import {
    Text,
    Card,
    Image,
    CardBody,
    CardHeader,
    Button,
    Box,
    Stack,
    Flex,
    VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { motion, transform, useAnimation } from 'framer-motion';

//Feature cards
interface Props {
    title: string;
    description: string;
    image: string;
}

function FeatureCard({ title, description, image }: Props) {
    const [flipped, setFlipped] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const handleClick = () => {
        if (!isAnimating) {
            setIsAnimating(true)
            setFlipped(!flipped)
        }
    }

    const sentences = description.split('. ').map((sentence, index) => (
        <Text 
            key={index} 
            fontSize='xl'
            style={{overflowWrap: 'break-word', whiteSpace: 'pre-wrap',}}
        >
          {sentence.trim()}{index < description.split('. ').length - 1 ? '.' : ''}
        </Text>
    ));

    return (
        <Box
            as={motion.div}
            onClick={handleClick}
            _hover={{ cursor: 'pointer'}}
            initial={false}
            animate={{rotateY: flipped ? 180 : 360}}
            onAnimationComplete={() => setIsAnimating(false)}
            style={{ perspective: 1000, transition: '0.6s', transformStyle: 'preserve-3d'}}
        >
            <Card 
                variant='filled'
                w='sm' 
                h='65vh'
                maxW='sm' 
                overflow={'hidden'}
            >
                {!isAnimating ?
                    flipped ? (
                        // Back of feature card
                        <CardBody style={{transform: 'rotateY(180deg)'}}>
                            <VStack 
                                direction="column" 
                                justify="center" 
                                align="left" 
                                height="full"
                                spacing='5%'
                            >
                                {sentences}
                            </VStack>
                        </CardBody>
                        ) : (
                        // Front of feature card
                        <>
                        <CardHeader>
                            <Text 
                                fontSize='3xl'
                                style={{overflowWrap: 'break-word', whiteSpace: 'pre-wrap'}}
                            >
                                {title}
                            </Text>
                        </CardHeader>
                        <CardBody>
                            <Image h='35vh' w='100%' src={image} alt={title + '-image'} overflow={'hidden'}/>
                        </CardBody>
                        </>
                    ) : <></> // Empty card when flipping
                }
            </Card>
        </Box>
    )
}

export default FeatureCard;