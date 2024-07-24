import {
    Text,
    VStack,
    SimpleGrid,
    useColorModeValue,
    Box,
    Image,
    Divider,
} from "@chakra-ui/react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import FeatureCard from "../components/FeatureCard";
import HorizontalScrollBox from "../components/HorizontalScrollBox";
import Timeline from "../components/Timeline";
import ExplanationDiv from "../components/ExplanationDiv";

// Data for explanations
const explanations = [
    {
        e1: 'Choosing the right electronic gadget like a phone, earpiece, or laptop can be overwhelming due to the abundance of online reviews.',
        e2: 'Our project aims to simplify this process, helping users quickly find the best products without the hassle.',
        img: 'gadgets.jpeg'
    }, 
    {
        e1: 'Choice is an AI-powered web application designed to help users find electronic products that meet their needs.',
        e2: 'By summarizing pros, cons, and key information, Choice enables informed decisions with minimal effort.',
        img: 'product_page.png',
    }
]

// Data for features
const features = [
    { 
        title: 'Authentication', 
        description: 'Users can log in with a username/password. Or via a Google account. Authentication is done via JWT tokens', 
        image: 'login_page.png' 
    },
    { 
        title: 'Searching and filtering', 
        description: 'Users can search, filter, and sort products by various criteria. The search bar supports fuzzy search for accurate results despite spelling errors. Full-text search and filter options improve search relevance.', 
        image: 'filter.png' 
    },
    { 
        title: 'Web scraping', 
        description: 'Web scrapers gather data from trusted review sites, Google images, and Amazon for prices. Scrapers are currently for local use, employing Selenium for precision data extraction.', 
        image: 'web_scraping.jpeg'
    },
    { 
        title: 'Recommendation cards', 
        description: 'Search results show product cards with images, prices, descriptions, and pros/cons. Card also have ratings, pricing and infinite scrolling. Clicking on cards would lead to detailed product pages.', 
        image: 'product_card.png' 
    },
    { 
        title: 'Compare products', 
        description: 'Users can compare two products side-by-side by going to the compare page. A beautifully designed page displays the products for easy comparison.', 
        image: 'compare.png' 
    },
    { 
        title: 'Wishlist', 
        description: 'Users can save favorite products for future reference. They can add items to wishlist, search through wishlist items and delete wishlist items.', 
        image: 'wishlist.png' 
    },
    { 
        title: 'Search history', 
        description: 'Save users\' search queries for easy reference and to remind them of previously viewed products. Future feature will allow users to scroll through previous search results.', 
        image: '' 
    },
];

// Data for timeline
const timeline = [
    { title: 'Milestone 1', description: '2024-06-03T14:00:00+08:00', link: 'https://docs.google.com/document/d/1Hmzac2VjngFy3Iu5UI5G65rnbwkV81lj/edit?usp=sharing&ouid=113688905247978511636&rtpof=true&sd=true' },
    { title: 'Milestone 2', description: '2024-07-01T14:00:00+08:00', link: 'https://docs.google.com/document/d/1TdVFlSFwOENyJTtDTK4TvGsSBXxZupie/edit?usp=sharing&ouid=113688905247978511636&rtpof=true&sd=true' },
    { title: 'Milestone 3', description: '2024-07-29T14:00:00+08:00', link: '' },
    { title: 'Splashdown', description: '2024-08-28T14:00:00+08:00', link: '' },
]

// Data for tech stack logos
const logos = [
    'logos/django.png',
    'logos/react.png',
    'logos/selenium.png',
    'logos/chakra.jpeg',
    'logos/gemini.png',
    'logos/github.png',
    'logos/vercel.png',
    'logos/render.jpg',
    'logos/azure.png',
]

