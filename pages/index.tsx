import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Button, Flex, Heading, Badge, Text } from '@chakra-ui/react'
import { secureStorage } from '@utils/secureStorage'
import styles from '@styles/Home.module.css'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import JsBarcode from 'jsbarcode'

const FooterComponent = dynamic(() => import('@components/Footer'))

export default function Home() {
  const router = useRouter()
  const [code, setCode] = React.useState<string | null>(null)
  const [qr, setQr] = React.useState<string>()
  const [date, setDate] = React.useState<Date>(new Date())

  useEffect(() => {
    //devtools 차단
    secureStorage.getItem('code').then((tempCode: string) => setCode(tempCode === undefined || tempCode == ''  ? null : tempCode))

    if (code === null) return
    const canvas = document.createElement("canvas")
    JsBarcode(canvas, code, { height: 50, displayValue: false, background: '#FFFFFF' })
    setQr(canvas.toDataURL('image/png'))
  }, [code, qr])

  useMemo(() => {
    let id = setInterval(() => setDate(new Date()), 1000)
    return () => {
      clearInterval(id)
    }
  }, [])


  if (code !== null) {
    //바코드 띄우기
    return (
        <>
          <Flex align="center" p={20} bgColor="#5991CC"/>
          <div className={styles.barcode}>
            <Flex height="34vh" alignItems="center" justifyContent="center" pointerEvents="none">
              <Badge verticalAlign="middle"
                display="inline-block"
                width="280px"
                border="solid 5px white"
                borderRadius="8px"
                backgroundColor="white"
                boxShadow="base"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                textAlign="center">
                  <br/>
                  <Text fontSize="3xl">김택우</Text>
                  <Text fontSize="xl">10505</Text>
                  <br/>
                  <Text fontSize="xs" fontWeight="600">
                    유효기간:&nbsp;{String(date.getFullYear()).slice(0, 2) + code.slice(1, 3)}~{String(date.getFullYear()).slice(0, 2) + (Number(code.slice(1, 3))+3)}
                  </Text>
                  <Text fontSize="xs" color="gray.600" textAlign="center" fontWeight="600">
                    위 사람은 본교 학생임을 증명함.
                  </Text>
                  <br/>
                  <Text fontSize="xs" textAlign="center" fontWeight="600" marginBottom="8px">유효성 증명</Text>
                  <Text fontSize="xs"
                    fontWeight="570"
                    bgColor="#FFD8D8"
                    borderRadius="5px"
                    border="solid 3px #FFD8D8"
                    boxShadow="base"
                    color="#FF6767"
                    as="mark"
                    textAlign="center">
                    {date.getMonth()+1}월 {date.getDate()}일 {Number(date.getHours()) > 12 ? "오후" : "오전"} {Number(date.getHours()) >= 12 ? (date.getHours()-12).toFixed() : date.getHours()}시  {date.getMinutes()}분 {date.getSeconds()}초
                  </Text>
                  <br/>
                  <br/>
                  <Text fontSize="xs" fontWeight="600" textAlign="center">학생증 바코드</Text>
                  {qr && <Image src={qr} width={200} height={70} alt="QR CODE" />}
              </Badge>
            </Flex>
          </div>
          <FooterComponent isCode={true}/>
        </>
      )
  } else {
    return (
      <>
      <Flex height="100vh" alignItems="center" justifyContent="center" className={styles.background}>
        <Flex direction="column" p={12} rounded={6}>
          <Heading mb={6} color="white">디지털 학생증</Heading>
            <Button border="solid 1px white" borderRadius="18px" bg="#FFFFFF" color="#5991CC" mb={10} onClick={() => router.push("register") }>
              등록하기
            </Button>
        </Flex>
      </Flex>
      <FooterComponent isCode={false}/>
      </>
    )
  }
}