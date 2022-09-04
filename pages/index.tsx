import {
  Box,
  Center,
  HStack,
  Text,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  TextProps,
  Input,
  ButtonGroup,
  Button,
  ButtonProps
} from '@chakra-ui/react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

interface IProgressText extends TextProps {
  text: string;
}
const ProgressText = ({ text, ...rest }: IProgressText) => {
  return (
    <Text fontWeight="semibold" fontSize="25px" {...rest}>
      {text}
    </Text>
  );
};

interface IActionButton extends ButtonProps {
  text: string;
}
const ActionButton = ({ text, ...rest }: IActionButton) => {
  return (
    <Button
      fontWeight="semibold"
      fontSize="20px"
      height="64px"
      width="170px"
      borderRadius="16px"
      {...rest}>
      {text}
    </Button>
  );
};
export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Center height="100%">
        <VStack spacing="70px">
          <Box width="454px">
            <HStack justifyContent="space-between">
              <ProgressText text="10sec" />
              <ProgressText
                text="9/10"
                variant="secondary"
                textShadow="-1px 0 #FFFFFF, 0 1px #FFFFFF, 1px 0 #FFFFFF, 0 -1px #FFFFFF"
              />
            </HStack>
            <Slider
              aria-label="slider-ex-2"
              colorScheme="actionSecondary"
              defaultValue={90}
              pointerEvents="none"
              opacity="1">
              <SliderTrack backgroundColor="#000000" height="16px" borderRadius="27px">
                <SliderFilledTrack
                  height="10px"
                  borderRadius="27px"
                  left="4px !important"
                  maxWidth="446px"
                />
              </SliderTrack>
            </Slider>
          </Box>

          <Center
            outline="3px solid #000000"
            borderWidth="6px"
            borderColor="actionSecondary.default"
            height="195px"
            width="324px"
            borderRadius="28px"
            boxShadow="inset 0px 0px 0px 3px black">
            <Text fontSize="30px">figma</Text>
          </Center>

          <Box width="558px">
            <Input
              height="64px"
              borderRadius="16px"
              backgroundColor="#000000"
              border="none"
              textAlign="center"
              placeholder="Enter your anagram"
              fontSize="25px"
              _focusVisible={{ outlineColor: 'actionSecondary.default' }}
            />
            <ButtonGroup
              width="100%"
              marginTop="17px"
              gap="20px"
              justifyContent="center"
              fontSize="20px">
              <ActionButton
                colorScheme="actionSecondary"
                text="SUBMIT"
                boxShadow="inset 0px 0px 0px 3px black"
              />
              <ActionButton colorScheme="actionPrimary" text="NO ANAGRAM" />
            </ButtonGroup>
          </Box>
        </VStack>
      </Center>
    </Layout>
  );
}
