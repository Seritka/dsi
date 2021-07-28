import { Box, Text } from '@chakra-ui/react'

const FooterComponent: React.FC<FooterProps> = ({ isCode }: FooterProps) => {
    return (
        <Box as="footer" role="contentinfo" position="fixed" textAlign="center" bottom="0" padding="15px 0" width="100%">
          <Text as="h6" fontSize="12px" color={isCode ? "black" : "white"} opacity="85%"  isTruncated>
            <button onClick={() => alert("행신고 대표 동아리: 코딧") }>© 2021. 행신고등학교 CodIT 동아리 All rights reserved.</button>
            </Text>
      </Box>
    );
}

interface FooterProps {
    isCode: boolean
}

export default FooterComponent