// About page
export function AboutPage(){
    // Explanation divs
    const explanationDivs = explanations.map((explanation, index) => (
        <ExplanationDiv
            e1={explanation.e1}
            e2={explanation.e2}
            img={explanation.img}
        />
    ));

    // Horizontal scroll cards
    const featureCards = features.map((feature, index) => (
        <FeatureCard 
            key={index} 
            title={feature.title} 
            description={feature.description} 
            image={feature.image}
        />
    ));

    // Tech stack icons
    const techStackIcons = logos.map((logo, index) => (
        <Image 
            h='10vh'
            key={index} 
            src={logo} 
            alt={logo + '-img'}
        />
    ))

    // Animation stuff below
    // Animations for some components are done in their respective components

    // Animation for feature cards
    const featureCardRef = useRef(null)
    const featureCardInView = useInView(featureCardRef, { once: false, amount: 0.6 })

    // Animation for timeline
    const timelineRef = useRef(null)
    const timelineInView = useInView(timelineRef, { once: false, amount: 0.6 })

    // Animation for techstack
    const techStackRef = useRef(null)
    const techInView = useInView(techStackRef, { once: false, amount: 0.5 })

    return (
        <VStack overflow="hidden">
            <Box position="relative" h="91.5vh" w="100%" overflow="hidden">
                <Box
                    as="video"
                    autoPlay
                    loop
                    muted
                    position="absolute"
                    top="50%"
                    left="50%"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    transform="translate(-50%, -50%)"
                    zIndex="-1"
                    overflow='hidden'
                >
                    <source src="fantasy_tower_vid_1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </Box>
                <Box
                    // gray translucent layer
                    position="absolute"
                    top="0"
                    left="0"
                    w="100%"
                    h="100%"
                    bg="rgba(0, 0, 0, 0.3)" 
                    zIndex="-1"
                />
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    zIndex="0"
                    h="100%"
                    w="100%"
                >
                    <VStack>
                        <Text fontSize="6xl" color={'white'} fontWeight={'semibold'}>
                            Effortless electronics shopping
                        </Text>
                        <Text fontSize='4xl' color={'white'}>
                            Discover, compare, choose
                        </Text>
                    </VStack>
                </Box>
            </Box>
            <Box 
                minH='150vh' 
                maxW='85%'
                zIndex="0"
            >
                <VStack
                    spacing={'5vh'}
                >
                    <Text 
                        fontSize="5xl"
                    >
                        Simplify your search
                    </Text>
                    {explanationDivs}
                </VStack>
            </Box>
            <Box 
                minH='80vh' 
                w='100%'
                paddingBlock={'10vh'}
                overflow='hidden'
            >
                <VStack
                    spacing='5vh'
                >
                    <Box w='85%'>
                        <Text fontSize='5xl'>
                            Features Overview
                        </Text>
                        <Divider borderWidth={'1px'} borderColor={useColorModeValue('grey.300', 'grey.200')}/>
                    </Box>
                    <HorizontalScrollBox components={featureCards}/>
                </VStack>
            </Box>
            <Box
                ref={timelineRef} 
                as={motion.div}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: timelineInView ? 1 : 0, x: timelineInView ? 0 : 100}}
                transition={{type: 'spring', stiffness: '25'}}
                overflow='hidden'
                minH='35vh' 
                w='100%'
            > 
                <VStack spacing='2vh'>
                    <Text fontSize='4xl'>
                        Timeline
                    </Text>
                    <Box w='90%'>
                        <Timeline events={timeline}/>
                    </Box>
                </VStack>
            </Box>
            <VStack
                minH='65vh' 
                w='90%'
                spacing='3vh'
                alignItems='center'
            >
                <Divider borderWidth={'1px'} borderColor={useColorModeValue('grey.300', 'grey.200')}/>
                <VStack 
                    ref={techStackRef} 
                    as={motion.div}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: techInView ? 1 : 0, y: techInView ? 0 : 100}}
                    transition={{type: 'inertia', stiffness: '25', duration:'1s'}}
                    spacing='4vh'
                >
                    <Text fontSize='4xl' paddingBlockEnd='3vh'>
                        Tech Stack
                    </Text>
                    <SimpleGrid
                        columns={5}
                        spacing='5vw'
                    >
                        {techStackIcons}
                    </SimpleGrid>
                </VStack>
            </VStack>
        </VStack>
    )
}