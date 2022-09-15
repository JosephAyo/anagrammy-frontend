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
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import Head from 'next/head';
import { useState } from 'react';
import Layout, { siteTitle } from '../components/layout';
import useSocket from '../services/socket';

interface IProgressText extends TextProps {
  text: string;
}
const ProgressText = ({ text, ...rest }: IProgressText) => {
  return (
    <Text fontWeight="semibold" fontSize={[18, 25]} {...rest}>
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
      fontSize={[14, 20]}
      height="64px"
      width="170px"
      borderRadius="16px"
      {...rest}>
      {text}
    </Button>
  );
};
export default function Home() {
  const [inputState, setInputState] = useState('');
  const { question, game, answerQuestion, shouldPlayAgain, setShouldPlayAgain } = useSocket();

  const handleAnswerAction = (hasAnagram: boolean) => {
    answerQuestion({
      gameId: game.id,
      questionId: question.id,
      word: question.word.word,
      anagram: inputState,
      has_anagram: hasAnagram
    });
    setInputState('');
  };

  const checkIfGameIsCompleted = () => {
    return game.correct_count + game.fail_count >= game.total_levels;
  };
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Center height="100%">
        {game && (
          <VStack spacing="70px">
            <Box width={[300, 454]}>
              <HStack justifyContent="space-between">
                <HStack>
                  <HStack spacing="5px">
                    <ProgressText
                      text={`${game.correct_count}`}
                      variant="secondary"
                      textShadow="-1px 0 #FFFFFF, 0 1px #FFFFFF, 1px 0 #FFFFFF, 0 -1px #FFFFFF"
                    />
                    <CheckIcon fontSize={[14, 20]} />
                  </HStack>
                  <HStack spacing="5px">
                    <ProgressText
                      text={`${game.fail_count}`}
                      variant="secondary"
                      textShadow="-1px 0 #FFFFFF, 0 1px #FFFFFF, 1px 0 #FFFFFF, 0 -1px #FFFFFF"
                    />
                    <CloseIcon fontSize={[14, 20]} />
                  </HStack>
                </HStack>
                <ProgressText
                  text={`${game.current_level}/${game.total_levels}`}
                  variant="secondary"
                  textShadow="-1px 0 #FFFFFF, 0 1px #FFFFFF, 1px 0 #FFFFFF, 0 -1px #FFFFFF"
                />
              </HStack>
              <Slider
                aria-label="slider-ex-2"
                colorScheme="actionSecondary"
                defaultValue={0}
                value={(game.current_level / game.total_levels) * 100}
                pointerEvents="none"
                opacity="1">
                <SliderTrack backgroundColor="#000000" height="16px" borderRadius="27px">
                  <SliderFilledTrack
                    height="10px"
                    borderRadius="27px"
                    left="4px !important"
                    maxW={[292, 446]}
                  />
                </SliderTrack>
              </Slider>
            </Box>
            <Center
              outline="3px solid #000000"
              borderWidth="6px"
              borderColor="actionSecondary.default"
              height={[160, 195]}
              width={[300, 324]}
              borderRadius="28px"
              boxShadow="inset 0px 0px 0px 3px black">
              {checkIfGameIsCompleted() ? (
                <Text fontSize={[22, 30]}>Game complete</Text>
              ) : (
                question && <Text fontSize={[22, 30]}>{question.word.word}</Text>
              )}
            </Center>

            <Box width={[300, 454]}>
              {!checkIfGameIsCompleted() && (
                <Input
                  height={[50]}
                  borderRadius="16px"
                  backgroundColor="#000000"
                  border="none"
                  textAlign="center"
                  placeholder="Enter your anagram"
                  fontSize={[18, 25]}
                  _focusVisible={{ outlineColor: 'actionSecondary.default' }}
                  value={inputState}
                  onChange={(e) => setInputState(e.target.value)}
                />
              )}
              <ButtonGroup width="100%" marginTop="17px" gap="20px" justifyContent="center">
                {checkIfGameIsCompleted() ? (
                  <ActionButton
                    colorScheme="actionSecondary"
                    text="PLAY AGAIN"
                    boxShadow="inset 0px 0px 0px 3px black"
                    onClick={() => setShouldPlayAgain(!shouldPlayAgain)}
                  />
                ) : (
                  <>
                    <ActionButton
                      colorScheme="actionSecondary"
                      text="SUBMIT"
                      boxShadow="inset 0px 0px 0px 3px black"
                      onClick={() => handleAnswerAction(true)}
                    />
                    <ActionButton
                      colorScheme="actionPrimary"
                      text="NO ANAGRAM"
                      onClick={() => handleAnswerAction(false)}
                    />
                  </>
                )}
              </ButtonGroup>
            </Box>
          </VStack>
        )}
      </Center>
    </Layout>
  );
}
