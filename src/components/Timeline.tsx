import {
    Text,
    VStack,
    HStack,
    useColorModeValue,
    Box,
    Image,
    Divider,
    CardBody,
    CardHeader,
    Flex,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Link,
    useBreakpointValue,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { motion, useInView } from 'framer-motion';

interface Event {
    title: string;
    description: string; // ISO 8601 string for the date
    link: string
}
interface Props {
    events: Event[]
}

function Timeline({ events }: Props) {
    // Check dates
    const now = new Date()
    let nextEventIndex = 0
    for (let i = 0; i < events.length; i++) {
        const eventDate = new Date(events[i].description)
        events[i].description = eventDate.toLocaleString("en-US")
        if (now > eventDate && nextEventIndex < events.length) {
            nextEventIndex++;
        }
    }

    // Breakpoints to change size of timeline
    const sizes = useBreakpointValue(
        {
            base: 'lg',
            sm: 'xs',
            md: 'xs',
            lg: 'lg',
            xl: 'lg'
        },
        { ssr: false }
    )

    return (
        <Stepper
            w='100%' 
            size={sizes} 
            index={nextEventIndex}
        >
            {events.map((step, index) => (
                <Step key={index}>
                <StepIndicator>
                    <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                    />
                </StepIndicator>

                <Box flexShrink='0'>
                    {nextEventIndex > index ?
                        <Link href={step.link} color='teal.500'>
                            <StepTitle>{step.title}</StepTitle>
                        </Link>
                        : <StepTitle>{step.title}</StepTitle>}
                    <StepDescription>{step.description}</StepDescription>
                </Box>

                <StepSeparator />
                </Step>
            ))}
        </Stepper>
    )
}

export default Timeline